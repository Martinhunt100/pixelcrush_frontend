'use client';

import { useState } from 'react';

export default function ChatLandingPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const chats = [
    {
      id: 'paige-grey',
      name: 'Paige Grey',
      preview: "I usually don't go out or talk to...",
      time: '4:47PM',
      avatar: 'https://www.figma.com/api/mcp/asset/fe87f0c9-07a7-43e8-af45-605840735bd3'
    },
    {
      id: 'katarina-sommerfeld',
      name: 'Katarina Sommerfeld',
      preview: "Hallo! You're not from around...",
      time: '5:24PM',
      avatar: 'https://www.figma.com/api/mcp/asset/728fc790-a90a-4acf-a017-be330f3156f7'
    },
    {
      id: 'lila-crazy',
      name: 'Lila Crazy',
      preview: "Well, if you're looking for somet...",
      time: '2:32PM',
      avatar: 'https://www.figma.com/api/mcp/asset/2c7a16b9-ce7c-4520-820f-3970137843bd'
    },
    {
      id: 'luna-moreno',
      name: 'Luna Moreno',
      preview: 'Oh! Sorry, I was lost in this pas...',
      time: '7:18PM',
      avatar: 'https://www.figma.com/api/mcp/asset/29cf0eca-6774-40cc-a75c-4c1f82086447'
    },
    {
      id: 'lyra-fallon',
      name: 'Lyra Fallon',
      preview: "You don't look like someone w...",
      time: '1:28PM',
      avatar: 'https://www.figma.com/api/mcp/asset/c89e37df-de01-43f4-a88e-4cec04df0e86'
    }
  ];

  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.preview.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenChat = (characterSlug) => {
    window.location.href = `/chat?character=${characterSlug}`;
  };

  const handleMarkAsRead = (e, characterSlug) => {
    e.stopPropagation();
    console.log('Marking as read:', characterSlug);
  };

  const handleDeleteChat = (e, characterSlug) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this chat?')) {
      console.log('Deleting chat:', characterSlug);
    }
  };

  const handleStartNewChat = () => {
    window.location.href = '/';
  };

  const handleOpenTokens = () => {
    window.location.href = '/tokens';
  };

  return (
    <div style={{
      fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      background: '#131313',
      color: 'white',
      minHeight: '100vh',
      maxWidth: '393px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }}>
      {/* Header */}
      <div style={{
        background: '#131313',
        borderBottom: '0.593px solid #363636',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        position: 'fixed',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '393px',
        zIndex: 1000,
        boxShadow: '0px 1px 0px 0px rgba(0,0,0,0.05)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          paddingLeft: '20px'
        }}>
          <div style={{ width: '87px', height: '37px' }}>
            <img 
              src="https://www.figma.com/api/mcp/asset/75bd6a91-1161-4217-a70b-3569d51184c9" 
              alt="PixelCrush.ai"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
          <div 
            onClick={handleOpenTokens}
            style={{
              marginLeft: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6.593px 16.593px',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '8px',
              cursor: 'pointer',
              opacity: 0.6,
              transition: 'opacity 0.2s'
            }}
          >
            <div style={{ width: '30px', height: '30px' }}>
              <img 
                src="https://www.figma.com/api/mcp/asset/896841e1-bd7c-4c52-bf10-68513b3a60fe" 
                alt="Tokens"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
            <div style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '16px',
              lineHeight: '24px',
              color: 'white'
            }}>0.8</div>
          </div>
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
            }}>Chat</h1>
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
              placeholder="Search for a profile..."
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

          {/* Chat List */}
          {filteredChats.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {filteredChats.map((chat) => (
                <div 
                  key={chat.id}
                  onClick={() => handleOpenChat(chat.id)}
                  style={{
                    background: '#303030',
                    borderRadius: '10px',
                    padding: '12px',
                    marginBottom: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease',
                    minHeight: '80px'
                  }}
                >
                  <img 
                    src={chat.avatar} 
                    alt={chat.name}
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      flexShrink: 0
                    }}
                  />
                  <div style={{
                    flex: 1,
                    minWidth: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}>
                    <div style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 500,
                      fontSize: '15px',
                      lineHeight: '22px',
                      color: 'white',
                      margin: 0
                    }}>{chat.name}</div>
                    <div style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '20px',
                      color: 'rgba(255,255,255,0.75)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      margin: 0
                    }}>{chat.preview}</div>
                  </div>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '8px',
                    flexShrink: 0
                  }}>
                    <div style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 300,
                      fontSize: '13px',
                      lineHeight: '20px',
                      color: 'rgba(255,255,255,0.75)'
                    }}>{chat.time}</div>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button 
                        onClick={(e) => handleMarkAsRead(e, chat.id)}
                        aria-label="Mark as read"
                        style={{
                          width: '20px',
                          height: '20px',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '2px',
                          opacity: 0.7,
                          transition: 'opacity 0.2s',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13 3L6 10L3 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <button 
                        onClick={(e) => handleDeleteChat(e, chat.id)}
                        aria-label="Delete chat"
                        style={{
                          width: '20px',
                          height: '20px',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '2px',
                          opacity: 0.7,
                          transition: 'opacity 0.2s',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 4H14M12.6667 4V13.3333C12.6667 14 12 14.6667 11.3333 14.6667H4.66667C4 14.6667 3.33333 14 3.33333 13.3333V4M5.33333 4V2.66667C5.33333 2 6 1.33333 6.66667 1.33333H9.33333C10 1.33333 10.6667 2 10.6667 2.66667V4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* New Chat Item */}
              <div 
                onClick={handleStartNewChat}
                style={{
                  background: '#303030',
                  borderRadius: '10px',
                  padding: '12px',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                  border: '2px dashed rgba(255,255,255,0.3)',
                  minHeight: '80px'
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
                }}>➕</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 500,
                    fontSize: '15px',
                    lineHeight: '22px',
                    color: 'white'
                  }}>Start a new chat by clicking here and selecting a new character</div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <div style={{ fontSize: '64px', marginBottom: '16px', opacity: 0.3 }}>💬</div>
              <div style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '16px',
                lineHeight: '24px',
                color: 'rgba(255,255,255,0.5)',
                margin: 0
              }}>No chats found. Try a different search!</div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '393px',
        background: '#131313',
        borderTop: '0.593px solid rgba(255,255,255,0.2)',
        height: '78px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        padding: '8px 12px',
        zIndex: 1000
      }}>
        <a href="/characters" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textDecoration: 'none',
          color: 'rgba(255,255,255,0.7)'
        }}>
          <div style={{ height: '44px', width: '30px', marginBottom: 0 }}>
            <img 
              src="https://www.figma.com/api/mcp/asset/6e8a5d93-897f-4d7e-98c9-9a28d2cab5d0" 
              alt="Characters"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
          <div style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '10px',
            lineHeight: '15px',
            marginTop: '-1px'
          }}>Characters</div>
        </a>

        <a href="/chat-landing" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textDecoration: 'none',
          color: 'white'
        }}>
          <div style={{ height: '44px', width: '30px', marginBottom: 0 }}>
            <img 
              src="https://www.figma.com/api/mcp/asset/6c92bf79-791c-4aa0-86ea-92a4bd2963d9" 
              alt="Chat"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
          <div style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '10px',
            lineHeight: '15px',
            marginTop: '-1px'
          }}>Chat</div>
        </a>

        <a href="/voice" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textDecoration: 'none',
          color: 'rgba(255,255,255,0.7)'
        }}>
          <div style={{ height: '44px', width: '30px', marginBottom: 0 }}>
            <img 
              src="https://www.figma.com/api/mcp/asset/b84a345c-6523-432d-beb0-df74be777edc" 
              alt="Voice Call"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
          <div style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '10px',
            lineHeight: '15px',
            marginTop: '-1px'
          }}>Voice Call</div>
        </a>

        <a href="/collection" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textDecoration: 'none',
          color: 'rgba(255,255,255,0.7)'
        }}>
          <div style={{ height: '44px', width: '30px', marginBottom: 0 }}>
            <img 
              src="https://www.figma.com/api/mcp/asset/789f6323-9b48-419c-a0b1-26f69bb5b3d0" 
              alt="Collection"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
          <div style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '10px',
            lineHeight: '15px',
            marginTop: '-1px'
          }}>Collection</div>
        </a>

        <a href="/account" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textDecoration: 'none',
          color: 'rgba(255,255,255,0.7)'
        }}>
          <div style={{ height: '44px', width: '30px', marginBottom: 0 }}>
            <img 
              src="https://www.figma.com/api/mcp/asset/c9bfdd57-ef2c-41ab-8bc7-060adde3d152" 
              alt="Account"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
          <div style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '10px',
            lineHeight: '15px',
            marginTop: '-1px'
          }}>Account</div>
        </a>
      </div>
    </div>
  );
}