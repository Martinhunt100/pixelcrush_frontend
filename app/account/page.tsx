'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';

interface Preferences {
  display_name: string;
  pronouns: string;
  nsfw_enabled: boolean;
  content_intensity: string;
  response_length: string;
  action_frequency: string;
}

function AccountPageContent() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [preferences, setPreferences] = useState<Preferences>({
    display_name: '',
    pronouns: 'they/them',
    nsfw_enabled: true,
    content_intensity: 'flirty',
    response_length: 'medium',
    action_frequency: 'balanced'
  });

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      // Try to load from localStorage first (fallback until backend is ready)
      const savedPrefs = localStorage.getItem('pixelcrush_preferences');
      if (savedPrefs) {
        setPreferences(JSON.parse(savedPrefs));
      }

      // TODO: Load from backend when endpoint is ready
      // const response = await fetch('/api/users/preferences', {
      //   headers: { 'Authorization': `Bearer ${token}` }
      // });
      // const data = await response.json();
      // setPreferences(data.preferences);
    } catch (error) {
      console.error('Failed to load preferences:', error);
    } finally {
      setLoading(false);
    }
  };

  const savePreferences = async () => {
    setSaving(true);
    try {
      // Save to localStorage for now
      localStorage.setItem('pixelcrush_preferences', JSON.stringify(preferences));

      // TODO: Save to backend when endpoint is ready
      // const response = await fetch('/api/users/preferences', {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   },
      //   body: JSON.stringify(preferences)
      // });

      alert('Settings saved! ✓');
    } catch (error) {
      alert('Failed to save settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out?')) {
      logout();
      router.push('/login');
    }
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'Unknown';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
      return 'Unknown';
    }
  };

  if (loading) {
    return (
      <div style={{
        fontFamily: 'Poppins, sans-serif',
        background: '#131313',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{
      fontFamily: 'Poppins, sans-serif',
      background: '#131313',
      color: 'white',
      minHeight: '100vh',
      maxWidth: '600px',
      margin: '0 auto',
      paddingBottom: '100px'
    }}>
      {/* Header */}
      <div style={{
        background: '#131313',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        padding: '16px',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => router.back()}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '24px',
              cursor: 'pointer',
              padding: 0,
              lineHeight: 1
            }}
          >
            ←
          </button>
          <h1 style={{
            fontSize: '20px',
            fontWeight: 600,
            margin: 0
          }}>
            Account Settings
          </h1>
        </div>
      </div>

      <div style={{ padding: '16px' }}>
        {/* Account Info Section */}
        <section style={{
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid rgba(255,255,255,0.1)',
          marginBottom: '24px'
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: 600,
            color: '#FF3B9A',
            marginBottom: '16px',
            marginTop: 0
          }}>
            Account
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <div style={{
                fontSize: '13px',
                color: 'rgba(255,255,255,0.6)',
                marginBottom: '4px'
              }}>
                Email
              </div>
              <div style={{ color: 'white' }}>{user?.email}</div>
            </div>

            <div>
              <div style={{
                fontSize: '13px',
                color: 'rgba(255,255,255,0.6)',
                marginBottom: '4px'
              }}>
                Member Since
              </div>
              <div style={{ color: 'white' }}>
                {formatDate(user?.created_at)}
              </div>
            </div>

            <div>
              <div style={{
                fontSize: '13px',
                color: 'rgba(255,255,255,0.6)',
                marginBottom: '4px'
              }}>
                Subscription
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'white', fontWeight: 600 }}>
                  Free
                </span>
                <button
                  onClick={() => router.push('/pricing')}
                  style={{
                    background: 'linear-gradient(135deg, #FF3B9A 0%, #A445ED 100%)',
                    border: 'none',
                    padding: '4px 12px',
                    borderRadius: '16px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: 'white',
                    cursor: 'pointer'
                  }}
                >
                  Upgrade
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Profile Section */}
        <section style={{
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid rgba(255,255,255,0.1)',
          marginBottom: '24px'
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: 600,
            color: '#FF3B9A',
            marginBottom: '16px',
            marginTop: 0
          }}>
            Profile
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '13px',
                color: 'rgba(255,255,255,0.6)',
                marginBottom: '8px'
              }}>
                Display Name (optional)
              </label>
              <input
                type="text"
                value={preferences.display_name}
                onChange={(e) => setPreferences({ ...preferences, display_name: e.target.value })}
                placeholder="What should characters call you?"
                maxLength={50}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  outline: 'none'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#FF3B9A'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
              <p style={{
                fontSize: '12px',
                color: 'rgba(255,255,255,0.4)',
                marginTop: '4px',
                marginBottom: 0
              }}>
                Leave blank to not be addressed by name
              </p>
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '13px',
                color: 'rgba(255,255,255,0.6)',
                marginBottom: '8px'
              }}>
                Pronouns
              </label>
              <select
                value={preferences.pronouns}
                onChange={(e) => setPreferences({ ...preferences, pronouns: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  outline: 'none',
                  cursor: 'pointer'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#FF3B9A'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
              >
                <option value="he/him">He/Him</option>
                <option value="she/her">She/Her</option>
                <option value="they/them">They/Them</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </section>

        {/* Content Settings Section */}
        <section style={{
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid rgba(255,255,255,0.1)',
          marginBottom: '24px'
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: 600,
            color: '#FF3B9A',
            marginBottom: '16px',
            marginTop: 0
          }}>
            Content Settings
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* NSFW Toggle */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between'
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500, marginBottom: '4px' }}>NSFW Content</div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
                  Allow explicit and adult content in conversations
                </div>
              </div>
              <label style={{
                position: 'relative',
                display: 'inline-block',
                width: '48px',
                height: '24px',
                flexShrink: 0,
                marginLeft: '12px'
              }}>
                <input
                  type="checkbox"
                  checked={preferences.nsfw_enabled}
                  onChange={(e) => setPreferences({ ...preferences, nsfw_enabled: e.target.checked })}
                  style={{ display: 'none' }}
                />
                <span style={{
                  position: 'absolute',
                  cursor: 'pointer',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: preferences.nsfw_enabled
                    ? 'linear-gradient(135deg, #FF3B9A 0%, #A445ED 100%)'
                    : 'rgba(255,255,255,0.1)',
                  transition: '0.4s',
                  borderRadius: '24px'
                }}>
                  <span style={{
                    position: 'absolute',
                    content: '',
                    height: '20px',
                    width: '20px',
                    left: preferences.nsfw_enabled ? '26px' : '2px',
                    bottom: '2px',
                    background: 'white',
                    transition: '0.4s',
                    borderRadius: '50%'
                  }} />
                </span>
              </label>
            </div>

            {/* Content Intensity */}
            {preferences.nsfw_enabled && (
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.6)',
                  marginBottom: '8px'
                }}>
                  Content Intensity
                </label>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '8px'
                }}>
                  {[
                    { value: 'romantic', label: 'Romantic', desc: 'Sweet & emotional' },
                    { value: 'flirty', label: 'Flirty', desc: 'Playful & suggestive' },
                    { value: 'explicit', label: 'Explicit', desc: 'No restrictions' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setPreferences({ ...preferences, content_intensity: option.value })}
                      style={{
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid',
                        borderColor: preferences.content_intensity === option.value
                          ? 'transparent'
                          : 'rgba(255,255,255,0.1)',
                        background: preferences.content_intensity === option.value
                          ? 'linear-gradient(135deg, #FF3B9A 0%, #A445ED 100%)'
                          : 'rgba(255,255,255,0.05)',
                        color: 'white',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ fontWeight: 500, fontSize: '14px', marginBottom: '4px' }}>
                        {option.label}
                      </div>
                      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>
                        {option.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Chat Style Section */}
        <section style={{
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid rgba(255,255,255,0.1)',
          marginBottom: '24px'
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: 600,
            color: '#FF3B9A',
            marginBottom: '16px',
            marginTop: 0
          }}>
            Chat Style
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Response Length */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '13px',
                color: 'rgba(255,255,255,0.6)',
                marginBottom: '8px'
              }}>
                Response Length
              </label>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '8px'
              }}>
                {[
                  { value: 'short', label: 'Short', desc: '1-2 sentences' },
                  { value: 'medium', label: 'Medium', desc: '2-4 sentences' },
                  { value: 'long', label: 'Long', desc: '4-6+ sentences' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setPreferences({ ...preferences, response_length: option.value })}
                    style={{
                      padding: '8px',
                      borderRadius: '8px',
                      border: '1px solid',
                      borderColor: preferences.response_length === option.value
                        ? 'transparent'
                        : 'rgba(255,255,255,0.1)',
                      background: preferences.response_length === option.value
                        ? 'linear-gradient(135deg, #FF3B9A 0%, #A445ED 100%)'
                        : 'rgba(255,255,255,0.05)',
                      color: 'white',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      fontSize: '13px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ fontWeight: 500, marginBottom: '2px' }}>
                      {option.label}
                    </div>
                    <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)' }}>
                      {option.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Frequency */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '13px',
                color: 'rgba(255,255,255,0.6)',
                marginBottom: '8px'
              }}>
                Action Frequency
              </label>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '8px'
              }}>
                {[
                  { value: 'less', label: 'Less', desc: 'More dialogue' },
                  { value: 'balanced', label: 'Balanced', desc: 'Mix of both' },
                  { value: 'heavy', label: 'Heavy', desc: 'More actions' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setPreferences({ ...preferences, action_frequency: option.value })}
                    style={{
                      padding: '8px',
                      borderRadius: '8px',
                      border: '1px solid',
                      borderColor: preferences.action_frequency === option.value
                        ? 'transparent'
                        : 'rgba(255,255,255,0.1)',
                      background: preferences.action_frequency === option.value
                        ? 'linear-gradient(135deg, #FF3B9A 0%, #A445ED 100%)'
                        : 'rgba(255,255,255,0.05)',
                      color: 'white',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      fontSize: '13px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ fontWeight: 500, marginBottom: '2px' }}>
                      {option.label}
                    </div>
                    <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)' }}>
                      {option.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Save Button */}
        <button
          onClick={savePreferences}
          disabled={saving}
          style={{
            width: '100%',
            padding: '16px',
            background: saving
              ? 'rgba(255,255,255,0.1)'
              : 'linear-gradient(135deg, #FF3B9A 0%, #A445ED 100%)',
            border: 'none',
            borderRadius: '12px',
            color: 'white',
            fontSize: '16px',
            fontWeight: 600,
            cursor: saving ? 'not-allowed' : 'pointer',
            fontFamily: 'inherit',
            marginBottom: '12px',
            opacity: saving ? 0.5 : 1,
            transition: 'all 0.2s ease'
          }}
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            padding: '12px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            color: 'white',
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'all 0.2s ease'
          }}
        >
          Logout
        </button>
      </div>

      <style jsx>{`
        select option {
          background: #131313;
          color: white;
        }
        input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }
      `}</style>
    </div>
  );
}

export default function AccountPage() {
  return (
    <ProtectedRoute>
      <AccountPageContent />
    </ProtectedRoute>
  );
}
