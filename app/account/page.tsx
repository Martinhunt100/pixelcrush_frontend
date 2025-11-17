'use client';

import { useState } from 'react';

export default function AccountPage() {
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

      {/* Main Content */}
      <div style={{
        flex: 1,
        marginTop: '64px',
        marginBottom: '78px',
        overflowY: 'auto',
        padding: '24px 12px'
      }}>
        {/* Profile Section */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        justifyContent: 'space-between',
          padding: '20px 0',
          borderBottom: '1px solid #363636',
          marginBottom: '24px'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FF3B9A 0%, #A445ED 50%, #4A90E2 100%)',
            display: 'flex',
            alignItems: 'center',
        justifyContent: 'space-between',
            justifyContent: 'center',
            fontSize: '32px',
            fontWeight: 600,
            marginBottom: '16px'
          }}>M</div>
          <div style={{
            fontWeight: 600,
            fontSize: '20px',
            lineHeight: '26px',
            color: 'white',
            marginBottom: '4px'
          }}>Martin Hunt</div>
          <div style={{
            fontSize: '14px',
            lineHeight: '20px',
            color: 'rgba(255,255,255,0.6)',
            marginBottom: '16px'
          }}>martin@pixelcrush.ai</div>
          <button 
            onClick={() => alert('📝 Edit Profile - Opening profile editor...')}
            style={{
              padding: '8px 24px',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '20px',
              fontSize: '14px',
              color: 'white',
              cursor: 'pointer'
            }}
          >Edit Profile</button>
        </div>

        {/* Stats Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          marginBottom: '24px'
        }}>
          <div style={{
            background: '#1a1a1a',
            borderRadius: '12px',
            padding: '16px',
            textAlign: 'center'
          }}>
            <div style={{
              fontWeight: 600,
              fontSize: '24px',
              lineHeight: '32px',
              background: 'linear-gradient(135deg, #FF3B9A 0%, #A445ED 50%, #4A90E2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '4px'
            }}>24</div>
            <div style={{
              fontSize: '12px',
              lineHeight: '16px',
              color: 'rgba(255,255,255,0.6)'
            }}>Conversations</div>
          </div>
          <div style={{
            background: '#1a1a1a',
            borderRadius: '12px',
            padding: '16px',
            textAlign: 'center'
          }}>
            <div style={{
              fontWeight: 600,
              fontSize: '24px',
              lineHeight: '32px',
              background: 'linear-gradient(135deg, #FF3B9A 0%, #A445ED 50%, #4A90E2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '4px'
            }}>156</div>
            <div style={{
              fontSize: '12px',
              lineHeight: '16px',
              color: 'rgba(255,255,255,0.6)'
            }}>Messages</div>
          </div>
          <div style={{
            background: '#1a1a1a',
            borderRadius: '12px',
            padding: '16px',
            textAlign: 'center'
          }}>
            <div style={{
              fontWeight: 600,
              fontSize: '24px',
              lineHeight: '32px',
              background: 'linear-gradient(135deg, #FF3B9A 0%, #A445ED 50%, #4A90E2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '4px'
            }}>12</div>
            <div style={{
              fontSize: '12px',
              lineHeight: '16px',
              color: 'rgba(255,255,255,0.6)'
            }}>Favorites</div>
          </div>
        </div>

        {/* Subscription Section */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{
            fontWeight: 600,
            fontSize: '14px',
            lineHeight: '20px',
            color: 'rgba(255,255,255,0.5)',
            textTransform: 'uppercase',
            marginBottom: '12px',
            padding: '0 4px'
          }}>Subscription</h3>
          <div style={{
            background: '#1a1a1a',
            borderRadius: '12px',
            overflow: 'hidden'
          }}>
            {[
              {
                icon: <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/></svg>,
                label: 'Plan',
                badge: '✨ Premium',
                onClick: () => alert('💎 Manage Subscription - View and change your plan')
              },
              {
                icon: <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"/><path d="M12 6v12M6 12h12"/></svg>,
                label: 'Buy Tokens',
                value: '0.8 remaining',
                onClick: () => window.location.href = '/tokens'
              },
              {
                icon: <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM4 18V6h16v12H4z"/><path d="M6 10h12v2H6z"/></svg>,
                label: 'Billing History',
                onClick: () => alert('🧾 Billing History - View all your transactions')
              }
            ].map((item, idx) => (
              <div 
                key={idx}
                onClick={item.onClick}
                style={{
                  display: 'flex',
                  alignItems: 'center',
        justifyContent: 'space-between',
                  padding: '16px',
                  borderBottom: idx < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  cursor: 'pointer'
                }}
              >
                <div style={{
                  width: '24px',
                  height: '24px',
                  marginRight: '16px',
                  color: 'rgba(255,255,255,0.7)'
                }}>
                  {item.icon}
                </div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '15px', lineHeight: '20px', color: 'white' }}>{item.label}</div>
                  {item.badge && (
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
        justifyContent: 'space-between',
                      gap: '6px',
                      padding: '4px 12px',
                      background: 'linear-gradient(135deg, #FF3B9A 0%, #A445ED 100%)',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 600
                    }}>{item.badge}</div>
                  )}
                  {item.value && (
                    <div style={{ fontSize: '14px', lineHeight: '20px', color: 'rgba(255,255,255,0.5)' }}>{item.value}</div>
                  )}
                </div>
                <div style={{
                  width: '20px',
                  height: '20px',
                  marginLeft: '12px',
                  color: 'rgba(255,255,255,0.3)'
                }}>
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', fill: 'currentColor' }}>
                    <path d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings Section */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{
            fontWeight: 600,
            fontSize: '14px',
            lineHeight: '20px',
            color: 'rgba(255,255,255,0.5)',
            textTransform: 'uppercase',
            marginBottom: '12px',
            padding: '0 4px'
          }}>Settings</h3>
          <div style={{
            background: '#1a1a1a',
            borderRadius: '12px',
            overflow: 'hidden'
          }}>
            {[
              { icon: <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/></svg>, label: 'Notifications', onClick: () => alert('🔔 Notifications - Manage notification settings') },
              { icon: <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/></svg>, label: 'Privacy & Safety', onClick: () => alert('🔒 Privacy & Safety - Manage privacy settings') },
              { icon: <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>, label: 'Language', value: 'English', onClick: () => alert('🌐 Language - Select your preferred language') },
              { icon: <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9 2c-1.05 0-2.05.16-3 .46 4.06 1.27 7 5.06 7 9.54 0 4.48-2.94 8.27-7 9.54.95.3 1.95.46 3 .46 5.52 0 10-4.48 10-10S14.52 2 9 2z"/></svg>, label: 'Theme', value: 'Dark', onClick: () => alert('🎨 Theme - Choose light or dark mode') }
            ].map((item, idx, arr) => (
              <div 
                key={idx}
                onClick={item.onClick}
                style={{
                  display: 'flex',
                  alignItems: 'center',
        justifyContent: 'space-between',
                  padding: '16px',
                  borderBottom: idx < arr.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  cursor: 'pointer'
                }}
              >
                <div style={{ width: '24px', height: '24px', marginRight: '16px', color: 'rgba(255,255,255,0.7)' }}>
                  {item.icon}
                </div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '15px', lineHeight: '20px', color: 'white' }}>{item.label}</div>
                  {item.value && <div style={{ fontSize: '14px', lineHeight: '20px', color: 'rgba(255,255,255,0.5)' }}>{item.value}</div>}
                </div>
                <div style={{ width: '20px', height: '20px', marginLeft: '12px', color: 'rgba(255,255,255,0.3)' }}>
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', fill: 'currentColor' }}><path d="M9 5l7 7-7 7"/></svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Support Section */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{
            fontWeight: 600,
            fontSize: '14px',
            lineHeight: '20px',
            color: 'rgba(255,255,255,0.5)',
            textTransform: 'uppercase',
            marginBottom: '12px',
            padding: '0 4px'
          }}>Support</h3>
          <div style={{
            background: '#1a1a1a',
            borderRadius: '12px',
            overflow: 'hidden'
          }}>
            {[
              { icon: <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>, label: 'Help Center', onClick: () => alert('❓ Help Center - Get support and answers') },
              { icon: <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/></svg>, label: 'Terms & Privacy', onClick: () => alert('📄 Terms & Privacy - View legal information') },
              { icon: <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>, label: 'About', value: 'v1.0.0', onClick: () => alert('ℹ️ About - PixelCrush.ai v1.0.0') }
            ].map((item, idx, arr) => (
              <div 
                key={idx}
                onClick={item.onClick}
                style={{
                  display: 'flex',
                  alignItems: 'center',
        justifyContent: 'space-between',
                  padding: '16px',
                  borderBottom: idx < arr.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  cursor: 'pointer'
                }}
              >
                <div style={{ width: '24px', height: '24px', marginRight: '16px', color: 'rgba(255,255,255,0.7)' }}>
                  {item.icon}
                </div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '15px', lineHeight: '20px', color: 'white' }}>{item.label}</div>
                  {item.value && <div style={{ fontSize: '14px', lineHeight: '20px', color: 'rgba(255,255,255,0.5)' }}>{item.value}</div>}
                </div>
                <div style={{ width: '20px', height: '20px', marginLeft: '12px', color: 'rgba(255,255,255,0.3)' }}>
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', fill: 'currentColor' }}><path d="M9 5l7 7-7 7"/></svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Logout Section */}
        <div style={{ marginTop: '32px' }}>
          <button 
            onClick={() => {
              if (confirm('Are you sure you want to log out?')) {
                alert('👋 Logging out...');
              }
            }}
            style={{
              width: '100%',
              padding: '16px',
              background: 'rgba(255,59,154,0.1)',
              border: '1px solid rgba(255,59,154,0.3)',
              borderRadius: '12px',
              fontSize: '15px',
              fontWeight: 500,
              color: '#FF3B9A',
              cursor: 'pointer'
            }}
          >Log Out</button>
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
        justifyContent: 'space-between',
        padding: '8px 12px 8px',
        zIndex: 100
      }}>
        <a href="/" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        justifyContent: 'space-between',
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
        justifyContent: 'space-between',
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
        justifyContent: 'space-between',
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
        justifyContent: 'space-between',
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
        justifyContent: 'space-between',
          textDecoration: 'none',
          color: 'white',
          gap: '4px'
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