'use client';

import { useState, useEffect, useRef } from 'react';

export default function VoiceCallPage() {
  const [callActive, setCallActive] = useState(false);
  const [callerName, setCallerName] = useState('');
  const [callerAvatar, setCallerAvatar] = useState('');
  const [callStatus, setCallStatus] = useState('Calling...');
  const [callDuration, setCallDuration] = useState('00:00');
  const callTimerRef = useRef(null);
  const callSecondsRef = useRef(0);

  const characters = [
    { name: 'Paige Grey', image: 'https://www.figma.com/api/mcp/asset/fe87f0c9-07a7-43e8-af45-605840735bd3', available: true },
    { name: 'Katarina', image: 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62', available: true },
    { name: 'Lila Crazy', image: 'https://www.figma.com/api/mcp/asset/2c7a16b9-ce7c-4520-820f-3970137843bd', available: false },
    { name: 'Luna', image: 'https://www.figma.com/api/mcp/asset/ffd774a4-1d92-4f29-a763-f8c92c7c4e36', available: true }
  ];

  const callHistory = [
    { name: 'Paige Grey', avatar: 'https://www.figma.com/api/mcp/asset/fe87f0c9-07a7-43e8-af45-605840735bd3', type: 'incoming', time: '2 hours ago', duration: '12:34' },
    { name: 'Luna', avatar: 'https://www.figma.com/api/mcp/asset/ffd774a4-1d92-4f29-a763-f8c92c7c4e36', type: 'outgoing', time: 'Yesterday', duration: '8:12' },
    { name: 'Katarina', avatar: 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62', type: 'missed', time: '2 days ago', duration: '--:--' }
  ];

  const initiateCall = (name, image) => {
    setCallerName(name);
    setCallerAvatar(image);
    setCallStatus('Calling...');
    setCallActive(true);
    callSecondsRef.current = 0;
    setCallDuration('00:00');

    setTimeout(() => {
      setCallStatus('Connected');
      startCallTimer();
    }, 2000);
  };

  const startCallTimer = () => {
    callTimerRef.current = setInterval(() => {
      callSecondsRef.current += 1;
      const minutes = Math.floor(callSecondsRef.current / 60);
      const seconds = callSecondsRef.current % 60;
      setCallDuration(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);
  };

  const endCall = () => {
    if (callTimerRef.current) {
      clearInterval(callTimerRef.current);
      callTimerRef.current = null;
    }
    setCallActive(false);
    callSecondsRef.current = 0;
  };

  useEffect(() => {
    return () => {
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current);
      }
    };
  }, []);

  return (
    <div style={{
      fontFamily: 'TikTok Sans, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
      background: '#131313',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      maxWidth: '393px',
      margin: '0 auto',
      position: 'relative'
    }}>
      {/* Header */}
      <div style={{
        background: '#131313',
        borderBottom: '0.593px solid #363636',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px 0 25px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0px 1px 0px 0px rgba(0,0,0,0.05)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%'
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
              marginLeft: 'auto',
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
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        marginTop: '64px',
        marginBottom: '78px',
        overflowY: 'auto',
        padding: '24px 0'
      }}>
        <h1 style={{
          fontWeight: 700,
          fontSize: '24px',
          lineHeight: '34px',
          color: 'white',
          marginBottom: '20px',
          padding: '0 12px'
        }}>Voice Call</h1>

        {/* Available Characters Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '3.335px',
          padding: '0 3.335px',
          marginBottom: '32px'
        }}>
          {characters.map((character, idx) => (
            <div 
              key={idx}
              onClick={() => character.available && initiateCall(character.name, character.image)}
              style={{
                width: '100%',
                height: '257px',
                position: 'relative',
                overflow: 'hidden',
                cursor: character.available ? 'pointer' : 'default',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => character.available && (e.currentTarget.style.transform = 'scale(1.02)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <img 
                src={character.image}
                alt={character.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: '16px',
                left: '20px',
                right: '20px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontWeight: 500,
                  fontSize: '16px',
                  lineHeight: '21px',
                  color: 'white',
                  textShadow: '0px 2px 8px rgba(0,0,0,0.5)',
                  marginBottom: '4px'
                }}>{character.name}</div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  fontSize: '13px',
                  lineHeight: '18px',
                  color: 'white',
                  textShadow: '0px 2px 8px rgba(0,0,0,0.5)'
                }}>
                  <span style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: character.available ? '#4FAB52' : '#616162',
                    boxShadow: character.available ? '0px 0px 8px rgba(79, 171, 82, 0.6)' : 'none'
                  }}></span>
                  {character.available ? 'Available' : 'Busy'}
                </div>
              </div>
              {character.available && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    initiateCall(character.name, character.image);
                  }}
                  style={{
                    position: 'absolute',
                    bottom: '68px',
                    right: '12px',
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: '#4FAB52',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0px 4px 12px rgba(0,0,0,0.4)',
                    transition: 'transform 0.2s ease',
                    zIndex: 10
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '24px', height: '24px', fill: 'white' }}>
                    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Call History */}
        <div style={{ padding: '0 12px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px'
          }}>
            <h2 style={{
              fontWeight: 600,
              fontSize: '18px',
              lineHeight: '24px',
              color: 'white'
            }}>Recent Calls</h2>
            <a href="#" style={{
              fontSize: '14px',
              lineHeight: '20px',
              color: '#A445ED',
              textDecoration: 'none',
              cursor: 'pointer'
            }}>See All</a>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {callHistory.map((call, idx) => (
              <div key={idx} style={{
                background: '#1a1a1a',
                borderRadius: '12px',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <img 
                  src={call.avatar}
                  alt={call.name}
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    flexShrink: 0
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontWeight: 500,
                    fontSize: '15px',
                    lineHeight: '20px',
                    color: 'white',
                    marginBottom: '2px'
                  }}>{call.name}</div>
                  <div style={{
                    fontSize: '13px',
                    lineHeight: '18px',
                    color: 'rgba(255,255,255,0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <svg 
                      viewBox="0 0 14 14" 
                      fill="currentColor" 
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        width: '14px',
                        height: '14px',
                        color: call.type === 'incoming' ? '#4FAB52' : call.type === 'outgoing' ? '#A445ED' : '#FF3B9A'
                      }}
                    >
                      {call.type === 'incoming' ? (
                        <path d="M10.5 3.5L7 7l-3.5-3.5M7 3v7"/>
                      ) : call.type === 'outgoing' ? (
                        <path d="M3.5 10.5L7 7l3.5 3.5M7 11V4"/>
                      ) : (
                        <path d="M3 3l8 8M11 3l-8 8"/>
                      )}
                    </svg>
                    <span>{call.type === 'incoming' ? 'Incoming' : call.type === 'outgoing' ? 'Outgoing' : 'Missed'} • {call.time}</span>
                  </div>
                </div>
                <div style={{
                  fontSize: '13px',
                  lineHeight: '18px',
                  color: 'rgba(255,255,255,0.5)'
                }}>{call.duration}</div>
                <button 
                  onClick={() => initiateCall(call.name, call.avatar)}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(79, 171, 82, 0.15)',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    flexShrink: 0
                  }}
                >
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '20px', height: '20px', fill: '#4FAB52' }}>
                    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call Screen Overlay */}
      {callActive && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          maxWidth: '393px',
          margin: '0 auto',
          background: 'linear-gradient(180deg, #1a1a1a 0%, #000000 100%)',
          zIndex: 2000,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '60px 20px 40px'
        }}>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <img 
              src={callerAvatar}
              alt={callerName}
              style={{
                width: '140px',
                height: '140px',
                borderRadius: '50%',
                objectFit: 'cover',
                margin: '0 auto 32px',
                boxShadow: '0px 8px 32px rgba(0,0,0,0.4)'
              }}
            />
            <div style={{
              fontWeight: 600,
              fontSize: '32px',
              lineHeight: '40px',
              color: 'white',
              marginBottom: '12px'
            }}>{callerName}</div>
            <div style={{
              fontSize: '18px',
              lineHeight: '24px',
              color: 'rgba(255,255,255,0.7)',
              marginBottom: '8px'
            }}>{callStatus}</div>
            {callStatus === 'Connected' && (
              <div style={{
                fontSize: '16px',
                lineHeight: '22px',
                color: 'rgba(255,255,255,0.6)'
              }}>{callDuration}</div>
            )}
          </div>

          <div style={{
            width: '100%',
            maxWidth: '320px',
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
            alignItems: 'center'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
              width: '100%'
            }}>
              {[
                { icon: <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z"/></svg>, label: 'Mute' },
                { icon: <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>, label: 'Speaker' },
                { icon: <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>, label: 'Video' }
              ].map((action, idx) => (
                <button 
                  key={idx}
                  onClick={() => alert(`${action.label} toggled`)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'white'
                  }}
                >
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <div style={{ width: '28px', height: '28px' }}>
                      {action.icon}
                    </div>
                  </div>
                  <span style={{
                    fontSize: '13px',
                    lineHeight: '18px',
                    color: 'rgba(255,255,255,0.9)'
                  }}>{action.label}</span>
                </button>
              ))}
            </div>

            <button 
              onClick={endCall}
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#FF3B54',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0px 4px 16px rgba(255, 59, 84, 0.4)',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '28px', height: '28px', fill: 'white' }}>
                <path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08c-.18-.17-.29-.42-.29-.7 0-.28.11-.53.29-.71C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67c.18.18.29.43.29.71 0 .28-.11.53-.29.71l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.11-.7-.28-.79-.74-1.69-1.36-2.67-1.85-.33-.16-.56-.5-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z"/>
              </svg>
            </button>
          </div>
        </div>
      )}

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
          gap: '4px',
          opacity: 0.6
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
          gap: '4px'
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
    </div>
  );
}