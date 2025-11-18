'use client';

import { useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';

function PricingPageContent() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send email to backend for launch notification
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <div style={{
      fontFamily: 'Poppins, sans-serif',
      background: '#131313',
      color: 'white',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
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
          href="/account"
          style={{
            color: 'rgba(255,255,255,0.8)',
            fontSize: '14px',
            textDecoration: 'none',
            fontWeight: 500
          }}
        >
          Back
        </a>
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        padding: '32px 16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #FF3B9A 0%, #A445ED 50%, #4A90E2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '12px'
          }}>
            Choose Your Plan
          </h1>
          <p style={{
            fontSize: '16px',
            color: 'rgba(255,255,255,0.7)',
            lineHeight: '24px'
          }}>
            Start free, upgrade when you're ready
          </p>
        </div>

        {/* Free Tier */}
        <div style={{
          width: '100%',
          maxWidth: '360px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '20px'
        }}>
          <div style={{
            fontSize: '20px',
            fontWeight: 600,
            marginBottom: '8px',
            color: 'white'
          }}>
            Free
          </div>
          <div style={{
            fontSize: '14px',
            color: 'rgba(255,255,255,0.6)',
            marginBottom: '20px'
          }}>
            Try PixelCrush.ai
          </div>

          <div style={{
            fontSize: '36px',
            fontWeight: 700,
            color: 'white',
            marginBottom: '20px'
          }}>
            $0
            <span style={{
              fontSize: '16px',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.6)',
              marginLeft: '4px'
            }}>
              /month
            </span>
          </div>

          <div style={{ marginBottom: '20px' }}>
            {[
              '10 messages total',
              'Access to all characters',
              'Text chat only',
              'Basic features'
            ].map((feature, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '12px',
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.8)'
                }}
              >
                <span style={{ color: '#4A90E2' }}>✓</span>
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <div style={{
            padding: '12px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '8px',
            textAlign: 'center',
            fontSize: '14px',
            color: 'rgba(255,255,255,0.6)'
          }}>
            Current Plan
          </div>
        </div>

        {/* Premium Tier */}
        <div style={{
          width: '100%',
          maxWidth: '360px',
          background: 'linear-gradient(135deg, rgba(255,59,154,0.08) 0%, rgba(164,69,237,0.08) 100%)',
          border: '2px solid',
          borderImage: 'linear-gradient(135deg, #FF3B9A 0%, #A445ED 100%) 1',
          borderRadius: '16px',
          padding: '24px',
          position: 'relative',
          marginBottom: '40px'
        }}>
          {/* Coming Soon Badge */}
          <div style={{
            position: 'absolute',
            top: '-12px',
            right: '20px',
            background: 'linear-gradient(135deg, #FF3B9A 0%, #A445ED 100%)',
            padding: '6px 16px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 600,
            color: 'white',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Coming Soon
          </div>

          <div style={{
            fontSize: '20px',
            fontWeight: 600,
            marginBottom: '8px',
            color: 'white'
          }}>
            Premium
          </div>
          <div style={{
            fontSize: '14px',
            color: 'rgba(255,255,255,0.6)',
            marginBottom: '20px'
          }}>
            Unlimited access
          </div>

          <div style={{
            fontSize: '36px',
            fontWeight: 700,
            color: 'white',
            marginBottom: '20px'
          }}>
            $4.99
            <span style={{
              fontSize: '16px',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.6)',
              marginLeft: '4px'
            }}>
              /month
            </span>
          </div>

          <div style={{ marginBottom: '20px' }}>
            {[
              'Unlimited messages',
              'All characters unlocked',
              'Deeper, longer conversations',
              'Priority support',
              'Early access to new features',
              'Voice chat (coming soon)',
              'Exclusive content (coming soon)'
            ].map((feature, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '12px',
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.9)'
                }}
              >
                <span style={{ color: '#FF3B9A' }}>✓</span>
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <button
            disabled
            style={{
              width: '100%',
              padding: '14px',
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '10px',
              color: 'rgba(255,255,255,0.5)',
              fontSize: '16px',
              fontWeight: 600,
              cursor: 'not-allowed',
              fontFamily: 'Poppins, sans-serif'
            }}
          >
            Coming Soon
          </button>
        </div>

        {/* Email Signup */}
        <div style={{
          width: '100%',
          maxWidth: '360px',
          textAlign: 'center'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: 600,
            marginBottom: '12px',
            color: 'white'
          }}>
            Get notified when Premium launches
          </h3>
          <p style={{
            fontSize: '14px',
            color: 'rgba(255,255,255,0.6)',
            marginBottom: '20px'
          }}>
            Be the first to know when unlimited messaging is available
          </p>

          {!subscribed ? (
            <form onSubmit={handleNotify} style={{ display: 'flex', gap: '8px' }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '14px',
                  fontFamily: 'Poppins, sans-serif',
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '12px 24px',
                  background: 'linear-gradient(135deg, #FF3B9A 0%, #A445ED 100%)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'Poppins, sans-serif',
                  whiteSpace: 'nowrap'
                }}
              >
                Notify Me
              </button>
            </form>
          ) : (
            <div style={{
              padding: '12px',
              background: 'rgba(74, 144, 226, 0.2)',
              border: '1px solid #4A90E2',
              borderRadius: '8px',
              color: '#4A90E2',
              fontSize: '14px'
            }}>
              Thanks! We'll notify you when Premium launches.
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

      <style jsx>{`
        input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }
        input:focus {
          border-color: #FF3B9A;
        }
      `}</style>
    </div>
  );
}

export default function PricingPage() {
  return (
    <ProtectedRoute>
      <PricingPageContent />
    </ProtectedRoute>
  );
}
