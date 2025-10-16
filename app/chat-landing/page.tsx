'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';

export default function ChatLandingPage() {
  const conversations = [
    {
      id: 1,
      characterId: 1,
      characterName: "Paige Grey",
      characterImage: "https://imagedelivery.net/1jofzuZbO-j3cbnn4BjhZQ/6bd3e7a4-8a11-43e5-77ad-bec58f750500/public",
      lastMessage: "That sounds amazing! Tell me more about it 😊",
      timestamp: "2m ago",
      unread: 3,
      online: true
    },
    {
      id: 2,
      characterId: 2,
      characterName: "Katarina",
      characterImage: "https://imagedelivery.net/1jofzuZbO-j3cbnn4BjhZQ/3f7d97f4-a2d8-4e72-0619-02feb3753500/public",
      lastMessage: "I've been thinking about you all day 💕",
      timestamp: "1h ago",
      unread: 1,
      online: true
    },
    {
      id: 3,
      characterId: 3,
      characterName: "Lila Crazy",
      characterImage: "https://imagedelivery.net/1jofzuZbO-j3cbnn4BjhZQ/55ee81dc-f1e8-4d54-ea2c-a5c9cbb34e00/public",
      lastMessage: "You won't believe what just happened! 🎉",
      timestamp: "3h ago",
      unread: 0,
      online: false
    },
    {
      id: 4,
      characterId: 4,
      characterName: "Sophia Chen",
      characterImage: "https://imagedelivery.net/1jofzuZbO-j3cbnn4BjhZQ/8a2f3c1d-9e4b-4a5c-b6d7-e8f9a0b1c2d3/public",
      lastMessage: "I found that article you were looking for",
      timestamp: "Yesterday",
      unread: 0,
      online: false
    },
    {
      id: 5,
      characterId: 5,
      characterName: "Emma Rose",
      characterImage: "https://imagedelivery.net/1jofzuZbO-j3cbnn4BjhZQ/1b2c3d4e-5f6a-7b8c-9d0e-1f2a3b4c5d6e/public",
      lastMessage: "Good morning! How are you today? ☀️",
      timestamp: "Yesterday",
      unread: 0,
      online: false
    }
  ];

  return (
    <div className="app-container">
      <Header />

      <main className="main-content">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Messages</h1>
          <p className="page-subtitle">Continue your conversations</p>
        </div>

        {/* Conversations List */}
        <div className="conversations-list">
          {conversations.map((conv) => (
            <Link
              key={conv.id}
              href={`/chat?character=${conv.characterId}`}
              className="conversation-item"
            >
              <div className="conversation-avatar-wrapper">
                <img 
                  src={conv.characterImage} 
                  alt={conv.characterName}
                  className="conversation-avatar"
                />
                {conv.online && <span className="online-indicator" />}
              </div>

              <div className="conversation-content">
                <div className="conversation-header">
                  <h3 className="conversation-name">{conv.characterName}</h3>
                  <span className="conversation-time">{conv.timestamp}</span>
                </div>
                <div className="conversation-footer">
                  <p className="conversation-message">{conv.lastMessage}</p>
                  {conv.unread > 0 && (
                    <span className="unread-badge">{conv.unread}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State (when no conversations) */}
        {conversations.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">💬</div>
            <h3>No conversations yet</h3>
            <p>Start chatting with your favorite characters!</p>
            <Link href="/characters" className="start-chat-button">
              Browse Characters
            </Link>
          </div>
        )}
      </main>

      <BottomNav />

      <style jsx>{`
        .page-header {
          padding: 24px 20px 16px;
        }

        .page-title {
          font-size: 28px;
          font-weight: 700;
          color: white;
          margin-bottom: 4px;
        }

        .page-subtitle {
          font-size: 15px;
          color: #999;
        }

        .conversations-list {
          padding: 0;
        }

        .conversation-item {
          display: flex;
          gap: 14px;
          padding: 16px 20px;
          text-decoration: none;
          border-bottom: 1px solid #2a2a2a;
          transition: background 0.2s;
        }

        .conversation-item:hover {
          background: #1e1e1e;
        }

        .conversation-item:active {
          background: #252525;
        }

        .conversation-avatar-wrapper {
          position: relative;
          flex-shrink: 0;
        }

        .conversation-avatar {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          object-fit: cover;
        }

        .online-indicator {
          position: absolute;
          bottom: 2px;
          right: 2px;
          width: 14px;
          height: 14px;
          background: #4ade80;
          border: 2px solid #131313;
          border-radius: 50%;
        }

        .conversation-content {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .conversation-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
        }

        .conversation-name {
          font-size: 16px;
          font-weight: 600;
          color: white;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .conversation-time {
          font-size: 13px;
          color: #666;
          flex-shrink: 0;
        }

        .conversation-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
        }

        .conversation-message {
          font-size: 14px;
          color: #999;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          flex: 1;
        }

        .unread-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 20px;
          height: 20px;
          padding: 0 6px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          font-size: 12px;
          font-weight: 600;
          border-radius: 10px;
          flex-shrink: 0;
        }

        .empty-state {
          text-align: center;
          padding: 80px 20px;
        }

        .empty-icon {
          font-size: 64px;
          margin-bottom: 16px;
        }

        .empty-state h3 {
          font-size: 20px;
          font-weight: 600;
          color: white;
          margin-bottom: 8px;
        }

        .empty-state p {
          font-size: 14px;
          color: #999;
          margin-bottom: 24px;
        }

        .start-chat-button {
          display: inline-block;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 12px 28px;
          border-radius: 25px;
          font-weight: 600;
          text-decoration: none;
          transition: transform 0.2s;
        }

        .start-chat-button:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}