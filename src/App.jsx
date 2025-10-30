import React, { useState, useEffect } from 'react';
import './App.css';

const Stars = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generateStars = () => {
      const starArray = [];
      for (let i = 0; i < 100; i++) {
        starArray.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          animationDelay: Math.random() * 4,
          animationDuration: Math.random() * 3 + 2
        });
      }
      setStars(starArray);
    };

    generateStars();
  }, []);

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 1
    }}>
      {stars.map(star => (
        <div
          key={star.id}
          style={{
            position: 'absolute',
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: 'white',
            borderRadius: '50%',
            opacity: star.opacity,
            animation: `twinkle ${star.animationDuration}s ease-in-out infinite`,
            animationDelay: `${star.animationDelay}s`
          }}
        />
      ))}
    </div>
  );
};

const Tooltip = ({ text, show }) => {
  if (!show) return null;

  return (
    <div style={{
      position: 'absolute',
      bottom: '65px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      color: 'black',
      padding: '6px 10px',
      borderRadius: '6px',
      fontSize: '12px',
      fontWeight: '500',
      whiteSpace: 'nowrap',
      pointerEvents: 'none',
      zIndex: '99999',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      opacity: 1
    }}>
      {text}
      <div style={{
        position: 'absolute',
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '0',
        height: '0',
        borderLeft: '4px solid transparent',
        borderRight: '4px solid transparent',
        borderTop: '4px solid rgba(255, 255, 255, 0.95)'
      }}></div>
    </div>
  );
};

const DraggableFolder = ({ name, initialX, initialY, isMobile, onDoubleClick }) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragMoved, setDragMoved] = useState(false);

  const handleMouseDown = (e) => {
    if (isMobile) return;
    setIsDragging(true);
    setDragMoved(false);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setDragMoved(true);
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleDoubleClick = () => {
    if (!dragMoved && onDoubleClick) {
      onDoubleClick();
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  return (
    <div
      className={isMobile ? 'desktop-folder' : ''}
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: '12px',
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        zIndex: isDragging ? 1000 : 10,
        transition: isDragging ? 'none' : 'transform 0.2s ease'
      }}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
      onMouseEnter={(e) => {
        if (!isDragging) e.currentTarget.style.transform = 'scale(1.05)';
      }}
      onMouseLeave={(e) => {
        if (!isDragging) e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      <img
        src="/DarkVersion.ico"
        alt="Folder"
        style={{
          width: '48px',
          height: '48px',
          pointerEvents: 'none'
        }}
      />
      <span style={{
        color: 'white',
        textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
        pointerEvents: 'none'
      }}>
        {name}
      </span>
    </div>
  );
};

const DesktopClock = ({ isMobile }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString([], {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isMobile) return null;

  return (
    <div style={{
      position: 'absolute',
      top: '10px',
      right: '10px',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '8px',
      padding: window.innerWidth <= 768 ? '8px 12px' : '12px 16px',
      color: 'white',
      textAlign: 'center',
      fontFamily: 'monospace',
      userSelect: 'none',
      zIndex: 20
    }}>
      <div style={{
        fontSize: window.innerWidth <= 768 ? '14px' : '16px',
        fontWeight: 'bold',
        marginBottom: '4px',
        textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
      }}>
        {formatTime(time)}
      </div>
      <div style={{
        fontSize: window.innerWidth <= 768 ? '10px' : '12px',
        opacity: 0.8,
        textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
      }}>
        {formatDate(time)}
      </div>
    </div>
  );
};

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [showSpotifyModal, setShowSpotifyModal] = useState(false);
  const [isSpotifyLoading, setIsSpotifyLoading] = useState(true);
  const [showFigmaModal, setShowFigmaModal] = useState(false);
  const [showLoLModal, setShowLoLModal] = useState(false);
  const [showDiscordModal, setShowDiscordModal] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [terminalPosition, setTerminalPosition] = useState({ x: 0, y: 0 });
  const [isDraggingTerminal, setIsDraggingTerminal] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showTerminal, setShowTerminal] = useState(true);
  const [isInitializing, setIsInitializing] = useState(true);
  const [openFolders, setOpenFolders] = useState({
    personal: false,
    schoolWork: false,
    mielPomodoro: false
  });

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

  // Terminal drag handlers
  const handleTerminalMouseDown = (e) => {
    if (isMobile) return;
    // Only drag if clicking on the header area
    if (e.target.closest('.terminal-header')) {
      setIsDraggingTerminal(true);
      setDragStart({
        x: e.clientX - terminalPosition.x,
        y: e.clientY - terminalPosition.y
      });
    }
  };

  const handleTerminalMouseMove = (e) => {
    if (!isDraggingTerminal) return;
    setTerminalPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleTerminalMouseUp = () => {
    setIsDraggingTerminal(false);
  };

  // Close terminal handler
  const closeTerminal = () => {
    setShowTerminal(false);
    // Reset and reopen after a brief moment
    setTimeout(() => {
      setShowTerminal(true);
      setIsInitializing(true);
      setActiveSection('home');
      setTerminalPosition({ x: 0, y: 0 });
      // Hide initializing text after 2 seconds
      setTimeout(() => {
        setIsInitializing(false);
      }, 2000);
    }, 100);
  };

  // Folder handlers
  const openFolder = (folderName) => {
    setOpenFolders(prev => ({ ...prev, [folderName]: true }));
  };

  const closeFolder = (folderName) => {
    setOpenFolders(prev => ({ ...prev, [folderName]: false }));
  };

  // Initialization timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [showTerminal]);

  // Terminal dragging effect
  useEffect(() => {
    if (isDraggingTerminal) {
      window.addEventListener('mousemove', handleTerminalMouseMove);
      window.addEventListener('mouseup', handleTerminalMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleTerminalMouseMove);
        window.removeEventListener('mouseup', handleTerminalMouseUp);
      };
    }
  }, [isDraggingTerminal, dragStart]);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #2a2a2a 100%)',
        fontFamily: 'monospace',
        position: 'relative',
        overflow: isMobile ? 'auto' : 'hidden',
        padding: isMobile ? '10px' : '0'
      }}>
      <Stars />
      {/* Desktop Clock */}
      <DesktopClock isMobile={isMobile} />
      {/* Desktop Folders */}
      <DraggableFolder
        name="Personal"
        initialX={20}
        initialY={20}
        isMobile={isMobile}
        onDoubleClick={() => openFolder('personal')}
      />
      <DraggableFolder
        name="School Work"
        initialX={120}
        initialY={20}
        isMobile={isMobile}
        onDoubleClick={() => openFolder('schoolWork')}
      />
      <DraggableFolder
        name="Miel Pomodoro"
        initialX={20}
        initialY={120}
        isMobile={isMobile}
        onDoubleClick={() => openFolder('mielPomodoro')}
      />

      {/* Terminal Window */}
      {showTerminal && (
      <div
        className={isMobile ? 'terminal-window-mobile' : ''}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(calc(-50% + ${terminalPosition.x}px), calc(-50% + ${terminalPosition.y}px))`,
          width: isMobile ? '95vw' : 'min(900px, 90vw)',
          maxWidth: isMobile ? '100vw' : '95vw',
          maxHeight: isMobile ? '80vh' : '85vh',
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '12px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.1) inset',
          backdropFilter: 'blur(20px)',
          overflow: 'hidden',
          zIndex: 100,
          cursor: isDraggingTerminal ? 'grabbing' : 'default'
        }}
        onMouseDown={handleTerminalMouseDown}
      >
        {/* Terminal Header */}
        <div
          className="terminal-header"
          style={{
            backgroundColor: 'rgba(51, 51, 51, 0.8)',
            padding: '12px 16px',
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            cursor: isDraggingTerminal ? 'grabbing' : 'grab',
            userSelect: 'none'
          }}
        >
          <div style={{ display: 'flex', gap: '8px' }}>
            <div
              onClick={closeTerminal}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#ff5f57',
                cursor: 'pointer',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            ></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e' }}></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#28ca42' }}></div>
          </div>
          <span style={{ color: '#888', fontSize: '12px' }}>citlol@portfolio</span>
        </div>

        {/* Terminal Content */}
        <div style={{
          padding: isMobile ? '16px' : '24px',
          color: 'white',
          fontSize: isMobile ? '13px' : '14px',
          minHeight: isMobile ? '300px' : '400px',
          maxHeight: isMobile ? '60vh' : '70vh',
          lineHeight: '1.6',
          overflowY: 'auto'
        }}>
          {isInitializing ? (
            <div style={{ color: '#4ade80', marginBottom: '16px' }}>
              Initializing<span className="typing-dots">...</span>
            </div>
          ) : (
            <>
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
                  about.md
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
                  projects
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
                  contact.sh
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
                <h3 style={{ color: '#4ade80', marginBottom: '16px', fontSize: '18px' }}># About Me</h3>
                <div style={{ marginBottom: '12px' }}>
                  <span style={{ color: '#60a5fa' }}>👨‍💻</span> Computer Science Student & Full-Stack Developer
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <span style={{ color: '#f59e0b' }}>🚀</span> Co-Founder of Pancake - A modern budgeting app
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <span style={{ color: '#8b5cf6' }}>💡</span> Passionate about creating intuitive user experiences
                </div>
                <div style={{ color: '#6b7280', fontSize: '13px', marginTop: '16px' }}>
                  Currently seeking software engineering opportunities to contribute to innovative projects
                </div>
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
                <div style={{
                  padding: '12px',
                  backgroundColor: 'rgba(74, 222, 128, 0.1)',
                  borderRadius: '8px',
                  marginBottom: '12px',
                  border: '1px solid rgba(74, 222, 128, 0.2)'
                }}>
                  <div style={{ color: '#4ade80', fontWeight: 'bold', marginBottom: '4px' }}>📁 Pancake</div>
                  <div style={{ color: '#9ca3af', fontSize: '12px' }}>Budgeting app - React, Node.js, MongoDB</div>
                </div>
                <div style={{
                  padding: '12px',
                  backgroundColor: 'rgba(96, 165, 250, 0.1)',
                  borderRadius: '8px',
                  marginBottom: '12px',
                  border: '1px solid rgba(96, 165, 250, 0.2)'
                }}>
                  <div style={{ color: '#60a5fa', fontWeight: 'bold', marginBottom: '4px' }}>📁 Miel-Pomodoro</div>
                  <div style={{ color: '#9ca3af', fontSize: '12px' }}>Productivity timer - JavaScript, CSS</div>
                </div>
                <div style={{
                  padding: '12px',
                  backgroundColor: 'rgba(245, 158, 11, 0.1)',
                  borderRadius: '8px',
                  marginBottom: '12px',
                  border: '1px solid rgba(245, 158, 11, 0.2)'
                }}>
                  <div style={{ color: '#f59e0b', fontWeight: 'bold', marginBottom: '4px' }}>📁 Star-Wars-All-In-Game</div>
                  <div style={{ color: '#9ca3af', fontSize: '12px' }}>Interactive game - HTML5, Canvas</div>
                </div>
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
                <div style={{
                  display: 'grid',
                  gap: '12px',
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))'
                }}>
                  <a
                    href="mailto:citlalli.tdr@gmail.com"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px',
                      backgroundColor: 'rgba(74, 222, 128, 0.1)',
                      borderRadius: '8px',
                      border: '1px solid rgba(74, 222, 128, 0.2)',
                      color: '#4ade80',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = 'rgba(74, 222, 128, 0.2)';
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'rgba(74, 222, 128, 0.1)';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    <span style={{ fontSize: '18px' }}>📧</span>
                    <span>citlalli.tdr@gmail.com</span>
                  </a>
                  <a
                    href="https://linkedin.com/in/citlalli-trejo-del-rio"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px',
                      backgroundColor: 'rgba(96, 165, 250, 0.1)',
                      borderRadius: '8px',
                      border: '1px solid rgba(96, 165, 250, 0.2)',
                      color: '#60a5fa',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = 'rgba(96, 165, 250, 0.2)';
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'rgba(96, 165, 250, 0.1)';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    <span style={{ fontSize: '18px' }}>🔗</span>
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href="https://github.com/citlol"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px',
                      backgroundColor: 'rgba(139, 92, 246, 0.1)',
                      borderRadius: '8px',
                      border: '1px solid rgba(139, 92, 246, 0.2)',
                      color: '#8b5cf6',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = 'rgba(139, 92, 246, 0.2)';
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'rgba(139, 92, 246, 0.1)';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    <span style={{ fontSize: '18px' }}>🐙</span>
                    <span>GitHub</span>
                  </a>
                </div>
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
                <div style={{ marginBottom: '16px' }}>
                  <h4 style={{ color: '#4ade80', marginBottom: '8px' }}>Frontend</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {['React', 'JavaScript', 'HTML/CSS', 'Swift'].map(skill => (
                      <span key={skill} style={{
                        backgroundColor: 'rgba(74, 222, 128, 0.2)',
                        color: '#4ade80',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        border: '1px solid rgba(74, 222, 128, 0.3)'
                      }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <h4 style={{ color: '#60a5fa', marginBottom: '8px' }}>Backend</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {['Node.js', 'MongoDB', 'Firebase'].map(skill => (
                      <span key={skill} style={{
                        backgroundColor: 'rgba(96, 165, 250, 0.2)',
                        color: '#60a5fa',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        border: '1px solid rgba(96, 165, 250, 0.3)'
                      }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <h4 style={{ color: '#f59e0b', marginBottom: '8px' }}>Tools</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {['Git', 'Figma', 'VS Code', 'Canva'].map(skill => (
                      <span key={skill} style={{
                        backgroundColor: 'rgba(245, 158, 11, 0.2)',
                        color: '#f59e0b',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        border: '1px solid rgba(245, 158, 11, 0.3)'
                      }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
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
            </>
          )}
        </div>
      </div>
      )}

      {/* Bottom Dock */}
      <div className={isMobile ? 'mobile-dock' : ''} style={{
        position: 'fixed',
        bottom: isMobile ? '10px' : '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        padding: isMobile ? '10px 14px' : '12px 18px',
        display: 'flex',
        gap: isMobile ? '10px' : '12px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        border: '1px solid rgba(255, 255, 255, 0.8)',
        maxWidth: isMobile ? '90%' : 'none'
      }}>
        <div className={isMobile ? 'mobile-dock-icon' : ''} style={{
          position: 'relative',
          width: isMobile ? '40px' : '50px',
          height: isMobile ? '40px' : '50px',
          borderRadius: '12px',
          cursor: 'pointer',
          transition: 'transform 0.2s ease',
          overflow: 'visible'
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
          <Tooltip text="Terminal" show={hoveredIcon === 'Terminal' && !isMobile} />
        </div>

        <div className={isMobile ? 'mobile-dock-icon' : ''} style={{
          position: 'relative',
          width: isMobile ? '40px' : '50px',
          height: isMobile ? '40px' : '50px',
          borderRadius: '12px',
          cursor: 'pointer',
          transition: 'transform 0.2s ease',
          overflow: 'visible'
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
          <Tooltip text="League of Legends" show={hoveredIcon === 'League of Legends' && !isMobile} />
        </div>

        <div className={isMobile ? 'mobile-dock-icon' : ''} style={{
          position: 'relative',
          width: isMobile ? '40px' : '50px',
          height: isMobile ? '40px' : '50px',
          borderRadius: '12px',
          cursor: 'pointer',
          transition: 'transform 0.2s ease',
          overflow: 'visible'
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
          <Tooltip text="Notion" show={hoveredIcon === 'Notion' && !isMobile} />
        </div>

        <div className={isMobile ? 'mobile-dock-icon' : ''} style={{
          position: 'relative',
          width: isMobile ? '40px' : '50px',
          height: isMobile ? '40px' : '50px',
          borderRadius: '12px',
          cursor: 'pointer',
          transition: 'transform 0.2s ease',
          overflow: 'visible'
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
          <Tooltip text="VS Code" show={hoveredIcon === 'VS Code' && !isMobile} />
        </div>

        <div className={isMobile ? 'mobile-dock-icon' : ''} style={{
          position: 'relative',
          width: isMobile ? '40px' : '50px',
          height: isMobile ? '40px' : '50px',
          borderRadius: '12px',
          cursor: 'pointer',
          transition: 'transform 0.2s ease',
          overflow: 'visible'
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
          <Tooltip text="Figma" show={hoveredIcon === 'Figma' && !isMobile} />
        </div>

        <div className={isMobile ? 'mobile-dock-icon' : ''} style={{
          position: 'relative',
          width: isMobile ? '40px' : '50px',
          height: isMobile ? '40px' : '50px',
          borderRadius: '12px',
          cursor: 'pointer',
          transition: 'transform 0.2s ease',
          overflow: 'visible'
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
          <Tooltip text="Spotify" show={hoveredIcon === 'Spotify' && !isMobile} />
        </div>

        <div className={isMobile ? 'mobile-dock-icon' : ''} style={{
          position: 'relative',
          width: isMobile ? '40px' : '50px',
          height: isMobile ? '40px' : '50px',
          borderRadius: '12px',
          cursor: 'pointer',
          transition: 'transform 0.2s ease',
          overflow: 'visible'
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
          <Tooltip text="Discord" show={hoveredIcon === 'Discord' && !isMobile} />
        </div>

        <div className={isMobile ? 'mobile-dock-icon' : ''} style={{
          position: 'relative',
          width: isMobile ? '40px' : '50px',
          height: isMobile ? '40px' : '50px',
          borderRadius: '12px',
          cursor: 'pointer',
          transition: 'transform 0.2s ease',
          overflow: 'visible'
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
          <Tooltip text="AI Tools" show={hoveredIcon === 'AI Tools' && !isMobile} />
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
          <div className={isMobile ? 'mobile-modal' : ''} style={{
            backgroundColor: '#000000',
            borderRadius: '12px',
            padding: isMobile ? '15px' : '20px',
            position: 'relative',
            maxWidth: isMobile ? 'calc(100% - 40px)' : '500px',
            width: '90%',
            margin: isMobile ? '20px' : '0',
            maxHeight: isMobile ? 'calc(100vh - 40px)' : 'none',
            overflow: isMobile ? 'auto' : 'visible'
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
              overflow: 'visible'
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

            {/* LoL Profile Content */}
            <div style={{
              width: '100%',
              minHeight: '400px',
              backgroundColor: '#111',
              borderRadius: '12px'
            }}>
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
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: '1000'
        }}
        onClick={closeDiscordModal}
        >
          <div style={{ position: 'relative' }}>
            {/* Close button */}
            <button
              onClick={closeDiscordModal}
              style={{
                position: 'absolute',
                top: '-10px',
                right: '-10px',
                background: 'rgba(0, 0, 0, 0.8)',
                border: 'none',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                fontSize: '16px',
                cursor: 'pointer',
                color: '#999',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: '10001'
              }}
            >
              ✕
            </button>

            {/* Just the SVG, no modal container */}
            <img
              src="/DiscordProfile.svg"
              alt="Discord Profile"
              style={{
                maxWidth: '500px',
                width: '90%',
                height: 'auto',
                cursor: 'pointer'
              }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* Folder Windows */}
      {openFolders.personal && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: isMobile ? '95vw' : '600px',
          maxHeight: isMobile ? '80vh' : '70vh',
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '12px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.7)',
          backdropFilter: 'blur(20px)',
          overflow: 'hidden',
          zIndex: 200
        }}>
          {/* Folder Header */}
          <div style={{
            backgroundColor: 'rgba(51, 51, 51, 0.9)',
            padding: '12px 16px',
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div
                onClick={() => closeFolder('personal')}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#ff5f57',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              ></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#28ca42' }}></div>
            </div>
            <span style={{ color: '#888', fontSize: '12px' }}>Personal</span>
          </div>

          {/* Folder Content */}
          <div style={{
            padding: '24px',
            color: 'white',
            overflowY: 'auto',
            maxHeight: isMobile ? 'calc(80vh - 60px)' : 'calc(70vh - 60px)'
          }}>
            {/* Your content here - no placeholder text */}
          </div>
        </div>
      )}

      {openFolders.schoolWork && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: isMobile ? '95vw' : '600px',
          maxHeight: isMobile ? '80vh' : '70vh',
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '12px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.7)',
          backdropFilter: 'blur(20px)',
          overflow: 'hidden',
          zIndex: 200
        }}>
          {/* Folder Header */}
          <div style={{
            backgroundColor: 'rgba(51, 51, 51, 0.9)',
            padding: '12px 16px',
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div
                onClick={() => closeFolder('schoolWork')}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#ff5f57',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              ></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#28ca42' }}></div>
            </div>
            <span style={{ color: '#888', fontSize: '12px' }}>School Work</span>
          </div>

          {/* Folder Content */}
          <div style={{
            padding: '24px',
            color: 'white',
            overflowY: 'auto',
            maxHeight: isMobile ? 'calc(80vh - 60px)' : 'calc(70vh - 60px)'
          }}>
            {/* Your content here - no placeholder text */}
          </div>
        </div>
      )}

      {openFolders.mielPomodoro && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: isMobile ? '95vw' : '600px',
          maxHeight: isMobile ? '80vh' : '70vh',
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '12px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.7)',
          backdropFilter: 'blur(20px)',
          overflow: 'hidden',
          zIndex: 200
        }}>
          {/* Folder Header */}
          <div style={{
            backgroundColor: 'rgba(51, 51, 51, 0.9)',
            padding: '12px 16px',
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div
                onClick={() => closeFolder('mielPomodoro')}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#ff5f57',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              ></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#28ca42' }}></div>
            </div>
            <span style={{ color: '#888', fontSize: '12px' }}>Miel Pomodoro</span>
          </div>

          {/* Folder Content */}
          <div style={{
            padding: '24px',
            color: 'white',
            overflowY: 'auto',
            maxHeight: isMobile ? 'calc(80vh - 60px)' : 'calc(70vh - 60px)'
          }}>
            {/* Your content here - no placeholder text */}
          </div>
        </div>
      )}
      </div>
    </>
  );
}

export default App;