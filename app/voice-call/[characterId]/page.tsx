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
  const [showEarpieceHint, setShowEarpieceHint] = useState(false);
  const [userHasSpoken, setUserHasSpoken] = useState(false);

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const sessionIdRef = useRef<number | null>(null);
  const greetingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const audioLevelIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Helper function to configure audio session for iOS
  const configureAudioSession = () => {
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isIOS) {
      console.log('Configuring iOS audio session for earpiece...');

      // Create a silent audio element to "prime" the audio session
      // This helps iOS route audio to earpiece
      const silentAudio = new Audio();
      silentAudio.src = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';
      silentAudio.play().catch(() => {
        console.log('Silent audio prime failed (expected on some devices)');
      });
      console.log('✅ iOS audio session primed');
    }
  };

  // Helper function to apply Web Audio API processing for natural feminine voice
  const applyAudioProcessing = (stream: MediaStream, audioElement: HTMLAudioElement) => {
    try {
      console.log('🎵 Setting up Web Audio API processing...');

      // Create AudioContext optimized for 24kHz (OpenAI Realtime API sample rate)
      const audioContext = new AudioContext({ sampleRate: 24000 });
      audioContextRef.current = audioContext;

      // Create source from the remote audio stream
      const source = audioContext.createMediaStreamSource(stream);

      // Create processing chain for natural feminine voice

      // 1. Pitch Shift - Subtle increase for more natural feminine tone
      // Note: Web Audio API doesn't have native pitch shifting,
      // so we use a combination of filters to enhance feminine characteristics

      // 2. High-frequency boost (8-12kHz) - Enhances clarity and feminine voice characteristics
      const highShelf = audioContext.createBiquadFilter();
      highShelf.type = 'highshelf';
      highShelf.frequency.value = 8000; // 8kHz
      highShelf.gain.value = 3; // +3dB boost for clarity

      // 3. Presence boost (2-4kHz) - Enhances vocal presence and naturalness
      const presencePeak = audioContext.createBiquadFilter();
      presencePeak.type = 'peaking';
      presencePeak.frequency.value = 3000; // 3kHz
      presencePeak.Q.value = 1.5; // Moderate Q for natural sound
      presencePeak.gain.value = 2; // +2dB boost

      // 4. Low-cut filter (80Hz) - Removes rumble and improves clarity
      const lowCut = audioContext.createBiquadFilter();
      lowCut.type = 'highpass';
      lowCut.frequency.value = 80; // 80Hz cutoff
      lowCut.Q.value = 0.7; // Gentle slope

      // 5. Compression - Smooth out volume variations for more natural speech
      const compressor = audioContext.createDynamicsCompressor();
      compressor.threshold.value = -24; // dB
      compressor.knee.value = 30; // Soft knee for natural compression
      compressor.ratio.value = 4; // 4:1 ratio
      compressor.attack.value = 0.003; // 3ms attack
      compressor.release.value = 0.25; // 250ms release

      // 6. Final gain control
      const gainNode = audioContext.createGain();
      gainNode.gain.value = 1.0; // Unity gain

      // Connect the processing chain
      source
        .connect(lowCut)
        .connect(presencePeak)
        .connect(highShelf)
        .connect(compressor)
        .connect(gainNode)
        .connect(audioContext.destination);

      console.log('✅ Web Audio API processing configured:');
      console.log('   • Sample rate: 24kHz (OpenAI optimized)');
      console.log('   • High-frequency boost: +3dB @ 8kHz');
      console.log('   • Presence boost: +2dB @ 3kHz');
      console.log('   • Low-cut filter: 80Hz');
      console.log('   • Dynamic compression: 4:1 ratio');

      // Also connect to audio element for playback
      const destination = audioContext.createMediaStreamDestination();
      gainNode.connect(destination);
      audioElement.srcObject = destination.stream;

      return audioContext;
    } catch (error) {
      console.error('❌ Error setting up audio processing:', error);
      console.log('Falling back to direct audio playback');
      // Fallback: Use unprocessed audio
      return null;
    }
  };

  // Show earpiece hint on mobile when connected
  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile && callStatus === 'connected') {
      setShowEarpieceHint(true);
      // Hide hint after 5 seconds
      setTimeout(() => setShowEarpieceHint(false), 5000);
    }
  }, [callStatus]);

  useEffect(() => {
    const initializeVoiceCall = async () => {
      console.log('=== INITIALIZING WEBRTC VOICE CALL ===');

      // Configure audio session for mobile devices (especially iOS)
      configureAudioSession();

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

        // Step 3: Set up audio element for mobile earpiece routing
        console.log('3. Setting up audio playback for mobile earpiece...');
        const audioElement = document.createElement('audio');
        audioElement.autoplay = true;

        // CRITICAL: Configure for earpiece on mobile
        audioElement.setAttribute('playsinline', 'true'); // iOS compatibility
        audioElement.style.display = 'none'; // Hide the element

        audioElementRef.current = audioElement;
        document.body.appendChild(audioElement); // Required for iOS

        // Helper function to configure audio output
        const configureAudioOutput = async () => {
          try {
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

            console.log('Device type:', isMobile ? 'Mobile' : 'Desktop');

            if (isMobile) {
              console.log('Configuring audio for mobile earpiece...');

              // Set volume to max (earpiece needs higher volume)
              audioElement.volume = 1.0;

              // Request wake lock (helps maintain earpiece routing)
              if ('wakeLock' in navigator) {
                try {
                  // @ts-ignore - wakeLock may not be in types
                  const wakeLock = await navigator.wakeLock.request('screen');
                  console.log('✅ Wake lock acquired (helps maintain earpiece routing)');
                } catch (e) {
                  console.log('Wake lock not available:', e);
                }
              }
            }
          } catch (error) {
            console.error('Error configuring audio output:', error);
          }
        };

        pc.ontrack = async (e) => {
          console.log('✅ Received audio track from OpenAI');
          console.log('   Streams:', e.streams.length);
          console.log('   Track kind:', e.track.kind);

          // Apply Web Audio API processing for enhanced feminine voice quality
          const audioContext = applyAudioProcessing(e.streams[0], audioElement);

          // If audio processing failed, fallback to direct playback
          if (!audioContext) {
            audioElement.srcObject = e.streams[0];
          }

          // Configure output after track is received
          await configureAudioOutput();

          // On iOS, need to explicitly play after user interaction
          try {
            await audioElement.play();
            console.log('✅ Audio playing through earpiece with enhanced processing');
          } catch (error) {
            console.error('Audio play error:', error);
          }
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

        // Step 4: Get microphone with mobile-optimized settings
        console.log('4. Requesting microphone access with mobile-optimized settings...');
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
            sampleRate: 24000,
            // Mobile-specific: Request voice communication mode
            channelCount: 1,  // Mono for voice calls
            latency: 0        // Low latency for real-time
          }
        });

        console.log('✅ Microphone access granted');
        console.log('   Audio tracks:', stream.getAudioTracks().length);

        const audioTrack = stream.getAudioTracks()[0];
        const trackSettings = audioTrack.getSettings();
        console.log('   Track settings:', trackSettings);
        console.log('   Sample rate:', trackSettings.sampleRate);
        console.log('   Channel count:', trackSettings.channelCount);

        // Monitor audio levels to detect when user starts speaking
        console.log('🎤 Setting up speech detection...');
        const micAudioContext = new AudioContext({ sampleRate: 24000 });
        const source = micAudioContext.createMediaStreamSource(stream);
        const analyser = micAudioContext.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        // Check audio levels periodically to detect speech
        const checkAudioLevel = () => {
          analyser.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((a, b) => a + b) / dataArray.length;

          // If audio detected above threshold (user is speaking)
          if (average > 10 && !userHasSpoken) {
            console.log('🎤 User speech detected (level:', average, '), canceling auto-greeting');
            setUserHasSpoken(true);

            // Cancel the greeting timer
            if (greetingTimerRef.current) {
              clearTimeout(greetingTimerRef.current);
              greetingTimerRef.current = null;
              console.log('✅ Auto-greeting canceled due to user speech');
            }
          }
        };

        // Check audio levels every 100ms
        audioLevelIntervalRef.current = setInterval(checkAudioLevel, 100);
        console.log('✅ Speech detection active');

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

          // Detect when user input is received
          if (event.type === 'conversation.item.created' && event.item?.role === 'user') {
            console.log('✅ User input detected via event');
            setUserHasSpoken(true);

            // Cancel greeting timer
            if (greetingTimerRef.current) {
              clearTimeout(greetingTimerRef.current);
              greetingTimerRef.current = null;
              console.log('✅ Auto-greeting canceled due to user input event');
            }
          }

          if (event.type === 'error') {
            console.error('❌ OpenAI error:', event);
            alert('Error during call: ' + event.error?.message);
          } else if (event.type === 'response.done') {
            console.log('✅ AI response complete');
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
        setCallStatus('connected');

        // Start 6-second timer for automatic greeting
        console.log('⏱️ Starting 6-second greeting timer...');
        greetingTimerRef.current = setTimeout(() => {
          // Only send greeting trigger if user hasn't spoken
          if (!userHasSpoken && dcRef.current?.readyState === 'open') {
            console.log('⏱️ 6 seconds elapsed, no user input - triggering greeting');

            // Send event to trigger minimal greeting
            dcRef.current.send(JSON.stringify({
              type: 'conversation.item.create',
              item: {
                type: 'message',
                role: 'system',
                content: [{
                  type: 'input_text',
                  text: 'GREETING_TRIGGER: Start with a brief, natural greeting.'
                }]
              }
            }));

            // Request response
            dcRef.current.send(JSON.stringify({
              type: 'response.create'
            }));

            console.log('✅ Greeting trigger sent to AI');
          } else if (userHasSpoken) {
            console.log('✅ User already spoke, skipping automatic greeting');
          }
        }, 6000);  // 6 seconds

        // Start call duration timer
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
      if (greetingTimerRef.current) {
        clearTimeout(greetingTimerRef.current);
        console.log('Greeting timer cleared');
      }
      if (audioLevelIntervalRef.current) {
        clearInterval(audioLevelIntervalRef.current);
        console.log('Audio level monitoring stopped');
      }
      if (pcRef.current) {
        pcRef.current.close();
      }
      // Properly cleanup audio context
      if (audioContextRef.current) {
        audioContextRef.current.close();
        console.log('Audio context closed');
      }
      // Properly cleanup audio element
      if (audioElementRef.current) {
        audioElementRef.current.pause();
        audioElementRef.current.srcObject = null;
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

    if (audioContextRef.current) {
      audioContextRef.current.close();
      console.log('Audio context closed');
    }

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    if (greetingTimerRef.current) {
      clearTimeout(greetingTimerRef.current);
    }

    if (audioLevelIntervalRef.current) {
      clearInterval(audioLevelIntervalRef.current);
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
      padding: '32px',
      position: 'relative'
    }}>
      {/* Earpiece Hint for Mobile */}
      {showEarpieceHint && (
        <div style={{
          position: 'absolute',
          top: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#3B82F6',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.5)',
          zIndex: 1000,
          fontFamily: 'Poppins, sans-serif',
          fontSize: '14px',
          textAlign: 'center',
          animation: 'fadeIn 0.3s ease-in'
        }}>
          💡 Hold phone to your ear like a regular call
        </div>
      )}

      {/* Listening Indicator */}
      {callStatus === 'connected' && !userHasSpoken && (
        <div style={{
          position: 'absolute',
          top: '128px',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          zIndex: 999
        }}>
          <p style={{
            color: '#9CA3AF',
            fontSize: '14px',
            fontFamily: 'Poppins, sans-serif',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
          }}>
            🎤 Listening...
          </p>
        </div>
      )}

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
