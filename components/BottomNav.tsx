'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav">
      <Link 
        href="/" 
        className={`nav-item ${pathname === '/' ? 'active' : ''}`}
      >
        <div className="nav-icon">🏠</div>
        <div className="nav-label">Home</div>
      </Link>
      
      <Link 
        href="/characters" 
        className={`nav-item ${pathname === '/characters' ? 'active' : ''}`}
      >
        <div className="nav-icon">👥</div>
        <div className="nav-label">Characters</div>
      </Link>
      
      <Link 
        href="/chats" 
        className={`nav-item ${pathname === '/chats' ? 'active' : ''}`}
      >
        <div className="nav-icon">💬</div>
        <div className="nav-label">Chats</div>
      </Link>
      
      <Link 
        href="/profile" 
        className={`nav-item ${pathname === '/profile' ? 'active' : ''}`}
      >
        <div className="nav-icon">👤</div>
        <div className="nav-label">Profile</div>
      </Link>

      <style jsx>{`
        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(10px);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          justify-content: space-around;
          padding: 12px 0 env(safe-area-inset-bottom);
          z-index: 100;
        }

        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          color: #999;
          text-decoration: none;
          transition: color 0.2s;
          padding: 4px 12px;
        }

        .nav-item.active {
          color: #667eea;
        }

        .nav-item:hover {
          color: #667eea;
        }

        .nav-icon {
          font-size: 24px;
        }

        .nav-label {
          font-size: 11px;
          font-weight: 500;
        }
      `}</style>
    </nav>
  );
}
