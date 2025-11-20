'use client';

import { useState, useEffect } from 'react';

export default function TokenDisplay() {
  const [tokens, setTokens] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

        if (!token) {
          console.log('⚠️ No auth token found');
          setLoading(false);
          return;
        }

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://pixelcrushbackend-production.up.railway.app';

        console.log('=== FETCHING TOKENS ===');
        console.log('API URL:', `${apiUrl}/api/users/profile`);

        const response = await fetch(`${apiUrl}/api/users/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        console.log('✅ Token fetch status:', response.status);

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }

        const data = await response.json();
        console.log('📨 Profile data:', data);

        // Extract tokens - check multiple possible paths
        const tokenCount = data.user?.tokens_remaining ||
                          data.tokens_remaining ||
                          data.user?.tokens ||
                          0;

        console.log('💰 Token count extracted:', tokenCount);
        console.log('🔍 Token type:', typeof tokenCount);

        setTokens(tokenCount);

      } catch (error) {
        console.error('❌ Failed to fetch tokens:', error);
        setTokens(0);
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, []);

  // Format large numbers
  const formatTokens = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toFixed(1);
  };

  if (loading) {
    return (
      <a
        href="/tokens"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6.593px 16.593px',
          border: '1px solid rgba(255,255,255,0.8)',
          borderRadius: '8px',
          cursor: 'pointer',
          textDecoration: 'none'
        }}
      >
        <div style={{ width: '30px', height: '30px' }}>
          <img
            src="/icons/token-icon.png"
            alt="Tokens"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>
        <div style={{
          fontFamily: 'Poppins, sans-serif',
          fontSize: '16px',
          lineHeight: '24px',
          color: 'rgba(255,255,255,0.8)'
        }}>...</div>
      </a>
    );
  }

  return (
    <a
      href="/tokens"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '6.593px 16.593px',
        border: '1px solid rgba(255,255,255,0.8)',
        borderRadius: '8px',
        cursor: 'pointer',
        textDecoration: 'none'
      }}
    >
      <div style={{ width: '30px', height: '30px' }}>
        <img
          src="/icons/token-icon.png"
          alt="Tokens"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>
      <div style={{
        fontFamily: 'Poppins, sans-serif',
        fontSize: '16px',
        lineHeight: '24px',
        color: 'rgba(255,255,255,0.8)'
      }}>
        {tokens !== null ? formatTokens(tokens) : '0.0'}
      </div>
    </a>
  );
}
