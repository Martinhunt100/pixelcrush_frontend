'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function RegisterPage() {
  const router = useRouter();
  const { register, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [ageConfirmed, setAgeConfirmed] = useState(false);
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

    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (!ageConfirmed) {
      setError('You must confirm that you are 18 years or older');
      return;
    }

    setLoading(true);

    try {
      await register({
        email,
        password,
        username: username || undefined,
        age_confirmed: ageConfirmed
      });
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
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
      padding: '24px 16px',
      width: '100%'
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
          Join PixelCrush
        </h1>
        <p style={{
          fontSize: '14px',
          color: 'rgba(255,255,255,0.7)'
        }}>
          Create your account to get started
        </p>
      </div>

      {/* Register Form */}
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

        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: 500,
            marginBottom: '8px',
            color: 'rgba(255,255,255,0.9)'
          }}>
            Username (optional)
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Choose a username"
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

        <div style={{ marginBottom: '20px' }}>
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
            minLength={6}
            autoComplete="new-password"
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

        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: 500,
            marginBottom: '8px',
            color: 'rgba(255,255,255,0.9)'
          }}>
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="••••••••"
            minLength={6}
            autoComplete="new-password"
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

        {/* Age Confirmation Checkbox */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            fontSize: '14px',
            color: 'rgba(255,255,255,0.9)'
          }}>
            <input
              type="checkbox"
              checked={ageConfirmed}
              onChange={(e) => setAgeConfirmed(e.target.checked)}
              required
              style={{
                width: '18px',
                height: '18px',
                cursor: 'pointer',
                accentColor: '#FF3B9A'
              }}
            />
            <span>I confirm I am 18 years or older</span>
          </label>
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
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>

      {/* Login Link */}
      <div style={{
        marginTop: '24px',
        textAlign: 'center',
        fontSize: '14px',
        color: 'rgba(255,255,255,0.7)'
      }}>
        Already have an account?{' '}
        <a
          href="/login"
          style={{
            color: '#FF3B9A',
            textDecoration: 'none',
            fontWeight: 600
          }}
        >
          Login
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
