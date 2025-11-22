'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';

function VoiceCallContent() {
  const router = useRouter();
  const params = useParams();
  const characterId = params.characterId as string;

  const [character, setCharacter] = useState<any>(null);
  const [callStatus, setCallStatus] = useState<'connecting' | 'connected' | 'ending' | 'ended'>('connecting');
  const [duration, setDuration] = useState(0);
  const [tokensUsed, setTokensUsed] = useState(0);
  const [showEarpieceHint, setShowEarpieceHint] = useState(false);
  const [userHasSpoken, setUserHasSpoken] = useState(false);

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const sessionIdRef = useRef<number | null>(null);
  const greetingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // CRITICAL: Flags to prevent re-initialization during cleanup
  const isCleaningUpRef = useRef(false);
  const hasInitializedRef = useRef(false);

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

  // Cleanup function to fully disconnect and cleanup resources
  const performCleanup = () => {
    if (isCleaningUpRef.current) {
      console.log('⚠️ Cleanup already in progress');
      return;
    }

    console.log('🧹 Starting cleanup...');
    isCleaningUpRef.current = true;

    // 1. Clear timers
    if (timerRef.current) {
      console.log('  - Clearing duration timer');
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (greetingTimerRef.current) {
      console.log('  - Clearing greeting timer');
      clearTimeout(greetingTimerRef.current);
      greetingTimerRef.current = null;
    }

    // 2. Close data channel
    if (dcRef.current) {
      console.log('  - Closing data channel, state:', dcRef.current.readyState);
      try {
        dcRef.current.close();
      } catch (error) {
        console.error('  - Error closing data channel:', error);
      }
      dcRef.current = null;
    }

    // 3. Close peer connection (this closes OpenAI connection)
    if (pcRef.current) {
      console.log('  - Closing RTCPeerConnection, state:', pcRef.current.connectionState);
      try {
        // Close all tracks
        pcRef.current.getSenders().forEach(sender => {
          if (sender.track) {
            console.log('  - Stopping sender track:', sender.track.kind);
            sender.track.stop();
          }
        });

        pcRef.current.getReceivers().forEach(receiver => {
          if (receiver.track) {
            console.log('  - Stopping receiver track:', receiver.track.kind);
            receiver.track.stop();
          }
        });

        // Close the connection
        pcRef.current.close();
        console.log('  ✅ RTCPeerConnection closed');
      } catch (error) {
        console.error('  - Error closing peer connection:', error);
      }
      pcRef.current = null;
    }

    // 4. Cleanup audio element
    if (audioElementRef.current) {
      console.log('  - Cleaning up audio element');
      try {
        audioElementRef.current.pause();
        audioElementRef.current.srcObject = null;
        audioElementRef.current.remove();
      } catch (error) {
        console.error('  - Error cleaning audio element:', error);
      }
      audioElementRef.current = null;
    }

    console.log('✅ Cleanup complete');
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

  // Prevent back button from returning to call page after cleanup
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (isCleaningUpRef.current || callStatus === 'ended') {
        console.log('⚠️ Back button pressed during/after cleanup - preventing');
        e.preventDefault();
        window.location.href = '/conversations';
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [callStatus]);

  useEffect(() => {
    // Prevent multiple initializations
    if (hasInitializedRef.current || isCleaningUpRef.current) {
      console.log('⚠️ Skipping initialization - already initialized or cleaning up');
      return;
    }

    hasInitializedRef.current = true;

    const initializeVoiceCall = async () => {
      console.log('=== INITIALIZING WEBRTC VOICE CALL ===');

      // Double-check cleanup flag
      if (isCleaningUpRef.current) {
        console.log('⚠️ Cleanup in progress, aborting initialization');
        return;
      }

      // Configure audio session for mobile devices (especially iOS)
      configureAudioSession();

      try {
        const token = localStorage.getItem('token');

        if (!token) {
          console.error('❌ No authentication token found');
          alert('Please log in first');
          router.push('/login');
          return;
        }

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://pixelcrushbackend-production.up.railway.app';

        // Step 1: Get ephemeral token from backend
        console.log('1. Requesting ephemeral token from backend...');
        console.log('   API URL:', apiUrl);
        console.log('   Character ID:', characterId);
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
          const errorText = await tokenResponse.text();
          console.error('❌ Start call failed:', tokenResponse.status, errorText);

          // Try to parse as JSON for better error message
          try {
            const errorJson = JSON.parse(errorText);
            alert(errorJson.message || 'Failed to start call');
          } catch {
            alert('Failed to start call');
          }

          router.push(`/chat?characterId=${characterId}`);
          return;
        }

        // Parse JSON response
        const responseJson = await tokenResponse.json();
        console.log('Full response:', responseJson);
        console.log('Response.success:', responseJson.success);
        console.log('Response.data:', responseJson.data);

        // CRITICAL: Validate response structure (backend returns { success, data })
        if (!responseJson.success || !responseJson.data) {
          console.error('❌ Invalid response structure:', responseJson);
          console.error('Expected: { success: true, data: { ephemeralToken, sessionId, ... } }');
          alert('Invalid response from server');
          router.push(`/chat?characterId=${characterId}`);
          return;
        }

        const { data } = responseJson;
        console.log('Data object keys:', Object.keys(data));

        // Access ephemeralToken from data object
        const ephemeralToken = data.ephemeralToken;
        sessionIdRef.current = data.sessionId;
        const characterName = data.characterName;
        const greetingDelay = data.greetingDelay || 6000;

        console.log('✅ Ephemeral token extracted:', ephemeralToken ? ephemeralToken.substring(0, 20) + '...' : 'MISSING');
        console.log('✅ Session ID:', sessionIdRef.current);
        console.log('✅ Character name:', characterName);
        console.log('✅ Greeting delay:', greetingDelay, 'ms');

        // Validate token exists
        if (!ephemeralToken) {
          console.error('❌ No ephemeralToken in response.data');
          console.error('Available fields in data:', Object.keys(data));
          alert('Failed to get authentication token');
          router.push(`/chat?characterId=${characterId}`);
          return;
        }

        // Step 2: Create WebRTC peer connection
        console.log('2. Creating RTCPeerConnection...');
        const pc = new RTCPeerConnection();
        pcRef.current = pc;
        console.log('✅ RTCPeerConnection created');

        // Step 3: Set up simple audio element for playback
        console.log('3. Setting up audio playback...');
        const audioElement = document.createElement('audio');
        audioElement.autoplay = true;
        audioElement.setAttribute('playsinline', 'true'); // iOS compatibility
        audioElement.style.display = 'none';

        // Configure for mobile earpiece
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
          console.log('Mobile detected - configuring for earpiece');
          audioElement.volume = 1.0;

          // Request wake lock (helps maintain earpiece routing)
          if ('wakeLock' in navigator) {
            try {
              // @ts-ignore - wakeLock may not be in types
              const wakeLock = await navigator.wakeLock.request('screen');
              console.log('✅ Wake lock acquired');
            } catch (e) {
              console.log('Wake lock not available');
            }
          }
        }

        audioElementRef.current = audioElement;
        document.body.appendChild(audioElement);
        console.log('✅ Audio element created');

        pc.ontrack = (e) => {
          console.log('✅ Received audio track from OpenAI');
          console.log('   Track kind:', e.track.kind);
          console.log('   Track settings:', e.track.getSettings());

          // Simple: Just set the stream on the audio element
          // WebRTC handles all audio processing automatically
          if (audioElementRef.current) {
            audioElementRef.current.srcObject = e.streams[0];
            console.log('✅ Audio stream connected to audio element');
          }

          setCallStatus('connected');
        };

        pc.oniceconnectionstatechange = () => {
          console.log('📊 ICE connection state changed:', pc.iceConnectionState);
        };

        pc.onconnectionstatechange = () => {
          console.log('📊 Connection state changed:', pc.connectionState);

          if (pc.connectionState === 'connected') {
            console.log('✅ WebRTC connection fully established');
            setCallStatus('connected');
          } else if (pc.connectionState === 'failed' || pc.connectionState === 'closed') {
            console.log('⚠️ Connection lost or closed');
            if (callStatus !== 'ending' && callStatus !== 'ended') {
              alert('Connection lost');
              endCall();
            }
          } else if (pc.connectionState === 'disconnected') {
            console.warn('⚠️ Connection disconnected - may be temporary');
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

        const audioTrack = stream.getAudioTracks()[0];
        console.log('   Microphone settings:', audioTrack.getSettings());

        pc.addTrack(audioTrack, stream);
        console.log('✅ Audio track added to peer connection');
        console.log('   Speech detection will be handled via OpenAI data channel events');

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

          // Detect when user starts speaking
          if (event.type === 'input_audio_buffer.speech_started') {
            console.log('🎤 User started speaking');
            if (!userHasSpoken) {
              setUserHasSpoken(true);
              if (greetingTimerRef.current) {
                clearTimeout(greetingTimerRef.current);
                greetingTimerRef.current = null;
                console.log('✅ Auto-greeting canceled - user spoke');
              }
            }
          }

          // Detect when user input is created
          if (event.type === 'conversation.item.created' && event.item?.role === 'user') {
            console.log('✅ User input detected');
            setUserHasSpoken(true);
          }

          if (event.type === 'error') {
            console.error('❌ OpenAI error:', event);
            alert('Error: ' + event.error?.message);
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
        console.log('   Offer SDP length:', offer.sdp?.length);

        console.log('7. Sending offer to OpenAI Realtime API...');
        console.log('   Using ephemeral token (first 20 chars):', ephemeralToken.substring(0, 20) + '...');
        console.log('   Endpoint: https://api.openai.com/v1/realtime');
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
          console.error('❌ OpenAI connection failed');
          console.error('   Status:', sdpResponse.status);
          console.error('   Error:', errorText);
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
        console.error('Error details:', {
          message: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined,
          type: error?.constructor?.name
        });

        // Show user-friendly error message
        const errorMessage = error instanceof Error ? error.message : 'Failed to connect';
        alert('Failed to connect: ' + errorMessage);

        // Set cleanup flag before navigating
        isCleaningUpRef.current = true;

        // Hard navigate back to conversations page
        console.log('Error recovery: navigating to conversations');
        window.location.href = '/conversations';
      }
    };

    initializeVoiceCall();

    // Cleanup function
    return () => {
      console.log('=== CLEANUP TRIGGERED ===');
      performCleanup();
    };
  }, []); // Empty deps - only run once

  const endCall = async () => {
    console.log('=== END CALL INITIATED ===');

    // Prevent multiple end call triggers
    if (callStatus === 'ending' || callStatus === 'ended') {
      console.log('⚠️ Call already ending/ended');
      return;
    }

    setCallStatus('ending');

    try {
      // 1. Perform all cleanup first
      console.log('Step 1: Performing cleanup...');
      performCleanup();

      // 2. Call backend to finalize and deduct tokens
      console.log('Step 2: Calling backend end-call endpoint...');
      const token = localStorage.getItem('token');

      if (token && sessionIdRef.current) {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://pixelcrushbackend-production.up.railway.app';
          const response = await fetch(
            `${apiUrl}/api/voice/end-call`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({
                sessionId: sessionIdRef.current,
                durationSeconds: duration
              })
            }
          );

          if (response.ok) {
            const result = await response.json();
            console.log('✅ Call ended on backend:', result);
            console.log('   Duration:', duration, 'seconds');
            console.log('   Tokens used:', result.tokensUsed || 0);
          } else {
            console.error('⚠️ Backend end-call failed:', response.status);
          }
        } catch (error) {
          console.error('⚠️ Error calling end-call endpoint:', error);
          // Continue with navigation even if backend call fails
        }
      }

      // 3. Set final status
      setCallStatus('ended');

      // 4. Short delay for cleanup to complete
      await new Promise(resolve => setTimeout(resolve, 300));

      // 5. HARD NAVIGATION - Force full page reload
      console.log('Step 3: Hard navigation to conversations page...');
      console.log('   → Navigating to /conversations');

      // Use window.location.href for hard navigation
      // This removes the call page from history and prevents back button issues
      window.location.href = '/conversations';

    } catch (error) {
      console.error('❌ Error in endCall:', error);

      // Fallback: Hard navigate anyway
      console.log('Fallback navigation...');
      window.location.href = '/conversations';
    }
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
      {/* Loading Overlay During Call End */}
      {(callStatus === 'ending' || callStatus === 'ended') && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{
            background: '#1F2937',
            borderRadius: '12px',
            padding: '32px',
            textAlign: 'center',
            maxWidth: '300px'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              border: '3px solid #374151',
              borderTopColor: 'white',
              borderRadius: '50%',
              margin: '0 auto 16px',
              animation: 'spin 1s linear infinite'
            }}></div>
            <p style={{
              color: 'white',
              fontSize: '18px',
              fontFamily: 'Poppins, sans-serif',
              marginBottom: '8px'
            }}>
              Ending call...
            </p>
            <p style={{
              color: '#9CA3AF',
              fontSize: '14px',
              fontFamily: 'Poppins, sans-serif'
            }}>
              Returning to conversations
            </p>
          </div>
        </div>
      )}

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
                   callStatus === 'ending' ? '#F97316' :
                   '#EF4444',
            fontFamily: 'Poppins, sans-serif'
          }}>
            {callStatus === 'connecting' && '🔄 Connecting...'}
            {callStatus === 'connected' && '✅ Connected'}
            {callStatus === 'ending' && '⏳ Ending call...'}
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
      <div style={{ paddingBottom: '32px', textAlign: 'center' }}>
        <button
          onClick={endCall}
          disabled={callStatus === 'ending' || callStatus === 'ended'}
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: (callStatus === 'ending' || callStatus === 'ended') ? '#6B7280' : '#EF4444',
            border: 'none',
            cursor: (callStatus === 'ending' || callStatus === 'ended') ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.5)',
            opacity: (callStatus === 'ending' || callStatus === 'ended') ? 0.5 : 1
          }}
          onMouseEnter={(e) => {
            if (callStatus !== 'ending' && callStatus !== 'ended') {
              e.currentTarget.style.background = '#DC2626';
              e.currentTarget.style.transform = 'scale(1.05)';
            }
          }}
          onMouseLeave={(e) => {
            if (callStatus !== 'ending' && callStatus !== 'ended') {
              e.currentTarget.style.background = '#EF4444';
              e.currentTarget.style.transform = 'scale(1)';
            }
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

        {(callStatus === 'ending' || callStatus === 'ended') && (
          <p style={{
            color: '#9CA3AF',
            fontSize: '14px',
            marginTop: '12px',
            fontFamily: 'Poppins, sans-serif'
          }}>
            Disconnecting...
          </p>
        )}
      </div>

      {/* CSS Animation for Spinner */}
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
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
