'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';

export default function Homepage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const characters = [
    {
      name: "Paige Grey",
      image: "https://imagedelivery.net/1jofzuZbO-j3cbnn4BjhZQ/6bd3e7a4-8a11-43e5-77ad-bec58f750500/public",
      personality: "Adventurous & Spontaneous"
    },
    {
      name: "Katarina",
      image: "https://imagedelivery.net/1jofzuZbO-j3cbnn4BjhZQ/3f7d97f4-a2d8-4e72-0619-02feb3753500/public",
      personality: "Confident & Playful"
    },
    {
      name: "Lila Crazy",
      image: "https://imagedelivery.net/1jofzuZbO-j3cbnn4BjhZQ/55ee81dc-f1e8-4d54-ea2c-a5c9cbb34e00/public",
      personality: "Wild & Unpredictable"
    }
  ];

  const faqs = [
    {
      question: "What is PixelCrush.ai?",
      answer: "PixelCrush.ai is an AI-powered platform where you can chat, call, and connect with virtual companions. Each character has unique personalities and can engage in meaningful conversations."
    },
    {
      question: "How do tokens work?",
      answer: "Tokens are used for premium features like extended conversations, voice calls, and exclusive content. You can purchase token packages or subscribe for unlimited access."
    },
    {
      question: "Can I create my own character?",
      answer: "Custom character creation is coming soon! For now, explore our diverse roster of pre-made characters, each with unique personalities and interests."
    },
    {
      question: "Is my data private?",
      answer: "Absolutely. All conversations are encrypted and private. We never share your data with third parties. Your privacy is our top priority."
    },
    {
      question: "What's the difference between Free and Premium?",
      answer: "Free users get limited messages per day. Premium subscribers enjoy unlimited messaging, voice calls, priority responses, and exclusive character content."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % characters.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [characters.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % characters.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + characters.length) % characters.length);
  };

  return (
    <div className="app-container">
      <Header />

      <main className="main-content">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              Connect with AI<br />Companions
            </h1>
            <p className="hero-subtitle">
              Chat, call, and create memories with personalities that understand you
            </p>
            <Link href="/characters" className="cta-button">
              Meet Characters
            </Link>
          </div>
        </div>

        {/* Character Carousel */}
        <div className="carousel-section">
          <h2 className="section-title">Featured Characters</h2>
          <div className="carousel-container">
            <button className="carousel-button prev" onClick={prevSlide}>
              ←
            </button>

            <div className="carousel-track">
              {characters.map((char, index) => (
                <div
                  key={index}
                  className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
                  style={{
                    transform: `translateX(${(index - currentSlide) * 100}%)`,
                  }}
                >
                  <img src={char.image} alt={char.name} className="carousel-image" />
                  <div className="carousel-info">
                    <h3 className="carousel-name">{char.name}</h3>
                    <p className="carousel-personality">{char.personality}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="carousel-button next" onClick={nextSlide}>
              →
            </button>
          </div>

          {/* Carousel Indicators */}
          <div className="carousel-indicators">
            {characters.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="features-section">
          <h2 className="section-title">Why PixelCrush?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3>Smart Conversations</h3>
              <p>Engaging AI that remembers your chats and grows with you</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📞</div>
              <h3>Voice Calls</h3>
              <p>Real-time voice conversations with realistic AI voices</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📸</div>
              <h3>Visual Memories</h3>
              <p>Request and receive AI-generated photos and moments</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎭</div>
              <h3>Unique Personalities</h3>
              <p>Each character has distinct traits, interests, and styles</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="faq-section">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-container">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span>{faq.question}</span>
                  <span className="faq-icon">{openFaq === index ? '−' : '+'}</span>
                </button>
                {openFaq === index && (
                  <div className="faq-answer">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Footer */}
        <div className="cta-footer">
          <h2>Ready to Start?</h2>
          <p>Join thousands connecting with AI companions</p>
          <Link href="/characters" className="cta-button-secondary">
            Browse All Characters
          </Link>
        </div>
      </main>

      <BottomNav />

      <style jsx>{`
        .hero-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 60px 20px;
          text-align: center;
          border-radius: 0 0 30px 30px;
          margin-bottom: 40px;
        }

        .hero-content {
          max-width: 350px;
          margin: 0 auto;
        }

        .hero-title {
          font-size: 36px;
          font-weight: 700;
          color: white;
          margin-bottom: 16px;
          line-height: 1.2;
        }

        .hero-subtitle {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 30px;
          line-height: 1.5;
        }

        .cta-button {
          display: inline-block;
          background: white;
          color: #667eea;
          padding: 14px 32px;
          border-radius: 25px;
          font-weight: 600;
          text-decoration: none;
          transition: transform 0.2s;
        }

        .cta-button:hover {
          transform: scale(1.05);
        }

        .carousel-section {
          padding: 0 20px 40px;
        }

        .section-title {
          font-size: 24px;
          font-weight: 700;
          color: white;
          margin-bottom: 24px;
          text-align: center;
        }

        .carousel-container {
          position: relative;
          width: 100%;
          max-width: 350px;
          margin: 0 auto;
          overflow: hidden;
          border-radius: 20px;
          height: 450px;
        }

        .carousel-track {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .carousel-slide {
          position: absolute;
          width: 100%;
          height: 100%;
          transition: transform 0.5s ease;
          opacity: 0;
        }

        .carousel-slide.active {
          opacity: 1;
        }

        .carousel-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .carousel-info {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
          padding: 30px 20px 20px;
        }

        .carousel-name {
          font-size: 24px;
          font-weight: 700;
          color: white;
          margin-bottom: 4px;
        }

        .carousel-personality {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.8);
        }

        .carousel-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border: none;
          color: white;
          font-size: 24px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          z-index: 10;
          transition: background 0.3s;
        }

        .carousel-button:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .carousel-button.prev {
          left: 10px;
        }

        .carousel-button.next {
          right: 10px;
        }

        .carousel-indicators {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 20px;
        }

        .indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #363636;
          border: none;
          cursor: pointer;
          transition: all 0.3s;
        }

        .indicator.active {
          background: #667eea;
          width: 24px;
          border-radius: 4px;
        }

        .features-section {
          padding: 40px 20px;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          max-width: 350px;
          margin: 0 auto;
        }

        .feature-card {
          background: #1e1e1e;
          padding: 24px 16px;
          border-radius: 16px;
          text-align: center;
        }

        .feature-icon {
          font-size: 32px;
          margin-bottom: 12px;
        }

        .feature-card h3 {
          font-size: 16px;
          font-weight: 600;
          color: white;
          margin-bottom: 8px;
        }

        .feature-card p {
          font-size: 13px;
          color: #999;
          line-height: 1.4;
        }

        .faq-section {
          padding: 40px 20px;
        }

        .faq-container {
          max-width: 350px;
          margin: 0 auto;
        }

        .faq-item {
          background: #1e1e1e;
          border-radius: 12px;
          margin-bottom: 12px;
          overflow: hidden;
        }

        .faq-question {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          background: none;
          border: none;
          color: white;
          font-size: 15px;
          font-weight: 500;
          text-align: left;
          cursor: pointer;
          transition: background 0.3s;
        }

        .faq-question:hover {
          background: #252525;
        }

        .faq-icon {
          font-size: 20px;
          color: #667eea;
        }

        .faq-answer {
          padding: 0 20px 16px;
          color: #999;
          font-size: 14px;
          line-height: 1.6;
          animation: fadeIn 0.3s;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .cta-footer {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 50px 20px;
          text-align: center;
          border-radius: 30px 30px 0 0;
          margin-top: 40px;
        }

        .cta-footer h2 {
          font-size: 28px;
          font-weight: 700;
          color: white;
          margin-bottom: 12px;
        }

        .cta-footer p {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 24px;
        }

        .cta-button-secondary {
          display: inline-block;
          background: white;
          color: #667eea;
          padding: 14px 32px;
          border-radius: 25px;
          font-weight: 600;
          text-decoration: none;
          transition: transform 0.2s;
        }

        .cta-button-secondary:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}