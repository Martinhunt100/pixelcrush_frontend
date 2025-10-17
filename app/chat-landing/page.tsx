'use client';

import { useState } from 'react';

export default function ChatLandingPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const chats = [
    {
      id: 'paige-grey',
      name: 'Paige Grey',
      preview: "I usually don't go out or talk to...",
      time: '4:47PM',
      avatar: 'https://www.figma.com/api/mcp/asset/fe87f0c9-07a7-43e8-af45-605840735bd3'
    },
    {
      id: 'katarina-sommerfeld',
      name: 'Katarina Sommerfeld',
      preview: "Hallo! You're not from around...",
      time: '5:24PM',
      avatar: 'https://www.figma.com/api/mcp/asset/728fc790-a90a-4acf-a017-be330f3156f7'
    },
    {
      id: 'lila-crazy',
      name: 'Lila Crazy',
      preview: "Well, if you're looking for somet...",
      time: '2:32PM',
      avatar: 'https://www.figma.com/api/mcp/asset/2c7a16b9-ce7c-4520-820f-3970137843bd'
    },
    {
      id: 'luna-moreno',
      name: 'Luna Moreno',
      preview: 'Oh! Sorry, I was lost in this pas...',
      time: '7:18PM',
      avatar: 'https://www.figma.com/api/mcp/asset/29cf0eca-6774-40cc-a75c-4c1f82086447'
    },
    {
      id: 'lyra-fallon',
      name: 'Lyra Fallon',
      preview: "You don't look like someone w...",
      time: '1:28PM',
      avatar: 'https://www.figma.com/api/mcp/asset/c89e37df-de01-43f4-a88e-4cec04df0e86'
    }
  ];

  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.preview.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenChat = (characterSlug) => {
    window.location.href = `/chat?character=${characterSlug}`;
  };

  const handleMarkAsRead = (e, characterSlug) => {
    e.stopPropagation();
    console.log('Marking as read:', characterSlug);
  };

  const handleDeleteChat = (e, characterSlug, chatName) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this chat?')) {
      console.log('Deleting chat:', characterSlug);
      // TODO: Implement actual deletion
    }
  };

  const handleStartNewChat = () => {
    window.location.href = '/';
  };

  const handleOpenTokens = () => {
    window.location.href = '/tokens';
  };

  return (
    <>
      <div className="page-wrapper">
        {/* Header */}
        <div className="header">
          <div className="header-content">
            <div className="logo">
              <img src="https://www.figma.com/api/mcp/asset/75bd6a91-1161-4217-a70b-3569d51184c9" alt="PixelCrush.ai" />
            </div>
            <div className="token-display" onClick={handleOpenTokens}>
              <div className="token-icon">
                <img src="https://www.figma.com/api/mcp/asset/896841e1-bd7c-4c52-bf10-68513b3a60fe" alt="Tokens" />
              </div>
              <div className="token-amount">0.8</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="chat-list-container">
            {/* Header */}
            <div className="chat-list-header">
              <h1 className="chat-title">Chat</h1>
            </div>

            {/* Search */}
            <div className="search-container">
              <svg className="search-icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 19L14.65 14.65" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input 
                type="text" 
                className="search-input" 
                placeholder="Search for a profile..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Chat List */}
            {filteredChats.length > 0 ? (
              <div className="chat-list">
                {filteredChats.map((chat) => (
                  <div key={chat.id} className="chat-item" onClick={() => handleOpenChat(chat.id)}>
                    <img src={chat.avatar} alt={chat.name} className="chat-avatar" />
                    <div className="chat-info">
                      <div className="chat-name">{chat.name}</div>
                      <div className="chat-preview">{chat.preview}</div>
                    </div>
                    <div className="chat-meta">
                      <div className="chat-time">{chat.time}</div>
                      <div className="chat-actions">
                        <button className="action-btn" onClick={(e) => handleMarkAsRead(e, chat.id)} aria-label="Mark as read">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 3L6 10L3 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                        <button className="action-btn" onClick={(e) => handleDeleteChat(e, chat.id, chat.name)} aria-label="Delete chat">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 4H14M12.6667 4V13.3333C12.6667 14 12 14.6667 11.3333 14.6667H4.66667C4 14.6667 3.33333 14 3.33333 13.3333V4M5.33333 4V2.66667C5.33333 2 6 1.33333 6.66667 1.33333H9.33333C10 1.33333 10.6667 2 10.6667 2.66667V4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* New Chat Item */}
                <div className="new-chat-item" onClick={handleStartNewChat}>
                  <div className="new-chat-icon">➕</div>
                  <div className="new-chat-info">
                    <div className="new-chat-text">Start a new chat by clicking here and selecting a new character</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">💬</div>
                <div className="empty-state-text">No chats found. Try a different search!</div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="bottom-nav">
          <a href="/characters" className="nav-item">
            <div className="nav-icon">
              <img src="https://www.figma.com/api/mcp/asset/6e8a5d93-897f-4d7e-98c9-9a28d2cab5d0" alt="Characters" />
            </div>
            <div className="nav-label">Characters</div>
          </a>
          <a href="/chat-landing" className="nav-item active">
            <div className="nav-icon">
              <img src="https://www.figma.com/api/mcp/asset/6c92bf79-791c-4aa0-86ea-92a4bd2963d9" alt="Chat" />
            </div>
            <div className="nav-label">Chat</div>
          </a>
          <a href="/voice" className="nav-item">
            <div className="nav-icon">
              <img src="https://www.figma.com/api/mcp/asset/b84a345c-6523-432d-beb0-df74be777edc" alt="Voice Call" />
            </div>
            <div className="nav-label">Voice Call</div>
          </a>
          <a href="/collection" className="nav-item">
            <div className="nav-icon">
              <img src="https://www.figma.com/api/mcp/asset/789f6323-9b48-419c-a0b1-26f69bb5b3d0" alt="Collection" />
            </div>
            <div className="nav-label">Collection</div>
          </a>
          <a href="/account" className="nav-item">
            <div className="nav-icon">
              <img src="https://www.figma.com/api/mcp/asset/c9bfdd57-ef2c-41ab-8bc7-060adde3d152" alt="Account" />
            </div>
            <div className="nav-label">Account</div>
          </a>
        </div>
      </div>

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .page-wrapper {
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: #131313;
          color: white;
          min-height: 100vh;
          max-width: 393px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
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
          transition: opacity 0.2s;
        }

        .token-display:hover {
          opacity: 0.8;
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
          font-family: 'Poppins', sans-serif;
          font-size: 16px;
          line-height: 24px;
          color: white;
        }

        .main-content {
          flex: 1;
          margin-top: 64px;
          margin-bottom: 78px;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }

        .chat-list-container {
          padding: 24px 12px;
        }

        .chat-list-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }

        .chat-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: 24px;
          line-height: 34px;
          color: white;
          margin: 0;
        }

        .search-container {
          margin-bottom: 16px;
          position: relative;
        }

        .search-input {
          width: 100%;
          height: 48px;
          background: #1a1a1a;
          border: none;
          border-radius: 6px;
          padding: 12px 12px 12px 40px;
          font-family: 'Poppins', sans-serif;
          font-size: 16px;
          color: white;
          outline: none;
        }

        .search-input::placeholder {
          color: #99a1af;
        }

        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 20px;
          height: 20px;
          opacity: 0.5;
        }

        .chat-list {
          display: flex;
          flex-direction: column;
        }

        .chat-item {
          background: #303030;
          border-radius: 10px;
          padding: 8px;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .chat-item:hover {
          transform: scale(1.01);
        }

        .chat-item:active {
          transform: scale(0.99);
        }

        .chat-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          object-fit: cover;
          flex-shrink: 0;
        }

        .chat-info {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .chat-name {
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          font-size: 14px;
          line-height: 21px;
          color: white;
          margin: 0;
        }

        .chat-preview {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: 13px;
          line-height: 20px;
          color: rgba(255,255,255,0.75);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin: 0;
        }

        .chat-meta {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 8px;
          flex-shrink: 0;
        }

        .chat-time {
          font-family: 'Poppins', sans-serif;
          font-weight: 300;
          font-size: 13px;
          line-height: 20px;
          color: rgba(255,255,255,0.75);
        }

        .chat-actions {
          display: flex;
          gap: 4px;
        }

        .action-btn {
          width: 16px;
          height: 16px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          opacity: 0.7;
          transition: opacity 0.2s;
        }

        .action-btn:hover {
          opacity: 1;
        }

        .new-chat-item {
          background: #303030;
          border-radius: 10px;
          padding: 8px;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: transform 0.2s ease;
          border: 2px dashed rgba(255,255,255,0.3);
        }

        .new-chat-item:hover {
          transform: scale(1.01);
          border-color: rgba(255,255,255,0.5);
        }

        .new-chat-item:active {
          transform: scale(0.99);
        }

        .new-chat-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, #FF3B9A 0%, #A445ED 50%, #4A90E2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          flex-shrink: 0;
        }

        .new-chat-info {
          flex: 1;
          min-width: 0;
        }

        .new-chat-text {
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          font-size: 14px;
          line-height: 21px;
          color: white;
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
        }

        .empty-state-icon {
          font-size: 64px;
          margin-bottom: 16px;
          opacity: 0.3;
        }

        .empty-state-text {
          font-family: 'Poppins', sans-serif;
          font-size: 16px;
          line-height: 24px;
          color: rgba(255,255,255,0.5);
          margin: 0;
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
          font-family: 'Poppins', sans-serif;
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