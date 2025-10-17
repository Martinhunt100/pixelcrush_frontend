'use client';

import { useState, useEffect, useRef } from 'react';

export default function ChatPage() {
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      hasVideo: true,
      videoSrc: 'https://www.figma.com/api/mcp/asset/d2cdcb1a-9dea-44b7-9017-501904baf38d',
      text: "Oi! Found yourself at the edge of polite society, have you? The bench is free, but fair warning - I'm studying psychology, so I'll be analyzing everything you say.",
      time: '9:48AM',
      hasVoice: true
    },
    {
      type: 'user',
      text: 'Send me a video of you',
      time: '9:48AM'
    },
    {
      type: 'ai',
      hasImage: true,
      imageSrc: 'https://www.figma.com/api/mcp/asset/f63c4a58-dc4a-49bf-a368-cfaf0d68f7bc',
      text: 'Dare to explore my dark side? I promise it\'s worth the risk 🖤',
      time: '9:49AM',
      hasVoice: true
    },
    {
      type: 'user',
      text: 'How are you today lila',
      time: '1:44PM'
    },
    {
      type: 'ai',
      text: 'Oh, you know... same old chaos. *winks* But now that you\'re here, things might get interesting. What brings you to this corner of madness?',
      time: '1:44PM',
      hasVoice: true,
      hasTyping: true
    }
  ]);

  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      setTimeout(() => {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
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

  const handleSendMessage = () => {
    const message = messageInput.trim();
    if (!message) return;

    const newMessage = {
      type: 'user',
      text: message,
      time: getCurrentTime()
    };

    setMessages([...messages, newMessage]);
    setMessageInput('');

    setTimeout(() => {
      addAIResponse();
    }, 1500);
  };

  const addAIResponse = () => {
    const responses = [
      "*smirks* That's an interesting thought. Tell me more...",
      "*leans in curiously* I like where this is going.",
      "Fascinating... *studies you intently*",
      "*grins mischievously* You're full of surprises.",
      "Oh really? *raises an eyebrow* Go on..."
    ];

    const response = responses[Math.floor(Math.random() * responses.length)];

    const newMessage = {
      type: 'ai',
      text: response,
      time: getCurrentTime(),
      hasVoice: true
    };

    setMessages(prev => [...prev, newMessage]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const renderMessageText = (text) => {
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
        height: '68px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        gap: '16px',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ width: '120px', height: 'auto' }}>
          <img 
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 40'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='0%25'%3E%3Cstop offset='0%25' style='stop-color:%23FF3B9A;stop-opacity:1' /%3E%3Cstop offset='50%25' style='stop-color:%239B59F5;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%234A90E2;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Ctext x='10' y='28' font-family='Arial, sans-serif' font-weight='bold' font-size='24' fill='url(%23grad)'%3EPixelCrush.ai%3C/text%3E%3C/svg%3E"
            alt="PixelCrush.ai"
            style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
          />
        </div>

        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          position: 'relative',
          justifyContent: 'center'
        }}>
          <img 
            src="https://www.figma.com/api/mcp/asset/b3ddd635-a624-4f6b-a223-7ba67b7a54f0"
            alt="Madison"
            style={{
              width: '50.96px',
              height: '53px',
              borderRadius: '50%',
              objectFit: 'cover',
              transform: 'rotate(180deg) scaleY(-1)'
            }}
          />
          <div style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 600,
            fontSize: '20px',
            lineHeight: '30px',
            color: 'white'
          }}>Madison</div>
        </div>

        <div style={{ display: 'flex', gap: '13px', alignItems: 'center' }}>
          <button 
            onClick={() => alert('📞 Voice call feature - will integrate with your WebRTC/voice API')}
            style={{
              width: '30px',
              height: '30px',
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              padding: 0
            }}
          >
            <img 
              src="https://www.figma.com/api/mcp/asset/e4e5a173-8ecb-4637-acad-21f3805b5020"
              alt="Call"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </button>
          <button 
            onClick={() => alert('⋮ Menu: Report, Block, Settings')}
            style={{
              width: '30px',
              height: '30px',
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              padding: 0
            }}
          >
            <img 
              src="https://www.figma.com/api/mcp/asset/0c4b10d5-b74e-4d6b-b444-fd864bb52a7e"
              alt="Menu"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </button>
        </div>
      </div>

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
            src="https://www.figma.com/api/mcp/asset/e9f63fa3-fab6-44c9-8df9-ac849b8f063f"
            alt="Info"
            style={{ width: '20px', height: '20px' }}
          />
          <span style={{
            fontFamily: 'Roboto, sans-serif',
            fontSize: '12px',
            lineHeight: '15px',
            color: 'rgba(209, 209, 209, 0.79)'
          }}>Safe Chat Disclaimer</span>
          <img 
            src="https://www.figma.com/api/mcp/asset/2efe3242-335d-47e1-9fda-379b6af1d41d"
            alt="Arrow"
            style={{ width: '20px', height: '20px', opacity: 0.6 }}
          />
        </div>

        {/* Messages */}
        {messages.map((msg, idx) => (
          <div 
            key={idx}
            style={{
              marginBottom: '16px',
              ...(msg.type === 'ai' ? { maxWidth: '273px' } : {
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '24px'
              })
            }}
          >
            <div style={{ maxWidth: msg.type === 'user' ? '273px' : '100%' }}>
              {/* Video */}
              {msg.hasVideo && (
                <div style={{
                  maxWidth: '166.67px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  marginBottom: '6px'
                }}>
                  <img 
                    src={msg.videoSrc}
                    alt="Video"
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </div>
              )}

              {/* Image */}
              {msg.hasImage && (
                <div style={{
                  maxWidth: '272.67px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  marginBottom: '8px'
                }}>
                  <img 
                    src={msg.imageSrc}
                    alt="Image"
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </div>
              )}

              {/* Message Bubble */}
              <div style={{
                padding: '8px 16px',
                borderRadius: '24px',
                marginBottom: '8px',
                ...(msg.type === 'ai' ? {
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
                {renderMessageText(msg.text)}
              </div>

              {/* Message Footer */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '4px',
                ...(msg.type === 'user' && { justifyContent: 'flex-end' })
              }}>
                {msg.hasVoice && msg.type === 'ai' && (
                  <div style={{ width: '34px', height: '29px' }}>
                    <img 
                      src="https://www.figma.com/api/mcp/asset/d608142a-551b-4a8e-98e3-d7edbc2a1824"
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
                }}>{msg.time}</div>
                {msg.hasTyping && (
                  <div style={{ width: '14px', height: '4px' }}>
                    <img 
                      src="https://www.figma.com/api/mcp/asset/ac1dc25e-1c77-4c05-82f1-097fa1de51ba"
                      alt="Typing"
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
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
            onClick={() => alert('📷 Image attachment - will integrate with your backend API')}
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
              src="https://www.figma.com/api/mcp/asset/33ec03e9-8303-4456-8bb0-86f569ffb3bf"
              alt="Photo"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </button>
          <button 
            onClick={() => alert('🎥 Video attachment - will integrate with your backend API')}
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
              src="https://www.figma.com/api/mcp/asset/92dffbc0-9df1-4951-9aac-7a6c6ee729a9"
              alt="Video"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </button>
          <input 
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={handleKeyPress}
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
            style={{
              width: '35px',
              height: '35px',
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer'
            }}
          >
            <img 
              src="https://www.figma.com/api/mcp/asset/2b210d9a-a42a-4fb8-8e5f-08a96f281070"
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
        maxWidth: '393px',
        margin: '0 auto',
        background: '#131313',
        borderTop: '0.593px solid rgba(255,255,255,0.2)',
        height: '78px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        padding: '8px 12px',
        zIndex: 100
      }}>
        <a href="/" style={{
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
            fontFamily: 'Poppins, sans-serif',
            fontSize: '10px',
            lineHeight: '15px',
            marginTop: '-1px'
          }}>Characters</div>
        </a>

        <a href="/chat" style={{
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
            fontFamily: 'Poppins, sans-serif',
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
            fontFamily: 'Poppins, sans-serif',
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
            fontFamily: 'Poppins, sans-serif',
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
            fontFamily: 'Poppins, sans-serif',
            fontSize: '10px',
            lineHeight: '15px',
            marginTop: '-1px'
          }}>Account</div>
        </a>
      </div>

      <style jsx>{`
        input::placeholder {
          color: white;
          opacity: 0.7;
        }
      `}</style>
    </div>
  );
}