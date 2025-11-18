'use client';

import { useRouter } from 'next/navigation';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  characterName?: string;
}

export default function UpgradeModal({ isOpen, onClose, characterName }: UpgradeModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleUpgrade = () => {
    router.push('/pricing');
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '20px',
        animation: 'fadeIn 0.3s ease'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(135deg, rgba(19,19,19,0.98) 0%, rgba(30,30,30,0.98) 100%)',
          border: '2px solid',
          borderImage: 'linear-gradient(135deg, #FF3B9A 0%, #A445ED 50%, #4A90E2 100%) 1',
          borderRadius: '16px',
          maxWidth: '400px',
          width: '100%',
          padding: '32px 24px',
          fontFamily: 'Poppins, sans-serif',
          animation: 'slideUp 0.3s ease',
          boxShadow: '0 20px 60px rgba(255, 59, 154, 0.3)'
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>💬</div>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #FF3B9A 0%, #A445ED 50%, #4A90E2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '8px'
          }}>
            Ready for More?
          </h2>
          <p style={{
            fontSize: '16px',
            color: 'rgba(255,255,255,0.8)',
            lineHeight: '24px'
          }}>
            You've used all 10 free messages{characterName ? ` with ${characterName}` : ''}
          </p>
        </div>

        {/* Features List */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '24px'
        }}>
          <div style={{
            fontSize: '14px',
            fontWeight: 600,
            color: '#FF3B9A',
            marginBottom: '16px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Premium Features
          </div>

          {[
            { icon: '✨', text: 'Unlimited messages with all characters' },
            { icon: '💕', text: 'Deeper, longer conversations' },
            { icon: '🔥', text: 'Exclusive content (coming soon)' },
            { icon: '🎙️', text: 'Voice chat (coming soon)' }
          ].map((feature, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: idx < 3 ? '12px' : '0',
                fontSize: '15px',
                color: 'rgba(255,255,255,0.9)'
              }}
            >
              <span style={{ fontSize: '20px' }}>{feature.icon}</span>
              <span>{feature.text}</span>
            </div>
          ))}
        </div>

        {/* Price */}
        <div style={{
          textAlign: 'center',
          marginBottom: '24px'
        }}>
          <div style={{
            fontSize: '36px',
            fontWeight: 700,
            color: 'white',
            marginBottom: '4px'
          }}>
            $4.99
            <span style={{
              fontSize: '18px',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.6)',
              marginLeft: '4px'
            }}>
              /month
            </span>
          </div>
          <div style={{
            fontSize: '13px',
            color: 'rgba(255,255,255,0.5)'
          }}>
            Cancel anytime
          </div>
        </div>

        {/* CTA Buttons */}
        <button
          onClick={handleUpgrade}
          style={{
            width: '100%',
            padding: '16px',
            background: 'linear-gradient(135deg, #FF3B9A 0%, #A445ED 100%)',
            border: 'none',
            borderRadius: '12px',
            color: 'white',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'Poppins, sans-serif',
            marginBottom: '12px',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 16px rgba(255, 59, 154, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 59, 154, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(255, 59, 154, 0.3)';
          }}
        >
          Upgrade to Premium
        </button>

        <button
          onClick={onClose}
          style={{
            width: '100%',
            padding: '12px',
            background: 'transparent',
            border: 'none',
            color: 'rgba(255,255,255,0.6)',
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
            fontFamily: 'Poppins, sans-serif',
            transition: 'color 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'rgba(255,255,255,0.9)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
          }}
        >
          Maybe Later
        </button>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
