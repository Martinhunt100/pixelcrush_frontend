'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/',
      icon: '🏠',
      label: 'Home',
      active: pathname === '/'
    },
    {
      href: '/characters',
      icon: '👥',
      label: 'Characters',
      active: pathname === '/characters'
    },
    {
      href: '/chat-landing',
      icon: '💬',
      label: 'Chats',
      active: pathname === '/chat-landing' || pathname.startsWith('/chat')
    },
    {
      href: '/gallery',
      icon: '📸',
      label: 'Gallery',
      active: pathname === '/gallery'
    },
    {
      href: '/account',
      icon: '👤',
      label: 'Account',
      active: pathname === '/account'
    }
  ];

  // Hide bottom nav on certain pages
  const hideBottomNav = pathname.startsWith('/chat/') || pathname === '/tokens' || pathname === '/subscribe';

  if (hideBottomNav) return null;

  return (
    <>
      <nav className="bottom-nav">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`nav-item ${item.active ? 'active' : ''}`}
          >
            <div className="nav-icon">{item.icon}</div>
            <span className="nav-label">{item.label}</span>
          </Link>
        ))}
      </nav>

      <style jsx>{`
        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: #1e1e1e;
          border-top: 1px solid #2a2a2a;
          display: flex;
          justify-content: space-around;
          padding: 8px 0 max(8px, env(safe-area-inset-bottom));
          z-index: 1000;
          max-width: 393px;
          margin: 0 auto;
        }

        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          text-decoration: none;
          color: #666;
          transition: all 0.3s;
          padding: 4px 12px;
          border-radius: 12px;
          min-width: 60px;
        }

        .nav-item:hover {
          background: rgba(102, 126, 234, 0.1);
        }

        .nav-item.active {
          color: white;
        }

        .nav-item.active .nav-icon {
          transform: scale(1.1);
        }

        .nav-icon {
          font-size: 24px;
          transition: transform 0.3s;
        }

        .nav-label {
          font-size: 11px;
          font-weight: 500;
          transition: color 0.3s;
        }

        .nav-item.active .nav-label {
          color: #667eea;
        }

        @media (max-width: 393px) {
          .nav-item {
            padding: 4px 8px;
            min-width: 50px;
          }

          .nav-icon {
            font-size: 22px;
          }

          .nav-label {
            font-size: 10px;
          }
        }
      `}</style>
    </>
  );
}