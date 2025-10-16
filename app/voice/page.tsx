'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

export default function VoicePage() {
  const [callActive, setCallActive] = useState(false);
  const [callerName, setCallerName] = useState('');
  const [callerImage, setCallerImage] = useState('');
  const [callStatus, setCallStatus] = useState('Calling...');
  const [callDuration, setCallDuration] = useState('00:00');
  const [callSeconds, setCallSeconds] = useState(0);
  const callTimerRef = useRef<NodeJS.Timeout | null>(null);

  const openTokens = () => {
    window.location.href = '/tokens';
  };

  const initiateCall = (characterName: string, characterImage: string) => {
    setCallerName(characterName);
    setCallerImage(characterImage);
    setCallStatus('Calling...');
    setCallActive(true);
    setCallSeconds(0);

    // Simulate connecting after 2 seconds
    setTimeout(() => {
      setCallStatus('Connected');
      startCallTimer();
    }, 2000);
  };

  const startCallTimer = () => {
    callTimerRef.current = setInterval(() => {
      setCallSeconds(prev => {
        const newSeconds = prev + 1;
        const minutes = Math.floor(newSeconds / 60);
        const seconds = newSeconds % 60;
        setCallDuration(
          `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        );
        return newSeconds;
      });
    }, 1000);
  };

  const endCall = () => {
    if (callTimerRef.current) {
      clearInterval(callTimerRef.current);
      callTimerRef.current = null;
    }
    setCallActive(false);
    setCallSeconds(0);
    setCallDuration('00:00');
  };

  const toggleMute = () => {
    alert('🎤 Mute toggled');
  };

  const toggleSpeaker = () => {
    alert('🔊 Speaker toggled');
  };

  const toggleVideo = () => {
    alert('📹 Video toggled');
  };

  useEffect(() => {
    return () => {
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current);
      }
    };
  }, []);

  return (
    <>
      <div className="body-wrapper">
        {/* Header */}
        <div className="header">
          <div className="header-content">
            <div className="logo">
              <img src="https://www.figma.com/api/mcp/asset/75bd6a91-1161-4217-a70b-3569d51184c9" alt="PixelCrush.ai" />
            </div>
            <div className="token-display" onClick={openTokens}>
              <div className="token-icon">
                <img src="https://www.figma.com/api/mcp/asset/896841e1-bd7c-4c52-bf10-68513b3a60fe" alt="Tokens" />
              </div>
              <div className="token-amount">0.8</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <h1 className="page-title">Voice Call</h1>

          {/* Available Characters Grid */}
          <div className="voice-grid">
            <div className="voice-card" onClick={() => initiateCall('Paige Grey', 'https://www.figma.com/api/mcp/asset/fe87f0c9-07a7-43e8-af45-605840735bd3')}>
              <img src="https://www.figma.com/api/mcp/asset/fe87f0c9-07a7-43e8-af45-605840735bd3" alt="Paige Grey" className="voice-card-image" />
              <div className="voice-card-content">
                <div className="voice-card-name">Paige Grey</div>
                <div className="voice-card-status">
                  <span className="status-dot"></span>
                  Available
                </div>
              </div>
              <button className="call-button" onClick={(e) => { e.stopPropagation(); initiateCall('Paige Grey', 'https://www.figma.com/api/mcp/asset/fe87f0c9-07a7-43e8-af45-605840735bd3'); }}>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                </svg>
              </button>
            </div>

            <div className="voice-card" onClick={() => initiateCall('Katarina', 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62')}>
              <img src="https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62" alt="Katarina" className="voice-card-image" />
              <div className="voice-card-content">
                <div className="voice-card-name">Katarina</div>
                <div className="voice-card-status">
                  <span className="status-dot"></span>
                  Available
                </div>
              </div>
              <button className="call-button" onClick={(e) => { e.stopPropagation(); initiateCall('Katarina', 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62'); }}>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                </svg>
              </button>
            </div>

            <div className="voice-card" onClick={() => initiateCall('Lila Crazy', 'https://www.figma.com/api/mcp/asset/2c7a16b9-ce7c-4520-820f-3970137843bd')}>
              <img src="https://www.figma.com/api/mcp/asset/2c7a16b9-ce7c-4520-820f-3970137843bd" alt="Lila Crazy" className="voice-card-image" />
              <div className="voice-card-content">
                <div className="voice-card-name">Lila Crazy</div>
                <div className="voice-card-status">
                  <span className="status-dot offline"></span>
                  Busy
                </div>
              </div>
              <button className="call-button" style={{ opacity: 0.5 }} onClick={(e) => { e.stopPropagation(); initiateCall('Lila Crazy', 'https://www.figma.com/api/mcp/asset/2c7a16b9-ce7c-4520-820f-3970137843bd'); }}>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                </svg>
              </button>
            </div>

            <div className="voice-card" onClick={() => initiateCall('Luna', 'https://www.figma.com/api/mcp/asset/ffd774a4-1d92-4f29-a763-f8c92c7c4e36')}>
              <img src="https://www.figma.com/api/mcp/asset/ffd774a4-1d92-4f29-a763-f8c92c7c4e36" alt="Luna" className="voice-card-image" />
              <div className="voice-card-content">
                <div className="voice-card-name">Luna</div>
                <div className="voice-card-status">
                  <span className="status-dot"></span>
                  Available
                </div>
              </div>
              <button className="call-button" onClick={(e) => { e.stopPropagation(); initiateCall('Luna', 'https://www.figma.com/api/mcp/asset/ffd774a4-1d92-4f29-a763-f8c92c7c4e36'); }}>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Call History */}
          <div className="history-section">
            <div className="section-header">
              <h2 className="section-title">Recent Calls</h2>
              <a href="#" className="see-all">See All</a>
            </div>

            <div className="call-history-list">
              <div className="call-history-item">
                <img src="https://www.figma.com/api/mcp/asset/fe87f0c9-07a7-43e8-af45-605840735bd3" alt="Paige Grey" className="call-avatar" />
                <div className="call-info-text">
                  <div className="call-name">Paige Grey</div>
                  <div className="call-details">
                    <svg className="call-icon incoming" viewBox="0 0 14 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.5 3.5L7 7l-3.5-3.5M7 3v7"/>
                    </svg>
                    <span>Incoming • 2 hours ago</span>
                  </div>
                </div>
                <div className="call-duration-text">12:34</div>
                <button className="call-again-btn" onClick={() => initiateCall('Paige Grey', 'https://www.figma.com/api/mcp/asset/fe87f0c9-07a7-43e8-af45-605840735bd3')}>
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                  </svg>
                </button>
              </div>

              <div className="call-history-item">
                <img src="https://www.figma.com/api/mcp/asset/ffd774a4-1d92-4f29-a763-f8c92c7c4e36" alt="Luna" className="call-avatar" />
                <div className="call-info-text">
                  <div className="call-name">Luna</div>
                  <div className="call-details">
                    <svg className="call-icon outgoing" viewBox="0 0 14 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.5 10.5L7 7l3.5 3.5M7 11V4"/>
                    </svg>
                    <span>Outgoing • Yesterday</span>
                  </div>
                </div>
                <div className="call-duration-text">8:12</div>
                <button className="call-again-btn" onClick={() => initiateCall('Luna', 'https://www.figma.com/api/mcp/asset/ffd774a4-1d92-4f29-a763-f8c92c7c4e36')}>
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                  </svg>
                </button>
              </div>

              <div className="call-history-item">
                <img src="https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62" alt="Katarina" className="call-avatar" />
                <div className="call-info-text">
                  <div className="call-name">Katarina</div>
                  <div className="call-details">
                    <svg className="call-icon missed" viewBox="0 0 14 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 3l8 8M11 3l-8 8"/>
                    </svg>
                    <span>Missed • 2 days ago</span>
                  </div>
                </div>
                <div className="call-duration-text">--:--</div>
                <button className="call-again-btn" onClick={() => initiateCall('Katarina', 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62')}>
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* iPhone-style Call Screen */}
        <div className={`call-screen ${callActive ? 'active' : ''}`} id="callScreen">
          <div className="call-info">
            <img src={callerImage} alt={callerName} className="caller-avatar" id="callerAvatar" />
            <div className="caller-name" id="callerName">{callerName}</div>
            <div className={`call-status ${callStatus === 'Calling...' ? 'connecting' : ''}`} id="callStatus">{callStatus}</div>
            <div className="call-duration" id="callDuration" style={{ display: callStatus === 'Connected' ? 'block' : 'none' }}>{callDuration}</div>
          </div>

          <div className="call-controls">
            <div className="call-actions">
              <button className="call-action-btn" onClick={toggleMute}>
                <div className="action-icon-wrapper">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z"/>
                  </svg>
                </div>
                <span className="action-label">Mute</span>
              </button>

              <button className="call-action-btn" onClick={toggleSpeaker}>
                <div className="action-icon-wrapper">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                  </svg>
                </div>
                <span className="action-label">Speaker</span>
              </button>

              <button className="call-action-btn" onClick={toggleVideo}>
                <div className="action-icon-wrapper">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
                  </svg>
                </div>
                <span className="action-label">Video</span>
              </button>
            </div>

            <button className="end-call-btn" onClick={endCall}>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08c-.18-.17-.29-.42-.29-.7 0-.28.11-.53.29-.71C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67c.18.18.29.43.29.71 0 .28-.11.53-.29.71l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.11-.7-.28-.79-.74-1.69-1.36-2.67-1.85-.33-.16-.56-.5-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="bottom-nav">
          <Link href="/characters" className="nav-item">
            <div className="nav-icon">
              <img src="https://www.figma.com/api/mcp/asset/6e8a5d93-897f-4d7e-98c9-9a28d2cab5d0" alt="Characters" />
            </div>
            <div className="nav-label">Characters</div>
          </Link>
          <Link href="/chat" className="nav-item">
            <div className="nav-icon">
              <img src="https://www.figma.com/api/mcp/asset/6c92bf79-791c-4aa0-86ea-92a4bd2963d9" alt="Chat" />
            </div>
            <div className="nav-label">Chat</div>
          </Link>
          <Link href="/voice" className="nav-item active">
            <div className="nav-icon">
              <img src="https://www.figma.com/api/mcp/asset/b84a345c-6523-432d-beb0-df74be777edc" alt="Voice Call" />
            </div>
            <div className="nav-label">Voice Call</div>
          </Link>
          <Link href="/gallery" className="nav-item">
            <div className="nav-icon">
              <img src="https://www.figma.com/api/mcp/asset/789f6323-9b48-419c-a0b1-26f69bb5b3d0" alt="Gallery" />
            </div>
            <div className="nav-label">Gallery</div>
          </Link>
          <Link href="/account" className="nav-item">
            <div className="nav-icon">
              <img src="https://www.figma.com/api/mcp/asset/c9bfdd57-ef2c-41ab-8bc7-060adde3d152" alt="Account" />
            </div>
            <div className="nav-label">Account</div>
          </Link>
        </div>
      </div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          -webkit-tap-highlight-color: transparent;
        }

        .body-wrapper {
          font-family: 'TikTok Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: #131313;
          color: white;
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          max-width: 393px;
          margin: 0 auto;
        }

        .header {
          background: #131313;
          border-bottom: 0.593px solid #363636;
          height: 64px;
          display: flex;
          align-items: center;
          padding: 0 8px;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          max-width: 393px;
          margin: 0 auto;
          z-index: 1000;
          box-shadow: 0px 1px 0px 0px rgba(0,0,0,0.05);
        }

        .header-content {
          display: flex;
          align-items: center;
          width: 100%;
          padding-left: 20px;
        }

        .logo {
          width: 87px;
          height: 37px;
        }

        .logo img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .token-display {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6.593px 16.593px;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 8px;
          cursor: pointer;
          opacity: 0.6;
        }

        .token-icon {
          width: 30px;
          height: 30px;
        }

        .token-icon img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .token-amount {
          font-size: 16px;
          line-height: 24px;
          color: white;
        }

        .main-content {
          flex: 1;
          margin-top: 64px;
          margin-bottom: 78px;
          overflow-y: auto;
          padding: 24px 0;
        }

        .page-title {
          font-weight: 700;
          font-size: 24px;
          line-height: 34px;
          color: white;
          margin-bottom: 20px;
          padding: 0 12px;
        }

        .voice-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 3.335px;
          padding: 0 3.335px;
          margin-bottom: 32px;
        }

        .voice-card {
          width: 100%;
          height: 257px;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .voice-card:hover {
          transform: scale(1.02);
        }

        .voice-card:active {
          transform: scale(0.98);
        }

        .voice-card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .voice-card-content {
          position: absolute;
          bottom: 16px;
          left: 20px;
          right: 20px;
          text-align: center;
        }

        .voice-card-name {
          font-weight: 500;
          font-size: 16px;
          line-height: 21px;
          color: white;
          text-shadow: 0px 2px 8px rgba(0,0,0,0.5);
          margin-bottom: 4px;
        }

        .voice-card-status {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 13px;
          line-height: 18px;
          color: white;
          text-shadow: 0px 2px 8px rgba(0,0,0,0.5);
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #4FAB52;
          box-shadow: 0px 0px 8px rgba(79, 171, 82, 0.6);
        }

        .status-dot.offline {
          background: #616162;
          box-shadow: none;
        }

        .call-button {
          position: absolute;
          bottom: 68px;
          right: 12px;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #4FAB52;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0px 4px 12px rgba(0,0,0,0.4);
          transition: transform 0.2s ease;
          z-index: 10;
        }

        .call-button:hover {
          transform: scale(1.1);
        }

        .call-button:active {
          transform: scale(0.95);
        }

        .call-button svg {
          width: 24px;
          height: 24px;
          fill: white;
        }

        .call-screen {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          max-width: 393px;
          margin: 0 auto;
          background: linear-gradient(180deg, #1a1a1a 0%, #000000 100%);
          z-index: 2000;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 60px 20px 40px;
        }

        .call-screen.active {
          display: flex;
        }

        .call-info {
          text-align: center;
          margin-top: 40px;
        }

        .caller-avatar {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          object-fit: cover;
          margin: 0 auto 32px;
          box-shadow: 0px 8px 32px rgba(0,0,0,0.4);
        }

        .caller-name {
          font-weight: 600;
          font-size: 32px;
          line-height: 40px;
          color: white;
          margin-bottom: 12px;
        }

        .call-status {
          font-size: 18px;
          line-height: 24px;
          color: rgba(255,255,255,0.7);
          margin-bottom: 8px;
        }

        .call-duration {
          font-size: 16px;
          line-height: 22px;
          color: rgba(255,255,255,0.6);
        }

        .call-controls {
          width: 100%;
          max-width: 320px;
          display: flex;
          flex-direction: column;
          gap: 40px;
          align-items: center;
        }

        .call-actions {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          width: 100%;
        }

        .call-action-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          cursor: pointer;
        }

        .action-icon-wrapper {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s;
        }

        .call-action-btn:hover .action-icon-wrapper {
          transform: scale(1.1);
        }

        .call-action-btn:active .action-icon-wrapper {
          transform: scale(0.95);
        }

        .action-icon-wrapper svg {
          width: 28px;
          height: 28px;
          fill: white;
        }

        .action-label {
          font-size: 13px;
          line-height: 18px;
          color: rgba(255,255,255,0.9);
        }

        .end-call-btn {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: #FF3B54;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0px 4px 16px rgba(255, 59, 84, 0.4);
          transition: transform 0.2s;
        }

        .end-call-btn:hover {
          transform: scale(1.1);
        }

        .end-call-btn:active {
          transform: scale(0.95);
        }

        .end-call-btn svg {
          width: 28px;
          height: 28px;
          fill: white;
        }

        .history-section {
          padding: 0 12px;
        }

        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .section-title {
          font-weight: 600;
          font-size: 18px;
          line-height: 24px;
          color: white;
        }

        .see-all {
          font-size: 14px;
          line-height: 20px;
          color: #A445ED;
          text-decoration: none;
          cursor: pointer;
        }

        .call-history-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .call-history-item {
          background: #1a1a1a;
          border-radius: 12px;
          padding: 12px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .call-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          object-fit: cover;
          flex-shrink: 0;
        }

        .call-info-text {
          flex: 1;
          min-width: 0;
        }

        .call-name {
          font-weight: 500;
          font-size: 15px;
          line-height: 20px;
          color: white;
          margin-bottom: 2px;
        }

        .call-details {
          font-size: 13px;
          line-height: 18px;
          color: rgba(255,255,255,0.6);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .call-icon {
          width: 14px;
          height: 14px;
        }

        .call-icon.incoming {
          color: #4FAB52;
        }

        .call-icon.outgoing {
          color: #A445ED;
        }

        .call-icon.missed {
          color: #FF3B9A;
        }

        .call-duration-text {
          font-size: 13px;
          line-height: 18px;
          color: rgba(255,255,255,0.5);
        }

        .call-again-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(79, 171, 82, 0.15);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
        }

        .call-again-btn svg {
          width: 20px;
          height: 20px;
          fill: #4FAB52;
        }

        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          max-width: 393px;
          margin: 0 auto;
          background: #131313;
          border-top: 0.593px solid rgba(255,255,255,0.2);
          height: 78px;
          display: flex;
          justify-content: space-around;
          align-items: flex-start;
          padding: 8px 12px;
          z-index: 1000;
        }

        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-decoration: none;
          color: rgba(255,255,255,0.7);
        }

        .nav-item.active {
          color: white;
        }

        .nav-icon {
          height: 44px;
          width: 30px;
          margin-bottom: 0;
        }

        .nav-icon img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .nav-label {
          font-size: 10px;
          line-height: 15px;
          margin-top: -1px;
        }

        .main-content::-webkit-scrollbar {
          width: 6px;
        }

        .main-content::-webkit-scrollbar-track {
          background: #131313;
        }

        .main-content::-webkit-scrollbar-thumb {
          background: #363636;
          border-radius: 3px;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .call-status.connecting {
          animation: pulse 1.5s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}