'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function TokensPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number>(0);

  const goBack = () => {
    window.history.back();
  };

  const selectPackage = (id: string, price: number) => {
    setSelectedType('package');
    setSelectedId(id);
    setSelectedPrice(price);
  };

  const processPurchase = () => {
    if (!selectedType || !selectedPrice) {
      alert('Please select a package or plan first');
      return;
    }

    alert(`💳 Processing payment for $${selectedPrice.toFixed(2)}...\n\nThis will connect to Stripe payment processing`);

    // TODO: Integrate with Stripe
  };

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
            <div className="header-title">Buy Tokens</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Current Balance */}
          <div className="balance-card">
            <div className="balance-label">Your Current Balance</div>
            <div className="balance-amount">
              <img src="https://www.figma.com/api/mcp/asset/896841e1-bd7c-4c52-bf10-68513b3a60fe" alt="Token" className="token-icon-large" />
              <span>0.8</span>
            </div>
          </div>

          {/* Subscription Note */}
          <div className="info-card">
            <div className="info-title">💡 Subscribers Only</div>
            <div className="info-text">Token purchases are available exclusively for subscribers. Subscribe to unlock token purchases and get 100 tokens included every month!</div>
          </div>

          {/* Token Packages */}
          <h2 className="section-title">Token Packages</h2>
          <div className="packages-grid">
            <div 
              className={`package-card ${selectedId === 'starter' ? 'selected' : ''}`}
              onClick={() => selectPackage('starter', 4.99)}
            >
              <div className="package-amount">50</div>
              <div className="package-tokens">tokens</div>
              <div className="package-price">$4.99</div>
            </div>

            <div 
              className={`package-card ${selectedId === 'standard' ? 'selected' : ''}`}
              onClick={() => selectPackage('standard', 12.99)}
            >
              <div className="package-amount">150</div>
              <div className="package-tokens">tokens</div>
              <div className="package-price">$12.99</div>
              <div className="package-bonus">Save 13%</div>
            </div>

            <div 
              className={`package-card ${selectedId === 'premium' ? 'selected' : ''}`}
              onClick={() => selectPackage('premium', 39.99)}
            >
              <div className="package-amount">500</div>
              <div className="package-tokens">tokens</div>
              <div className="package-price">$39.99</div>
              <div className="package-bonus">Save 20%</div>
            </div>

            <div 
              className={`package-card popular ${selectedId === 'power' ? 'selected' : ''}`}
              onClick={() => selectPackage('power', 59.00)}
            >
              <div className="popular-badge">Most Popular</div>
              <div className="package-amount">1000</div>
              <div className="package-tokens">tokens</div>
              <div className="package-price">$59.00</div>
              <div className="package-bonus">Save 41%</div>
            </div>

            <div 
              className={`package-card ${selectedId === 'ultimate' ? 'selected' : ''}`}
              onClick={() => selectPackage('ultimate', 109.00)}
            >
              <div className="package-amount">2000</div>
              <div className="package-tokens">tokens</div>
              <div className="package-price">$109.00</div>
              <div className="package-bonus">Save 45%</div>
            </div>

            <div 
              className={`package-card best-savings ${selectedId === 'mega' ? 'selected' : ''}`}
              onClick={() => selectPackage('mega', 239.00)}
            >
              <div className="popular-badge best-savings-badge">Best Savings</div>
              <div className="package-amount">5000</div>
              <div className="package-tokens">tokens</div>
              <div className="package-price">$239.00</div>
              <div className="package-bonus">Save 52%</div>
            </div>
          </div>

          {/* Subscriber Requirement Notice */}
          <div className="info-card" style={{ marginTop: '24px' }}>
            <div className="info-title">🔒 Subscriber Benefit</div>
            <div className="info-text">
              Not a subscriber yet? <Link href="/subscribe" style={{ color: '#A445ED', fontWeight: 600 }}>Subscribe now</Link> to unlock token purchases and receive 100 tokens monthly.
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="bottom-nav">
          <Link href="/characters" className="nav-item">
            <div className="nav-icon">
              <img src="https://www.figma.com/api/mcp/asset/6e8a5d93-897f-4d7e-98c9-9a28d2cab5d0" alt="Characters" />
            </div>
            <div className="nav-label">Characters</div>
          </Link>
          <Link href="/chat" className="nav-item">
            <div className="nav-icon">
              <img src="https://www.figma.com/api/mcp/asset/6c92bf79-791c-4aa0-86ea-92a4bd2963d9" alt="Chat" />
            </div>
            <div className="nav-label">Chat</div>
          </Link>
          <Link href="/voice" className="nav-item">
            <div className="nav-icon">
              <img src="https://www.figma.com/api/mcp/asset/b84a345c-6523-432d-beb0-df74be777edc" alt="Voice Call" />
            </div>
            <div className="nav-label">Voice Call</div>
          </Link>
          <Link href="/gallery" className="nav-item">
            <div className="nav-icon">
              <img src="https://www.figma.com/api/mcp/asset/789f6323-9b48-419c-a0b1-26f69bb5b3d0" alt="Gallery" />
            </div>
            <div className="nav-label">Gallery</div>
          </Link>
          <Link href="/account" className="nav-item">
            <div className="nav-icon">
              <img src="https://www.figma.com/api/mcp/asset/c9bfdd57-ef2c-41ab-8bc7-060adde3d152" alt="Account" />
            </div>
            <div className="nav-label">Account</div>
          </Link>
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
          margin-bottom: 78px;
          overflow-y: auto;
          padding: 24px 12px;
        }

        .balance-card {
          background: linear-gradient(135deg, #FF3B9A 0%, #A445ED 50%, #4A90E2 100%);
          border-radius: 16px;
          padding: 24px;
          text-align: center;
          margin-bottom: 32px;
          box-shadow: 0px 8px 24px rgba(164, 69, 237, 0.3);
        }

        .balance-label {
          font-size: 14px;
          line-height: 20px;
          color: rgba(255,255,255,0.8);
          margin-bottom: 8px;
        }

        .balance-amount {
          font-weight: 700;
          font-size: 48px;
          line-height: 56px;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .token-icon-large {
          width: 48px;
          height: 48px;
        }

        .section-title {
          font-weight: 600;
          font-size: 20px;
          line-height: 26px;
          color: white;
          margin-bottom: 16px;
        }

        .packages-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-bottom: 32px;
        }

        .package-card {
          background: #1a1a1a;
          border: 2px solid transparent;
          border-radius: 16px;
          padding: 20px 16px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
        }

        .package-card:hover {
          transform: translateY(-2px);
          border-color: #A445ED;
        }

        .package-card.selected {
          border-color: #A445ED;
          background: rgba(164, 69, 237, 0.1);
        }

        .package-card.popular {
          border-color: #FF3B9A;
        }

        .package-card.best-savings {
          border-color: #4FAB52;
        }

        .popular-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, #FF3B9A 0%, #A445ED 100%);
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .best-savings-badge {
          background: linear-gradient(135deg, #4FAB52 0%, #3d8b40 100%);
        }

        .package-amount {
          font-weight: 700;
          font-size: 32px;
          line-height: 40px;
          color: white;
          margin-bottom: 8px;
        }

        .package-tokens {
          font-size: 14px;
          line-height: 20px;
          color: rgba(255,255,255,0.6);
          margin-bottom: 12px;
        }

        .package-price {
          font-weight: 600;
          font-size: 18px;
          line-height: 24px;
          color: white;
        }

        .package-bonus {
          display: inline-block;
          margin-top: 8px;
          padding: 4px 8px;
          background: rgba(79, 171, 82, 0.2);
          border-radius: 8px;
          font-size: 12px;
          color: #4FAB52;
          font-weight: 600;
        }

        .info-card {
          background: rgba(164, 69, 237, 0.1);
          border: 1px solid rgba(164, 69, 237, 0.3);
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 24px;
        }

        .info-title {
          font-weight: 600;
          font-size: 15px;
          line-height: 20px;
          color: white;
          margin-bottom: 8px;
        }

        .info-text {
          font-size: 13px;
          line-height: 18px;
          color: rgba(255,255,255,0.7);
        }

        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          max-width: 393px;
          margin: 0 auto;
          background: #131313;
          border-top: 0.593px solid rgba(255,255,255,0.2);
          height: 78px;
          display: flex;
          justify-content: space-around;
          align-items: flex-start;
          padding: 8px 12px;
          z-index: 1000;
        }

        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-decoration: none;
          color: rgba(255,255,255,0.7);
        }

        .nav-item.active {
          color: white;
        }

        .nav-icon {
          height: 44px;
          width: 30px;
          margin-bottom: 0;
        }

        .nav-icon img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .nav-label {
          font-size: 10px;
          line-height: 15px;
          margin-top: -1px;
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