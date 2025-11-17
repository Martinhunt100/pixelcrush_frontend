'use client';

import { useState } from 'react';

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState('photos');

  const photos = [
    { src: 'https://www.figma.com/api/mcp/asset/fe87f0c9-07a7-43e8-af45-605840735bd3', name: 'Paige Grey' },
    { src: 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62', name: 'Katarina' },
    { src: 'https://www.figma.com/api/mcp/asset/2c7a16b9-ce7c-4520-820f-3970137843bd', name: 'Lila Crazy' },
    { src: 'https://www.figma.com/api/mcp/asset/ffd774a4-1d92-4f29-a763-f8c92c7c4e36', name: 'Luna' },
    { src: 'https://www.figma.com/api/mcp/asset/29cf0eca-6774-40cc-a75c-4c1f82086447', name: 'Luna Moreno' },
    { src: 'https://www.figma.com/api/mcp/asset/c89e37df-de01-43f4-a88e-4cec04df0e86', name: 'Lyra Fallon' },
    { src: 'https://www.figma.com/api/mcp/asset/728fc790-a90a-4acf-a017-be330f3156f7', name: 'Katarina' },
    { src: 'https://www.figma.com/api/mcp/asset/fe87f0c9-07a7-43e8-af45-605840735bd3', name: 'Paige Grey' },
    { src: 'https://www.figma.com/api/mcp/asset/2c7a16b9-ce7c-4520-820f-3970137843bd', name: 'Lila Crazy' }
  ];

  const videos = [
    { src: 'https://www.figma.com/api/mcp/asset/d1b83c6d-57ef-4b6e-989a-7d79d46166cb', duration: '0:34' },
    { src: 'https://www.figma.com/api/mcp/asset/fe87f0c9-07a7-43e8-af45-605840735bd3', duration: '1:12' },
    { src: 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62', duration: '0:48' },
    { src: 'https://www.figma.com/api/mcp/asset/2c7a16b9-ce7c-4520-820f-3970137843bd', duration: '2:05' },
    { src: 'https://www.figma.com/api/mcp/asset/ffd774a4-1d92-4f29-a763-f8c92c7c4e36', duration: '0:27' },
    { src: 'https://www.figma.com/api/mcp/asset/29cf0eca-6774-40cc-a75c-4c1f82086447', duration: '1:45' }
  ];

  const moments = [
    { avatar: 'https://www.figma.com/api/mcp/asset/fe87f0c9-07a7-43e8-af45-605840735bd3', name: 'Paige Grey', time: '2 hours ago', image: 'https://www.figma.com/api/mcp/asset/fe87f0c9-07a7-43e8-af45-605840735bd3', caption: 'Just finished an amazing conversation... feeling inspired ✨', likes: 24, comments: 5, liked: true },
    { avatar: 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62', name: 'Katarina', time: '5 hours ago', image: 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62', caption: 'Guten Tag! Beautiful day for deep conversations 🌸', likes: 18, comments: 3, liked: false },
    { avatar: 'https://www.figma.com/api/mcp/asset/2c7a16b9-ce7c-4520-820f-3970137843bd', name: 'Lila Crazy', time: 'Yesterday', image: 'https://www.figma.com/api/mcp/asset/2c7a16b9-ce7c-4520-820f-3970137843bd', caption: 'Chaos is just another word for creativity 🖤✨', likes: 32, comments: 8, liked: false }
  ];

  const [momentLikes, setMomentLikes] = useState(moments.map(m => ({ liked: m.liked, count: m.likes })));

  const toggleLike = (index) => {
    setMomentLikes(prev => prev.map((item, idx) => 
      idx === index 
        ? { liked: !item.liked, count: item.liked ? item.count - 1 : item.count + 1 }
        : item
    ));
  };

  return (
    <div style={{
      fontFamily: 'TikTok Sans, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
      background: '#131313',
      color: 'white',
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
        overflowY: 'auto'
      }}>
        {/* Tabs */}
        <div style={{
          background: '#131313',
          borderBottom: '1px solid #363636',
          padding: '0 12px',
          position: 'sticky',
          top: '64px',
          zIndex: 100
        }}>
          <div style={{ display: 'flex', gap: '32px' }}>
            {['photos', 'videos', 'moments'].map(tab => (
              <div 
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '16px 0',
                  fontWeight: 500,
                  fontSize: '15px',
                  lineHeight: '20px',
                  color: activeTab === tab ? 'white' : 'rgba(255,255,255,0.5)',
                  borderBottom: activeTab === tab ? '2px solid #A445ED' : '2px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textTransform: 'capitalize'
                }}
              >
                {tab}
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '16px 12px' }}>
          {/* Photos Tab */}
          {activeTab === 'photos' && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '4px',
              marginBottom: '20px'
            }}>
              {photos.map((photo, idx) => (
                <div 
                  key={idx}
                  onClick={() => alert(`📸 Opening photo viewer for item ${idx + 1}...\n\nThis will open a fullscreen media viewer`)}
                  style={{
                    aspectRatio: '1',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  <img 
                    src={photo.src}
                    alt={`Photo ${idx + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                    padding: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '12px'
                  }}>
                    <span>{photo.name}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Videos Tab */}
          {activeTab === 'videos' && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '4px',
              marginBottom: '20px'
            }}>
              {videos.map((video, idx) => (
                <div 
                  key={idx}
                  onClick={() => alert(`📸 Opening video viewer for item ${idx + 1}...\n\nThis will open a fullscreen media viewer`)}
                  style={{
                    aspectRatio: '1',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  <img 
                    src={video.src}
                    alt={`Video ${idx + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    width: '24px',
                    height: '24px',
                    background: 'rgba(0,0,0,0.6)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '12px', height: '12px', fill: 'white' }}>
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                    padding: '8px',
                    fontSize: '12px'
                  }}>
                    <span>{video.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Moments Tab */}
          {activeTab === 'moments' && (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              {moments.map((moment, idx) => (
                <div key={idx} style={{
                  background: '#1a1a1a',
                  borderRadius: '12px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px'
                  }}>
                    <img 
                      src={moment.avatar}
                      alt={moment.name}
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        objectFit: 'cover'
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontWeight: 600,
                        fontSize: '15px',
                        lineHeight: '20px',
                        color: 'white'
                      }}>{moment.name}</div>
                      <div style={{
                        fontSize: '13px',
                        lineHeight: '18px',
                        color: 'rgba(255,255,255,0.5)'
                      }}>{moment.time}</div>
                    </div>
                  </div>
                  <img 
                    src={moment.image}
                    alt="Moment"
                    style={{
                      width: '100%',
                      aspectRatio: '1',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{
                    padding: '12px',
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: 'rgba(255,255,255,0.9)'
                  }}>{moment.caption}</div>
                  <div style={{
                    display: 'flex',
                    gap: '20px',
                    padding: '12px',
                    borderTop: '1px solid rgba(255,255,255,0.1)'
                  }}>
                    <button 
                      onClick={() => toggleLike(idx)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: 'none',
                        border: 'none',
                        color: momentLikes[idx].liked ? '#FF3B9A' : 'rgba(255,255,255,0.7)',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '20px', height: '20px', fill: 'currentColor' }}>
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                      <span>{momentLikes[idx].count}</span>
                    </button>
                    <button 
                      onClick={() => alert('💬 Opening comments...')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: 'none',
                        border: 'none',
                        color: 'rgba(255,255,255,0.7)',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '20px', height: '20px', fill: 'currentColor' }}>
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                      </svg>
                      <span>{moment.comments}</span>
                    </button>
                  </div>
                </div>
              ))}
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
          gap: '4px'
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