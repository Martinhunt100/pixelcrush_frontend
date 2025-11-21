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
        console.log('API URL:', `${apiUrl}/api/user`);

        const response = await fetch(`${apiUrl}/api/user`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        console.log('✅ Token fetch status:', response.status);

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }

        const data = await response.json();
        console.log('📨 Raw API response:', JSON.stringify(data, null, 2));

        // Extract tokens from response.tokens_remaining
        const tokenCount = data.tokens_remaining ||
                          data.user?.tokens_remaining ||
                          data.tokens ||
                          data.user?.tokens ||
                          0;

        console.log('💰 Token count extracted:', tokenCount);
        console.log('🔍 Token type:', typeof tokenCount);
        console.log('📊 All possible token fields:', {
          'data.tokens_remaining': data.tokens_remaining,
          'data.user?.tokens_remaining': data.user?.tokens_remaining,
          'data.tokens': data.tokens,
          'data.user?.tokens': data.user?.tokens
        });

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

  // Format large numbers (no decimals)
  const formatTokens = (num: number) => {
    const rounded = Math.floor(num);

    if (rounded >= 1000000) {
      return `${Math.floor(rounded / 1000000)}M`;
    }
    if (rounded >= 1000) {
      return `${Math.floor(rounded / 1000)}K`;
    }
    return rounded.toString();
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
        {tokens !== null ? formatTokens(tokens) : '0'}
      </div>
    </a>
  );
}
