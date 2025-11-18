'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';

function AccountPageContent() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out?')) {
      logout();
      router.push('/login');
    }
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'Unknown';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
      return 'Unknown';
    }
  };

  const getInitials = (email: string) => {
    return email.charAt(0).toUpperCase();
  };

  return (
    <div style={{
      fontFamily: 'Poppins, sans-serif',
      background: '#131313',
      color: 'white',
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
          }}>{user?.tokens !== undefined ? user.tokens.toFixed(1) : '0.8'}</div>
        </a>
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '24px 16px 100px 16px',
        WebkitOverflowScrolling: 'touch'
      }}>
        {/* Profile Section */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '32px 0',
          marginBottom: '32px'
        }}>
          <div style={{
            width: '96px',
            height: '96px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FF3B9A 0%, #A445ED 50%, #4A90E2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '40px',
            fontWeight: 600,
            marginBottom: '20px',
            boxShadow: '0 8px 24px rgba(255,59,154,0.3)'
          }}>
            {user?.username ? user.username.charAt(0).toUpperCase() : getInitials(user?.email || 'U')}
          </div>
          <div style={{
            fontWeight: 600,
            fontSize: '24px',
            lineHeight: '32px',
            color: 'white',
            marginBottom: '8px'
          }}>
            {user?.username || 'User'}
          </div>
          <div style={{
            fontSize: '15px',
            lineHeight: '22px',
            color: 'rgba(255,255,255,0.6)',
            marginBottom: '4px'
          }}>
            {user?.email}
          </div>
          <div style={{
            fontSize: '13px',
            lineHeight: '20px',
            color: 'rgba(255,255,255,0.4)'
          }}>
            Member since {formatDate(user?.created_at)}
          </div>
        </div>

        {/* Account Info Section */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{
            fontWeight: 600,
            fontSize: '14px',
            lineHeight: '20px',
            color: 'rgba(255,255,255,0.5)',
            textTransform: 'uppercase',
            marginBottom: '16px',
            letterSpacing: '0.5px'
          }}>Account Information</h3>
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <div style={{
              padding: '20px',
              borderBottom: '1px solid rgba(255,255,255,0.05)'
            }}>
              <div style={{
                fontSize: '13px',
                color: 'rgba(255,255,255,0.5)',
                marginBottom: '6px'
              }}>Email Address</div>
              <div style={{
                fontSize: '15px',
                color: 'white',
                wordBreak: 'break-all'
              }}>{user?.email}</div>
            </div>
            <div style={{
              padding: '20px',
              borderBottom: '1px solid rgba(255,255,255,0.05)'
            }}>
              <div style={{
                fontSize: '13px',
                color: 'rgba(255,255,255,0.5)',
                marginBottom: '6px'
              }}>Username</div>
              <div style={{
                fontSize: '15px',
                color: 'white'
              }}>{user?.username || 'Not set'}</div>
            </div>
            <div style={{
              padding: '20px'
            }}>
              <div style={{
                fontSize: '13px',
                color: 'rgba(255,255,255,0.5)',
                marginBottom: '6px'
              }}>Account Created</div>
              <div style={{
                fontSize: '15px',
                color: 'white'
              }}>{formatDate(user?.created_at)}</div>
            </div>
          </div>
        </div>

        {/* Tokens Section */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{
            fontWeight: 600,
            fontSize: '14px',
            lineHeight: '20px',
            color: 'rgba(255,255,255,0.5)',
            textTransform: 'uppercase',
            marginBottom: '16px',
            letterSpacing: '0.5px'
          }}>Tokens & Billing</h3>
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <a href="/tokens" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '20px',
              cursor: 'pointer',
              textDecoration: 'none',
              transition: 'background 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #FF3B9A 0%, #A445ED 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <img
                    src="/icons/token-icon.png"
                    alt="Tokens"
                    style={{ width: '24px', height: '24px', objectFit: 'contain' }}
                  />
                </div>
                <div>
                  <div style={{
                    fontSize: '15px',
                    fontWeight: 500,
                    color: 'white',
                    marginBottom: '4px'
                  }}>Buy Tokens</div>
                  <div style={{
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.5)'
                  }}>{user?.tokens !== undefined ? user.tokens.toFixed(1) : '0.8'} remaining</div>
                </div>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5l7 7-7 7" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            padding: '18px',
            background: 'rgba(255,59,154,0.1)',
            border: '1px solid rgba(255,59,154,0.3)',
            borderRadius: '16px',
            fontSize: '16px',
            fontWeight: 600,
            color: '#FF3B9A',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            fontFamily: 'Poppins, sans-serif'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,59,154,0.15)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,59,154,0.1)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Log Out
        </button>
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

export default function AccountPage() {
  return (
    <ProtectedRoute>
      <AccountPageContent />
    </ProtectedRoute>
  );
}
