'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect if already authenticated
  if (isAuthenticated) {
    router.push('/');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login({ email, password });
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      fontFamily: 'Poppins, sans-serif',
      background: '#131313',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      maxWidth: '393px',
      margin: '0 auto',
      padding: '24px'
    }}>
      {/* Logo */}
      <div style={{ marginBottom: '48px', textAlign: 'center' }}>
        <img
          src="/icons/logo.png"
          alt="PixelCrush.ai"
          style={{ width: '120px', height: 'auto', marginBottom: '16px' }}
        />
        <h1 style={{
          fontSize: '28px',
          fontWeight: 700,
          marginBottom: '8px',
          background: 'linear-gradient(135deg, #FF3B9A 0%, #A445ED 50%, #4A90E2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Welcome Back
        </h1>
        <p style={{
          fontSize: '14px',
          color: 'rgba(255,255,255,0.7)'
        }}>
          Login to continue your journey
        </p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} style={{
        width: '100%',
        maxWidth: '360px'
      }}>
        {error && (
          <div style={{
            background: 'rgba(255,59,154,0.1)',
            border: '1px solid #FF3B9A',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '24px',
            fontSize: '14px',
            color: '#FF3B9A'
          }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: 500,
            marginBottom: '8px',
            color: 'rgba(255,255,255,0.9)'
          }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="your@email.com"
            style={{
              width: '100%',
              padding: '12px 16px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              color: 'white',
              fontSize: '16px',
              fontFamily: 'Poppins, sans-serif',
              outline: 'none'
            }}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: 500,
            marginBottom: '8px',
            color: 'rgba(255,255,255,0.9)'
          }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            style={{
              width: '100%',
              padding: '12px 16px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              color: 'white',
              fontSize: '16px',
              fontFamily: 'Poppins, sans-serif',
              outline: 'none'
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '14px',
            background: loading
              ? 'rgba(255,255,255,0.1)'
              : 'linear-gradient(135deg, #FF3B9A 0%, #A445ED 50%, #4A90E2 100%)',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            fontSize: '16px',
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
            fontFamily: 'Poppins, sans-serif',
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {/* Register Link */}
      <div style={{
        marginTop: '24px',
        textAlign: 'center',
        fontSize: '14px',
        color: 'rgba(255,255,255,0.7)'
      }}>
        Don't have an account?{' '}
        <a
          href="/register"
          style={{
            color: '#FF3B9A',
            textDecoration: 'none',
            fontWeight: 600
          }}
        >
          Sign up
        </a>
      </div>

      <style jsx>{`
        input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }
        input:focus {
          border-color: #FF3B9A;
        }
        button:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(255, 59, 154, 0.3);
        }
        button {
          transition: all 0.2s ease;
        }
      `}</style>
    </div>
  );
}
