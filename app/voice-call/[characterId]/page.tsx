'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';

function VoiceCallContent() {
  const router = useRouter();
  const params = useParams();
  const characterId = params.characterId as string;

  const [character, setCharacter] = useState<any>(null);
  const [callStatus, setCallStatus] = useState<'connecting' | 'connected' | 'ended'>('connecting');
  const [duration, setDuration] = useState(0);
  const [tokensUsed, setTokensUsed] = useState(0);

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const sessionIdRef = useRef<number | null>(null);

  useEffect(() => {
    const initializeVoiceCall = async () => {
      console.log('=== INITIALIZING WEBRTC VOICE CALL ===');

      try {
        const token = localStorage.getItem('token');
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://pixelcrushbackend-production.up.railway.app';

        // Step 1: Get ephemeral token from backend
        console.log('1. Requesting ephemeral token from backend...');
        const tokenResponse = await fetch(
          `${apiUrl}/api/voice/start-call`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ characterId })
          }
        );

        console.log('Response status:', tokenResponse.status);

        if (!tokenResponse.ok) {
          const error = await tokenResponse.json().catch(() => ({ message: 'Failed to start call' }));
          console.error('❌ Failed to get ephemeral token:', error);
          alert(error.message || 'Failed to start call');
          router.push(`/chat?characterId=${characterId}`);
          return;
        }

        const responseJson = await tokenResponse.json();
        console.log('Response:', responseJson);

        const ephemeralToken = responseJson.data?.ephemeralToken;
        sessionIdRef.current = responseJson.data?.sessionId;
        const characterName = responseJson.data?.characterName;

        if (!ephemeralToken) {
          console.error('❌ No ephemeral token in response');
          alert('Failed to get authentication token');
          router.push(`/chat?characterId=${characterId}`);
          return;
        }

        console.log('✅ Got ephemeral token');
        console.log('   Session ID:', sessionIdRef.current);
        console.log('   Character:', characterName);

        // Step 2: Create WebRTC peer connection
        console.log('2. Creating RTCPeerConnection...');
        const pc = new RTCPeerConnection();
        pcRef.current = pc;
        console.log('✅ RTCPeerConnection created');

        // Step 3: Set up audio element for playback
        console.log('3. Setting up audio playback...');
        const audioElement = document.createElement('audio');
        audioElement.autoplay = true;
        audioElementRef.current = audioElement;
        document.body.appendChild(audioElement); // Add to DOM for autoplay to work

        pc.ontrack = (e) => {
          console.log('✅ Received audio track from OpenAI');
          console.log('   Streams:', e.streams.length);
          console.log('   Track kind:', e.track.kind);
          audioElement.srcObject = e.streams[0];
        };

        pc.oniceconnectionstatechange = () => {
          console.log('ICE connection state:', pc.iceConnectionState);
        };

        pc.onconnectionstatechange = () => {
          console.log('Connection state:', pc.connectionState);
          if (pc.connectionState === 'connected') {
            console.log('✅ WebRTC connection fully established');
            setCallStatus('connected');
          } else if (pc.connectionState === 'failed' || pc.connectionState === 'disconnected') {
            console.error('❌ WebRTC connection failed');
            alert('Connection lost');
            endCall();
          }
        };

        // Step 4: Get microphone permission and add track
        console.log('4. Requesting microphone access...');
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            sampleRate: 24000
          }
        });

        console.log('✅ Microphone access granted');
        console.log('   Audio tracks:', stream.getAudioTracks().length);

        const audioTrack = stream.getAudioTracks()[0];
        console.log('   Track settings:', audioTrack.getSettings());

        pc.addTrack(audioTrack, stream);
        console.log('✅ Audio track added to peer connection');

        // Step 5: Set up data channel for events
        console.log('5. Creating data channel...');
        const dc = pc.createDataChannel('oai-events');
        dcRef.current = dc;

        dc.addEventListener('open', () => {
          console.log('✅ Data channel opened');
        });

        dc.addEventListener('message', (e) => {
          const event = JSON.parse(e.data);
          console.log('📨 OpenAI event:', event.type);

          if (event.type === 'error') {
            console.error('❌ OpenAI error:', event);
            alert('Error during call: ' + event.error?.message);
          } else if (event.type === 'response.done') {
            console.log('✅ Response completed');
          } else if (event.type === 'conversation.item.created') {
            console.log('💬 Conversation item created');
          }
        });

        dc.addEventListener('close', () => {
          console.log('Data channel closed');
        });

        dc.addEventListener('error', (e) => {
          console.error('❌ Data channel error:', e);
        });

        // Step 6: Create offer and send to OpenAI
        console.log('6. Creating SDP offer...');
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        console.log('✅ Local description set');

        console.log('7. Sending offer to OpenAI Realtime API...');
        const sdpResponse = await fetch('https://api.openai.com/v1/realtime', {
          method: 'POST',
          body: offer.sdp,
          headers: {
            'Authorization': `Bearer ${ephemeralToken}`,
            'Content-Type': 'application/sdp'
          }
        });

        console.log('OpenAI response status:', sdpResponse.status);

        if (!sdpResponse.ok) {
          const errorText = await sdpResponse.text();
          console.error('❌ OpenAI API error:', errorText);
          throw new Error('Failed to connect to OpenAI: ' + errorText);
        }

        const answerSdp = await sdpResponse.text();
        console.log('✅ Received SDP answer from OpenAI');
        console.log('   Answer length:', answerSdp.length);

        // Step 7: Set remote description
        const answer: RTCSessionDescriptionInit = {
          type: 'answer',
          sdp: answerSdp
        };
        await pc.setRemoteDescription(answer);
        console.log('✅ Remote description set');

        console.log('✅ WebRTC connection established');

        // Start timer
        timerRef.current = setInterval(() => {
          setDuration(prev => {
            const newDuration = prev + 1;
            setTokensUsed(Math.ceil(newDuration / 60) * 5);
            return newDuration;
          });
        }, 1000);

        // Fetch character data
        console.log('8. Fetching character data...');
        const charResponse = await fetch(
          `${apiUrl}/api/characters/${characterId}`,
          { headers: { 'Authorization': `Bearer ${token}` } }
        );
        const charData = await charResponse.json();
        setCharacter(charData);
        console.log('✅ Character data loaded:', charData.name || charData.character_name);

      } catch (error) {
        console.error('❌ Error initializing voice call:', error);
        console.error('Error details:', error instanceof Error ? error.message : error);
        alert('Failed to connect. Please try again.');
        router.push(`/chat?characterId=${characterId}`);
      }
    };

    initializeVoiceCall();

    return () => {
      // Cleanup
      console.log('Cleaning up voice call...');
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (pcRef.current) {
        pcRef.current.close();
      }
      if (audioElementRef.current) {
        audioElementRef.current.remove();
      }
    };
  }, [characterId, router]);

  const endCall = async () => {
    console.log('=== ENDING CALL ===');
    console.log('Duration:', duration, 'seconds');
    console.log('Tokens used:', tokensUsed);

    if (pcRef.current) {
      pcRef.current.close();
      console.log('Peer connection closed');
    }

    if (dcRef.current) {
      dcRef.current.close();
      console.log('Data channel closed');
    }

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    try {
      const token = localStorage.getItem('token');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://pixelcrushbackend-production.up.railway.app';

      console.log('Calling /api/voice/end-call...');
      const response = await fetch(`${apiUrl}/api/voice/end-call`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          sessionId: sessionIdRef.current,
          characterId: characterId,
          durationSeconds: duration
        })
      });

      if (response.ok) {
        console.log('✅ Call ended successfully');
      } else {
        console.error('❌ Failed to end call:', response.status);
      }
    } catch (error) {
      console.error('❌ Failed to end call:', error);
    }

    router.push(`/chat?characterId=${characterId}`);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!character) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#131313',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Poppins, sans-serif'
      }}>
        <p style={{ color: 'white', fontSize: '18px' }}>Connecting...</p>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#131313',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '32px'
    }}>
      {/* Character Section */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          position: 'relative',
          width: '192px',
          height: '192px',
          marginBottom: '24px'
        }}>
          <img
            src={character.avatar_url || character.image_url}
            alt={character.name || character.character_name}
            style={{
              borderRadius: '50%',
              objectFit: 'cover',
              width: '100%',
              height: '100%',
              border: '3px solid #FF3B9A'
            }}
          />
        </div>

        <h1 style={{
          fontSize: '36px',
          fontWeight: 'bold',
          color: 'white',
          marginBottom: '8px',
          fontFamily: 'Poppins, sans-serif'
        }}>
          {character.name || character.character_name}
        </h1>

        <div style={{
          textAlign: 'center',
          marginTop: '32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <p style={{
            fontSize: '18px',
            color: callStatus === 'connecting' ? '#FCD34D' :
                   callStatus === 'connected' ? '#10B981' :
                   '#EF4444',
            fontFamily: 'Poppins, sans-serif'
          }}>
            {callStatus === 'connecting' && '🔄 Connecting...'}
            {callStatus === 'connected' && '✅ Connected'}
            {callStatus === 'ended' && '❌ Call Ended'}
          </p>

          <p style={{
            fontSize: '48px',
            fontFamily: 'monospace',
            color: 'white',
            fontWeight: 'bold'
          }}>
            {formatDuration(duration)}
          </p>

          <p style={{
            color: '#9CA3AF',
            fontSize: '16px',
            fontFamily: 'Poppins, sans-serif'
          }}>
            Cost: {tokensUsed} tokens (5 tokens/min)
          </p>
        </div>
      </div>

      {/* End Call Button */}
      <div style={{ paddingBottom: '32px' }}>
        <button
          onClick={endCall}
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: '#EF4444',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.5)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#DC2626';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#EF4444';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <svg
            style={{ width: '32px', height: '32px', color: 'white' }}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function VoiceCallPage() {
  return (
    <ProtectedRoute>
      <VoiceCallContent />
    </ProtectedRoute>
  );
}
