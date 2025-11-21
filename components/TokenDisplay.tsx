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
        console.log('Endpoint:', `${apiUrl}/api/users/profile`);

        const response = await fetch(`${apiUrl}/api/users/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
          console.error('Failed to fetch user data:', response.status, response.statusText);
          throw new Error(`Failed to fetch: ${response.status}`);
        }

        const data = await response.json();

        console.log('User data received:', data);
        console.log('tokens_remaining:', data.tokens_remaining);
        console.log('Type:', typeof data.tokens_remaining);

        // Use data directly (no wrapper)
        setTokens(data.tokens_remaining || 0);

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
