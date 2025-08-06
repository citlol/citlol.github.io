import React, { useState } from 'react';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [showSpotifyModal, setShowSpotifyModal] = useState(false);
  const [isSpotifyLoading, setIsSpotifyLoading] = useState(true);

  const handleNavClick = (section) => {
    setActiveSection(section);
  };

  const openSpotifyModal = () => {
    setShowSpotifyModal(true);
    setIsSpotifyLoading(true);
  };

  const closeSpotifyModal = () => {
    setShowSpotifyModal(false);
    setIsSpotifyLoading(true);
  };

  return (
    <>
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f0f0f0',
        fontFamily: 'monospace',
        position: 'relative'
      }}>
      {/* Desktop Folders */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: '12px'
      }}>
        <img 
          src="/DarkVersion.png" 
          alt="Folder"
          style={{
            width: '48px',
            height: '48px'
          }}
        />
        <span>Folder</span>
      </div>

      <div style={{
        position: 'absolute',
        top: '20px',
        left: '120px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: '12px'
      }}>
        <img 
          src="/DarkVersion.png" 
          alt="Folder"
          style={{
            width: '48px',
            height: '48px'
          }}
        />
        <span>Folder</span>
      </div>

      <div style={{
        position: 'absolute',
        top: '120px',
        left: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: '12px'
      }}>
        <img 
          src="/DarkVersion.png" 
          alt="Folder"
          style={{
            width: '48px',
            height: '48px'
          }}
        />
        <span>Folder</span>
      </div>

      {/* Terminal Window */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px',
        backgroundColor: '#1e1e1e',
        border: '1px solid #555',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
      }}>
        {/* Terminal Header */}
        <div style={{
          backgroundColor: '#333',
          padding: '8px 12px',
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center'
        }}>
          <span style={{ color: '#fff', fontSize: '12px', cursor: 'pointer' }}>✕</span>
        </div>

        {/* Terminal Content */}
        <div style={{
          padding: '20px',
          color: 'white',
          fontSize: '14px',
          minHeight: '300px'
        }}>
          <div style={{ color: '#888', marginBottom: '16px' }}>
            citlol@portfolio ~ %
          </div>
          
          {activeSection === 'home' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <button 
                  onClick={() => handleNavClick('about')}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: 'white', 
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: '14px',
                    fontFamily: 'monospace'
                  }}
                >
                  about.html
                </button>
                <button 
                  onClick={() => handleNavClick('projects')}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: 'white', 
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: '14px',
                    fontFamily: 'monospace'
                  }}
                >
                  projects.js
                </button>
                <button 
                  onClick={() => handleNavClick('contact')}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: 'white', 
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: '14px',
                    fontFamily: 'monospace'
                  }}
                >
                  contact.txt
                </button>
                <button 
                  onClick={() => handleNavClick('skills')}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: 'white', 
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: '14px',
                    fontFamily: 'monospace'
                  }}
                >
                  skills.config
                </button>
              </div>
              <div style={{ color: '#888' }}>
                citlol@portfolio ~ % ■
              </div>
            </div>
          )}

          {activeSection === 'about' && (
            <div>
              <div style={{ color: '#888', marginBottom: '16px' }}>
                citlol@portfolio ~/about % cat about.md
              </div>
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ color: 'white', marginBottom: '8px' }}># About Me</h3>
                <p>Computer science student passionate about creating accessible digital experiences.</p>
                <p>I focus on building inclusive technology that works for everyone.</p>
              </div>
              <button 
                onClick={() => handleNavClick('home')}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: '#4a9eff', 
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontFamily: 'monospace'
                }}
              >
                ← back to home
              </button>
            </div>
          )}

          {activeSection === 'projects' && (
            <div>
              <div style={{ color: '#888', marginBottom: '16px' }}>
                citlol@portfolio ~/projects % ls -la
              </div>
              <div style={{ marginBottom: '20px' }}>
                <p>📁 accessibility_checker/</p>
                <p>📁 portfolio_terminal/</p>
                <p>📁 inclusive_ui_lib/</p>
              </div>
              <button 
                onClick={() => handleNavClick('home')}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: '#4a9eff', 
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontFamily: 'monospace'
                }}
              >
                ← back to home
              </button>
            </div>
          )}

          {activeSection === 'contact' && (
            <div>
              <div style={{ color: '#888', marginBottom: '16px' }}>
                citlol@portfolio ~/contact % ./contact.sh
              </div>
              <div style={{ marginBottom: '20px' }}>
                <p>📧 <a href="mailto:citlalli.tdr@gmail.com" style={{ color: '#4a9eff' }}>citlalli.tdr@gmail.com</a></p>
                <p>🔗 <a href="https://linkedin.com/in/citlalli-trejo-del-rio" target="_blank" rel="noopener noreferrer" style={{ color: '#4a9eff' }}>linkedin.com/in/citlalli-trejo-del-rio</a></p>
                <p>🐙 <a href="https://github.com/citlol" target="_blank" rel="noopener noreferrer" style={{ color: '#4a9eff' }}>github.com/citlol</a></p>
              </div>
              <button 
                onClick={() => handleNavClick('home')}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: '#4a9eff', 
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontFamily: 'monospace'
                }}
              >
                ← back to home
              </button>
            </div>
          )}

          {activeSection === 'skills' && (
            <div>
              <div style={{ color: '#888', marginBottom: '16px' }}>
                citlol@portfolio ~/skills % cat skills.config
              </div>
              <div style={{ marginBottom: '20px' }}>
                <p>🔧 Frontend: React, HTML, CSS, JavaScript</p>
                <p>🛠️ Backend: Node.js, MongoDB</p>
                <p>⚡ Tools: Git, Figma, Accessibility Testing</p>
              </div>
              <button 
                onClick={() => handleNavClick('home')}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: '#4a9eff', 
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontFamily: 'monospace'
                }}
              >
                ← back to home
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Dock */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '10px 15px',
        display: 'flex',
        gap: '10px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        border: '1px solid rgba(255, 255, 255, 0.3)'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          backgroundColor: '#000',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '20px',
          transition: 'transform 0.2s ease'
        }}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          ⚫
        </div>

        <div style={{
          width: '50px',
          height: '50px',
          backgroundColor: '#C89B3C',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#1E2328',
          transition: 'transform 0.2s ease'
        }}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          LoL
        </div>

        <div style={{
          width: '50px',
          height: '50px',
          backgroundColor: '#fff',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '24px',
          transition: 'transform 0.2s ease',
          border: '1px solid #e0e0e0'
        }}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          📝
        </div>

        <div style={{
          width: '50px',
          height: '50px',
          borderRadius: '12px',
          cursor: 'pointer',
          transition: 'transform 0.2s ease',
          overflow: 'hidden'
        }}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          <img 
            src="/vscode.png" 
            alt="VS Code"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>

        <div style={{
          width: '50px',
          height: '50px',
          borderRadius: '12px',
          cursor: 'pointer',
          transition: 'transform 0.2s ease',
          overflow: 'hidden'
        }}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        onClick={openSpotifyModal}
        >
          <img 
            src="/spotifyicon.png" 
            alt="Spotify"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>
      </div>

      {/* Spotify Modal */}
      {showSpotifyModal && (
        <div style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: '1000'
        }}
        onClick={closeSpotifyModal}
        >
          <div style={{
            backgroundColor: '#000000',
            borderRadius: '12px',
            padding: '20px',
            position: 'relative',
            maxWidth: '500px',
            width: '90%'
          }}
          onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              onClick={closeSpotifyModal}
              style={{
                position: 'absolute',
                top: '10px',
                right: '15px',
                background: 'none',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                color: '#999'
              }}
            >
              ✕
            </button>

            <h3 style={{ marginTop: '0', marginBottom: '20px', color: '#999' }}>
              🎵 My Spotify Playlist
            </h3>

            {/* Loading spinner */}
            {isSpotifyLoading && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '380px',
                marginBottom: '20px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  border: '4px solid #333',
                  borderTop: '4px solid #999',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
              </div>
            )}

            {/* Spotify Embed - Replace with your playlist */}
            <iframe 
              src="https://open.spotify.com/embed/playlist/3zDiyeiXDga7ZeSspF85mn?utm_source=generator&theme=0" 
              width="100%" 
              height="380" 
              frameBorder="0" 
              allowTransparency="true" 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
              style={{ 
                borderRadius: '12px',
                display: isSpotifyLoading ? 'none' : 'block'
              }}
              onLoad={() => setIsSpotifyLoading(false)}
            ></iframe>

            <p style={{ 
              fontSize: '12px', 
              color: '#999', 
              marginTop: '10px', 
              textAlign: 'center' 
            }}>
              Click outside to close
            </p>
          </div>
        </div>
      )}
      </div>
    </>
  );
}

export default App;