'use client';

import Link from 'next/link';

export default function AccountPage() {
  const editProfile = () => {
    alert('📝 Edit Profile - Opening profile editor...');
  };

  const manageSubscription = () => {
    alert('💎 Manage Subscription - View and change your plan');
  };

  const openTokens = () => {
    window.location.href = '/tokens';
  };

  const viewBillingHistory = () => {
    alert('🧾 Billing History - View all your transactions');
  };

  const openNotifications = () => {
    alert('🔔 Notifications - Manage notification settings');
  };

  const openPrivacy = () => {
    alert('🔒 Privacy & Safety - Manage privacy settings');
  };

  const openLanguage = () => {
    alert('🌍 Language - Select your preferred language');
  };

  const openTheme = () => {
    alert('🎨 Theme - Choose light or dark mode');
  };

  const openHelp = () => {
    alert('❓ Help Center - Get support and answers');
  };

  const openTerms = () => {
    alert('📄 Terms & Privacy - View legal information');
  };

  const openAbout = () => {
    alert('ℹ️ About - PixelCrush.ai v1.0.0');
  };

  const logout = () => {
    if (confirm('Are you sure you want to log out?')) {
      alert('👋 Logging out...');
      // TODO: Connect to backend logout API
      // window.location.href = '/login';
    }
  };

  return (
    <>
      <div className="body-wrapper">
        {/* Header */}
        <div className="header">
          <div className="header-content">
            <div className="logo">
              <img src="https://www.figma.com/api/mcp/asset/75bd6a91-1161-4217-a70b-3569d51184c9" alt="PixelCrush.ai" />
            </div>
            <div className="token-display" onClick={openTokens}>
              <div className="token-icon">
                <img src="https://www.figma.com/api/mcp/asset/896841e1-bd7c-4c52-bf10-68513b3a60fe" alt="Tokens" />
              </div>
              <div className="token-amount">0.8</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Profile Section */}
          <div className="profile-section">
            <div className="profile-avatar">M</div>
            <div className="profile-name">Martin Hunt</div>
            <div className="profile-email">martin@pixelcrush.ai</div>
            <button className="edit-profile-btn" onClick={editProfile}>Edit Profile</button>
          </div>

          {/* Stats Section */}
          <div className="stats-section">
            <div className="stat-card">
              <div className="stat-value">24</div>
              <div className="stat-label">Conversations</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">156</div>
              <div className="stat-label">Messages</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">12</div>
              <div className="stat-label">Favorites</div>
            </div>
          </div>

          {/* Subscription Section */}
          <div className="menu-section">
            <h3 className="menu-title">Subscription</h3>
            <div className="menu-list">
              <div className="menu-item" onClick={manageSubscription}>
                <div className="menu-icon">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                  </svg>
                </div>
                <div className="menu-content">
                  <div className="menu-label">Plan</div>
                  <div className="subscription-badge">
                    ✨ Premium
                  </div>
                </div>
                <div className="menu-arrow">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>

              <div className="menu-item" onClick={openTokens}>
                <div className="menu-icon">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v12M6 12h12"/>
                  </svg>
                </div>
                <div className="menu-content">
                  <div className="menu-label">Buy Tokens</div>
                  <div className="menu-value">0.8 remaining</div>
                </div>
                <div className="menu-arrow">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>

              <div className="menu-item" onClick={viewBillingHistory}>
                <div className="menu-icon">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM4 18V6h16v12H4z"/>
                    <path d="M6 10h12v2H6z"/>
                  </svg>
                </div>
                <div className="menu-content">
                  <div className="menu-label">Billing History</div>
                </div>
                <div className="menu-arrow">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Settings Section */}
          <div className="menu-section">
            <h3 className="menu-title">Settings</h3>
            <div className="menu-list">
              <div className="menu-item" onClick={openNotifications}>
                <div className="menu-icon">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/>
                  </svg>
                </div>
                <div className="menu-content">
                  <div className="menu-label">Notifications</div>
                </div>
                <div className="menu-arrow">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>

              <div className="menu-item" onClick={openPrivacy}>
                <div className="menu-icon">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/>
                  </svg>
                </div>
                <div className="menu-content">
                  <div className="menu-label">Privacy & Safety</div>
                </div>
                <div className="menu-arrow">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>

              <div className="menu-item" onClick={openLanguage}>
                <div className="menu-icon">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                </div>
                <div className="menu-content">
                  <div className="menu-label">Language</div>
                  <div className="menu-value">English</div>
                </div>
                <div className="menu-arrow">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>

              <div className="menu-item" onClick={openTheme}>
                <div className="menu-icon">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 2c-1.05 0-2.05.16-3 .46 4.06 1.27 7 5.06 7 9.54 0 4.48-2.94 8.27-7 9.54.95.3 1.95.46 3 .46 5.52 0 10-4.48 10-10S14.52 2 9 2z"/>
                  </svg>
                </div>
                <div className="menu-content">
                  <div className="menu-label">Theme</div>
                  <div className="menu-value">Dark</div>
                </div>
                <div className="menu-arrow">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Support Section */}
          <div className="menu-section">
            <h3 className="menu-title">Support</h3>
            <div className="menu-list">
              <div className="menu-item" onClick={openHelp}>
                <div className="menu-icon">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
                  </svg>
                </div>
                <div className="menu-content">
                  <div className="menu-label">Help Center</div>
                </div>
                <div className="menu-arrow">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>

              <div className="menu-item" onClick={openTerms}>
                <div className="menu-icon">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/>
                  </svg>
                </div>
                <div className="menu-content">
                  <div className="menu-label">Terms & Privacy</div>
                </div>
                <div className="menu-arrow">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>

              <div className="menu-item" onClick={openAbout}>
                <div className="menu-icon">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                  </svg>
                </div>
                <div className="menu-content">
                  <div className="menu-label">About</div>
                  <div className="menu-value">v1.0.0</div>
                </div>
                <div className="menu-arrow">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Logout Section */}
          <div className="logout-section">
            <button className="logout-btn" onClick={logout}>Log Out</button>
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
          <Link href="/account" className="nav-item active">
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

        .logo {
          width: 87px;
          height: 37px;
        }

        .logo img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .token-display {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6.593px 16.593px;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 8px;
          cursor: pointer;
          opacity: 0.6;
        }

        .token-icon {
          width: 30px;
          height: 30px;
        }

        .token-icon img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .token-amount {
          font-size: 16px;
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

        .profile-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px 0;
          border-bottom: 1px solid #363636;
          margin-bottom: 24px;
        }

        .profile-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #FF3B9A 0%, #A445ED 50%, #4A90E2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .profile-name {
          font-weight: 600;
          font-size: 20px;
          line-height: 26px;
          color: white;
          margin-bottom: 4px;
        }

        .profile-email {
          font-size: 14px;
          line-height: 20px;
          color: rgba(255,255,255,0.6);
          margin-bottom: 16px;
        }

        .edit-profile-btn {
          padding: 8px 24px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 20px;
          font-size: 14px;
          color: white;
          cursor: pointer;
        }

        .stats-section {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }

        .stat-card {
          background: #1a1a1a;
          border-radius: 12px;
          padding: 16px;
          text-align: center;
        }

        .stat-value {
          font-weight: 600;
          font-size: 24px;
          line-height: 32px;
          background: linear-gradient(135deg, #FF3B9A 0%, #A445ED 50%, #4A90E2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 4px;
        }

        .stat-label {
          font-size: 12px;
          line-height: 16px;
          color: rgba(255,255,255,0.6);
        }

        .menu-section {
          margin-bottom: 24px;
        }

        .menu-title {
          font-weight: 600;
          font-size: 14px;
          line-height: 20px;
          color: rgba(255,255,255,0.5);
          text-transform: uppercase;
          margin-bottom: 12px;
          padding: 0 4px;
        }

        .menu-list {
          background: #1a1a1a;
          border-radius: 12px;
          overflow: hidden;
        }

        .menu-item {
          display: flex;
          align-items: center;
          padding: 16px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          cursor: pointer;
          transition: background 0.2s;
        }

        .menu-item:last-child {
          border-bottom: none;
        }

        .menu-item:hover {
          background: rgba(255,255,255,0.05);
        }

        .menu-item:active {
          background: rgba(255,255,255,0.08);
        }

        .menu-icon {
          width: 24px;
          height: 24px;
          margin-right: 16px;
          color: rgba(255,255,255,0.7);
        }

        .menu-icon svg {
          width: 100%;
          height: 100%;
          fill: currentColor;
        }

        .menu-content {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .menu-label {
          font-size: 15px;
          line-height: 20px;
          color: white;
        }

        .menu-value {
          font-size: 14px;
          line-height: 20px;
          color: rgba(255,255,255,0.5);
        }

        .menu-arrow {
          width: 20px;
          height: 20px;
          margin-left: 12px;
          color: rgba(255,255,255,0.3);
        }

        .menu-arrow svg {
          width: 100%;
          height: 100%;
          fill: currentColor;
        }

        .subscription-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          background: linear-gradient(135deg, #FF3B9A 0%, #A445ED 100%);
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
        }

        .logout-section {
          margin-top: 32px;
        }

        .logout-btn {
          width: 100%;
          padding: 16px;
          background: rgba(255,59,154,0.1);
          border: 1px solid rgba(255,59,154,0.3);
          border-radius: 12px;
          font-size: 15px;
          font-weight: 500;
          color: #FF3B9A;
          cursor: pointer;
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