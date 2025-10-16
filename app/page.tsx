'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Homepage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const characters = [
    { emoji: '👩', name: 'Sophia', desc: 'Flirty & Playful • Ready to Chat' },
    { emoji: '🧑', name: 'Alex', desc: 'Adventurous & Fun • Let\'s Talk' },
    { emoji: '💃', name: 'Maya', desc: 'Sweet & Caring • Always Here' }
  ];

  const faqs = [
    'What is PixelCrush AI?',
    'Is PixelCrush AI legitimate and safe to use?',
    'How will PixelCrush AI appear on my bank statements?',
    'Can I customize my PixelCrush AI experience?',
    'Who uses PixelCrush AI and for what purpose?',
    'What is an AI Companion and can I create my own?',
    'Can my AI Companion send images, video, or voice messages?',
    'Can I roleplay with my AI Companion?'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % characters.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [characters.length]);

  return (
    <>
      {/* Header */}
      <div className="header">
        <div className="logo-container">
          <img src="https://www.figma.com/api/mcp/asset/0d9e6ba0-12a7-48ba-802d-9c01ea4098cb" alt="PixelCrush Logo" className="logo-img" />
        </div>

        <div className="header-right">
          <div className="token-badge">
            <img src="https://www.figma.com/api/mcp/asset/0721d99b-e150-4ac8-a20e-e8287e9472aa" alt="Token" className="token-icon" />
            <span className="token-text">0.8</span>
          </div>
          <div className="vertical-divider"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Character Carousel */}
        <div className="character-carousel-container">
          <div className="character-carousel">
            {characters.map((char, index) => (
              <div key={index} className={`character-slide ${index === currentSlide ? 'active' : ''}`}>
                <div className="character-emoji">{char.emoji}</div>
                <div className="character-info-overlay">
                  <div className="character-name">{char.name}</div>
                  <div className="character-desc">{char.desc}</div>
                </div>
              </div>
            ))}

            <div className="swipe-indicator">
              {characters.map((_, index) => (
                <div key={index} className={`dot ${index === currentSlide ? 'active' : ''}`}></div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="faq-section">
          <div className="faq-container">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <div className="faq-question">
                  <h3>{faq}</h3>
                  <div className="faq-icon">▼</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Section */}
        <div className="content-section">
          <h2>PixelCrush Makes Every Conversation Feel Personal</h2>
          <p>Whether you're seeking a light-hearted chat after work or a heartfelt dialogue when you're feeling low, PixelCrush AI is designed to make every interaction feel genuine. Built with advanced personality modeling and memory retention, PixelCrush learns what you like, remembers what matters, and responds in a way that feels natural and deeply personal.</p>

          <p>Unlike static chatbot platforms, PixelCrush AI evolves with every exchange, adjusting its tone, emotional intelligence, and style to match your unique vibe. Think of it like talking to someone who not only listens but genuinely gets you.</p>

          <p>But what makes PixelCrush AI even more intriguing? It's the variety and depth of characters you can choose from and how they fit seamlessly into your life. Let us show you what the platform is all about.</p>

          <h2>PixelCrush has an AI Companion for Every Moment</h2>
          <p>No two moods are the same, and neither are PixelCrush AI's characters. With over 100 different characters to choose from, you're never stuck with one tone or type.</p>

          <p>Looking for romance? The AI Girlfriend experience has been crafted for meaningful, emotionally rich conversations. These characters are flirty, affectionate, and deeply attentive. They remember your stories, send you thoughtful messages, and even surprise you with custom photos or sweet voice notes that sound... well, human.</p>
        </div>

        {/* Footer */}
        <div className="footer">
          <div className="footer-section">
            <h4>Legal & Support</h4>
            <Link href="/legal" className="footer-link">Terms and Policies</Link>
            <Link href="/help" className="footer-link">Help Center</Link>
          </div>

          <div className="footer-copyright">
            © 2025 PixelCrush.ai. All Rights Reserved
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <Link href="/" className="nav-item active">
          <img src="https://www.figma.com/api/mcp/asset/071a7c81-6402-4350-b1b0-ba26e6cab360" alt="Characters" className="nav-icon" />
          <span className="nav-label">Characters</span>
        </Link>

        <Link href="/chat-landing" className="nav-item">
          <img src="https://www.figma.com/api/mcp/asset/85aa9d89-f84b-416d-941e-9a3435fa544f" alt="Chat" className="nav-icon" />
          <span className="nav-label">Chat</span>
        </Link>

        <Link href="/voice" className="nav-item">
          <img src="https://www.figma.com/api/mcp/asset/a67f4f29-9007-4f4c-9cb6-539cfd116dfb" alt="Voice Call" className="nav-icon" />
          <span className="nav-label">Voice Call</span>
        </Link>

        <Link href="/gallery" className="nav-item">
          <img src="https://www.figma.com/api/mcp/asset/52ffa327-17fa-4d67-9183-9a6523dc9d70" alt="Gallery" className="nav-icon" />
          <span className="nav-label">Gallery</span>
        </Link>

        <Link href="/account" className="nav-item">
          <img src="https://www.figma.com/api/mcp/asset/571e2d66-db34-4abc-8050-e64b3838e379" alt="Account" className="nav-icon" />
          <span className="nav-label">Account</span>
        </Link>
      </div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          -webkit-tap-highlight-color: transparent;
        }

        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 64px;
          background: #131313;
          display: flex;
          align-items: center;
          padding: 0 8px;
          z-index: 1000;
          border-bottom: 0.593px solid #363636;
          box-shadow: 0px 1px 0px 0px rgba(0,0,0,0.05);
        }

        .logo-container {
          height: 49px;
          width: 114px;
        }

        .logo-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .header-right {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 0;
        }

        .token-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 6.593px 16.593px;
          border: 1px solid white;
          border-radius: 5px;
          opacity: 0.6;
        }

        .token-icon {
          width: 40px;
          height: 40px;
        }

        .token-text {
          font-size: 16px;
          font-weight: 400;
          color: white;
          line-height: 24px;
        }

        .vertical-divider {
          width: 1px;
          height: 24px;
          background: rgba(16, 24, 40, 0.1);
          margin: 0 0 0 0;
        }

        .main-content {
          margin-top: 64px;
          margin-bottom: 70px;
          min-height: calc(100vh - 134px);
        }

        .character-carousel-container {
          width: 100%;
          height: calc(100vh - 134px);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .character-carousel {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: linear-gradient(135deg, #1A1A2E, #16213E);
        }

        .character-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.8s ease-in-out;
        }

        .character-slide.active {
          opacity: 1;
        }

        .character-emoji {
          font-size: 120px;
          animation: float 3s ease-in-out infinite;
          margin-bottom: 40px;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .character-info-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 25px;
          background: linear-gradient(to top, rgba(0,0,0,0.95), transparent);
        }

        .character-name {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 8px;
          background: linear-gradient(135deg, #FF1B6B, #A445ED);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .character-desc {
          font-size: 14px;
          color: rgba(255,255,255,0.7);
          line-height: 20px;
        }

        .swipe-indicator {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          z-index: 50;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255,255,255,0.3);
        }

        .dot.active {
          background: #fff;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .faq-section {
          max-width: 1280px;
          margin: 0 auto;
          padding: 8px 20px 0;
          width: 338.67px;
        }

        .faq-container {
          display: flex;
          flex-direction: column;
          gap: 28px;
          padding-top: 40px;
        }

        .faq-item {
          background: #1a1a1a;
          border: 1px solid #282828;
        }

        .faq-question {
          padding: 20px 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
        }

        .faq-question h3 {
          font-size: 16px;
          font-weight: 500;
          line-height: 32px;
          color: white;
          flex: 1;
        }

        .faq-icon {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
        }

        .content-section {
          max-width: 1280px;
          margin: 0 auto;
          padding: 40.593px 32.593px 32.593px;
          width: 338.67px;
          background: #1a1a1a;
          border: 1px solid #282828;
        }

        .content-section h2 {
          font-size: 22px;
          font-weight: 700;
          line-height: 40px;
          color: white;
          margin-bottom: 32px;
        }

        .content-section h3 {
          font-size: 16px;
          font-weight: 700;
          line-height: 32px;
          color: white;
          margin-bottom: 32px;
        }

        .content-section p {
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
          color: rgba(255,255,255,0.7);
          margin-bottom: 32px;
        }

        .content-section a {
          color: rgba(255,255,255,0.7);
          text-decoration: underline;
          cursor: pointer;
        }

        .footer {
          background: black;
          padding: 40px 20px;
          max-width: 1280px;
          margin: 0 auto;
        }

        .footer-section {
          margin-bottom: 35px;
        }

        .footer-section h4 {
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
          color: rgba(255,255,255,0.7);
          margin-bottom: 20px;
        }

        .footer-link {
          display: block;
          font-size: 14px;
          font-weight: 500;
          line-height: 20px;
          color: white;
          text-decoration: underline;
          margin-bottom: 20px;
          cursor: pointer;
        }

        .footer-copyright {
          text-align: center;
          font-size: 14px;
          font-weight: 500;
          line-height: 24px;
          color: rgba(255,255,255,0.7);
          padding: 0 16px;
        }

        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 70px;
          background: #131313;
          border-top: 0.593px solid rgba(255,255,255,0.2);
          display: flex;
          z-index: 1000;
        }

        .nav-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          cursor: pointer;
          text-decoration: none;
        }

        .nav-icon {
          width: 30px;
          height: 30px;
          object-fit: contain;
        }

        .nav-label {
          font-size: 10px;
          font-weight: 400;
          line-height: 15px;
          color: rgba(255,255,255,0.7);
        }

        .nav-item.active .nav-label {
          background: linear-gradient(135deg, #FF1B6B, #A445ED, #00D4FF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @media (min-width: 768px) {
          .character-carousel-container {
            height: calc(100vh - 134px);
          }
        }
      `}</style>
    </>
  );
}