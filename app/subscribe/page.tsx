'use client';

import { useState, useEffect } from 'react';
import TokenDisplay from '@/components/TokenDisplay';

export default function SubscribePage() {
  const [billingType, setBillingType] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(0);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const reason = urlParams.get('reason');
    
    if (reason === 'out_of_messages') {
      alert('❌ You\'ve used all 10 free messages.\n\nSubscribe for unlimited messages + 100 tokens/month!');
    } else if (reason === 'out_of_tokens') {
      alert('❌ You\'ve used all 10 free tokens.\n\nSubscribe for 100 tokens/month + unlimited messages!');
    } else if (reason === 'token_purchase_blocked') {
      alert('🔒 Token purchases are for subscribers only.\n\nSubscribe first to unlock token purchases!');
    }
  }, []);

  const selectPlan = (plan, price) => {
    setSelectedPlan(plan);
    setSelectedPrice(price);
  };

  const processSubscription = () => {
    if (!selectedPlan || !selectedPrice) {
      alert('Please select a subscription plan first');
      return;
    }
    alert(`💳 Processing ${selectedPlan} subscription for $${selectedPrice.toFixed(2)}...\n\nThis will connect to Stripe payment processing`);
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
      width: '100%',
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
          <TokenDisplay />
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        marginTop: '64px',
        overflowY: 'auto',
        padding: '32px 16px 24px'
      }}>
        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{
            fontWeight: 700,
            fontSize: '28px',
            lineHeight: '36px',
            background: 'linear-gradient(135deg, #FF3B9A 0%, #A445ED 50%, #4A90E2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '12px'
          }}>Unlock Unlimited Conversations</h1>
          <p style={{
            fontSize: '16px',
            lineHeight: '24px',
            color: 'rgba(255,255,255,0.7)'
          }}>Choose the plan that works for you</p>
        </div>

        {/* Billing Toggle */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
        justifyContent: 'space-between',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '32px',
          padding: '4px',
          background: '#1a1a1a',
          borderRadius: '12px',
          maxWidth: '280px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          <div 
            onClick={() => setBillingType('monthly')}
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 500,
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
              background: billingType === 'monthly' ? 'linear-gradient(135deg, #FF3B9A 0%, #A445ED 100%)' : 'transparent',
              color: billingType === 'monthly' ? 'white' : 'rgba(255,255,255,0.5)'
            }}
          >Monthly</div>
          <div 
            onClick={() => setBillingType('annual')}
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 500,
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
              position: 'relative',
              background: billingType === 'annual' ? 'linear-gradient(135deg, #FF3B9A 0%, #A445ED 100%)' : 'transparent',
              color: billingType === 'annual' ? 'white' : 'rgba(255,255,255,0.5)'
            }}
          >
            Annual
            <span style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              background: '#4FAB52',
              padding: '2px 6px',
              borderRadius: '6px',
              fontSize: '10px',
              fontWeight: 600
            }}>Save 17%</span>
          </div>
        </div>

        {/* Plans */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          marginBottom: '32px'
        }}>
          {/* Free Tier */}
          <div style={{
            background: '#1a1a1a',
            border: '2px solid #616162',
            borderRadius: '16px',
            padding: '24px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              marginBottom: '16px'
            }}>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontWeight: 700,
                  fontSize: '20px',
                  lineHeight: '26px',
                  color: 'white',
                  marginBottom: '4px'
                }}>Free Tier</div>
                <div style={{
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: 'rgba(255,255,255,0.6)'
                }}>Current plan</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontWeight: 700,
                  fontSize: '32px',
                  lineHeight: '40px',
                  color: 'white'
                }}>$0</div>
                <div style={{
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: 'rgba(255,255,255,0.6)'
                }}>forever</div>
              </div>
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              {[
                { text: '10 messages total', enabled: true },
                { text: '10 tokens total', enabled: true },
                { text: 'No token purchases allowed', enabled: false },
                { text: 'Access blocked when limits reached', enabled: false }
              ].map((feature, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: 'rgba(255,255,255,0.9)',
                  opacity: feature.enabled ? 1 : 0.4
                }}>
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '20px', height: '20px', fill: feature.enabled ? '#4FAB52' : '#616162', flexShrink: 0, marginTop: '2px' }}>
                    {feature.enabled ? (
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    ) : (
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    )}
                  </svg>
                  <span><strong>{feature.text.split(' ')[0]} {feature.text.split(' ')[1]}</strong> {feature.text.split(' ').slice(2).join(' ')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly/Annual Plan */}
          {billingType === 'monthly' ? (
            <div 
              onClick={() => selectPlan('monthly', 9.99)}
              style={{
                background: selectedPlan === 'monthly' ? 'rgba(164, 69, 237, 0.1)' : '#1a1a1a',
                border: selectedPlan === 'monthly' ? '2px solid #A445ED' : '2px solid transparent',
                borderRadius: '16px',
                padding: '24px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                marginBottom: '16px'
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontWeight: 700,
                    fontSize: '20px',
                    lineHeight: '26px',
                    color: 'white',
                    marginBottom: '4px'
                  }}>Monthly</div>
                  <div style={{
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: 'rgba(255,255,255,0.6)'
                  }}>Perfect for trying out</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    fontWeight: 700,
                    fontSize: '32px',
                    lineHeight: '40px',
                    color: 'white'
                  }}>$9.99</div>
                  <div style={{
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: 'rgba(255,255,255,0.6)'
                  }}>per month</div>
                </div>
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                marginBottom: '16px'
              }}>
                {[
                  'Unlimited messages',
                  '100 tokens/month (reset monthly)',
                  'Purchase additional tokens anytime',
                  'Cancel anytime'
                ].map((feature, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: 'rgba(255,255,255,0.9)'
                  }}>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '20px', height: '20px', fill: '#4FAB52', flexShrink: 0, marginTop: '2px' }}>
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    <span><strong>{feature.split(' ')[0]} {feature.split(' ')[1]}</strong> {feature.split(' ').slice(2).join(' ')}</span>
                  </div>
                ))}
              </div>
              <div style={{
                background: 'rgba(79, 171, 82, 0.15)',
                border: '1px solid #4FAB52',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '13px',
                lineHeight: '18px',
                color: '#4FAB52',
                fontWeight: 600
              }}>
                ⚠️ Unused tokens expire at the end of each month
              </div>
            </div>
          ) : (
            <div 
              onClick={() => selectPlan('annual', 99.99)}
              style={{
                background: selectedPlan === 'annual' ? 'rgba(164, 69, 237, 0.1)' : '#1a1a1a',
                border: selectedPlan === 'annual' ? '2px solid #A445ED' : '2px solid transparent',
                borderRadius: '16px',
                padding: '24px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                marginBottom: '16px'
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontWeight: 700,
                    fontSize: '20px',
                    lineHeight: '26px',
                    color: 'white',
                    marginBottom: '4px'
                  }}>Annual ⭐</div>
                  <div style={{
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: 'rgba(255,255,255,0.6)'
                  }}>Best value + rollover</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    fontWeight: 700,
                    fontSize: '32px',
                    lineHeight: '40px',
                    color: 'white'
                  }}>$99.99</div>
                  <div style={{
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: 'rgba(255,255,255,0.6)'
                  }}>per year</div>
                </div>
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                marginBottom: '16px'
              }}>
                {[
                  'Unlimited messages',
                  '100 tokens/month (1,200 total/year)',
                  'Unused tokens ROLL OVER each month',
                  'Purchase additional tokens anytime',
                  'Save $19.89/year vs monthly'
                ].map((feature, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: 'rgba(255,255,255,0.9)'
                  }}>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '20px', height: '20px', fill: '#4FAB52', flexShrink: 0, marginTop: '2px' }}>
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    <span><strong>{feature.split(' ')[0]} {feature.split(' ')[1]}</strong> {feature.split(' ').slice(2).join(' ')}</span>
                  </div>
                ))}
              </div>
              <div style={{
                background: 'rgba(79, 171, 82, 0.15)',
                border: '1px solid #4FAB52',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '13px',
                lineHeight: '18px',
                color: '#4FAB52',
                fontWeight: 600
              }}>
                🎉 Unused tokens never expire! Build up your token bank over time.
              </div>
            </div>
          )}
        </div>

        {/* Subscribe Button */}
        <div style={{
          position: 'sticky',
          bottom: 0,
          background: '#131313',
          padding: '16px 0',
          borderTop: '1px solid #363636'
        }}>
          <button 
            onClick={processSubscription}
            disabled={!selectedPlan || !selectedPrice}
            style={{
              width: '100%',
              padding: '16px',
              background: selectedPlan && selectedPrice ? 'linear-gradient(135deg, #FF3B9A 0%, #A445ED 50%, #4A90E2 100%)' : '#616162',
              border: 'none',
              borderRadius: '12px',
              fontWeight: 600,
              fontSize: '16px',
              color: 'white',
              cursor: selectedPlan && selectedPrice ? 'pointer' : 'not-allowed',
              opacity: selectedPlan && selectedPrice ? 1 : 0.5
            }}
          >
            {selectedPlan && selectedPrice 
              ? `Subscribe for $${selectedPrice.toFixed(2)}${selectedPlan === 'monthly' ? '/mo' : '/year'}`
              : 'Select a Plan to Continue'
            }
          </button>
        </div>

        {/* Trust Badges */}
        <div style={{
          textAlign: 'center',
          marginTop: '24px',
          paddingTop: '24px',
          borderTop: '1px solid #363636',
          marginBottom: '70px'
        }}>
          <div style={{
            fontSize: '12px',
            lineHeight: '18px',
            color: 'rgba(255,255,255,0.5)',
            marginBottom: '12px'
          }}>Secure payment powered by Stripe</div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
        justifyContent: 'space-between',
            justifyContent: 'center',
            gap: '16px'
          }}>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>🔒 SSL Encrypted</div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>💳 Safe Payments</div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>↩️ Cancel Anytime</div>
          </div>
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