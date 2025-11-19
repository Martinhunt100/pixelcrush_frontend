'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { chatAPI } from '@/lib/api';
import type { Conversation } from '@/lib/types';
import ProtectedRoute from '@/components/ProtectedRoute';

function ChatLandingContent() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tokens, setTokens] = useState<number>(0);

  useEffect(() => {
    loadConversations();
    loadUserTokens();
  }, []);

  const loadUserTokens = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://pixelcrushbackend-production.up.railway.app';
      const token = localStorage.getItem('token');

      const response = await fetch(`${API_URL}/api/users/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setTokens(data.user?.tokens_remaining || 0);
      }
    } catch (error) {
      console.error('Failed to fetch tokens:', error);
      // Don't show error to user - tokens are optional
    }
  };

  const loadConversations = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('=== LOADING CONVERSATIONS ===');
      console.log('Token exists:', !!localStorage.getItem('token'));

      const data = await chatAPI.getConversations();

      console.log('📨 API Response:', data);
      console.log('📊 Conversation count:', Array.isArray(data) ? data.length : 0);

      // Sort by most recent first (updated_at)
      const sorted = (Array.isArray(data) ? data : []).sort((a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );

      setConversations(sorted);
      console.log('✅ Conversations loaded successfully');
    } catch (err) {
      console.error('❌ Failed to load conversations:', err);

      // Provide helpful error messaging
      let errorMsg = err instanceof Error ? err.message : 'Failed to load conversations';

      // If it's a 404, the backend endpoint likely doesn't exist
      if (errorMsg.includes('not found') || errorMsg.includes('404')) {
        errorMsg = 'Conversation history unavailable. The backend endpoint may need to be created. Check browser console for details.';
      }

      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const openConversation = (conversation: Conversation) => {
    // Navigate to chat page with both conversationId and characterId
    router.push(`/chat?conversationId=${conversation.id}&characterId=${conversation.character_id}`);
  };

  const startNewChat = () => {
    router.push('/'); // Homepage with character selection
  };

  const filteredConversations = conversations.filter(conv =>
    conv.character?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.last_message?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper function for timestamps
  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (loading) {
    return (
      <div style={{
        fontFamily: "'Poppins', sans-serif",
        background: '#131313',
        color: 'white',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>💬</div>
          <div style={{ color: 'rgba(255,255,255,0.6)' }}>Loading your chats...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        fontFamily: "'Poppins', sans-serif",
        background: '#131313',
        color: 'white',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center', padding: '24px', maxWidth: '400px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
          <div style={{
            color: 'rgba(255,255,255,0.9)',
            marginBottom: '8px',
            fontSize: '16px',
            lineHeight: '24px'
          }}>
            {error}
          </div>

          {/* Show additional help if it's a 404 error */}
          {error.includes('unavailable') && (
            <div style={{
              marginTop: '16px',
              padding: '12px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '8px',
              fontSize: '13px',
              color: 'rgba(255,255,255,0.6)',
              lineHeight: '20px',
              textAlign: 'left'
            }}>
              <strong style={{ color: 'rgba(255,255,255,0.8)' }}>Debug Info:</strong>
              <br />
              • Open browser DevTools (F12)
              <br />
              • Check Network tab for the request
              <br />
              • Look for GET /api/conversations
              <br />
              • If it returns 404, backend needs the endpoint
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '20px' }}>
            <button
              onClick={loadConversations}
              style={{
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #FF3B9A 0%, #A445ED 100%)',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit'
              }}
            >
              Try Again
            </button>
            <button
              onClick={startNewChat}
              style={{
                padding: '12px 24px',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '8px',
                color: 'white',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit'
              }}
            >
              Start New Chat
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      background: '#131313',
      color: 'white',
      minHeight: '100vh',
      maxWidth: '393px',
      width: '100%',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }}>
      {/* Header - FIXED: Now shows token count + cog */}
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

        {/* Right side: Token count + Settings cog */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          {/* Token count box */}
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
            }}>{tokens.toFixed(1)}</div>
          </a>

          {/* Settings cog */}
          <a
            href="/account"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              cursor: 'pointer',
              textDecoration: 'none',
              color: 'rgba(255,255,255,0.7)',
              fontSize: '20px',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
            }}
          >
            ⚙️
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        marginTop: '64px',
        marginBottom: '78px',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch'
      }}>
        <div style={{ padding: '24px 12px' }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px'
          }}>
            <h1 style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: '24px',
              lineHeight: '34px',
              color: 'white',
              margin: 0
            }}>Your Conversations</h1>
          </div>

          {/* Search */}
          <div style={{ marginBottom: '16px', position: 'relative' }}>
            <svg
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '20px',
                height: '20px',
                opacity: 0.5
              }}
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 19L14.65 14.65" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                height: '48px',
                background: '#1a1a1a',
                border: 'none',
                borderRadius: '6px',
                padding: '12px 12px 12px 40px',
                fontFamily: "'Poppins', sans-serif",
                fontSize: '16px',
                color: 'white',
                outline: 'none'
              }}
            />
          </div>

          {/* Conversation List */}
          {filteredConversations.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {filteredConversations.map((conv) => {
                // Get character image - try multiple field names for compatibility
                const characterImage = conv.character?.image ||
                                     conv.character?.avatar_url ||
                                     '/icons/default-avatar.png';
                const characterName = conv.character?.name || 'Unknown Character';
                const lastMessagePreview = conv.last_message
                  ? (conv.last_message.length > 60
                      ? conv.last_message.substring(0, 60) + '...'
                      : conv.last_message)
                  : 'Start chatting...';

                return (
                  <button
                    key={conv.id}
                    onClick={() => openConversation(conv)}
                    style={{
                      background: '#303030',
                      borderRadius: '10px',
                      padding: '12px',
                      marginBottom: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease, background 0.2s ease',
                      minHeight: '80px',
                      border: 'none',
                      width: '100%',
                      textAlign: 'left'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#3a3a3a';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#303030';
                    }}
                  >
                    {/* Character Avatar */}
                    <img
                      src={characterImage}
                      alt={characterName}
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        flexShrink: 0
                      }}
                      onError={(e) => {
                        // Fallback to default avatar if image fails to load
                        e.currentTarget.src = '/icons/default-avatar.png';
                      }}
                    />

                    {/* Conversation Info */}
                    <div style={{
                      flex: 1,
                      minWidth: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '2px'
                      }}>
                        <h3 style={{
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: 500,
                          fontSize: '15px',
                          lineHeight: '22px',
                          color: 'white',
                          margin: 0,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}>
                          {characterName}
                        </h3>
                        <span style={{
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: 300,
                          fontSize: '13px',
                          lineHeight: '20px',
                          color: 'rgba(255,255,255,0.5)',
                          flexShrink: 0,
                          marginLeft: '8px'
                        }}>
                          {formatTimestamp(conv.updated_at)}
                        </span>
                      </div>

                      <p style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 400,
                        fontSize: '14px',
                        lineHeight: '20px',
                        color: 'rgba(255,255,255,0.65)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        margin: 0
                      }}>
                        {lastMessagePreview}
                      </p>

                      {/* Message Count */}
                      {conv.message_count !== undefined && (
                        <div style={{
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '12px',
                          color: 'rgba(255,255,255,0.4)',
                          marginTop: '2px'
                        }}>
                          {conv.message_count} {conv.message_count === 1 ? 'message' : 'messages'}
                        </div>
                      )}
                    </div>

                    {/* Arrow */}
                    <div style={{
                      flexShrink: 0,
                      fontSize: '18px',
                      color: 'rgba(255,255,255,0.4)'
                    }}>
                      →
                    </div>
                  </button>
                );
              })}

              {/* New Chat Button */}
              <button
                onClick={startNewChat}
                style={{
                  background: '#303030',
                  borderRadius: '10px',
                  padding: '12px',
                  marginTop: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  border: '2px dashed rgba(255,255,255,0.3)',
                  minHeight: '80px',
                  width: '100%',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#3a3a3a';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#303030';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                }}
              >
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #FF3B9A 0%, #A445ED 50%, #4A90E2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  flexShrink: 0
                }}>
                  ➕
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 500,
                    fontSize: '15px',
                    lineHeight: '22px',
                    color: 'white'
                  }}>
                    Start New Chat
                  </div>
                  <div style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.6)',
                    marginTop: '2px'
                  }}>
                    Browse characters and begin a conversation
                  </div>
                </div>
              </button>
            </div>
          ) : (
            /* Empty State */
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <div style={{ fontSize: '64px', marginBottom: '16px', opacity: 0.3 }}>💬</div>
              <h2 style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '20px',
                fontWeight: 600,
                lineHeight: '28px',
                color: 'white',
                marginBottom: '8px'
              }}>
                {searchTerm ? 'No conversations found' : 'No conversations yet'}
              </h2>
              <p style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '16px',
                lineHeight: '24px',
                color: 'rgba(255,255,255,0.5)',
                margin: '0 0 24px 0'
              }}>
                {searchTerm
                  ? 'Try a different search term'
                  : 'Start chatting with your favorite characters'}
              </p>
              {!searchTerm && (
                <button
                  onClick={startNewChat}
                  style={{
                    padding: '14px 32px',
                    background: 'linear-gradient(135deg, #FF3B9A 0%, #A445ED 100%)',
                    border: 'none',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    boxShadow: '0 4px 12px rgba(255, 59, 154, 0.3)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(255, 59, 154, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 59, 154, 0.3)';
                  }}
                >
                  Browse Characters
                </button>
              )}
            </div>
          )}
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
        zIndex: 100,
        maxWidth: '393px',
        margin: '0 auto'
      }}>
        <a href="/" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textDecoration: 'none',
          color: 'rgba(255,255,255,0.7)',
          gap: '4px',
          opacity: 0.6
        }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9.5L12 3L21 9.5V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
          color: 'rgba(255,255,255,0.7)',
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
          color: 'rgba(255,255,255,0.7)',
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
          color: 'rgba(255,255,255,0.7)',
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
    </div>
  );
}

export default function ChatLandingPage() {
  return (
    <ProtectedRoute>
      <ChatLandingContent />
    </ProtectedRoute>
  );
}
