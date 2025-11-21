'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { characterAPI, userAPI } from '@/lib/api';
import type { Character } from '@/lib/types';
import ProtectedRoute from '@/components/ProtectedRoute';
import UpgradeModal from '@/components/UpgradeModal';

function VoiceCallContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const characterId = searchParams.get('characterId');

  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [callStatus, setCallStatus] = useState<'connecting' | 'connected' | 'ended'>('connecting');
  const [callDuration, setCallDuration] = useState(0);
  const [tokenCost, setTokenCost] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  const wsRef = useRef<WebSocket | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);
  const callTimerRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioQueueRef = useRef<AudioBuffer[]>([]);
  const isPlayingRef = useRef(false);

  // Load user profile and character
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check premium status
        const user = await userAPI.getProfile();
        const premium = user.subscription_active || false;
        setIsPremium(premium);

        if (!premium) {
          setError('Voice calling is a premium feature');
          setShowUpgradeModal(true);
          return;
        }

        if (!characterId) {
          setError('No character selected');
          return;
        }

        // Load character data
        const characterData = await characterAPI.getById(characterId);
        setCharacter(characterData);
      } catch (err) {
        console.error('Failed to load data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load character');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [characterId]);

  // Request microphone permission and start call
  useEffect(() => {
    if (!character || !isPremium) return;

    const startCall = async () => {
      try {
        // Request microphone permission
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioStreamRef.current = stream;
        setHasPermission(true);

        // Initialize WebSocket connection
        connectWebSocket();

        // Start call timer
        startCallTimer();

        // Update status
        setCallStatus('connected');
      } catch (err) {
        console.error('Failed to access microphone:', err);
        setError('Microphone access denied. Please enable microphone permissions.');
        setTimeout(() => {
          router.push(`/chat?characterId=${characterId}`);
        }, 3000);
      }
    };

    startCall();

    // Cleanup on unmount
    return () => {
      endCall();
    };
  }, [character, isPremium]);

  const connectWebSocket = () => {
    if (!characterId) return;

    const token = localStorage.getItem('token');
    const wsUrl = `wss://pixelcrushbackend-production.up.railway.app/voice-call?token=${token}&character_id=${characterId}`;

    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('WebSocket connected');
      startAudioCapture();
    };

    ws.onmessage = async (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === 'audio') {
          // Received audio from AI
          setIsAISpeaking(true);
          await playAudioData(data.audio);
          setTimeout(() => setIsAISpeaking(false), 100);
        } else if (data.type === 'transcript') {
          console.log('AI transcript:', data.text);
        } else if (data.type === 'error') {
          console.error('WebSocket error:', data.message);
          if (data.message.includes('token') || data.message.includes('insufficient')) {
            setShowUpgradeModal(true);
          }
        }
      } catch (err) {
        console.error('Failed to process WebSocket message:', err);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setError('Connection error. Please try again.');
    };

    ws.onclose = () => {
      console.log('WebSocket closed');
      stopAudioCapture();
    };
  };

  const startAudioCapture = () => {
    if (!audioStreamRef.current || !wsRef.current) return;

    try {
      const mediaRecorder = new MediaRecorder(audioStreamRef.current, {
        mimeType: 'audio/webm;codecs=opus'
      });

      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = async (event) => {
        if (event.data.size > 0 && wsRef.current?.readyState === WebSocket.OPEN && !isMuted) {
          // Convert blob to base64 and send to backend
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64Audio = (reader.result as string).split(',')[1];
            wsRef.current?.send(JSON.stringify({
              type: 'audio',
              audio: base64Audio
            }));
            setIsUserSpeaking(true);
            setTimeout(() => setIsUserSpeaking(false), 100);
          };
          reader.readAsDataURL(event.data);
        }
      };

      // Capture audio in chunks every 100ms
      mediaRecorder.start(100);
    } catch (err) {
      console.error('Failed to start audio capture:', err);
    }
  };

  const stopAudioCapture = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
  };

  const playAudioData = async (base64Audio: string) => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }

      const audioContext = audioContextRef.current;

      // Decode base64 to audio buffer
      const audioData = Uint8Array.from(atob(base64Audio), c => c.charCodeAt(0));
      const audioBuffer = await audioContext.decodeAudioData(audioData.buffer);

      // Add to queue
      audioQueueRef.current.push(audioBuffer);

      // Play if not already playing
      if (!isPlayingRef.current) {
        playNextInQueue();
      }
    } catch (err) {
      console.error('Failed to play audio:', err);
    }
  };

  const playNextInQueue = async () => {
    if (audioQueueRef.current.length === 0) {
      isPlayingRef.current = false;
      return;
    }

    isPlayingRef.current = true;
    const audioBuffer = audioQueueRef.current.shift()!;
    const audioContext = audioContextRef.current!;

    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);

    source.onended = () => {
      playNextInQueue();
    };

    source.start();
  };

  const startCallTimer = () => {
    callTimerRef.current = setInterval(() => {
      setCallDuration(prev => {
        const newDuration = prev + 1;
        // Calculate cost: 5 tokens per minute = 5/60 tokens per second
        setTokenCost(Math.ceil(newDuration * (5 / 60)));
        return newDuration;
      });
    }, 1000);
  };

  const endCall = () => {
    // Stop timer
    if (callTimerRef.current) {
      clearInterval(callTimerRef.current);
      callTimerRef.current = null;
    }

    // Close WebSocket
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    // Stop audio capture
    stopAudioCapture();

    // Stop audio stream
    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach(track => track.stop());
      audioStreamRef.current = null;
    }

    // Close audio context
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    setCallStatus('ended');

    // Navigate back to chat after a delay
    setTimeout(() => {
      router.push(`/chat?characterId=${characterId}`);
    }, 2000);
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div style={{
        fontFamily: 'Poppins, sans-serif',
        background: '#131313',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        maxWidth: '393px',
        margin: '0 auto'
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          border: '4px solid rgba(16, 185, 129, 0.2)',
          borderTop: '4px solid #10B981',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <p style={{ marginTop: '20px', fontSize: '16px' }}>Loading...</p>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error || !character) {
    return (
      <div style={{
        fontFamily: 'Poppins, sans-serif',
        background: '#131313',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        maxWidth: '393px',
        margin: '0 auto',
        padding: '24px'
      }}>
        <div style={{
          fontSize: '48px',
          marginBottom: '16px'
        }}>⚠️</div>
        <p style={{
          fontSize: '18px',
          fontWeight: 600,
          marginBottom: '8px',
          textAlign: 'center'
        }}>
          {error || 'Character not found'}
        </p>
        <button
          onClick={() => router.push('/chat-landing')}
          style={{
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #FF3B9A 0%, #A445ED 100%)',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            marginTop: '16px'
          }}
        >
          Back to Chats
        </button>
        {showUpgradeModal && <UpgradeModal onClose={() => setShowUpgradeModal(false)} />}
      </div>
    );
  }

  return (
    <div style={{
      fontFamily: 'Poppins, sans-serif',
      background: 'linear-gradient(180deg, #131313 0%, #1a1a1a 100%)',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      maxWidth: '393px',
      margin: '0 auto',
      width: '100%',
      position: 'relative'
    }}>
      {/* Status Bar */}
      <div style={{
        padding: '20px 24px',
        textAlign: 'center'
      }}>
        <p style={{
          fontSize: '14px',
          color: callStatus === 'connected' ? '#10B981' : '#FF3B9A',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          {callStatus === 'connecting' && 'Connecting...'}
          {callStatus === 'connected' && 'Connected'}
          {callStatus === 'ended' && 'Call Ended'}
        </p>
      </div>

      {/* Character Display */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px'
      }}>
        {/* Character Image with Pulse Animation */}
        <div style={{
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          overflow: 'hidden',
          border: isAISpeaking ? '4px solid #10B981' : '4px solid rgba(255, 255, 255, 0.2)',
          boxShadow: isAISpeaking ? '0 0 30px rgba(16, 185, 129, 0.6)' : '0 0 20px rgba(0, 0, 0, 0.5)',
          marginBottom: '24px',
          transition: 'all 0.3s ease',
          animation: isAISpeaking ? 'pulse 1s infinite' : 'none'
        }}>
          <img
            src={character.avatar_url}
            alt={character.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>

        {/* Character Name */}
        <h2 style={{
          fontSize: '28px',
          fontWeight: 700,
          marginBottom: '8px'
        }}>
          {character.name}
        </h2>

        {/* Character Info */}
        <p style={{
          fontSize: '14px',
          color: 'rgba(255, 255, 255, 0.6)',
          marginBottom: '32px'
        }}>
          {character.age && character.occupation ? `${character.age} • ${character.occupation}` : character.tagline}
        </p>

        {/* Call Duration */}
        <div style={{
          fontSize: '48px',
          fontWeight: 300,
          fontFamily: 'monospace',
          marginBottom: '16px',
          color: isUserSpeaking ? '#10B981' : 'white'
        }}>
          {formatDuration(callDuration)}
        </div>

        {/* Token Cost */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          background: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="#FFD700" strokeWidth="2"/>
            <text x="12" y="16" textAnchor="middle" fill="#FFD700" fontSize="12" fontWeight="bold">T</text>
          </svg>
          <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)' }}>
            Cost: {tokenCost} tokens (5 tokens/min)
          </span>
        </div>

        {/* Permission Status */}
        {!hasPermission && (
          <p style={{
            marginTop: '16px',
            fontSize: '12px',
            color: '#FF3B9A'
          }}>
            Waiting for microphone permission...
          </p>
        )}
      </div>

      {/* Controls */}
      <div style={{
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        alignItems: 'center'
      }}>
        {/* Mute Button */}
        <button
          onClick={toggleMute}
          disabled={callStatus !== 'connected'}
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: isMuted ? '#FF3B9A' : 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: callStatus === 'connected' ? 'pointer' : 'not-allowed',
            opacity: callStatus === 'connected' ? 1 : 0.5,
            transition: 'all 0.2s ease'
          }}
        >
          {isMuted ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 3L21 21M9 9V12C9 13.6569 10.3431 15 12 15C12.2034 15 12.4018 14.9818 12.5938 14.9472M15 9.34V6C15 4.34315 13.6569 3 12 3C10.8224 3 9.80325 3.67852 9.3122 4.66824" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 11C5 11 5 16 12 16M19 11C19 11.6254 18.9255 12.2311 18.7868 12.8077" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 16V20M12 20H9M12 20H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3C10.3431 3 9 4.34315 9 6V12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12V6C15 4.34315 13.6569 3 12 3Z" stroke="white" strokeWidth="2"/>
              <path d="M5 11C5 11 5 16 12 16C19 16 19 11 19 11" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <path d="M12 16V20M12 20H9M12 20H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>

        {/* End Call Button */}
        <button
          onClick={endCall}
          disabled={callStatus === 'ended'}
          style={{
            width: '80%',
            padding: '16px',
            background: 'linear-gradient(135deg, #FF3B9A 0%, #ED4545 100%)',
            border: 'none',
            borderRadius: '12px',
            color: 'white',
            fontSize: '16px',
            fontWeight: 600,
            cursor: callStatus !== 'ended' ? 'pointer' : 'not-allowed',
            opacity: callStatus !== 'ended' ? 1 : 0.5,
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 12px rgba(255, 59, 154, 0.3)'
          }}
        >
          {callStatus === 'ended' ? 'Returning to Chat...' : 'End Call'}
        </button>
      </div>

      {showUpgradeModal && <UpgradeModal onClose={() => setShowUpgradeModal(false)} />}

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
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
