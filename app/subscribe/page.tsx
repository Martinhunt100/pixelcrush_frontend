'use client';

import { useState, useEffect } from 'react';

export default function SubscribePage() {
  const [billingType, setBillingType] = useState<'monthly' | 'annual'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number>(0);

  const goBack = () => {
    window.history.back();
  };

  const switchBilling = (type: 'monthly' | 'annual') => {
    setBillingType(type);
    setSelectedPlan(null);
    setSelectedPrice(0);
  };

  const selectPlan = (plan: string, price: number) => {
    setSelectedPlan(plan);
    setSelectedPrice(price);
  };

  const processSubscription = () => {
    if (!selectedPlan || !selectedPrice) {
      alert('Please select a subscription plan first');
      return;
    }

    alert(`💳 Processing ${selectedPlan} subscription for $${selectedPrice.toFixed(2)}...\n\nThis will connect to Stripe payment processing`);

    // TODO: Integrate with Stripe
  };

  useEffect(() => {
    // Check if user came from a blocked action
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

  return (
    <>
      <div className="body-wrapper">
        {/* Header */}
        <div className="header">
          <div className="header-content">
            <div className="back-button" onClick={goBack}>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </div>
            <div className="header-title">Subscribe to PixelCrush</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Hero */}
          <div className="hero-section">
            <h1 className="hero-title">Unlock Unlimited Conversations</h1>
            <p className="hero-subtitle">Choose the plan that works for you</p>
          </div>

          {/* Billing Toggle */}
          <div className="billing-toggle">
            <div 
              className={`billing-option ${billingType === 'monthly' ? 'active' : ''}`}
              onClick={() => switchBilling('monthly')}
            >
              Monthly
            </div>
            <div 
              className={`billing-option ${billingType === 'annual' ? 'active' : ''}`}
              onClick={() => switchBilling('annual')}
            >
              Annual
              <span className="savings-badge">Save 17%</span>
            </div>
          </div>

          {/* Plans Container */}
          <div className="plans-container">
            {/* Free Tier (Current Status) */}
            <div className="plan-card free-tier">
              <div className="plan-header">
                <div className="plan-info">
                  <div className="plan-name">Free Tier</div>
                  <div className="plan-description">Current plan</div>
                </div>
                <div className="plan-pricing">
                  <div className="plan-price">$0</div>
                  <div className="plan-period">forever</div>
                </div>
              </div>

              <div className="plan-features">
                <div className="plan-feature">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  <span><strong>10 messages</strong> total</span>
                </div>
                <div className="plan-feature">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  <span><strong>10 tokens</strong> total</span>
                </div>
                <div className="plan-feature disabled">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                  <span>No token purchases allowed</span>
                </div>
                <div className="plan-feature disabled">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                  <span>Access blocked when limits reached</span>
                </div>
              </div>
            </div>

            {/* Monthly Plan */}
            {billingType === 'monthly' && (
              <div 
                className={`plan-card ${selectedPlan === 'monthly' ? 'selected' : ''}`}
                onClick={() => selectPlan('monthly', 9.99)}
              >
                <div className="plan-header">
                  <div className="plan-info">
                    <div className="plan-name">Monthly</div>
                    <div className="plan-description">Perfect for trying out</div>
                  </div>
                  <div className="plan-pricing">
                    <div className="plan-price">$9.99</div>
                    <div className="plan-period">per month</div>
                  </div>
                </div>

                <div className="plan-features">
                  <div className="plan-feature">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    <span><strong>Unlimited messages</strong></span>
                  </div>
                  <div className="plan-feature">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    <span><strong>100 tokens/month</strong> (reset monthly)</span>
                  </div>
                  <div className="plan-feature">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    <span><strong>Purchase additional tokens</strong> anytime</span>
                  </div>
                  <div className="plan-feature">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    <span>Cancel anytime</span>
                  </div>
                </div>

                <div className="plan-highlight">
                  ⚠️ Unused tokens expire at the end of each month
                </div>
              </div>
            )}

            {/* Annual Plan */}
            {billingType === 'annual' && (
              <div 
                className={`plan-card ${selectedPlan === 'annual' ? 'selected' : ''}`}
                onClick={() => selectPlan('annual', 99.99)}
              >
                <div className="plan-header">
                  <div className="plan-info">
                    <div className="plan-name">Annual ⭐</div>
                    <div className="plan-description">Best value + rollover</div>
                  </div>
                  <div className="plan-pricing">
                    <div className="plan-price">$99.99</div>
                    <div className="plan-period">per year</div>
                  </div>
                </div>

                <div className="plan-features">
                  <div className="plan-feature">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    <span><strong>Unlimited messages</strong></span>
                  </div>
                  <div className="plan-feature">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    <span><strong>100 tokens/month</strong> (1,200 total/year)</span>
                  </div>
                  <div className="plan-feature">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    <span><strong>Unused tokens ROLL OVER</strong> each month</span>
                  </div>
                  <div className="plan-feature">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    <span><strong>Purchase additional tokens</strong> anytime</span>
                  </div>
                  <div className="plan-feature">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    <span>Save $19.89/year vs monthly</span>
                  </div>
                </div>

                <div className="plan-highlight best-value">
                  🎉 Unused tokens never expire! Build up your token bank over time.
                </div>
              </div>
            )}
          </div>

          {/* Subscribe Button */}
          <div className="subscribe-section">
            <button 
              className="subscribe-btn" 
              onClick={processSubscription}
              disabled={!selectedPlan || !selectedPrice}
            >
              {selectedPlan && selectedPrice > 0 
                ? `Subscribe for $${selectedPrice.toFixed(2)}${selectedPlan === 'monthly' ? '/mo' : '/year'}`
                : 'Select a Plan to Continue'
              }
            </button>
          </div>

          {/* Trust Badges */}
          <div className="trust-section">
            <div className="trust-text">Secure payment powered by Stripe</div>
            <div className="trust-badges">
              <div className="trust-badge">
                🔒 SSL Encrypted
              </div>
              <div className="trust-badge">
                💳 Safe Payments
              </div>
              <div className="trust-badge">
                ↩️ Cancel Anytime
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          -webkit-tap-highlight-color: transparent;
        }

        .body-wrapper {
          font-family: 'TikTok Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: #131313;
          color: white;
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          max-width: 393px;
          margin: 0 auto;
        }

        .header {
          background: #131313;
          border-bottom: 0.593px solid #363636;
          height: 64px;
          display: flex;
          align-items: center;
          padding: 0 8px;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          max-width: 393px;
          margin: 0 auto;
          z-index: 1000;
          box-shadow: 0px 1px 0px 0px rgba(0,0,0,0.05);
        }

        .header-content {
          display: flex;
          align-items: center;
          width: 100%;
          padding-left: 20px;
        }

        .back-button {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
          cursor: pointer;
        }

        .back-button svg {
          width: 20px;
          height: 20px;
          fill: white;
        }

        .header-title {
          font-weight: 600;
          font-size: 18px;
          line-height: 24px;
          color: white;
        }

        .main-content {
          flex: 1;
          margin-top: 64px;
          overflow-y: auto;
          padding: 32px 16px 24px;
        }

        .hero-section {
          text-align: center;
          margin-bottom: 32px;
        }

        .hero-title {
          font-weight: 700;
          font-size: 28px;
          line-height: 36px;
          background: linear-gradient(135deg, #FF3B9A 0%, #A445ED 50%, #4A90E2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 12px;
        }

        .hero-subtitle {
          font-size: 16px;
          line-height: 24px;
          color: rgba(255,255,255,0.7);
        }

        .billing-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 32px;
          padding: 4px;
          background: #1a1a1a;
          border-radius: 12px;
          max-width: 280px;
          margin-left: auto;
          margin-right: auto;
        }

        .billing-option {
          flex: 1;
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
        }

        .billing-option.active {
          background: linear-gradient(135deg, #FF3B9A 0%, #A445ED 100%);
          color: white;
        }

        .billing-option:not(.active) {
          color: rgba(255,255,255,0.5);
        }

        .savings-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          background: #4FAB52;
          padding: 2px 6px;
          border-radius: 6px;
          font-size: 10px;
          font-weight: 600;
        }

        .plans-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 32px;
        }

        .plan-card {
          background: #1a1a1a;
          border: 2px solid transparent;
          border-radius: 16px;
          padding: 24px;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
        }

        .plan-card:hover {
          border-color: #A445ED;
          transform: translateY(-2px);
        }

        .plan-card.selected {
          border-color: #A445ED;
          background: rgba(164, 69, 237, 0.1);
        }

        .plan-card.free-tier {
          border-color: #616162;
          cursor: default;
        }

        .plan-card.free-tier:hover {
          transform: none;
        }

        .plan-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .plan-info {
          flex: 1;
        }

        .plan-name {
          font-weight: 700;
          font-size: 20px;
          line-height: 26px;
          color: white;
          margin-bottom: 4px;
        }

        .plan-description {
          font-size: 14px;
          line-height: 20px;
          color: rgba(255,255,255,0.6);
        }

        .plan-pricing {
          text-align: right;
        }

        .plan-price {
          font-weight: 700;
          font-size: 32px;
          line-height: 40px;
          color: white;
        }

        .plan-period {
          font-size: 14px;
          line-height: 20px;
          color: rgba(255,255,255,0.6);
        }

        .plan-features {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 16px;
        }

        .plan-feature {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 14px;
          line-height: 20px;
          color: rgba(255,255,255,0.9);
        }

        .plan-feature svg {
          width: 20px;
          height: 20px;
          fill: #4FAB52;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .plan-feature.disabled {
          opacity: 0.4;
        }

        .plan-feature.disabled svg {
          fill: #616162;
        }

        .plan-highlight {
          background: rgba(79, 171, 82, 0.15);
          border: 1px solid #4FAB52;
          border-radius: 8px;
          padding: 12px;
          margin-top: 12px;
          font-size: 13px;
          line-height: 18px;
          color: #4FAB52;
          font-weight: 600;
        }

        .plan-highlight.best-value {
          background: rgba(79, 171, 82, 0.15);
          border-color: #4FAB52;
          color: #4FAB52;
        }

        .subscribe-section {
          position: sticky;
          bottom: 0;
          background: #131313;
          padding: 16px 0;
          border-top: 1px solid #363636;
        }

        .subscribe-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #FF3B9A 0%, #A445ED 50%, #4A90E2 100%);
          border: none;
          border-radius: 12px;
          font-weight: 600;
          font-size: 16px;
          color: white;
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .subscribe-btn:hover {
          transform: scale(1.02);
        }

        .subscribe-btn:active {
          transform: scale(0.98);
        }

        .subscribe-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .trust-section {
          text-align: center;
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid #363636;
        }

        .trust-text {
          font-size: 12px;
          line-height: 18px;
          color: rgba(255,255,255,0.5);
          margin-bottom: 12px;
        }

        .trust-badges {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
        }

        .trust-badge {
          font-size: 11px;
          color: rgba(255,255,255,0.4);
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .main-content::-webkit-scrollbar {
          width: 6px;
        }

        .main-content::-webkit-scrollbar-track {
          background: #131313;
        }

        .main-content::-webkit-scrollbar-thumb {
          background: #363636;
          border-radius: 3px;
        }
      `}</style>
    </>
  );
}