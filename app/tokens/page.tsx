'use client';

import { useState } from 'react';

export default function TokensPage() {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(0);

  const packages = [
    { id: 'starter', amount: 50, price: 4.99, savings: null },
    { id: 'standard', amount: 150, price: 12.99, savings: 'Save 13%' },
    { id: 'premium', amount: 500, price: 39.99, savings: 'Save 20%' },
    { id: 'power', amount: 1000, price: 59.00, savings: 'Save 41%', popular: true },
    { id: 'ultimate', amount: 2000, price: 109.00, savings: 'Save 45%' },
    { id: 'mega', amount: 5000, price: 239.00, savings: 'Save 52%', bestSavings: true }
  ];

  const selectPackage = (pkg) => {
    setSelectedPackage(pkg.id);
    setSelectedPrice(pkg.price);
  };

  const processPurchase = () => {
    if (!selectedPackage || !selectedPrice) {
      alert('Please select a package first');
      return;
    }
    alert(`💳 Processing payment for $${selectedPrice.toFixed(2)}...\n\nThis will connect to Stripe payment processing`);
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
        padding: '0 8px',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        maxWidth: '393px',
        margin: '0 auto',
        zIndex: 1000,
        boxShadow: '0px 1px 0px 0px rgba(0,0,0,0.05)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          paddingLeft: '20px'
        }}>
          <div 
            onClick={() => window.history.back()}
            style={{
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '12px',
              cursor: 'pointer'
            }}
          >
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '20px', height: '20px', fill: 'white' }}>
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </div>
          <div style={{
            fontWeight: 600,
            fontSize: '18px',
            lineHeight: '24px',
            color: 'white'
          }}>Buy Tokens</div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        marginTop: '64px',
        marginBottom: '78px',
        overflowY: 'auto',
        padding: '24px 12px'
      }}>
        {/* Current Balance */}
        <div style={{
          background: 'linear-gradient(135deg, #FF3B9A 0%, #A445ED 50%, #4A90E2 100%)',
          borderRadius: '16px',
          padding: '24px',
          textAlign: 'center',
          marginBottom: '32px',
          boxShadow: '0px 8px 24px rgba(164, 69, 237, 0.3)'
        }}>
          <div style={{
            fontSize: '14px',
            lineHeight: '20px',
            color: 'rgba(255,255,255,0.8)',
            marginBottom: '8px'
          }}>Your Current Balance</div>
          <div style={{
            fontWeight: 700,
            fontSize: '48px',
            lineHeight: '56px',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px'
          }}>
            <img 
              src="https://www.figma.com/api/mcp/asset/896841e1-bd7c-4c52-bf10-68513b3a60fe"
              alt="Token"
              style={{ width: '48px', height: '48px' }}
            />
            <span>0.8</span>
          </div>
        </div>

        {/* Subscription Note */}
        <div style={{
          background: 'rgba(164, 69, 237, 0.1)',
          border: '1px solid rgba(164, 69, 237, 0.3)',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '24px'
        }}>
          <div style={{
            fontWeight: 600,
            fontSize: '15px',
            lineHeight: '20px',
            color: 'white',
            marginBottom: '8px'
          }}>💡 Subscribers Only</div>
          <div style={{
            fontSize: '13px',
            lineHeight: '18px',
            color: 'rgba(255,255,255,0.7)'
          }}>
            Token purchases are available exclusively for subscribers. Subscribe to unlock token purchases and get 100 tokens included every month!
          </div>
        </div>

        {/* Token Packages */}
        <h2 style={{
          fontWeight: 600,
          fontSize: '20px',
          lineHeight: '26px',
          color: 'white',
          marginBottom: '16px'
        }}>Token Packages</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
          marginBottom: '32px'
        }}>
          {packages.map((pkg, idx) => (
            <div 
              key={idx}
              onClick={() => selectPackage(pkg)}
              style={{
                background: selectedPackage === pkg.id ? 'rgba(164, 69, 237, 0.1)' : '#1a1a1a',
                border: `2px solid ${
                  selectedPackage === pkg.id ? '#A445ED' : 
                  pkg.popular ? '#FF3B9A' : 
                  pkg.bestSavings ? '#4FAB52' : 
                  'transparent'
                }`,
                borderRadius: '16px',
                padding: '20px 16px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => !selectedPackage && (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              {pkg.popular && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'linear-gradient(135deg, #FF3B9A 0%, #A445ED 100%)',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: 600,
                  textTransform: 'uppercase'
                }}>Most Popular</div>
              )}
              {pkg.bestSavings && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'linear-gradient(135deg, #4FAB52 0%, #3d8b40 100%)',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: 600,
                  textTransform: 'uppercase'
                }}>Best Savings</div>
              )}
              <div style={{
                fontWeight: 700,
                fontSize: '32px',
                lineHeight: '40px',
                color: 'white',
                marginBottom: '8px'
              }}>{pkg.amount}</div>
              <div style={{
                fontSize: '14px',
                lineHeight: '20px',
                color: 'rgba(255,255,255,0.6)',
                marginBottom: '12px'
              }}>tokens</div>
              <div style={{
                fontWeight: 600,
                fontSize: '18px',
                lineHeight: '24px',
                color: 'white'
              }}>${pkg.price.toFixed(2)}</div>
              {pkg.savings && (
                <div style={{
                  display: 'inline-block',
                  marginTop: '8px',
                  padding: '4px 8px',
                  background: 'rgba(79, 171, 82, 0.2)',
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: '#4FAB52',
                  fontWeight: 600
                }}>{pkg.savings}</div>
              )}
            </div>
          ))}
        </div>

        {/* Subscriber Requirement Notice */}
        <div style={{
          background: 'rgba(164, 69, 237, 0.1)',
          border: '1px solid rgba(164, 69, 237, 0.3)',
          borderRadius: '12px',
          padding: '16px',
          marginTop: '24px'
        }}>
          <div style={{
            fontWeight: 600,
            fontSize: '15px',
            lineHeight: '20px',
            color: 'white',
            marginBottom: '8px'
          }}>🔒 Subscriber Benefit</div>
          <div style={{
            fontSize: '13px',
            lineHeight: '18px',
            color: 'rgba(255,255,255,0.7)'
          }}>
            Not a subscriber yet? <a href="/subscribe" style={{ color: '#A445ED', fontWeight: 600, textDecoration: 'none' }}>Subscribe now</a> to unlock token purchases and receive 100 tokens monthly.
          </div>
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
        zIndex: 1000
      }}>
        {[
          { href: '/characters', icon: 'https://www.figma.com/api/mcp/asset/6e8a5d93-897f-4d7e-98c9-9a28d2cab5d0', label: 'Characters' },
          { href: '/chat', icon: 'https://www.figma.com/api/mcp/asset/6c92bf79-791c-4aa0-86ea-92a4bd2963d9', label: 'Chat' },
          { href: '/voice', icon: 'https://www.figma.com/api/mcp/asset/b84a345c-6523-432d-beb0-df74be777edc', label: 'Voice Call' },
          { href: '/collection', icon: 'https://www.figma.com/api/mcp/asset/789f6323-9b48-419c-a0b1-26f69bb5b3d0', label: 'Collection' },
          { href: '/account', icon: 'https://www.figma.com/api/mcp/asset/c9bfdd57-ef2c-41ab-8bc7-060adde3d152', label: 'Account' }
        ].map((item, idx) => (
          <a key={idx} href={item.href} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textDecoration: 'none',
            color: 'rgba(255,255,255,0.7)'
          }}>
            <div style={{ height: '44px', width: '30px', marginBottom: 0 }}>
              <img src={item.icon} alt={item.label} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <div style={{ fontSize: '10px', lineHeight: '15px', marginTop: '-1px' }}>{item.label}</div>
          </a>
        ))}
      </div>
    </div>
  );
}