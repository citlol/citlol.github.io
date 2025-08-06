import React, { useState } from 'react';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [showSpotifyModal, setShowSpotifyModal] = useState(false);
  const [isSpotifyLoading, setIsSpotifyLoading] = useState(true);
  const [showFigmaModal, setShowFigmaModal] = useState(false);
  const [showLoLModal, setShowLoLModal] = useState(false);
  const [showDiscordModal, setShowDiscordModal] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState(null);

  const handleNavClick = (section) => {
    setActiveSection(section);
  };

  const openSpotifyModal = () => {
    setShowSpotifyModal(true);
    setIsSpotifyLoading(true);
    // Set a timeout to hide loading after 3 seconds regardless
    setTimeout(() => {
      setIsSpotifyLoading(false);
    }, 3000);
  };

  const closeSpotifyModal = () => {
    setShowSpotifyModal(false);
    setIsSpotifyLoading(true);
  };

  const openFigmaModal = () => {
    setShowFigmaModal(true);
  };

  const closeFigmaModal = () => {
    setShowFigmaModal(false);
  };

  const openLoLModal = () => {
    setShowLoLModal(true);
  };

  const closeLoLModal = () => {
    setShowLoLModal(false);
  };

  const openDiscordModal = () => {
    setShowDiscordModal(true);
  };

  const closeDiscordModal = () => {
    setShowDiscordModal(false);
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
          src="/DarkVersion.ico" 
          alt="Folder"
          style={{
            width: '48px',
            height: '48px'
          }}
        />
        <span>Personal</span>
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
          src="/DarkVersion.ico" 
          alt="Folder"
          style={{
            width: '48px',
            height: '48px'
          }}
        />
        <span>School Work</span>
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
          src="/DarkVersion.ico" 
          alt="Folder"
          style={{
            width: '48px',
            height: '48px'
          }}
        />
        <span>Miel Pomodoro</span>
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
          position: 'relative',
          width: '50px',
          height: '50px',
          borderRadius: '12px',
          cursor: 'pointer',
          transition: 'transform 0.2s ease',
          overflow: 'hidden'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          setHoveredIcon('Terminal');
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          setHoveredIcon(null);
        }}
        >
          <img 
            src="/Terminal.svg" 
            alt="Terminal"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
          {hoveredIcon === 'Terminal' && (
            <div style={{
              position: 'absolute',
              bottom: '60px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              zIndex: '9999'
            }}>
              Terminal
            </div>
          )}
        </div>

        <div style={{
          position: 'relative',
          width: '50px',
          height: '50px',
          borderRadius: '12px',
          cursor: 'pointer',
          transition: 'transform 0.2s ease',
          overflow: 'hidden'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          setHoveredIcon('League of Legends');
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          setHoveredIcon(null);
        }}
        onClick={openLoLModal}
        >
          <img 
            src="/LoL.svg" 
            alt="League of Legends"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
          {hoveredIcon === 'League of Legends' && (
            <div style={{
              position: 'absolute',
              bottom: '60px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              zIndex: '9999'
            }}>
              League of Legends
            </div>
          )}
        </div>

        <div style={{
          position: 'relative',
          width: '50px',
          height: '50px',
          borderRadius: '12px',
          cursor: 'pointer',
          transition: 'transform 0.2s ease',
          overflow: 'hidden'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          setHoveredIcon('Notion');
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          setHoveredIcon(null);
        }}
        >
          <img 
            src="/Notion.svg" 
            alt="Notion"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
          {hoveredIcon === 'Notion' && (
            <div style={{
              position: 'absolute',
              bottom: '60px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              zIndex: '9999'
            }}>
              Notion
            </div>
          )}
        </div>

        <div style={{
          position: 'relative',
          width: '50px',
          height: '50px',
          borderRadius: '12px',
          cursor: 'pointer',
          transition: 'transform 0.2s ease',
          overflow: 'hidden'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          setHoveredIcon('VS Code');
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          setHoveredIcon(null);
        }}
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
          {hoveredIcon === 'VS Code' && (
            <div style={{
              position: 'absolute',
              bottom: '60px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              zIndex: '9999'
            }}>
              VS Code
            </div>
          )}
        </div>

        <div style={{
          position: 'relative',
          width: '50px',
          height: '50px',
          borderRadius: '12px',
          cursor: 'pointer',
          transition: 'transform 0.2s ease',
          overflow: 'hidden'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          setHoveredIcon('Figma');
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          setHoveredIcon(null);
        }}
        onClick={openFigmaModal}
        >
          <img 
            src="/Figma.svg" 
            alt="Figma"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
          {hoveredIcon === 'Figma' && (
            <div style={{
              position: 'absolute',
              bottom: '60px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              zIndex: '9999'
            }}>
              Figma
            </div>
          )}
        </div>

        <div style={{
          position: 'relative',
          width: '50px',
          height: '50px',
          borderRadius: '12px',
          cursor: 'pointer',
          transition: 'transform 0.2s ease',
          overflow: 'hidden'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          setHoveredIcon('Spotify');
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          setHoveredIcon(null);
        }}
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
          {hoveredIcon === 'Spotify' && (
            <div style={{
              position: 'absolute',
              bottom: '60px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              zIndex: '9999'
            }}>
              Spotify
            </div>
          )}
        </div>

        <div style={{
          position: 'relative',
          width: '50px',
          height: '50px',
          borderRadius: '12px',
          cursor: 'pointer',
          transition: 'transform 0.2s ease',
          overflow: 'hidden'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          setHoveredIcon('Discord');
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          setHoveredIcon(null);
        }}
        onClick={openDiscordModal}
        >
          <img 
            src="/Discord.svg" 
            alt="Discord"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
          {hoveredIcon === 'Discord' && (
            <div style={{
              position: 'absolute',
              bottom: '60px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              zIndex: '9999'
            }}>
              Discord
            </div>
          )}
        </div>

        <div style={{
          position: 'relative',
          width: '50px',
          height: '50px',
          borderRadius: '12px',
          cursor: 'pointer',
          transition: 'transform 0.2s ease',
          overflow: 'hidden'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          setHoveredIcon('AI Tools');
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          setHoveredIcon(null);
        }}
        >
          <img 
            src="/Ai.svg" 
            alt="AI Tools"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
          {hoveredIcon === 'AI Tools' && (
            <div style={{
              position: 'absolute',
              bottom: '60px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              zIndex: '9999'
            }}>
              AI Tools
            </div>
          )}
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

            {/* Loading dots */}
            {isSpotifyLoading && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '380px',
                marginBottom: '20px',
                gap: '8px'
              }}>
                <div className="loading-dot"></div>
                <div className="loading-dot"></div>
                <div className="loading-dot"></div>
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

      {/* Figma Modal */}
      {showFigmaModal && (
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
        onClick={closeFigmaModal}
        >
          <div style={{
            backgroundColor: '#000000',
            borderRadius: '12px',
            padding: '20px',
            position: 'relative',
            maxWidth: '800px',
            width: '90%'
          }}
          onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              onClick={closeFigmaModal}
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
              🎨 My Figma Design
            </h3>

            {/* Figma Design Image */}
            <div style={{
              width: '100%',
              borderRadius: '12px',
              overflow: 'hidden'
            }}>
              <img 
                src="/FigmaView.png" 
                alt="Figma Design"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  borderRadius: '12px'
                }}
              />
            </div>

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

      {/* League of Legends Modal */}
      {showLoLModal && (
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
        onClick={closeLoLModal}
        >
          <div style={{
            backgroundColor: '#000000',
            borderRadius: '12px',
            padding: '20px',
            position: 'relative',
            maxWidth: '900px',
            width: '95%',
            maxHeight: '80vh',
            overflow: 'auto'
          }}
          onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              onClick={closeLoLModal}
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
              ⚔️ League of Legends Profile
            </h3>

            {/* LoL Profile Content - You can recreate the homepage layout here */}
            <div style={{
              width: '100%',
              minHeight: '400px',
              backgroundColor: '#111',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666',
              fontSize: '14px'
            }}>
              Recreate your LoL homepage/profile here
            </div>

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

      {/* Discord SVG-only Modal */}
      {showDiscordModal && (
        <div style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: '1000'
        }}
        onClick={closeDiscordModal}
        >
          {/* Just the SVG, no modal container */}
          <img 
            src="/DiscordProfile.svg" 
            alt="Discord Profile"
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              cursor: 'pointer'
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
      </div>
    </>
  );
}

export default App;