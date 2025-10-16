'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';

export default function CharactersPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const characters = [
    {
      id: 1,
      name: "Paige Grey",
      image: "https://imagedelivery.net/1jofzuZbO-j3cbnn4BjhZQ/6bd3e7a4-8a11-43e5-77ad-bec58f750500/public",
      personality: "Adventurous",
      category: "adventurous",
      age: 24,
      interests: ["Travel", "Photography", "Hiking"]
    },
    {
      id: 2,
      name: "Katarina",
      image: "https://imagedelivery.net/1jofzuZbO-j3cbnn4BjhZQ/3f7d97f4-a2d8-4e72-0619-02feb3753500/public",
      personality: "Confident",
      category: "confident",
      age: 26,
      interests: ["Fashion", "Music", "Art"]
    },
    {
      id: 3,
      name: "Lila Crazy",
      image: "https://imagedelivery.net/1jofzuZbO-j3cbnn4BjhZQ/55ee81dc-f1e8-4d54-ea2c-a5c9cbb34e00/public",
      personality: "Wild",
      category: "wild",
      age: 23,
      interests: ["Parties", "Dancing", "Adventures"]
    },
    {
      id: 4,
      name: "Sophia Chen",
      image: "https://imagedelivery.net/1jofzuZbO-j3cbnn4BjhZQ/8a2f3c1d-9e4b-4a5c-b6d7-e8f9a0b1c2d3/public",
      personality: "Intellectual",
      category: "intellectual",
      age: 27,
      interests: ["Reading", "Chess", "Science"]
    },
    {
      id: 5,
      name: "Emma Rose",
      image: "https://imagedelivery.net/1jofzuZbO-j3cbnn4BjhZQ/1b2c3d4e-5f6a-7b8c-9d0e-1f2a3b4c5d6e/public",
      personality: "Sweet",
      category: "sweet",
      age: 22,
      interests: ["Baking", "Gardening", "Animals"]
    },
    {
      id: 6,
      name: "Isabella Storm",
      image: "https://imagedelivery.net/1jofzuZbO-j3cbnn4BjhZQ/2c3d4e5f-6a7b-8c9d-0e1f-2a3b4c5d6e7f/public",
      personality: "Mysterious",
      category: "mysterious",
      age: 25,
      interests: ["Writing", "Poetry", "Stargazing"]
    }
  ];

  const categories = [
    { id: 'all', label: 'All', icon: '✨' },
    { id: 'adventurous', label: 'Adventurous', icon: '🏔️' },
    { id: 'confident', label: 'Confident', icon: '💃' },
    { id: 'wild', label: 'Wild', icon: '🎉' },
    { id: 'intellectual', label: 'Smart', icon: '📚' },
    { id: 'sweet', label: 'Sweet', icon: '🌸' },
    { id: 'mysterious', label: 'Mysterious', icon: '🌙' }
  ];

  const filteredCharacters = selectedCategory === 'all' 
    ? characters 
    : characters.filter(c => c.category === selectedCategory);

  return (
    <div className="app-container">
      <Header />

      <main className="main-content">
        {/* Page Title */}
        <div className="page-header">
          <h1 className="page-title">Meet Your AI Companions</h1>
          <p className="page-subtitle">Choose a character and start connecting</p>
        </div>

        {/* Category Filter */}
        <div className="category-filter">
          <div className="category-scroll">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`category-chip ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <span className="category-icon">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Characters Grid */}
        <div className="characters-grid">
          {filteredCharacters.map(character => (
            <Link 
              key={character.id} 
              href={`/chat-landing?character=${character.id}`}
              className="character-card"
            >
              <div className="character-image-wrapper">
                <img 
                  src={character.image} 
                  alt={character.name}
                  className="character-image"
                />
                <div className="character-badge">{character.personality}</div>
              </div>
              <div className="character-info">
                <h3 className="character-name">{character.name}</h3>
                <p className="character-age">{character.age} years old</p>
                <div className="character-interests">
                  {character.interests.map((interest, idx) => (
                    <span key={idx} className="interest-tag">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
              <button className="chat-button">
                Start Chat 💬
              </button>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredCharacters.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3>No characters found</h3>
            <p>Try selecting a different category</p>
          </div>
        )}
      </main>

      <BottomNav />

      <style jsx>{`
        .page-header {
          padding: 24px 20px;
          text-align: center;
        }

        .page-title {
          font-size: 28px;
          font-weight: 700;
          color: white;
          margin-bottom: 8px;
        }

        .page-subtitle {
          font-size: 15px;
          color: #999;
        }

        .category-filter {
          padding: 0 20px 24px;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        .category-filter::-webkit-scrollbar {
          display: none;
        }

        .category-scroll {
          display: flex;
          gap: 8px;
          min-width: min-content;
        }

        .category-chip {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 16px;
          background: #1e1e1e;
          border: 2px solid transparent;
          border-radius: 20px;
          color: white;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
          white-space: nowrap;
        }

        .category-chip:hover {
          background: #252525;
        }

        .category-chip.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-color: transparent;
        }

        .category-icon {
          font-size: 16px;
        }

        .characters-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 4px;
          padding: 0 4px 20px;
          max-width: 393px;
          margin: 0 auto;
        }

        .character-card {
          background: #1e1e1e;
          border-radius: 0;
          overflow: hidden;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s;
        }

        .character-card:active {
          transform: scale(0.98);
        }

        .character-image-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 3/4;
          overflow: hidden;
        }

        .character-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .character-badge {
          position: absolute;
          top: 8px;
          right: 8px;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(10px);
          color: white;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
        }

        .character-info {
          padding: 12px;
          flex: 1;
        }

        .character-name {
          font-size: 16px;
          font-weight: 700;
          color: white;
          margin-bottom: 4px;
        }

        .character-age {
          font-size: 13px;
          color: #999;
          margin-bottom: 8px;
        }

        .character-interests {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }

        .interest-tag {
          font-size: 11px;
          color: #667eea;
          background: rgba(102, 126, 234, 0.1);
          padding: 2px 8px;
          border-radius: 10px;
        }

        .chat-button {
          width: 100%;
          padding: 12px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          color: white;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.3s;
        }

        .chat-button:hover {
          opacity: 0.9;
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
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
        }
      `}</style>
    </div>
  );
}