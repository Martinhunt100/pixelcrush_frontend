'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { chatAPI, characterAPI } from '@/lib/api';
import type { Message, Character } from '@/lib/types';
import ProtectedRoute from '@/components/ProtectedRoute';
import UpgradeModal from '@/components/UpgradeModal';

function ChatPageContent() {
  const searchParams = useSearchParams();
  const conversationId = parseInt(searchParams.get('conversationId') || '0');
  const characterId = searchParams.get('characterId');

  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [sendTimestamp, setSendTimestamp] = useState<number | null>(null);
  const [showTimeout, setShowTimeout] = useState(false);
  const [lastMessage, setLastMessage] = useState<string>('');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  // TODO: Set remainingMessages from backend response when available
  // Backend should return { remaining_messages: number } in chat API responses
  // Example: setRemainingMessages(response.remaining_messages)
  const [remainingMessages, setRemainingMessages] = useState<number | null>(null); // null = hidden, number = shows counter
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load character details
  useEffect(() => {
    const loadCharacter = async () => {
      if (!characterId) return;
      try {
        const characterData = await characterAPI.getById(characterId);
        setCharacter(characterData);
      } catch (error) {
        console.error('Failed to load character:', error);
      }
    };
    loadCharacter();
  }, [characterId]);

  // Load messages when conversation ID is available
  useEffect(() => {
    if (conversationId && conversationId > 0) {
      loadMessages();
    }
  }, [conversationId]);

  const loadMessages = async () => {
    if (!conversationId) return;

    try {
      setLoading(true);
      const response = await chatAPI.getMessages(conversationId);
      console.log('Messages response:', response);

      // Make sure we're setting an array
      const messagesArray = Array.isArray(response) ? response :
                           response.messages ? response.messages :
                           [];

      // DEBUG: Log message order before sorting
      console.log('📨 Messages from API (before sort):', messagesArray.map((m, i) => ({
        index: i,
        sender: m.sender_type,
        content: m.content.substring(0, 20),
        timestamp: m.created_at
      })));

      // Sort messages by timestamp to ensure correct order (oldest first)
      const sortedMessages = messagesArray.sort((a: Message, b: Message) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );

      // DEBUG: Log message order after sorting
      console.log('✅ Messages after sort:', sortedMessages.map((m, i) => ({
        index: i,
        sender: m.sender_type,
        content: m.content.substring(0, 20),
        timestamp: m.created_at
      })));

      setMessages(sortedMessages);

      // Scroll to bottom after loading messages (instant, no animation on first load)
      setTimeout(() => scrollToBottom('auto'), 100);
    } catch (error) {
      console.error('Failed to load messages:', error);
      setMessages([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    // Use scrollIntoView for more reliable scrolling
    messagesEndRef.current?.scrollIntoView({ behavior, block: 'end' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const getCurrentTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes.toString().padStart(2, '0')}${ampm}`;
  };

  const handleSendMessage = async () => {
    const content = messageInput.trim();
    if (!content || !conversationId || sending) return;

    setSending(true);
    setMessageInput('');
    setShowTimeout(false);
    setLastMessage(content);
    setSendTimestamp(Date.now());

    // Set up 30-second timeout
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (sending) {
        setShowTimeout(true);
        setSending(false);
      }
    }, 30000);

    try {
      console.log('Sending message:', { conversationId, content });

      const response = await chatAPI.sendMessage(conversationId, content);

      console.log('Message sent:', response);

      // Clear timeout on successful response
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setSendTimestamp(null);
      setShowTimeout(false);

      // Add both user message and AI response to the messages
      if (response.userMessage && response.aiMessage) {
        // FORCE correct order: user message first, then AI reply
        // This ensures proper order even if backend timestamps are wrong
        const userMsg = response.userMessage;
        const aiMsg = response.aiMessage;

        // DEBUG: Log received messages
        console.log('📨 Received from API:', {
          userMsg: { sender: userMsg.sender_type, content: userMsg.content.substring(0, 20), time: userMsg.created_at },
          aiMsg: { sender: aiMsg.sender_type, content: aiMsg.content.substring(0, 20), time: aiMsg.created_at }
        });

        // Ensure user message always has earlier timestamp than AI message
        const userTime = new Date(userMsg.created_at).getTime();
        const aiTime = new Date(aiMsg.created_at).getTime();

        if (aiTime <= userTime) {
          // Backend bug: AI timestamp is earlier/same - force correct order
          console.warn('⚠️ Backend timestamp issue detected - forcing correct order');
          console.warn(`   User time: ${userMsg.created_at}, AI time: ${aiMsg.created_at}`);
          aiMsg.created_at = new Date(userTime + 1000).toISOString(); // AI 1 second after user
          console.warn(`   Fixed AI time to: ${aiMsg.created_at}`);
        }

        setMessages(prev => {
          const combined = [...prev, userMsg, aiMsg];
          // Sort all messages by timestamp (now guaranteed correct)
          const sorted = combined.sort((a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );

          // DEBUG: Log final order
          console.log('✅ Final message order:', sorted.slice(-5).map((m, i) => ({
            index: sorted.length - 5 + i,
            sender: m.sender_type,
            content: m.content.substring(0, 20)
          })));

          return sorted;
        });

        // Scroll to bottom immediately after adding messages
        setTimeout(() => scrollToBottom('smooth'), 100);
      } else {
        // Fallback: reload messages if response format is unexpected
        await loadMessages();
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      // Clear timeout on error
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setSendTimestamp(null);

      // Check if this is a message limit error (403)
      const errorMessage = error instanceof Error ? error.message.toLowerCase() : '';
      if (errorMessage.includes('access denied') || errorMessage.includes('permission')) {
        // Show upgrade modal for message limit errors
        setShowUpgradeModal(true);
        setMessageInput(content); // Restore message so user can see what they tried to send
      } else {
        // Show timeout UI for other errors
        setShowTimeout(true);
      }
    } finally {
      setSending(false);
    }
  };

  const handleRetry = () => {
    setShowTimeout(false);
    setMessageInput(lastMessage);
    handleSendMessage();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderMessageText = (text: string) => {
    const parts = text.split(/(\*.*?\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('*') && part.endsWith('*')) {
        return (
          <span key={idx} style={{ color: '#988dfc', fontStyle: 'italic' }}>
            {part}
          </span>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  };

  if (!conversationId || conversationId === 0) {
    return (
      <div style={{
        fontFamily: 'Poppins, sans-serif',
        background: '#131313',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        fontSize: '16px'
      }}>
        No conversation selected
      </div>
    );
  }

  return (
    <div style={{
      fontFamily: 'Roboto, sans-serif',
      background: '#131313',
      color: '#D1D1D1',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      maxWidth: '393px',
      margin: '0 auto',
      width: '100%'
    }}>
      {/* Header */}
      <div style={{
        background: '#131313',
        borderBottom: '0.593px solid #363636',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0px 1px 0px 0px rgba(0,0,0,0.05)'
      }}>
        <a href="/" style={{ width: '87px', height: '37px', display: 'block' }}>
          <img
            src="/icons/logo.png"
            alt="PixelCrush.ai"
            style={{ width: '100%', height: '100%', objectFit: 'contain', cursor: 'pointer' }}
          />
        </a>
        <a
          href="/tokens"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6.593px 16.593px',
            border: '1px solid rgba(255,255,255,0.8)',
            borderRadius: '8px',
            cursor: 'pointer',
            textDecoration: 'none'
          }}
        >
          <div style={{ width: '30px', height: '30px' }}>
            <img
              src="/icons/token-icon.png"
              alt="Tokens"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
          <div style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '16px',
            lineHeight: '24px',
            color: 'rgba(255,255,255,0.8)'
          }}>0.8</div>
        </a>
      </div>

      {/* Character Info Bar */}
      {characterId && (
        character ? (
          <div style={{
            background: 'linear-gradient(135deg, rgba(255,59,154,0.1) 0%, rgba(164,69,237,0.1) 50%, rgba(74,144,226,0.1) 100%)',
            borderBottom: '1px solid rgba(255,59,154,0.2)',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            position: 'sticky',
            top: '64px',
            zIndex: 99,
            transition: 'all 0.3s ease'
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '2px solid #FF3B9A',
              flexShrink: 0
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
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '16px',
                fontWeight: 600,
                color: 'white',
                marginBottom: '2px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {character.name}
              </div>
              <div style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '12px',
                color: 'rgba(255,255,255,0.7)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {character.age && character.occupation ? `${character.age} • ${character.occupation}` : character.tagline || 'Online'}
              </div>
            </div>
            {/* Message Limit Counter */}
            {remainingMessages !== null && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                background: remainingMessages <= 3 ? 'rgba(255,59,154,0.2)' : 'rgba(0,0,0,0.3)',
                border: remainingMessages <= 3 ? '1px solid #FF3B9A' : 'none',
                borderRadius: '20px',
                flexShrink: 0,
                transition: 'all 0.3s ease'
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke={remainingMessages <= 3 ? "#FF3B9A" : "#4A90E2"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: remainingMessages <= 3 ? '#FF3B9A' : 'white'
                }}>
                  {remainingMessages} left
                </span>
              </div>
            )}
          </div>
        ) : (
          <div style={{
            background: 'rgba(255,255,255,0.02)',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            position: 'sticky',
            top: '64px',
            zIndex: 99
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 100%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.5s infinite',
              flexShrink: 0
            }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                width: '50%',
                height: '16px',
                background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 100%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s infinite',
                borderRadius: '4px',
                marginBottom: '8px'
              }} />
              <div style={{
                width: '35%',
                height: '12px',
                background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 100%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s infinite',
                borderRadius: '4px'
              }} />
            </div>
          </div>
        )
      )}

      {/* Messages Container */}
      <div
        ref={messagesContainerRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px 16px 140px' // Increased bottom padding to prevent last message being hidden
        }}
      >
        {/* Disclaimer */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '0 4px 4px',
          marginBottom: '16px'
        }}>
          <img
            src="/icons/info-icon.png"
            alt="Info"
            style={{ width: '20px', height: '20px' }}
          />
          <span style={{
            fontFamily: 'Roboto, sans-serif',
            fontSize: '12px',
            lineHeight: '15px',
            color: 'rgba(209, 209, 209, 0.79)'
          }}>Safe Chat Disclaimer</span>
        </div>

        {/* Loading State */}
        {loading && (
          <div style={{
            textAlign: 'center',
            padding: '20px',
            color: 'rgba(255,255,255,0.5)'
          }}>
            Loading messages...
          </div>
        )}

        {/* Messages */}
        {!loading && messages && messages.length > 0 ? (
          messages.map((msg, idx) => (
          <div
            key={msg.id || idx}
            style={{
              marginBottom: '16px',
              ...(msg.sender_type === 'ai' ? { maxWidth: '273px' } : {
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '24px'
              })
            }}
          >
            <div style={{ maxWidth: msg.sender_type === 'user' ? '273px' : '100%' }}>
              {/* Message Bubble */}
              <div style={{
                padding: '8px 16px',
                borderRadius: '24px',
                marginBottom: '8px',
                ...(msg.sender_type === 'ai' ? {
                  background: '#fe3895',
                  color: '#202124',
                  borderBottomLeftRadius: '4px'
                } : {
                  background: 'linear-gradient(90deg, #3d70fd 0%, #3d71ff 100%)',
                  color: 'white',
                  borderBottomRightRadius: '4px'
                }),
                fontFamily: 'Roboto, sans-serif',
                fontSize: '16px',
                lineHeight: '21px'
              }}>
                {renderMessageText(msg.content)}
              </div>

              {/* Message Footer */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '4px',
                ...(msg.sender_type === 'user' && { justifyContent: 'flex-end' })
              }}>
                {msg.sender_type === 'ai' && (
                  <div style={{ width: '34px', height: '29px' }}>
                    <img
                      src="/icons/voice-play.png"
                      alt="Voice"
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </div>
                )}
                <div style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '13px',
                  lineHeight: '20px',
                  color: '#616162'
                }}>
                  {new Date(msg.created_at).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                  })}
                </div>
              </div>
            </div>
          </div>
          ))
        ) : (
          !loading && (
            <div style={{
              textAlign: 'center',
              padding: '40px 20px',
              color: 'rgba(255,255,255,0.5)',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '14px'
            }}>
              No messages yet. Start the conversation!
            </div>
          )
        )}

        {/* Typing indicator */}
        {sending && !showTimeout && (
          <div style={{
            maxWidth: '273px',
            marginBottom: '16px'
          }}>
            <div style={{
              padding: '8px 16px',
              borderRadius: '24px',
              background: '#fe3895',
              color: '#202124',
              borderBottomLeftRadius: '4px',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '16px',
              lineHeight: '21px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span>{character?.name || 'AI'} is typing</span>
              <span style={{
                display: 'inline-flex',
                gap: '3px',
                alignItems: 'center'
              }}>
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#202124',
                  animation: 'typingDot 1.4s infinite',
                  animationDelay: '0s'
                }} />
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#202124',
                  animation: 'typingDot 1.4s infinite',
                  animationDelay: '0.2s'
                }} />
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#202124',
                  animation: 'typingDot 1.4s infinite',
                  animationDelay: '0.4s'
                }} />
              </span>
            </div>
          </div>
        )}

        {/* Timeout message with retry */}
        {showTimeout && (
          <div style={{
            maxWidth: '273px',
            marginBottom: '16px'
          }}>
            <div style={{
              padding: '12px 16px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, rgba(255,59,154,0.15) 0%, rgba(164,69,237,0.15) 100%)',
              border: '1px solid rgba(255,59,154,0.3)',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '14px',
              lineHeight: '20px',
              color: 'white',
              marginBottom: '12px'
            }}>
              <div style={{ marginBottom: '8px' }}>
                {character?.name || 'Your crush'} has stepped away for a moment. She'll be back shortly! 💕
              </div>
              <button
                onClick={handleRetry}
                style={{
                  width: '100%',
                  padding: '10px 16px',
                  background: 'linear-gradient(135deg, #FF3B9A 0%, #A445ED 100%)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'Poppins, sans-serif',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 59, 154, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {/* Scroll anchor - invisible div to scroll to bottom */}
        <div ref={messagesEndRef} style={{ height: '1px' }} />
      </div>

      {/* Input Area */}
      <div style={{
        position: 'fixed',
        bottom: '78px',
        left: '16px',
        right: '16px',
        maxWidth: 'calc(393px - 32px)',
        margin: '0 auto',
        background: 'black',
        border: '1px solid #737373',
        borderRadius: '8px',
        padding: '8px 16px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <button
            onClick={() => alert('📷 Image attachment - Coming soon!')}
            style={{
              width: '40px',
              height: '31px',
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer'
            }}
          >
            <img
              src="/icons/photo-attach.png"
              alt="Photo"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </button>
          <button
            onClick={() => alert('🎥 Video attachment - Coming soon!')}
            style={{
              width: '40px',
              height: '31px',
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              transform: 'scaleY(-1)'
            }}
          >
            <img
              src="/icons/video-attach.png"
              alt="Video"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </button>
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={sending}
            placeholder="Type message..."
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              color: 'white',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              outline: 'none'
            }}
          />
          <button
            onClick={handleSendMessage}
            disabled={sending || !messageInput.trim()}
            style={{
              width: '35px',
              height: '35px',
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: sending || !messageInput.trim() ? 'not-allowed' : 'pointer',
              opacity: sending || !messageInput.trim() ? 0.5 : 1
            }}
          >
            <img
              src="/icons/send-button.png"
              alt="Send"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                transform: 'rotate(180deg) scaleY(-1)'
              }}
            />
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#131313',
        borderTop: '0.593px solid rgba(255,255,255,0.2)',
        height: '70px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '8px 12px 8px',
        zIndex: 100
      }}>
        <a href="/" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textDecoration: 'none',
          color: 'white',
          gap: '4px',
          opacity: 0.6
        }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9.5L12 3L21 9.5V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 22V12H15V22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '10px',
            lineHeight: '15px'
          }}>Home</div>
        </a>

        <a href="/chat-landing" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textDecoration: 'none',
          color: 'white',
          gap: '4px'
        }}>
          <div style={{ height: '30px', width: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="/icons/nav-chat.png" alt="Chat" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <div style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '10px',
            lineHeight: '15px'
          }}>Chat</div>
        </a>

        <a href="/voice" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textDecoration: 'none',
          color: 'white',
          gap: '4px',
          opacity: 0.6
        }}>
          <div style={{ height: '30px', width: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="/icons/nav-voice.png" alt="Voice Call" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <div style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '10px',
            lineHeight: '15px'
          }}>Voice Call</div>
        </a>

        <a href="/gallery" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textDecoration: 'none',
          color: 'white',
          gap: '4px',
          opacity: 0.6
        }}>
          <div style={{ height: '30px', width: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="/icons/nav-gallery.png" alt="Gallery" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <div style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '10px',
            lineHeight: '15px'
          }}>Gallery</div>
        </a>

        <a href="/account" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textDecoration: 'none',
          color: 'white',
          gap: '4px',
          opacity: 0.6
        }}>
          <div style={{ height: '30px', width: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="/icons/nav-account.png" alt="Account" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <div style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '10px',
            lineHeight: '15px'
          }}>Account</div>
        </a>
      </div>

      {/* Upgrade Modal */}
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        characterName={character?.name}
      />

      <style jsx>{`
        input::placeholder {
          color: white;
          opacity: 0.7;
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes typingDot {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.7;
          }
          30% {
            transform: translateY(-8px);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default function ChatPage() {
  return (
    <ProtectedRoute>
      <ChatPageContent />
    </ProtectedRoute>
  );
}
