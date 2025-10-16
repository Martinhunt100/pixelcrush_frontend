'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState<'photos' | 'videos' | 'moments'>('photos');
  const [likedMoments, setLikedMoments] = useState<{[key: number]: boolean}>({0: true});

  const switchTab = (tabName: 'photos' | 'videos' | 'moments') => {
    setActiveTab(tabName);
  };

  const viewMedia = (type: string, id: number) => {
    alert(`📸 Opening ${type} viewer for item ${id}...\n\nThis will open a fullscreen media viewer`);
  };

  const toggleLike = (momentIndex: number, currentCount: number) => {
    setLikedMoments(prev => ({
      ...prev,
      [momentIndex]: !prev[momentIndex]
    }));
  };

  const commentMoment = () => {
    alert('💬 Opening comments...');
  };

  const openTokens = () => {
    window.location.href = '/tokens';
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
          {/* Tabs */}
          <div className="tabs-container">
            <div className="tabs">
              <div className={`tab ${activeTab === 'photos' ? 'active' : ''}`} onClick={() => switchTab('photos')}>Photos</div>
              <div className={`tab ${activeTab === 'videos' ? 'active' : ''}`} onClick={() => switchTab('videos')}>Videos</div>
              <div className={`tab ${activeTab === 'moments' ? 'active' : ''}`} onClick={() => switchTab('moments')}>Moments</div>
            </div>
          </div>

          <div className="collection-content">
            {/* Photos Tab */}
            <div className={`tab-content ${activeTab === 'photos' ? 'active' : ''}`} id="photos-content">
              <div className="media-grid">
                {[
                  { src: 'https://www.figma.com/api/mcp/asset/fe87f0c9-07a7-43e8-af45-605840735bd3', name: 'Paige Grey' },
                  { src: 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62', name: 'Katarina' },
                  { src: 'https://www.figma.com/api/mcp/asset/2c7a16b9-ce7c-4520-820f-3970137843bd', name: 'Lila Crazy' },
                  { src: 'https://www.figma.com/api/mcp/asset/ffd774a4-1d92-4f29-a763-f8c92c7c4e36', name: 'Luna' },
                  { src: 'https://www.figma.com/api/mcp/asset/29cf0eca-6774-40cc-a75c-4c1f82086447', name: 'Luna Moreno' },
                  { src: 'https://www.figma.com/api/mcp/asset/c89e37df-de01-43f4-a88e-4cec04df0e86', name: 'Lyra Fallon' },
                  { src: 'https://www.figma.com/api/mcp/asset/728fc790-a90a-4acf-a017-be330f3156f7', name: 'Katarina' },
                  { src: 'https://www.figma.com/api/mcp/asset/fe87f0c9-07a7-43e8-af45-605840735bd3', name: 'Paige Grey' },
                  { src: 'https://www.figma.com/api/mcp/asset/2c7a16b9-ce7c-4520-820f-3970137843bd', name: 'Lila Crazy' }
                ].map((photo, idx) => (
                  <div key={idx} className="media-item" onClick={() => viewMedia('photo', idx + 1)}>
                    <img src={photo.src} alt={`Photo ${idx + 1}`} />
                    <div className="media-item-overlay">
                      <span>{photo.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Videos Tab */}
            <div className={`tab-content ${activeTab === 'videos' ? 'active' : ''}`} id="videos-content">
              <div className="media-grid">
                {[
                  { src: 'https://www.figma.com/api/mcp/asset/d1b83c6d-57ef-4b6e-989a-7d79d46166cb', duration: '0:34' },
                  { src: 'https://www.figma.com/api/mcp/asset/fe87f0c9-07a7-43e8-af45-605840735bd3', duration: '1:12' },
                  { src: 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62', duration: '0:48' },
                  { src: 'https://www.figma.com/api/mcp/asset/2c7a16b9-ce7c-4520-820f-3970137843bd', duration: '2:05' },
                  { src: 'https://www.figma.com/api/mcp/asset/ffd774a4-1d92-4f29-a763-f8c92c7c4e36', duration: '0:27' },
                  { src: 'https://www.figma.com/api/mcp/asset/29cf0eca-6774-40cc-a75c-4c1f82086447', duration: '1:45' }
                ].map((video, idx) => (
                  <div key={idx} className="media-item" onClick={() => viewMedia('video', idx + 1)}>
                    <img src={video.src} alt={`Video ${idx + 1}`} />
                    <div className="video-indicator">
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <div className="media-item-overlay">
                      <span>{video.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Moments Tab */}
            <div className={`tab-content ${activeTab === 'moments' ? 'active' : ''}`} id="moments-content">
              <div className="moments-list">
                {[
                  {
                    avatar: 'https://www.figma.com/api/mcp/asset/fe87f0c9-07a7-43e8-af45-605840735bd3',
                    name: 'Paige Grey',
                    time: '2 hours ago',
                    media: 'https://www.figma.com/api/mcp/asset/fe87f0c9-07a7-43e8-af45-605840735bd3',
                    caption: 'Just finished an amazing conversation... feeling inspired ✨',
                    likes: 24,
                    comments: 5,
                    liked: true
                  },
                  {
                    avatar: 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62',
                    name: 'Katarina',
                    time: '5 hours ago',
                    media: 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62',
                    caption: 'Guten Tag! Beautiful day for deep conversations 🌸',
                    likes: 18,
                    comments: 3,
                    liked: false
                  },
                  {
                    avatar: 'https://www.figma.com/api/mcp/asset/2c7a16b9-ce7c-4520-820f-3970137843bd',
                    name: 'Lila Crazy',
                    time: 'Yesterday',
                    media: 'https://www.figma.com/api/mcp/asset/2c7a16b9-ce7c-4520-820f-3970137843bd',
                    caption: 'Chaos is just another word for creativity 🖤✨',
                    likes: 32,
                    comments: 8,
                    liked: false
                  }
                ].map((moment, idx) => (
                  <div key={idx} className="moment-item">
                    <div className="moment-header">
                      <img src={moment.avatar} alt={moment.name} className="moment-avatar" />
                      <div className="moment-info">
                        <div className="moment-name">{moment.name}</div>
                        <div className="moment-time">{moment.time}</div>
                      </div>
                    </div>
                    <img src={moment.media} alt="Moment" className="moment-media" />
                    <div className="moment-caption">{moment.caption}</div>
                    <div className="moment-actions">
                      <button className={`action-button ${likedMoments[idx] ? 'liked' : ''}`} onClick={() => toggleLike(idx, moment.likes)}>
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        <span>{likedMoments[idx] ? moment.likes + 1 : moment.likes}</span>
                      </button>
                      <button className="action-button" onClick={commentMoment}>
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                        </svg>
                        <span>{moment.comments}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
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
          <Link href="/gallery" className="nav-item active">
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
        }

        .tabs-container {
          background: #131313;
          border-bottom: 1px solid #363636;
          padding: 0 12px;
          position: sticky;
          top: 64px;
          z-index: 100;
        }

        .tabs {
          display: flex;
          gap: 32px;
        }

        .tab {
          padding: 16px 0;
          font-weight: 500;
          font-size: 15px;
          line-height: 20px;
          color: rgba(255,255,255,0.5);
          border-bottom: 2px solid transparent;
          cursor: pointer;
          transition: all 0.2s;
        }

        .tab.active {
          color: white;
          border-bottom-color: #A445ED;
        }

        .collection-content {
          padding: 16px 12px;
        }

        .tab-content {
          display: none;
        }

        .tab-content.active {
          display: block;
        }

        .media-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 4px;
          margin-bottom: 20px;
        }

        .media-item {
          aspect-ratio: 1;
          position: relative;
          overflow: hidden;
          border-radius: 4px;
          cursor: pointer;
        }

        .media-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.2s ease;
        }

        .media-item:hover img {
          transform: scale(1.05);
        }

        .media-item-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
          padding: 8px;
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
        }

        .media-icon {
          width: 14px;
          height: 14px;
        }

        .video-indicator {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 24px;
          height: 24px;
          background: rgba(0,0,0,0.6);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .video-indicator svg {
          width: 12px;
          height: 12px;
          fill: white;
        }

        .moments-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .moment-item {
          background: #1a1a1a;
          border-radius: 12px;
          overflow: hidden;
        }

        .moment-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
        }

        .moment-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }

        .moment-info {
          flex: 1;
        }

        .moment-name {
          font-weight: 600;
          font-size: 15px;
          line-height: 20px;
          color: white;
        }

        .moment-time {
          font-size: 13px;
          line-height: 18px;
          color: rgba(255,255,255,0.5);
        }

        .moment-media {
          width: 100%;
          aspect-ratio: 1;
          object-fit: cover;
        }

        .moment-caption {
          padding: 12px;
          font-size: 14px;
          line-height: 20px;
          color: rgba(255,255,255,0.9);
        }

        .moment-actions {
          display: flex;
          gap: 20px;
          padding: 12px;
          border-top: 1px solid rgba(255,255,255,0.1);
        }

        .action-button {
          display: flex;
          align-items: center;
          gap: 6px;
          background: none;
          border: none;
          color: rgba(255,255,255,0.7);
          cursor: pointer;
          font-size: 14px;
        }

        .action-button svg {
          width: 20px;
          height: 20px;
          fill: currentColor;
        }

        .action-button.liked {
          color: #FF3B9A;
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
