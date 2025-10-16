'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ChatInterface() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const characterId = searchParams.get('character');

  const [messages, setMessages] = useState<Array<{
    id: number;
    text: string;
    sender: 'user' | 'character';
    timestamp: string;
  }>>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock character data
  const character = {
    id: characterId || '1',
    name: 'Paige Grey',
    image: 'https://imagedelivery.net/1jofzuZbO-j3cbnn4BjhZQ/6bd3e7a4-8a11-43e5-77ad-bec58f750500/public',
    status: 'online'
  };

  // Initial greeting
  useEffect(() => {
    const greeting = {
      id: 1,
      text: `Hey! I'm ${character.name}. So glad you're here! 😊 What's on your mind?`,
      sender: 'character' as const,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([greeting]);
  }, [character.name]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user' as const,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "That's really interesting! Tell me more about that 🤔",
        "I love talking about this! What else would you like to know?",
        "You're so fun to chat with! 😄",
        "That's a great question! Let me think about it...",
        "I'm really enjoying our conversation! 💕"
      ];

      const aiMessage = {
        id: messages.length + 2,
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'character' as const,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      {/* Custom Header for Chat */}
      <div className="chat-header">
        <button onClick={() => router.back()} className="back-button">
          ←
        </button>
        <div className="header-character-info">
          <img src={character.image} alt={character.name} className="header-avatar" />
          <div className="header-details">
            <h2 className="header-name">{character.name}</h2>
            <span className="header-status">
              <span className="status-dot"></span>
              {character.status}
            </span>
          </div>
        </div>
        <div className="header-actions">
          <button className="icon-button">📞</button>
          <button className="icon-button">⋮</button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="messages-container">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.sender === 'user' ? 'user-message' : 'character-message'}`}
          >
            {message.sender === 'character' && (
              <img src={character.image} alt={character.name} className="message-avatar" />
            )}
            <div className="message-content">
              <div className="message-bubble">
                {message.text}
              </div>
              <span className="message-time">{message.timestamp}</span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="message character-message">
            <img src={character.image} alt={character.name} className="message-avatar" />
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="input-container">
        <button className="attach-button">+</button>
        <input
          type="text"
          className="message-input"
          placeholder="Type a message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button 
          className="send-button"
          onClick={handleSend}
          disabled={!inputText.trim()}
        >
          ➤
        </button>
      </div>

      <style jsx>{`
        .chat-container {
          display: flex;
          flex-direction: column;
          height: 100vh;
          background: #131313;
          font-family: 'TikTok Sans', -apple-system, sans-serif;
          max-width: 393px;
          margin: 0 auto;
        }

        .chat-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: #1e1e1e;
          border-bottom: 1px solid #2a2a2a;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .back-button {
          background: none;
          border: none;
          color: white;
          font-size: 24px;
          cursor: pointer;
          padding: 4px;
          line-height: 1;
        }

        .header-character-info {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
        }

        .header-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }

        .header-details {
          flex: 1;
        }

        .header-name {
          font-size: 16px;
          font-weight: 600;
          color: white;
          margin: 0 0 2px 0;
        }

        .header-status {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #4ade80;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          background: #4ade80;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .header-actions {
          display: flex;
          gap: 8px;
        }

        .icon-button {
          background: none;
          border: none;
          color: white;
          font-size: 20px;
          cursor: pointer;
          padding: 4px 8px;
        }

        .messages-container {
          flex: 1;
          overflow-y: auto;
          padding: 20px 16px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .messages-container::-webkit-scrollbar {
          width: 6px;
        }

        .messages-container::-webkit-scrollbar-track {
          background: #131313;
        }

        .messages-container::-webkit-scrollbar-thumb {
          background: #363636;
          border-radius: 3px;
        }

        .message {
          display: flex;
          gap: 10px;
          max-width: 85%;
        }

        .user-message {
          margin-left: auto;
          flex-direction: row-reverse;
        }

        .character-message {
          margin-right: auto;
        }

        .message-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
          flex-shrink: 0;
        }

        .message-content {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .user-message .message-content {
          align-items: flex-end;
        }

        .message-bubble {
          padding: 12px 16px;
          border-radius: 18px;
          font-size: 15px;
          line-height: 1.4;
          word-wrap: break-word;
        }

        .user-message .message-bubble {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-bottom-right-radius: 4px;
        }

        .character-message .message-bubble {
          background: #2a2a2a;
          color: white;
          border-bottom-left-radius: 4px;
        }

        .message-time {
          font-size: 11px;
          color: #666;
          padding: 0 4px;
        }

        .typing-indicator {
          display: flex;
          gap: 4px;
          padding: 12px 16px;
          background: #2a2a2a;
          border-radius: 18px;
          border-bottom-left-radius: 4px;
        }

        .typing-indicator span {
          width: 8px;
          height: 8px;
          background: #666;
          border-radius: 50%;
          animation: typing 1.4s infinite;
        }

        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes typing {
          0%, 60%, 100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-10px);
          }
        }

        .input-container {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          background: #1e1e1e;
          border-top: 1px solid #2a2a2a;
        }

        .attach-button {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #2a2a2a;
          border: none;
          color: white;
          font-size: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .message-input {
          flex: 1;
          background: #2a2a2a;
          border: none;
          border-radius: 20px;
          padding: 10px 16px;
          color: white;
          font-size: 15px;
          font-family: 'TikTok Sans', -apple-system, sans-serif;
        }

        .message-input::placeholder {
          color: #666;
        }

        .message-input:focus {
          outline: none;
          background: #333;
        }

        .send-button {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          color: white;
          font-size: 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: opacity 0.3s;
        }

        .send-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .send-button:not(:disabled):hover {
          opacity: 0.9;
        }
      `}</style>
    </div>
  );
}