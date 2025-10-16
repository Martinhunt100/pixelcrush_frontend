'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="app-header">
      <div className="header-content">
        <Link href="/" className="logo">
          PixelCrush<span className="logo-ai">.ai</span>
        </Link>
        <nav className="header-nav">
          <Link href="/login" className="nav-link">Login</Link>
        </nav>
      </div>

      <style jsx>{`
        .app-header {
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          max-width: 390px;
          margin: 0 auto;
        }

        .logo {
          font-size: 24px;
          font-weight: 700;
          color: white;
          text-decoration: none;
        }

        .logo-ai {
          color: #667eea;
        }

        .header-nav {
          display: flex;
          gap: 16px;
          align-items: center;
        }

        .nav-link {
          color: white;
          text-decoration: none;
          font-weight: 500;
          font-size: 14px;
          transition: opacity 0.2s;
        }

        .nav-link:hover {
          opacity: 0.8;
        }
      `}</style>
    </header>
  );
}
