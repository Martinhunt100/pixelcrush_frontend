'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [tokens, setTokens] = useState(250);

  // Pages that should show back button instead of logo
  const showBackButton = ['/tokens', '/subscribe'].includes(pathname);

  // Pages that should hide the header completely
  const hideHeader = pathname.startsWith('/chat') && pathname !== '/chat-landing';

  // Mock token update - replace with real API call
  useEffect(() => {
    // TODO: Fetch actual token count from API
    // const fetchTokens = async () => {
    //   const response = await fetch('/api/users/tokens');
    //   const data = await response.json();
    //   setTokens(data.tokens);
    // };
    // fetchTokens();
  }, []);

  if (hideHeader) return null;

  return (
    <>
      <header className="header">
        <div className="header-content">
          {showBackButton ? (
            <button 
              onClick={() => window.history.back()} 
              className="back-button"
            >
              ←
            </button>
          ) : (
            <Link href="/" className="logo">
              <span className="logo-text">PixelCrush</span>
              <span className="logo-dot">.</span>
              <span className="logo-ai">ai</span>
            </Link>
          )}

          <Link href="/tokens" className="token-display">
            <span className="token-icon">⚡</span>
            <span className="token-count">{tokens}</span>
          </Link>
        </div>
      </header>

      <style jsx>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: #1e1e1e;
          border-bottom: 1px solid #2a2a2a;
          z-index: 1000;
          max-width: 393px;
          margin: 0 auto;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          height: 64px;
        }

        .logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          font-size: 22px;
          font-weight: 700;
          transition: opacity 0.3s;
        }

        .logo:hover {
          opacity: 0.8;
        }

        .logo-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .logo-dot {
          color: #667eea;
          margin: 0 2px;
        }

        .logo-ai {
          color: white;
        }

        .back-button {
          background: none;
          border: none;
          color: white;
          font-size: 28px;
          cursor: pointer;
          padding: 0;
          line-height: 1;
          transition: transform 0.2s;
        }

        .back-button:hover {
          transform: translateX(-2px);
        }

        .token-display {
          display: flex;
          align-items: center;
          gap: 6px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 8px 16px;
          border-radius: 20px;
          text-decoration: none;
          transition: transform 0.2s;
        }

        .token-display:hover {
          transform: scale(1.05);
        }

        .token-icon {
          font-size: 16px;
        }

        .token-count {
          color: white;
          font-weight: 600;
          font-size: 15px;
        }
      `}</style>
    </>
  );
}