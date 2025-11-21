'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { characterAPI, userAPI } from '@/lib/api';
import type { Character } from '@/lib/types';
import ProtectedRoute from '@/components/ProtectedRoute';
import UpgradeModal from '@/components/UpgradeModal';
import Image from 'next/image';

function VoiceCallContent() {
  const router = useRouter();
  const params = useParams();
  const characterId = params.characterId as string;

  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [callStatus, setCallStatus] = useState<'connecting' | 'connected' | 'ended'>('connecting');
  const [duration, setDuration] = useState(0);
  const [tokensUsed, setTokensUsed] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [userTokens, setUserTokens] = useState(0);
  const [subscriptionTier, setSubscriptionTier] = useState<string>('free');

  const wsRef = useRef<WebSocket | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioQueueRef = useRef<AudioBuffer[]>([]);
  const isPlayingRef = useRef(false);

  // Load user profile and character, check tokens
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!characterId) {
          setError('No character selected');
          return;
        }

        // Check user tokens
        const user = await userAPI.getProfile();
        const tokens = user.tokens || 0;
        const tier = user.subscription_tier || 'free';

        console.log('User tokens:', tokens);
        console.log('Subscription tier:', tier);

        setUserTokens(tokens);
        setSubscriptionTier(tier);

        // Need at least 5 tokens for 1 minute of call
        if (tokens < 5) {
          if (tier === 'free') {
            setError('You need tokens to make voice calls. Subscribe to get 100 tokens/month!');
            alert('You need tokens to make voice calls. Subscribe to get 100 tokens/month!');
            setTimeout(() => {
              router.push('/subscribe');
            }, 2000);
          } else {
            setError('Insufficient tokens. Purchase more tokens to continue.');
            alert('Insufficient tokens. Purchase more tokens to continue.');
            setTimeout(() => {
              router.push('/tokens');
            }, 2000);
          }
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
  }, [characterId, router]);

  // Request microphone permission and start call
  useEffect(() => {
    if (!character || userTokens < 5) return;

    const startCall = async () => {
      try {
        // Request microphone permission
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioStreamRef.current = stream;
        setHasPermission(true);

        // Initialize WebSocket connection
        connectWebSocket();

        // Start call timer
        startTimer();
      } catch (err) {
        console.error('Failed to access microphone:', err);
        alert('Microphone access denied. Please enable microphone permissions.');
        setTimeout(() => {
          router.push(`/chat?characterId=${characterId}`);
        }, 2000);
      }
    };

    startCall();

    // Cleanup on unmount
    return () => {
      endCallCleanup();
    };
  }, [character, userTokens, characterId, router]);

  const connectWebSocket = () => {
    if (!characterId) return;

    const token = localStorage.getItem('token');
    const wsUrl = `wss://pixelcrushbackend-production.up.railway.app/voice-call?token=${token}&characterId=${characterId}`;

    console.log('Connecting to WebSocket:', wsUrl);
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('WebSocket connected');
      setCallStatus('connected');
      startMicrophone();
    };

    ws.onmessage = async (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === 'audio') {
          // Received audio from AI
          setIsAISpeaking(true);
          await playAudio(data.data || data.audio);
          setTimeout(() => setIsAISpeaking(false), 200);
        } else if (data.type === 'transcript') {
          console.log('AI transcript:', data.text);
        } else if (data.type === 'error') {
          console.error('WebSocket error:', data.message);
          if (data.message.includes('token') || data.message.includes('insufficient')) {
            alert('Insufficient tokens. Call will end.');
            endCall();
          }
        }
      } catch (err) {
        console.error('Failed to process WebSocket message:', err);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setError('Connection error. Please try again.');
      alert('WebSocket connection error');
    };

    ws.onclose = () => {
      console.log('WebSocket closed');
      stopMicrophone();
    };
  };

  const startMicrophone = async () => {
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
              data: base64Audio
            }));
            setIsUserSpeaking(true);
            setTimeout(() => setIsUserSpeaking(false), 150);
          };
          reader.readAsDataURL(event.data);
        }
      };

      // Capture audio in chunks every 100ms
      mediaRecorder.start(100);
      console.log('Microphone started');
    } catch (err) {
      console.error('Failed to start microphone:', err);
    }
  };

  const stopMicrophone = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      console.log('Microphone stopped');
    }
  };

  const playAudio = async (base64Audio: string) => {
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

  const startTimer = () => {
    timerIntervalRef.current = setInterval(() => {
      setDuration(prev => {
        const newDuration = prev + 1;
        // Calculate tokens: 5 tokens per 60 seconds
        const tokensConsumed = Math.ceil(newDuration / 60) * 5;
        setTokensUsed(tokensConsumed);

        // Every 60 seconds, check if user still has tokens
        if (newDuration % 60 === 0) {
          checkTokenBalance(tokensConsumed);
        }

        return newDuration;
      });
    }, 1000);
  };

  const checkTokenBalance = async (tokensConsumed: number) => {
    try {
      const user = await userAPI.getProfile();
      const tokensRemaining = (user.tokens || 0) - tokensConsumed;

      console.log('Token check:', { tokensRemaining, tokensConsumed, totalTokens: user.tokens });

      // If tokens running out (less than 5 remaining), end call
      if (tokensRemaining < 5) {
        alert('Tokens depleted. Call ending.');
        endCall();
      }
    } catch (error) {
      console.error('Failed to check token balance:', error);
    }
  };

  const endCallCleanup = () => {
    // Stop timer
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    // Close WebSocket
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    // Stop microphone
    stopMicrophone();

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
  };

  const endCall = async () => {
    setCallStatus('ended');
    endCallCleanup();

    // Call backend to finalize token deduction
    try {
      const token = localStorage.getItem('token');
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://pixelcrushbackend-production.up.railway.app'}/api/voice/end-call`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          characterId,
          durationSeconds: duration
        })
      });
    } catch (err) {
      console.error('Failed to finalize call:', err);
    }

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
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <div className="w-12 h-12 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin" />
        <p className="mt-4 text-lg">Loading...</p>
      </div>
    );
  }

  if (error || !character) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-6">
        <div className="text-5xl mb-4">⚠️</div>
        <p className="text-xl font-semibold mb-2 text-center">
          {error || 'Character not found'}
        </p>
        <button
          onClick={() => router.push('/chat-landing')}
          className="mt-4 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg font-semibold hover:shadow-lg transition-all"
        >
          Back to Chats
        </button>
        {showUpgradeModal && <UpgradeModal onClose={() => setShowUpgradeModal(false)} />}
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white max-w-md mx-auto relative">
      {/* Status Bar */}
      <div className="py-5 px-6 text-center">
        <p className={`text-sm font-semibold uppercase tracking-wider ${
          callStatus === 'connected' ? 'text-green-500' :
          callStatus === 'connecting' ? 'text-yellow-500' :
          'text-red-500'
        }`}>
          {callStatus === 'connecting' && 'Connecting...'}
          {callStatus === 'connected' && 'Connected'}
          {callStatus === 'ended' && 'Call Ended'}
        </p>
      </div>

      {/* Character Display */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10">
        {/* Character Image with Pulse Animation */}
        <div
          className={`w-[200px] h-[200px] rounded-full overflow-hidden mb-6 transition-all duration-300 ${
            isAISpeaking
              ? 'ring-4 ring-green-500 shadow-[0_0_30px_rgba(16,185,129,0.6)] animate-pulse'
              : 'ring-4 ring-white/20 shadow-[0_0_20px_rgba(0,0,0,0.5)]'
          }`}
        >
          <img
            src={character.avatar_url || '/icons/default-avatar.webp'}
            alt={character.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Character Name */}
        <h2 className="text-2xl font-semibold mb-2">
          {character.name}
        </h2>

        {/* Character Info */}
        <p className="text-sm text-white/60 mb-8">
          {character.age && character.occupation
            ? `${character.age} • ${character.occupation}`
            : character.tagline || 'AI Character'}
        </p>

        {/* Call Duration */}
        <div className={`text-5xl font-light font-mono mb-4 transition-colors ${
          isUserSpeaking ? 'text-green-500' : 'text-white'
        }`}>
          {formatDuration(duration)}
        </div>

        {/* Token Cost */}
        <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/10">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="#FFD700" strokeWidth="2"/>
            <text x="12" y="16" textAnchor="middle" fill="#FFD700" fontSize="12" fontWeight="bold">T</text>
          </svg>
          <span className="text-sm text-white/80">
            Cost: {tokensUsed} tokens (5 tokens/min)
          </span>
        </div>

        {/* Permission Status */}
        {!hasPermission && callStatus === 'connecting' && (
          <p className="mt-4 text-xs text-red-400">
            Waiting for microphone permission...
          </p>
        )}
      </div>

      {/* Controls */}
      <div className="px-6 pb-8 flex flex-col items-center gap-4">
        {/* Mute Button */}
        <button
          onClick={toggleMute}
          disabled={callStatus !== 'connected'}
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
            isMuted
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-white/10 hover:bg-white/20'
          } ${callStatus !== 'connected' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
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
          className={`w-[80%] py-4 bg-gradient-to-r from-red-500 to-red-600 rounded-xl font-semibold text-base transition-all shadow-lg shadow-red-500/30 ${
            callStatus !== 'ended'
              ? 'cursor-pointer hover:shadow-xl hover:shadow-red-500/40 hover:scale-105'
              : 'opacity-50 cursor-not-allowed'
          }`}
        >
          {callStatus === 'ended' ? 'Returning to Chat...' : 'End Call'}
        </button>
      </div>

      {showUpgradeModal && <UpgradeModal onClose={() => setShowUpgradeModal(false)} />}
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
