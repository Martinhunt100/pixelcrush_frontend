'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { chatAPI, characterAPI } from '@/lib/api';
import type { Message, Character } from '@/lib/types';
import ProtectedRoute from '@/components/ProtectedRoute';

function ChatPageContent() {
  const searchParams = useSearchParams();
  const conversationId = parseInt(searchParams.get('conversationId') || '0');
  const characterId = searchParams.get('characterId');

  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

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

      setMessages(messagesArray);
    } catch (error) {
      console.error('Failed to load messages:', error);
      setMessages([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      setTimeout(() => {
        if (messagesContainerRef.current) {
          messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
      }, 100);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

    try {
      console.log('Sending message:', { conversationId, content });

      const response = await chatAPI.sendMessage(conversationId, content);

      console.log('Message sent:', response);

      // Add both user message and AI response to the messages
      if (response.userMessage && response.aiMessage) {
        setMessages(prev => [...prev, response.userMessage, response.aiMessage]);
      } else {
        // Fallback: reload messages if response format is unexpected
        await loadMessages();
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      alert('Failed to send message. Please try again.');
      setMessageInput(content); // Restore message on error
    } finally {
      setSending(false);
    }
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
      margin: '0 auto'
    }}>
      {/* Header */}
      <div style={{
        background: '#131313',
        borderBottom: '0.593px solid #363636',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px 0 25px',
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
          padding: '20px 12px 90px'
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

        {/* Sending indicator */}
        {sending && (
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
              fontStyle: 'italic'
            }}>
              Typing...
            </div>
          </div>
        )}
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

      <style jsx>{`
        input::placeholder {
          color: white;
          opacity: 0.7;
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
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
