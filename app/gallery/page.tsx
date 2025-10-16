'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState<'photos' | 'videos' | 'moments'>('photos');

  const photos = [
    {
      id: 1,
      url: "https://imagedelivery.net/1jofzuZbO-j3cbnn4BjhZQ/6bd3e7a4-8a11-43e5-77ad-bec58f750500/public",
      characterName: "Paige Grey"
    },
    {
      id: 2,
      url: "https://imagedelivery.net/1jofzuZbO-j3cbnn4BjhZQ/3f7d97f4-a2d8-4e72-0619-02feb3753500/public",
      characterName: "Katarina"
    },
    {
      id: 3,
      url: "https://imagedelivery.net/1jofzuZbO-j3cbnn4BjhZQ/55ee81dc-f1e8-4d54-ea2c-a5c9cbb34e00/public",
      characterName: "Lila Crazy"
    },
    {
      id: 4,
      url: "https://imagedelivery.net/1jofzuZbO-j3cbnn4BjhZQ/8a2f3c1d-9e4b-4a5c-b6d7-e8f9a0b1c2d3/public",
      characterName: "Sophia Chen"
    },
    {
      id: 5,
      url: "https://imagedelivery.net/1jofzuZbO-j3cbnn4BjhZQ/1b2c3d4e-5f6a-7b8c-9d0e-1f2a3b4c5d6e/public",
      characterName: "Emma Rose"
    },
    {
      id: 6,
      url: "https://imagedelivery.net/1jofzuZbO-j3cbnn4BjhZQ/2c3d4e5f-6a7b-8c9d-0e1f-2a3b4c5d6e7f/public",
      characterName: "Isabella Storm"
    },
    {
      id: 7,
      url: "https://imagedelivery.net/1jofzuZbO-j3cbnn4BjhZQ/6bd3e7a4-8a11-43e5-77ad-bec58f750500/public",
      characterName: "Paige Grey"
    },
    {
      id: 8,
      url: "https://imagedelivery.net/1jofzuZbO-j3cbnn4BjhZQ/3f7d97f4-a2d8-4e72-0619-02feb3753500/public",
      characterName: "Katarina"
    },
    {
      id: 9,
      url: "https://imagedelivery.net/1jofzuZbO-j3cbnn4BjhZQ/55ee81dc-f1e8-4d54-ea2c-a5c9cbb34e00/public",
      characterName: "Lila Crazy"
    }
  ];

  const videos = [
    {
      id: 1,
      thumbnail: "https://imagedelivery.net/1jofzuZbO-j3cbnn4BjhZQ/6bd3e7a4-8a11-43e5-77ad-bec58f750500/public",
      characterName: "Paige Grey",
      duration: "0:15"
    },
    {
      id: 2,
      thumbnail: "https://imagedelivery.net/1jofzuZbO-j3cbnn4BjhZQ/3f7d97f4-a2d8-4e72-0619-02feb3753500/public",
      characterName: "Katarina",
      duration: "0:22"
    },
    {
      id: 3,
      thumbnail: "https://imagedelivery.net/1jofzuZbO-j3cbnn4BjhZQ/55ee81dc-f1e8-4d54-ea2c-a5c9cbb34e00/public",
      characterName: "Lila Crazy",
      duration: "0:18"
    },
    {
      id: 4,
      thumbnail: "https://imagedelivery.net/1jofzuZbO-j3cbnn4BjhZQ/8a2f3c1d-9e4b-4a5c-b6d7-e8f9a0b1c2d3/public",
      characterName: "Sophia Chen",
      duration: "0:30"
    },
    {
      id: 5,
      thumbnail: "https://imagedelivery.net/1jofzuZbO-j3cbnn4BjhZQ/1b2c3d4e-5f6a-7b8c-9d0e-1f2a3b4c5d6e/public",
      characterName: "Emma Rose",
      duration: "0:12"
    },
    {
      id: 6,
      thumbnail: "https://imagedelivery.net/1jofzuZbO-j3cbnn4BjhZQ/2c3d4e5f-6a7b-8c9d-0e1f-2a3b4c5d6e7f/public",
      characterName: "Isabella Storm",
      duration: "0:25"
    }
  ];

  const moments = [
    {
      id: 1,
      characterName: "Paige Grey",
      characterImage: "https://imagedelivery.net/1jofzuZbO-j3cbnn4BjhZQ/6bd3e7a4-8a11-43e5-77ad-bec58f750500/public",
      image: "https://imagedelivery.net/1jofzuZbO-j3cbnn4BjhZQ/6bd3e7a4-8a11-43e5-77ad-bec58f750500/public",
      caption: "Just enjoying the sunset 🌅 What a beautiful day!",
      likes: 234,
      comments: 45,
      timestamp: "2h ago"
    },
    {
      id: 2,
      characterName: "Katarina",
      characterImage: "https://imagedelivery.net/1jofzuZbO-j3cbnn4BjhZQ/3f7d97f4-a2d8-4e72-0619-02feb3753500/public",
      image: "https://imagedelivery.net/1jofzuZbO-j3cbnn4BjhZQ/3f7d97f4-a2d8-4e72-0619-02feb3753500/public",
      caption: "New look, who dis? 💋✨",
      likes: 512,
      comments: 89,
      timestamp: "5h ago"
    },
    {
      id: 3,
      characterName: "Lila Crazy",
      characterImage: "https://imagedelivery.net/1jofzuZbO-j3cbnn4BjhZQ/55ee81dc-f1e8-4d54-ea2c-a5c9cbb34e00/public",
      image: "https://imagedelivery.net/1jofzuZbO-j3cbnn4BjhZQ/55ee81dc-f1e8-4d54-ea2c-a5c9cbb34e00/public",
      caption: "Party mode activated! 🎉🎊 Who's joining me?",
      likes: 678,
      comments: 123,
      timestamp: "1d ago"
    }
  ];

  return (
    <div className="app-container">
      <Header />

      <main className="main-content">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Gallery</h1>
          <p className="page-subtitle">Your saved moments and memories</p>
        </div>

        {/* Tabs */}
        <div className="tabs-container">
          <button
            className={`tab ${activeTab === 'photos' ? 'active' : ''}`}
            onClick={() => setActiveTab('photos')}
          >
            Photos
          </button>
          <button
            className={`tab ${activeTab === 'videos' ? 'active' : ''}`}
            onClick={() => setActiveTab('videos')}
          >
            Videos
          </button>
          <button
            className={`tab ${activeTab === 'moments' ? 'active' : ''}`}
            onClick={() => setActiveTab('moments')}
          >
            Moments
          </button>
        </div>

        {/* Photos Grid */}
        {activeTab === 'photos' && (
          <div className="media-grid">
            {photos.map((photo) => (
              <div key={photo.id} className="media-item">
                <img src={photo.url} alt={photo.characterName} className="media-image" />
                <div className="media-overlay">
                  <span className="character-label">{photo.characterName}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Videos Grid */}
        {activeTab === 'videos' && (
          <div className="media-grid">
            {videos.map((video) => (
              <div key={video.id} className="media-item">
                <img src={video.thumbnail} alt={video.characterName} className="media-image" />
                <div className="media-overlay">
                  <span className="character-label">{video.characterName}</span>
                  <div className="video-indicator">
                    <span className="play-icon">▶</span>
                    <span className="duration">{video.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Moments Feed */}
        {activeTab === 'moments' && (
          <div className="moments-feed">
            {moments.map((moment) => (
              <div key={moment.id} className="moment-card">
                <div className="moment-header">
                  <img src={moment.characterImage} alt={moment.characterName} className="moment-avatar" />
                  <div className="moment-info">
                    <h3 className="moment-character-name">{moment.characterName}</h3>
                    <span className="moment-timestamp">{moment.timestamp}</span>
                  </div>
                </div>
                <img src={moment.image} alt={moment.characterName} className="moment-image" />
                <div className="moment-content">
                  <p className="moment-caption">{moment.caption}</p>
                  <div className="moment-actions">
                    <button className="action-button">
                      <span className="action-icon">❤️</span>
                      <span className="action-count">{moment.likes}</span>
                    </button>
                    <button className="action-button">
                      <span className="action-icon">💬</span>
                      <span className="action-count">{moment.comments}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
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

        .tabs-container {
          display: flex;
          gap: 0;
          padding: 0 20px 16px;
          border-bottom: 1px solid #2a2a2a;
          position: sticky;
          top: 64px;
          background: #131313;
          z-index: 10;
        }

        .tab {
          flex: 1;
          padding: 12px 0;
          background: none;
          border: none;
          color: #666;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: color 0.3s;
          position: relative;
        }

        .tab.active {
          color: white;
        }

        .tab.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .media-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 4px;
          padding: 4px;
        }

        .media-item {
          position: relative;
          aspect-ratio: 1;
          overflow: hidden;
          cursor: pointer;
        }

        .media-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s;
        }

        .media-item:active .media-image {
          transform: scale(0.95);
        }

        .media-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 8px;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .media-item:hover .media-overlay {
          opacity: 1;
        }

        .character-label {
          align-self: flex-start;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(10px);
          color: white;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
        }

        .video-indicator {
          display: flex;
          align-items: center;
          gap: 6px;
          align-self: center;
          margin-top: auto;
          margin-bottom: 8px;
        }

        .play-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          font-size: 12px;
          color: #131313;
        }

        .duration {
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 2px 8px;
          border-radius: 10px;
          font-size: 11px;
          font-weight: 600;
        }

        .moments-feed {
          padding: 16px 0;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .moment-card {
          background: #1e1e1e;
          border-radius: 16px;
          overflow: hidden;
        }

        .moment-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
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

        .moment-character-name {
          font-size: 15px;
          font-weight: 600;
          color: white;
          margin: 0 0 2px 0;
        }

        .moment-timestamp {
          font-size: 13px;
          color: #666;
        }

        .moment-image {
          width: 100%;
          aspect-ratio: 1;
          object-fit: cover;
        }

        .moment-content {
          padding: 16px;
        }

        .moment-caption {
          font-size: 14px;
          color: white;
          line-height: 1.5;
          margin-bottom: 12px;
        }

        .moment-actions {
          display: flex;
          gap: 16px;
        }

        .action-button {
          display: flex;
          align-items: center;
          gap: 6px;
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .action-button:active {
          transform: scale(0.95);
        }

        .action-icon {
          font-size: 18px;
        }

        .action-count {
          font-size: 14px;
          font-weight: 600;
          color: #999;
        }
      `}</style>
    </div>
  );
}