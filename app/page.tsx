'use client';

export default function HomePage() {
  const characters = [
    { name: 'Luna', image: 'https://www.figma.com/api/mcp/asset/ffd774a4-1d92-4f29-a763-f8c92c7c4e36', id: 'luna' },
    { name: 'Katarina', image: 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62', id: 'katarina' },
    { name: 'Katarina', image: 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62', id: 'katarina2' },
    { name: 'Katarina', image: 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62', id: 'katarina3' },
    { name: 'Katarina', image: 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62', id: 'katarina4' },
    { name: 'Katarina', image: 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62', id: 'katarina5' },
    { name: 'Katarina', image: 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62', id: 'katarina6' },
    { name: 'Katarina', image: 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62', id: 'katarina7' },
    { name: 'Katarina', image: 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62', id: 'katarina8' },
    { name: 'Katarina', image: 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62', id: 'katarina9' },
    { name: 'Katarina', image: 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62', id: 'katarina10' },
    { name: 'Katarina', image: 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62', id: 'katarina11' },
    { name: 'Katarina', image: 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62', id: 'katarina12' },
    { name: 'Katarina', image: 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62', id: 'katarina13' },
    { name: 'Katarina', image: 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62', id: 'katarina14' },
    { name: 'Katarina', image: 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62', id: 'katarina15' },
    { name: 'Katarina', image: 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62', id: 'katarina16' },
    { name: 'Katarina', image: 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62', id: 'katarina17' },
    { name: 'Katarina', image: 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62', id: 'katarina18' },
    { name: 'Katarina', image: 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62', id: 'katarina19' },
    { name: 'Katarina', image: 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62', id: 'katarina20' },
    { name: 'Katarina', image: 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62', id: 'katarina21' },
    { name: 'Katarina', image: 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62', id: 'katarina22' },
    { name: 'Katarina', image: 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62', id: 'katarina23' },
    { name: 'Katarina', image: 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62', id: 'katarina24' },
    { name: 'Katarina', image: 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62', id: 'katarina25' },
    { name: 'Katarina', image: 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62', id: 'katarina26' },
    { name: 'Katarina', image: 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62', id: 'katarina27' },
    { name: 'Katarina', image: 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62', id: 'katarina28' },
    { name: 'Katarina', image: 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62', id: 'katarina29' },
    { name: 'Katarina', image: 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62', id: 'katarina30' },
    { name: 'Katarina', image: 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62', id: 'katarina31' },
    { name: 'Katarina', image: 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62', id: 'katarina32' },
    { name: 'Katarina', image: 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62', id: 'katarina33' },
    { name: 'Katarina', image: 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62', id: 'katarina34' },
    { name: 'Katarina', image: 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62', id: 'katarina35' },
    { name: 'Katarina', image: 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62', id: 'katarina36' },
    { name: 'Katarina', image: 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62', id: 'katarina37' },
    { name: 'Katarina', image: 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62', id: 'katarina38' },
    { name: 'Katarina', image: 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62', id: 'katarina39' },
    { name: 'Katarina', image: 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62', id: 'katarina40' },
    { name: 'Katarina', image: 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62', id: 'katarina41' },
    { name: 'Katarina', image: 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62', id: 'katarina42' },
    { name: 'Katarina', image: 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62', id: 'katarina43' },
    { name: 'Katarina', image: 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62', id: 'katarina44' },
    { name: 'Katarina', image: 'https://www.figma.com/api/mcp/asset/2ae3f347-fba1-48d7-a73b-a7f88d41ea62', id: 'katarina45' }
  ];

  const selectCharacter = (characterId) => {
    window.location.href = `/chat?character=${characterId}`;
  };

  return (
    <div style={{
      fontFamily: 'Poppins, sans-serif',
      background: '#131313',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      maxWidth: '393px',
      margin: '0 auto'
    }}>
      {/* Header */}
      <div style={{
        background: '#131313',
        borderBottom: '0.593px solid #363636',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px 0 25px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0px 1px 0px 0px rgba(0,0,0,0.05)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%'
        }}>
          <a href="/" style={{ width: '87px', height: '37px', display: 'block' }}>
            <img 
              src="https://www.figma.com/api/mcp/asset/75bd6a91-1161-4217-a70b-3569d51184c9"
              alt="PixelCrush.ai"
              style={{ width: '100%', height: '100%', objectFit: 'contain', cursor: 'pointer' }}
            />
          </a>
          <a 
            href="/tokens"
            style={{
              marginLeft: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6.593px 16.593px',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '8px',
              cursor: 'pointer',
              textDecoration: 'none',
              opacity: 0.6
            }}
          >
            <div style={{ width: '30px', height: '30px' }}>
              <img 
                src="https://www.figma.com/api/mcp/asset/896841e1-bd7c-4c52-bf10-68513b3a60fe"
                alt="Tokens"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
            <div style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '16px',
              lineHeight: '24px',
              color: 'white'
            }}>0.8</div>
          </a>
        </div>
      </div>

      {/* Characters Grid */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '12px 0 80px 0',
        WebkitOverflowScrolling: 'touch'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 0
        }}>
          {characters.map((character, idx) => (
            <div 
              key={idx}
              onClick={() => selectCharacter(character.id)}
              style={{
                width: '100%',
                aspectRatio: '186/257',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <img 
                src={character.image}
                alt={character.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: '16px',
                left: '20px',
                right: '20px',
                textAlign: 'center',
                padding: '6px 0',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 500,
                fontSize: '16px',
                lineHeight: '21px',
                color: 'white'
              }}>
                {character.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        maxWidth: '393px',
        margin: '0 auto',
        background: '#131313',
        borderTop: '0.593px solid rgba(255,255,255,0.2)',
        height: '70px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '8px 12px 8px',
        zIndex: 100
      }}>
        <a href="/" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textDecoration: 'none',
          color: 'white',
          gap: '4px'
        }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9.5L12 3L21 9.5V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 22V12H15V22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '10px',
            lineHeight: '15px'
          }}>Home</div>
        </a>

        <a href="/chat" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textDecoration: 'none',
          color: 'rgba(255,255,255,0.7)',
          gap: '4px',
          opacity: 0.6
        }}>
          <div style={{ height: '30px', width: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="https://www.figma.com/api/mcp/asset/6c92bf79-791c-4aa0-86ea-92a4bd2963d9" alt="Chat" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <div style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '10px',
            lineHeight: '15px'
          }}>Chat</div>
        </a>

        <a href="/voice" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textDecoration: 'none',
          color: 'rgba(255,255,255,0.7)',
          gap: '4px',
          opacity: 0.6
        }}>
          <div style={{ height: '30px', width: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="https://www.figma.com/api/mcp/asset/b84a345c-6523-432d-beb0-df74be777edc" alt="Voice Call" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <div style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '10px',
            lineHeight: '15px'
          }}>Voice Call</div>
        </a>

        <a href="/gallery" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textDecoration: 'none',
          color: 'rgba(255,255,255,0.7)',
          gap: '4px',
          opacity: 0.6
        }}>
          <div style={{ height: '30px', width: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="https://www.figma.com/api/mcp/asset/789f6323-9b48-419c-a0b1-26f69bb5b3d0" alt="Gallery" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <div style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '10px',
            lineHeight: '15px'
          }}>Gallery</div>
        </a>

        <a href="/account" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textDecoration: 'none',
          color: 'rgba(255,255,255,0.7)',
          gap: '4px',
          opacity: 0.6
        }}>
          <div style={{ height: '30px', width: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="https://www.figma.com/api/mcp/asset/c9bfdd57-ef2c-41ab-8bc7-060adde3d152" alt="Account" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <div style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '10px',
            lineHeight: '15px'
          }}>Account</div>
        </a>
      </div>
    </div>
  );
}
