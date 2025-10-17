'use client';

import { useState, useEffect } from 'react';

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { emoji: '👩', name: 'Sophia', desc: 'Flirty & Playful • Ready to Chat' },
    { emoji: '🧑', name: 'Alex', desc: 'Adventurous & Fun • Let\'s Talk' },
    { emoji: '💃', name: 'Maya', desc: 'Sweet & Caring • Always Here' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ background: '#131313', minHeight: '100vh', fontFamily: 'Poppins, sans-serif', margin: 0, padding: 0 }}>
      {/* Header */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '64px',
        background: '#131313',
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        zIndex: 1000,
        borderBottom: '0.593px solid #363636',
        boxShadow: '0px 1px 0px 0px rgba(0,0,0,0.05)'
      }}>
        <div style={{ height: '49px', width: '114px' }}>
          <img 
            src="https://www.figma.com/api/mcp/asset/0d9e6ba0-12a7-48ba-802d-9c01ea4098cb" 
            alt="PixelCrush Logo" 
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>
        
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6.593px 16.593px',
            border: '1px solid white',
            borderRadius: '5px',
            opacity: 0.6
          }}>
            <img 
              src="https://www.figma.com/api/mcp/asset/0721d99b-e150-4ac8-a20e-e8287e9472aa" 
              alt="Token" 
              style={{ width: '40px', height: '40px' }}
            />
            <span style={{ fontSize: '16px', fontWeight: 400, color: 'white', lineHeight: '24px' }}>0.8</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ marginTop: '64px', marginBottom: '70px', minHeight: 'calc(100vh - 134px)' }}>
        {/* Character Carousel */}
        <div style={{
          width: '100%',
          height: 'calc(100vh - 134px)',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #1A1A2E, #16213E)'
        }}>
          {/* Carousel Track */}
          <div style={{
            display: 'flex',
            width: `${slides.length * 100}%`,
            height: '100%',
            transform: `translateX(-${currentSlide * (100 / slides.length)}%)`,
            transition: 'transform 0.8s ease-in-out'
          }}>
            {slides.map((slide, index) => (
              <div 
                key={index}
                style={{
                  width: `${100 / slides.length}%`,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  flexShrink: 0
                }}
              >
                <div className="floating-emoji" style={{
                  fontSize: '120px',
                  marginBottom: '40px'
                }}>
                  {slide.emoji}
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '25px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.95), transparent)'
                }}>
                  <div style={{
                    fontSize: '28px',
                    fontWeight: 700,
                    marginBottom: '8px',
                    background: 'linear-gradient(135deg, #FF1B6B, #A445ED)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    {slide.name}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.7)',
                    lineHeight: '20px'
                  }}>
                    {slide.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '8px',
            zIndex: 50
          }}>
            {slides.map((_, index) => (
              <div
                key={index}
                onClick={() => setCurrentSlide(index)}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: currentSlide === index ? '#fff' : 'rgba(255,255,255,0.3)',
                  cursor: 'pointer'
                }}
              />
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '8px 20px 0',
          width: '338.67px'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '28px',
            paddingTop: '40px'
          }}>
            {[
              'What is PixelCrush AI?',
              'Is PixelCrush AI legitimate and safe to use?',
              'How will PixelCrush AI appear on my bank statements?',
              'Can I customize my PixelCrush AI experience?',
              'Who uses PixelCrush AI and for what purpose?',
              'What is an AI Companion and can I create my own?',
              'Can my AI Companion send images, video, or voice messages?',
              'Can I roleplay with my AI Companion?'
            ].map((question, index) => (
              <div key={index} style={{
                background: '#1a1a1a',
                border: '1px solid #282828',
                padding: '20px 12px',
                cursor: 'pointer'
              }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 500,
                  lineHeight: '32px',
                  color: 'white',
                  margin: 0
                }}>{question}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '40.593px 32.593px 32.593px',
          width: '338.67px',
          background: '#1a1a1a',
          border: '1px solid #282828'
        }}>
          <h2 style={{
            fontSize: '22px',
            fontWeight: 700,
            lineHeight: '40px',
            color: 'white',
            marginBottom: '32px'
          }}>PixelCrush Makes Every Conversation Feel Personal</h2>
          <p style={{
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '20px',
            color: 'rgba(255,255,255,0.7)',
            marginBottom: '32px'
          }}>Whether you're seeking a light-hearted chat after work or a heartfelt dialogue when you're feeling low, PixelCrush AI is designed to make every interaction feel genuine.</p>
        </div>

        {/* Footer */}
        <div style={{
          background: 'black',
          padding: '40px 20px',
          maxWidth: '1280px',
          margin: '0 auto'
        }}>
          <div style={{ marginBottom: '35px' }}>
            <h4 style={{
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: '20px',
              color: 'rgba(255,255,255,0.7)',
              marginBottom: '20px'
            }}>Legal & Support</h4>
            <a href="/legal" style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 500,
              lineHeight: '20px',
              color: 'white',
              textDecoration: 'underline',
              marginBottom: '20px'
            }}>Terms and Policies</a>
          </div>
          
          <div style={{
            textAlign: 'center',
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: '24px',
            color: 'rgba(255,255,255,0.7)',
            padding: '0 16px'
          }}>
            © 2025 PixelCrush.ai. All Rights Reserved
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '70px',
        background: '#131313',
        borderTop: '0.593px solid rgba(255,255,255,0.2)',
        display: 'flex',
        zIndex: 1000
      }}>
        <a href="/" style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '3px',
          textDecoration: 'none'
        }}>
          <img 
            src="https://www.figma.com/api/mcp/asset/071a7c81-6402-4350-b1b0-ba26e6cab360" 
            alt="Characters" 
            style={{ width: '30px', height: '30px' }}
          />
          <span style={{
            fontSize: '10px',
            background: 'linear-gradient(135deg, #FF1B6B, #A445ED, #00D4FF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Characters</span>
        </a>
        
        <a href="/chat" style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '3px',
          textDecoration: 'none'
        }}>
          <img 
            src="https://www.figma.com/api/mcp/asset/85aa9d89-f84b-416d-941e-9a3435fa544f" 
            alt="Chat" 
            style={{ width: '30px', height: '30px' }}
          />
          <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)' }}>Chat</span>
        </a>
        
        <a href="/voice" style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '3px',
          textDecoration: 'none'
        }}>
          <img 
            src="https://www.figma.com/api/mcp/asset/a67f4f29-9007-4f4c-9cb6-539cfd116dfb" 
            alt="Voice" 
            style={{ width: '30px', height: '30px' }}
          />
          <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)' }}>Voice Call</span>
        </a>
        
        <a href="/gallery" style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '3px',
          textDecoration: 'none'
        }}>
          <img 
            src="https://www.figma.com/api/mcp/asset/52ffa327-17fa-4d67-9183-9a6523dc9d70" 
            alt="Gallery" 
            style={{ width: '30px', height: '30px' }}
          />
          <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)' }}>Gallery</span>
        </a>
        
        <a href="/account" style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '3px',
          textDecoration: 'none'
        }}>
          <img 
            src="https://www.figma.com/api/mcp/asset/571e2d66-db34-4abc-8050-e64b3838e379" 
            alt="Account" 
            style={{ width: '30px', height: '30px' }}
          />
          <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)' }}>Account</span>
        </a>
      </div>

      <style jsx>{`
        .floating-emoji {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
}