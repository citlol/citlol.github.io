import React, { useState, useEffect } from 'react';
import './App.css';

const Stars = ({ theme }) => {
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
            backgroundColor: theme === 'dark' ? 'white' : '#94a3b8',
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

const DraggableFolder = ({ name, initialX, initialY, isMobile, onDoubleClick, theme }) => {
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
        color: theme === 'dark' ? 'white' : '#1f2937',
        textShadow: theme === 'dark' ? '1px 1px 2px rgba(0,0,0,0.8)' : '1px 1px 2px rgba(255,255,255,0.8)',
        pointerEvents: 'none'
      }}>
        {name}
      </span>
    </div>
  );
};

// Open to Work Badge Component
const OpenToWorkBadge = ({ theme }) => {
  return (
    <div style={{
      position: 'absolute',
      top: '10px',
      left: '10px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      border: theme === 'dark' ? '1px solid rgba(74, 222, 128, 0.3)' : '1px solid rgba(22, 163, 74, 0.3)',
      borderRadius: '20px',
      padding: '8px 14px',
      zIndex: 20,
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: '#4ade80',
        animation: 'pulse-badge 2s ease-in-out infinite',
        boxShadow: '0 0 8px #4ade80'
      }} />
      <span style={{
        fontSize: '12px',
        fontWeight: '600',
        color: theme === 'dark' ? '#4ade80' : '#16a34a',
        fontFamily: 'monospace'
      }}>
        Open to Work
      </span>
    </div>
  );
};

const DesktopClock = ({ isMobile, theme }) => {
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
      backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      padding: window.innerWidth <= 768 ? '8px 12px' : '12px 16px',
      color: theme === 'dark' ? 'white' : '#1f2937',
      textAlign: 'center',
      fontFamily: 'monospace',
      userSelect: 'none',
      zIndex: 20,
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        fontSize: window.innerWidth <= 768 ? '14px' : '16px',
        fontWeight: 'bold',
        marginBottom: '4px',
        textShadow: theme === 'dark' ? '1px 1px 2px rgba(0,0,0,0.8)' : 'none'
      }}>
        {formatTime(time)}
      </div>
      <div style={{
        fontSize: window.innerWidth <= 768 ? '10px' : '12px',
        opacity: 0.8,
        textShadow: theme === 'dark' ? '1px 1px 2px rgba(0,0,0,0.8)' : 'none'
      }}>
        {formatDate(time)}
      </div>
    </div>
  );
};

// Helper function to generate random folder positions
const generateRandomFolderPositions = () => {
  const folderSize = 70; // approximate folder width/height including text
  const padding = 20; // minimum distance between folders

  // Define forbidden zones (areas to avoid)
  const getForbiddenZones = () => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const height = typeof window !== 'undefined' ? window.innerHeight : 800;

    return [
      // Open to Work badge (top-left)
      { x: 0, y: 0, width: 180, height: 60 },
      // Clock (top-right)
      { x: width - 160, y: 0, width: 160, height: 80 },
      // Terminal window (center) - larger zone to be safe
      { x: width / 2 - 500, y: height / 2 - 350, width: 1000, height: 700 },
      // Bottom dock
      { x: width / 2 - 300, y: height - 100, width: 600, height: 100 },
    ];
  };

  const isInForbiddenZone = (x, y, forbiddenZones) => {
    for (const zone of forbiddenZones) {
      if (
        x < zone.x + zone.width + padding &&
        x + folderSize > zone.x - padding &&
        y < zone.y + zone.height + padding &&
        y + folderSize > zone.y - padding
      ) {
        return true;
      }
    }
    return false;
  };

  const overlapsWithOther = (x, y, existingPositions) => {
    for (const pos of existingPositions) {
      const distance = Math.sqrt(Math.pow(x - pos.x, 2) + Math.pow(y - pos.y, 2));
      if (distance < folderSize + padding) {
        return true;
      }
    }
    return false;
  };

  const width = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const height = typeof window !== 'undefined' ? window.innerHeight : 800;
  const forbiddenZones = getForbiddenZones();

  const positions = [];
  const folderNames = ['Personal', 'School Work', 'Miel Pomodoro'];

  for (let i = 0; i < folderNames.length; i++) {
    let attempts = 0;
    let x, y;

    // Try to find a valid position
    do {
      // Generate random position in safe areas (edges of screen)
      const side = Math.floor(Math.random() * 4); // 0=top, 1=right, 2=bottom-ish, 3=left

      switch (side) {
        case 0: // Top area (but not corners)
          x = 180 + Math.random() * (width - 400);
          y = 70 + Math.random() * 80;
          break;
        case 1: // Right side
          x = width - 100 - Math.random() * 80;
          y = 100 + Math.random() * (height - 300);
          break;
        case 2: // Left side lower
          x = 20 + Math.random() * 100;
          y = 80 + Math.random() * (height - 300);
          break;
        case 3: // Left side
          x = 20 + Math.random() * 150;
          y = 150 + Math.random() * (height - 400);
          break;
        default:
          x = 20 + Math.random() * 150;
          y = 80 + Math.random() * 200;
      }

      attempts++;
    } while (
      (isInForbiddenZone(x, y, forbiddenZones) || overlapsWithOther(x, y, positions)) &&
      attempts < 100
    );

    positions.push({ x, y, name: folderNames[i] });
  }

  return positions;
};

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [showAppleMusicModal, setShowAppleMusicModal] = useState(false);
  const [isAppleMusicLoading, setIsAppleMusicLoading] = useState(true);
  const [showFigmaModal, setShowFigmaModal] = useState(false);
  const [showLoLModal, setShowLoLModal] = useState(false);
  const [showDiscordModal, setShowDiscordModal] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [terminalPosition, setTerminalPosition] = useState({ x: 0, y: 0 });
  const [isDraggingTerminal, setIsDraggingTerminal] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  // Random folder positions
  const [folderPositions, setFolderPositions] = useState(() => generateRandomFolderPositions());
  const [showTerminal, setShowTerminal] = useState(true);
  const [isInitializing, setIsInitializing] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [openFolders, setOpenFolders] = useState({
    personal: false,
    schoolWork: false,
    mielPomodoro: false
  });
  // Interactive terminal state
  const [commandInput, setCommandInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [terminalOutput, setTerminalOutput] = useState([]);
  const [showCommandLine, setShowCommandLine] = useState(false);
  // GitHub stats state
  const [githubStats, setGithubStats] = useState(null);
  // Project detail state
  const [selectedProject, setSelectedProject] = useState(null);

  // Project data with case studies
  const projects = [
    {
      id: 'pancake',
      name: 'Pancake',
      description: 'A modern budgeting app that helps users track expenses and manage finances',
      tech: ['Swift', 'SwiftUI', 'CoreData', 'CloudKit'],
      role: 'Co-Founder & Lead Developer',
      color: '#4ade80',
      highlights: [
        'Built intuitive expense tracking with smart categorization',
        'Implemented real-time sync across devices',
        'Designed minimal, user-friendly interface'
      ],
      github: 'https://github.com/citlol/pancake',
      status: 'In Development'
    },
    {
      id: 'miel-pomodoro',
      name: 'Miel-Pomodoro',
      description: 'A productivity timer app with a sweet twist - gamified focus sessions',
      tech: ['Swift', 'SwiftUI', 'UserNotifications'],
      role: 'Solo Developer',
      color: '#60a5fa',
      highlights: [
        'Custom timer with ambient sounds',
        'Progress tracking and statistics',
        'Beautiful animations and haptic feedback'
      ],
      github: 'https://github.com/citlol/miel-pomodoro',
      status: 'Released'
    },
    {
      id: 'star-wars-game',
      name: 'Star-Wars-All-In-Game',
      description: 'An interactive text-based adventure game set in the Star Wars universe',
      tech: ['Java', 'OOP', 'File I/O'],
      role: 'Developer',
      color: '#f59e0b',
      highlights: [
        'Multiple branching storylines',
        'Character progression system',
        'Save/load game functionality'
      ],
      github: 'https://github.com/citlol/star-wars-game',
      status: 'Completed'
    }
  ];

  // Terminal commands handler
  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const args = trimmedCmd.split(' ');
    const command = args[0];

    let output = [];

    switch (command) {
      case 'help':
        output = [
          { type: 'info', text: 'Available commands:' },
          { type: 'command', text: '  help          - Show this help message' },
          { type: 'command', text: '  whoami        - About me' },
          { type: 'command', text: '  ls            - List sections' },
          { type: 'command', text: '  cat resume    - View/download resume' },
          { type: 'command', text: '  github        - View GitHub stats' },
          { type: 'command', text: '  projects      - List projects' },
          { type: 'command', text: '  skills        - Show skills' },
          { type: 'command', text: '  contact       - Contact info' },
          { type: 'command', text: '  now           - What I\'m currently working on' },
          { type: 'command', text: '  clear         - Clear terminal' },
          { type: 'command', text: '  sudo hire-me  - Easter egg ;)' },
        ];
        break;
      case 'whoami':
        output = [
          { type: 'success', text: '👋 Hi! I\'m Citlalli Trejo Del Rio' },
          { type: 'text', text: '   Computer Science Student & Full-Stack Developer' },
          { type: 'text', text: '   Co-Founder of Pancake - A modern budgeting app' },
          { type: 'text', text: '   Passionate about creating intuitive user experiences' },
          { type: 'info', text: '   📍 Currently seeking software engineering opportunities' },
        ];
        break;
      case 'ls':
        output = [
          { type: 'text', text: 'drwxr-xr-x  about.md' },
          { type: 'text', text: 'drwxr-xr-x  projects/' },
          { type: 'text', text: 'drwxr-xr-x  skills.config' },
          { type: 'text', text: '-rwxr-xr-x  contact.sh' },
          { type: 'text', text: '-rw-r--r--  resume.pdf' },
        ];
        break;
      case 'cat':
        if (args[1] === 'resume' || args[1] === 'resume.pdf') {
          output = [
            { type: 'success', text: '📄 Opening resume...' },
            { type: 'link', text: 'Click here to download resume', url: '/resume.pdf' },
          ];
          // Trigger download
          setTimeout(() => {
            const link = document.createElement('a');
            link.href = '/resume.pdf';
            link.download = 'Citlalli_Trejo_Resume.pdf';
            link.click();
          }, 500);
        } else {
          output = [{ type: 'error', text: `cat: ${args[1] || ''}: No such file` }];
        }
        break;
      case 'github':
        output = [
          { type: 'info', text: '🐙 GitHub: github.com/citlol' },
          { type: 'text', text: githubStats ? `   Public repos: ${githubStats.public_repos}` : '   Loading stats...' },
          { type: 'text', text: githubStats ? `   Followers: ${githubStats.followers}` : '' },
          { type: 'link', text: '   View profile →', url: 'https://github.com/citlol' },
        ];
        break;
      case 'projects':
        output = [
          { type: 'info', text: '📁 My Projects:' },
          ...projects.map(p => ({
            type: 'project',
            text: `   ${p.name} - ${p.tech.join(', ')} [${p.status}]`,
            color: p.color
          }))
        ];
        break;
      case 'skills':
        output = [
          { type: 'success', text: '💻 Frontend: React, JavaScript, HTML/CSS, Swift' },
          { type: 'info', text: '🔧 Backend: Node.js, MongoDB, Firebase' },
          { type: 'warning', text: '🛠️ Tools: Git, Figma, VS Code, Canva' },
        ];
        break;
      case 'contact':
        output = [
          { type: 'info', text: '📧 Email: citlalli.tdr@gmail.com' },
          { type: 'link', text: '🔗 LinkedIn: linkedin.com/in/citlalli-trejo-del-rio', url: 'https://linkedin.com/in/citlalli-trejo-del-rio' },
          { type: 'link', text: '🐙 GitHub: github.com/citlol', url: 'https://github.com/citlol' },
        ];
        break;
      case 'now':
        output = [
          { type: 'success', text: '🚀 Currently Building:' },
          { type: 'text', text: '   • Pancake - Finalizing budget tracking features' },
          { type: 'text', text: '   • This portfolio - Adding new interactive features' },
          { type: 'info', text: '📚 Learning:' },
          { type: 'text', text: '   • Advanced SwiftUI animations' },
          { type: 'text', text: '   • Cloud architecture patterns' },
        ];
        break;
      case 'clear':
        setTerminalOutput([]);
        return;
      case 'sudo':
        if (args.slice(1).join(' ') === 'hire-me') {
          output = [
            { type: 'success', text: '✨ HIRE MODE ACTIVATED ✨' },
            { type: 'text', text: '   Ready to bring creativity and dedication to your team!' },
            { type: 'text', text: '   📧 Let\'s talk: citlalli.tdr@gmail.com' },
            { type: 'info', text: '   [Process completed with exit code: EXCITED_TO_WORK]' },
          ];
        } else {
          output = [{ type: 'error', text: 'sudo: command not found' }];
        }
        break;
      case '':
        return;
      default:
        output = [{ type: 'error', text: `command not found: ${command}. Type 'help' for available commands.` }];
    }

    setTerminalOutput(prev => [
      ...prev,
      { type: 'input', text: `citlol@portfolio ~ % ${cmd}` },
      ...output
    ]);
  };

  // Handle keyboard input for terminal
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(commandInput);
      setCommandHistory(prev => [...prev, commandInput]);
      setHistoryIndex(-1);
      setCommandInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setCommandInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCommandInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      } else {
        setHistoryIndex(-1);
        setCommandInput('');
      }
    }
  };

  // Fetch GitHub stats
  useEffect(() => {
    fetch('https://api.github.com/users/citlol')
      .then(res => res.json())
      .then(data => setGithubStats(data))
      .catch(() => setGithubStats(null));
  }, []);

  // Theme toggle handler
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Apply theme to HTML element
  useEffect(() => {
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(theme);
  }, [theme]);

  const handleNavClick = (section) => {
    setActiveSection(section);
  };

  const openAppleMusicModal = () => {
    setShowAppleMusicModal(true);
    setIsAppleMusicLoading(true);
    // Set a timeout to hide loading after 3 seconds regardless
    setTimeout(() => {
      setIsAppleMusicLoading(false);
    }, 3000);
  };

  const closeAppleMusicModal = () => {
    setShowAppleMusicModal(false);
    setIsAppleMusicLoading(true);
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
        background: theme === 'dark'
          ? 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #2a2a2a 100%)'
          : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
        fontFamily: 'monospace',
        position: 'relative',
        overflow: isMobile ? 'auto' : 'hidden',
        padding: isMobile ? '10px' : '0',
        transition: 'background 0.3s ease'
      }}>
      <Stars theme={theme} />
      {/* Open to Work Badge */}
      {!isMobile && <OpenToWorkBadge theme={theme} />}
      {/* Desktop Clock */}
      <DesktopClock isMobile={isMobile} theme={theme} />
      {/* Desktop Folders - Random positions */}
      <DraggableFolder
        name="Personal"
        initialX={folderPositions[0]?.x || 20}
        initialY={folderPositions[0]?.y || 80}
        isMobile={isMobile}
        onDoubleClick={() => openFolder('personal')}
        theme={theme}
      />
      <DraggableFolder
        name="School Work"
        initialX={folderPositions[1]?.x || 120}
        initialY={folderPositions[1]?.y || 80}
        isMobile={isMobile}
        onDoubleClick={() => openFolder('schoolWork')}
        theme={theme}
      />
      <DraggableFolder
        name="Miel Pomodoro"
        initialX={folderPositions[2]?.x || 220}
        initialY={folderPositions[2]?.y || 80}
        isMobile={isMobile}
        onDoubleClick={() => openFolder('mielPomodoro')}
        theme={theme}
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
          backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.85)' : 'rgba(255, 255, 255, 0.95)',
          border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(0, 0, 0, 0.1)',
          borderRadius: '12px',
          boxShadow: theme === 'dark'
            ? '0 20px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.1) inset'
            : '0 20px 40px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05) inset',
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
            backgroundColor: theme === 'dark' ? 'rgba(51, 51, 51, 0.8)' : 'rgba(229, 231, 235, 0.9)',
            padding: '12px 16px',
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ color: '#888', fontSize: '12px' }}>citlol@portfolio</span>
            <button
              onClick={toggleTheme}
              style={{
                background: 'none',
                border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(0, 0, 0, 0.2)',
                borderRadius: '6px',
                padding: '4px 8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '12px',
                color: theme === 'dark' ? '#fbbf24' : '#6366f1',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
        </div>

        {/* Terminal Content */}
        <div style={{
          padding: isMobile ? '16px' : '24px',
          color: theme === 'dark' ? 'white' : '#1f2937',
          fontSize: isMobile ? '13px' : '14px',
          minHeight: isMobile ? '300px' : '400px',
          maxHeight: isMobile ? '60vh' : '70vh',
          lineHeight: '1.6',
          overflowY: 'auto'
        }}>
          {isInitializing ? (
            <div style={{ color: theme === 'dark' ? '#4ade80' : '#16a34a', marginBottom: '16px' }}>
              Initializing<span className="typing-dots">...</span>
            </div>
          ) : (
            <>
              <div style={{ color: theme === 'dark' ? '#888' : '#6b7280', marginBottom: '16px' }}>
                citlol@portfolio ~ %
              </div>

              {activeSection === 'home' && (
            <div>
              {/* Welcome message */}
              <div style={{ marginBottom: '16px', color: theme === 'dark' ? '#4ade80' : '#16a34a' }}>
                Welcome! Type <span style={{ color: '#60a5fa' }}>help</span> for commands or click a file below.
              </div>

              {/* File navigation */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                <button
                  onClick={() => handleNavClick('about')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: theme === 'dark' ? 'white' : '#1f2937',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: '14px',
                    fontFamily: 'monospace',
                    padding: '4px 0'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#4ade80'}
                  onMouseLeave={(e) => e.target.style.color = theme === 'dark' ? 'white' : '#1f2937'}
                >
                  📄 about.md
                </button>
                <button
                  onClick={() => handleNavClick('projects')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: theme === 'dark' ? 'white' : '#1f2937',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: '14px',
                    fontFamily: 'monospace',
                    padding: '4px 0'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#60a5fa'}
                  onMouseLeave={(e) => e.target.style.color = theme === 'dark' ? 'white' : '#1f2937'}
                >
                  📁 projects/
                </button>
                <button
                  onClick={() => handleNavClick('contact')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: theme === 'dark' ? 'white' : '#1f2937',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: '14px',
                    fontFamily: 'monospace',
                    padding: '4px 0'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#8b5cf6'}
                  onMouseLeave={(e) => e.target.style.color = theme === 'dark' ? 'white' : '#1f2937'}
                >
                  ⚡ contact.sh
                </button>
                <button
                  onClick={() => handleNavClick('skills')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: theme === 'dark' ? 'white' : '#1f2937',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: '14px',
                    fontFamily: 'monospace',
                    padding: '4px 0'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#f59e0b'}
                  onMouseLeave={(e) => e.target.style.color = theme === 'dark' ? 'white' : '#1f2937'}
                >
                  ⚙️ skills.config
                </button>
              </div>

              {/* Terminal output history */}
              <div style={{ marginBottom: '12px' }}>
                {terminalOutput.map((line, idx) => (
                  <div key={idx} style={{
                    color: line.type === 'error' ? '#ef4444' :
                           line.type === 'success' ? '#4ade80' :
                           line.type === 'info' ? '#60a5fa' :
                           line.type === 'warning' ? '#f59e0b' :
                           line.type === 'input' ? (theme === 'dark' ? '#888' : '#6b7280') :
                           line.type === 'command' ? (theme === 'dark' ? '#9ca3af' : '#6b7280') :
                           line.type === 'project' ? line.color :
                           line.type === 'link' ? '#60a5fa' :
                           (theme === 'dark' ? 'white' : '#1f2937'),
                    marginBottom: '4px',
                    cursor: line.type === 'link' ? 'pointer' : 'default',
                    textDecoration: line.type === 'link' ? 'underline' : 'none'
                  }}
                  onClick={() => line.url && window.open(line.url, '_blank')}
                  >
                    {line.text}
                  </div>
                ))}
              </div>

              {/* Command input line */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                color: theme === 'dark' ? '#888' : '#6b7280'
              }}>
                <span>citlol@portfolio ~ % </span>
                <input
                  type="text"
                  value={commandInput}
                  onChange={(e) => setCommandInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  style={{
                    background: 'none',
                    border: 'none',
                    outline: 'none',
                    color: theme === 'dark' ? '#4ade80' : '#16a34a',
                    fontFamily: 'monospace',
                    fontSize: '14px',
                    flex: 1,
                    caretColor: '#4ade80'
                  }}
                  placeholder="type a command..."
                  autoFocus
                />
              </div>
            </div>
          )}

          {activeSection === 'about' && (
            <div>
              <div style={{ color: theme === 'dark' ? '#888' : '#6b7280', marginBottom: '16px' }}>
                citlol@portfolio ~/about % cat about.md
              </div>
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ color: theme === 'dark' ? '#4ade80' : '#16a34a', marginBottom: '16px', fontSize: '18px' }}># About Me</h3>
                <div style={{ marginBottom: '12px' }}>
                  <span style={{ color: '#60a5fa' }}>👨‍💻</span> Computer Science Student & Full-Stack Developer
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <span style={{ color: '#f59e0b' }}>🚀</span> Co-Founder of Pancake - A modern budgeting app
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <span style={{ color: '#8b5cf6' }}>💡</span> Passionate about creating intuitive user experiences
                </div>

                {/* Currently Building Section */}
                <div style={{
                  marginTop: '24px',
                  padding: '16px',
                  backgroundColor: theme === 'dark' ? 'rgba(96, 165, 250, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                  borderRadius: '8px',
                  border: '1px solid rgba(96, 165, 250, 0.2)'
                }}>
                  <h4 style={{ color: '#60a5fa', marginBottom: '12px', fontSize: '14px' }}>🔨 Currently Building</h4>
                  <div style={{ color: theme === 'dark' ? '#d1d5db' : '#4b5563', fontSize: '13px' }}>
                    <div style={{ marginBottom: '6px' }}>• Pancake - Finalizing budget tracking features</div>
                    <div style={{ marginBottom: '6px' }}>• This portfolio - Adding interactive terminal commands</div>
                  </div>
                </div>

                {/* GitHub Stats */}
                {githubStats && (
                  <div style={{
                    marginTop: '16px',
                    padding: '16px',
                    backgroundColor: theme === 'dark' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(124, 58, 237, 0.1)',
                    borderRadius: '8px',
                    border: '1px solid rgba(139, 92, 246, 0.2)'
                  }}>
                    <h4 style={{ color: '#8b5cf6', marginBottom: '12px', fontSize: '14px' }}>🐙 GitHub Stats</h4>
                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', color: theme === 'dark' ? '#d1d5db' : '#4b5563', fontSize: '13px' }}>
                      <div>
                        <span style={{ color: '#8b5cf6', fontWeight: 'bold' }}>{githubStats.public_repos}</span> repos
                      </div>
                      <div>
                        <span style={{ color: '#8b5cf6', fontWeight: 'bold' }}>{githubStats.followers}</span> followers
                      </div>
                      <div>
                        <span style={{ color: '#8b5cf6', fontWeight: 'bold' }}>{githubStats.following}</span> following
                      </div>
                    </div>
                    <a
                      href="https://github.com/citlol"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#8b5cf6', fontSize: '12px', marginTop: '8px', display: 'inline-block' }}
                    >
                      View profile →
                    </a>
                  </div>
                )}

                <div style={{ color: '#6b7280', fontSize: '13px', marginTop: '16px', padding: '12px', backgroundColor: theme === 'dark' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(22, 163, 74, 0.1)', borderRadius: '8px', border: '1px solid rgba(74, 222, 128, 0.2)' }}>
                  <span style={{ color: '#4ade80' }}>✨</span> Currently seeking software engineering opportunities to contribute to innovative projects
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

          {activeSection === 'projects' && !selectedProject && (
            <div>
              <div style={{ color: theme === 'dark' ? '#888' : '#6b7280', marginBottom: '16px' }}>
                citlol@portfolio ~/projects % ls -la
              </div>
              <div style={{ marginBottom: '20px' }}>
                {projects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    style={{
                      padding: '16px',
                      backgroundColor: `${project.color}15`,
                      borderRadius: '8px',
                      marginBottom: '12px',
                      border: `1px solid ${project.color}40`,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(4px)';
                      e.currentTarget.style.backgroundColor = `${project.color}25`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.backgroundColor = `${project.color}15`;
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <div style={{ color: project.color, fontWeight: 'bold', fontSize: '15px' }}>
                        📁 {project.name}
                      </div>
                      <span style={{
                        fontSize: '10px',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        backgroundColor: project.status === 'Released' ? 'rgba(74, 222, 128, 0.2)' :
                                        project.status === 'In Development' ? 'rgba(96, 165, 250, 0.2)' :
                                        'rgba(156, 163, 175, 0.2)',
                        color: project.status === 'Released' ? '#4ade80' :
                               project.status === 'In Development' ? '#60a5fa' : '#9ca3af'
                      }}>
                        {project.status}
                      </span>
                    </div>
                    <div style={{ color: theme === 'dark' ? '#d1d5db' : '#4b5563', fontSize: '13px', marginBottom: '8px' }}>
                      {project.description}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {project.tech.map((tech, idx) => (
                        <span key={idx} style={{
                          fontSize: '11px',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                          color: theme === 'dark' ? '#9ca3af' : '#6b7280'
                        }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div style={{ color: '#6b7280', fontSize: '11px', marginTop: '8px' }}>
                      Click for details →
                    </div>
                  </div>
                ))}
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

          {/* Project Detail View */}
          {activeSection === 'projects' && selectedProject && (
            <div>
              <div style={{ color: theme === 'dark' ? '#888' : '#6b7280', marginBottom: '16px' }}>
                citlol@portfolio ~/projects/{selectedProject.id} % cat README.md
              </div>
              <div style={{
                padding: '20px',
                backgroundColor: `${selectedProject.color}10`,
                borderRadius: '12px',
                border: `1px solid ${selectedProject.color}30`,
                marginBottom: '20px'
              }}>
                <h3 style={{ color: selectedProject.color, marginBottom: '8px', fontSize: '20px' }}>
                  {selectedProject.name}
                </h3>
                <div style={{
                  display: 'inline-block',
                  fontSize: '11px',
                  padding: '3px 10px',
                  borderRadius: '12px',
                  backgroundColor: selectedProject.status === 'Released' ? 'rgba(74, 222, 128, 0.2)' :
                                  selectedProject.status === 'In Development' ? 'rgba(96, 165, 250, 0.2)' :
                                  'rgba(156, 163, 175, 0.2)',
                  color: selectedProject.status === 'Released' ? '#4ade80' :
                         selectedProject.status === 'In Development' ? '#60a5fa' : '#9ca3af',
                  marginBottom: '12px'
                }}>
                  {selectedProject.status}
                </div>
                <p style={{ color: theme === 'dark' ? '#d1d5db' : '#4b5563', marginBottom: '16px', lineHeight: '1.6' }}>
                  {selectedProject.description}
                </p>

                <div style={{ marginBottom: '16px' }}>
                  <div style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280', fontSize: '12px', marginBottom: '6px' }}>
                    Role: <span style={{ color: selectedProject.color }}>{selectedProject.role}</span>
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <div style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280', fontSize: '12px', marginBottom: '8px' }}>Tech Stack:</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {selectedProject.tech.map((tech, idx) => (
                      <span key={idx} style={{
                        fontSize: '12px',
                        padding: '4px 12px',
                        borderRadius: '6px',
                        backgroundColor: `${selectedProject.color}20`,
                        color: selectedProject.color,
                        border: `1px solid ${selectedProject.color}40`
                      }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <div style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280', fontSize: '12px', marginBottom: '8px' }}>Highlights:</div>
                  <ul style={{ margin: 0, paddingLeft: '20px', color: theme === 'dark' ? '#d1d5db' : '#4b5563' }}>
                    {selectedProject.highlights.map((highlight, idx) => (
                      <li key={idx} style={{ marginBottom: '6px', fontSize: '13px' }}>{highlight}</li>
                    ))}
                  </ul>
                </div>

                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    backgroundColor: selectedProject.color,
                    color: 'white',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontSize: '13px',
                    fontWeight: '500',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                  onMouseLeave={(e) => e.target.style.opacity = '1'}
                >
                  🐙 View on GitHub
                </a>
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#4a9eff',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontFamily: 'monospace',
                  marginRight: '16px'
                }}
              >
                ← back to projects
              </button>
              <button
                onClick={() => { setSelectedProject(null); handleNavClick('home'); }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: theme === 'dark' ? '#6b7280' : '#9ca3af',
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
              <div style={{ color: theme === 'dark' ? '#888' : '#6b7280', marginBottom: '16px' }}>
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
              <div style={{ color: theme === 'dark' ? '#888' : '#6b7280', marginBottom: '16px' }}>
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
        backgroundColor: theme === 'dark' ? 'rgba(80, 80, 80, 0.75)' : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        padding: isMobile ? '10px 14px' : '12px 18px',
        display: 'flex',
        gap: isMobile ? '10px' : '12px',
        boxShadow: theme === 'dark' ? '0 8px 32px rgba(0,0,0,0.5)' : '0 8px 32px rgba(0,0,0,0.15)',
        border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
        maxWidth: isMobile ? '90%' : 'none',
        transition: 'all 0.3s ease'
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
          setHoveredIcon('Apple Music');
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          setHoveredIcon(null);
        }}
        onClick={openAppleMusicModal}
        >
          <img
            src="/Apple_Music_Icon_blk_sm_073120.svg"
            alt="Apple Music"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
          <Tooltip text="Apple Music" show={hoveredIcon === 'Apple Music' && !isMobile} />
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

      {/* Apple Music Modal */}
      {showAppleMusicModal && (
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
        onClick={closeAppleMusicModal}
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
              onClick={closeAppleMusicModal}
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
              🎵 My Apple Music Playlist
            </h3>

            {/* Loading dots */}
            {isAppleMusicLoading && (
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


            {/* Apple Music Embed */}
            <iframe
              src="https://embed.music.apple.com/us/playlist/%EC%B2%AD%EC%B6%98%EC%9D%80-%EB%B0%94%EB%A1%9C-%EC%A7%80%EA%B8%88/pl.u-JPAZZlGtJa55XR"
              width="100%"
              height="380"
              frameBorder="0"
              allowTransparency="true"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              style={{
                borderRadius: '12px',
                display: isAppleMusicLoading ? 'none' : 'block'
              }}
              onLoad={() => setIsAppleMusicLoading(false)}
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
          backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.95)' : 'rgba(255, 255, 255, 0.98)',
          border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(0, 0, 0, 0.1)',
          borderRadius: '12px',
          boxShadow: theme === 'dark' ? '0 20px 40px rgba(0,0,0,0.7)' : '0 20px 40px rgba(0,0,0,0.15)',
          backdropFilter: 'blur(20px)',
          overflow: 'hidden',
          zIndex: 200
        }}>
          {/* Folder Header */}
          <div style={{
            backgroundColor: theme === 'dark' ? 'rgba(51, 51, 51, 0.9)' : 'rgba(229, 231, 235, 0.95)',
            padding: '12px 16px',
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)'
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
            <span style={{ color: theme === 'dark' ? '#888' : '#6b7280', fontSize: '12px' }}>Personal</span>
          </div>

          {/* Folder Content */}
          <div style={{
            padding: '24px',
            color: theme === 'dark' ? 'white' : '#1f2937',
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
          backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.95)' : 'rgba(255, 255, 255, 0.98)',
          border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(0, 0, 0, 0.1)',
          borderRadius: '12px',
          boxShadow: theme === 'dark' ? '0 20px 40px rgba(0,0,0,0.7)' : '0 20px 40px rgba(0,0,0,0.15)',
          backdropFilter: 'blur(20px)',
          overflow: 'hidden',
          zIndex: 200
        }}>
          {/* Folder Header */}
          <div style={{
            backgroundColor: theme === 'dark' ? 'rgba(51, 51, 51, 0.9)' : 'rgba(229, 231, 235, 0.95)',
            padding: '12px 16px',
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)'
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
            <span style={{ color: theme === 'dark' ? '#888' : '#6b7280', fontSize: '12px' }}>School Work</span>
          </div>

          {/* Folder Content */}
          <div style={{
            padding: '24px',
            color: theme === 'dark' ? 'white' : '#1f2937',
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
          backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.95)' : 'rgba(255, 255, 255, 0.98)',
          border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(0, 0, 0, 0.1)',
          borderRadius: '12px',
          boxShadow: theme === 'dark' ? '0 20px 40px rgba(0,0,0,0.7)' : '0 20px 40px rgba(0,0,0,0.15)',
          backdropFilter: 'blur(20px)',
          overflow: 'hidden',
          zIndex: 200
        }}>
          {/* Folder Header */}
          <div style={{
            backgroundColor: theme === 'dark' ? 'rgba(51, 51, 51, 0.9)' : 'rgba(229, 231, 235, 0.95)',
            padding: '12px 16px',
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)'
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
            <span style={{ color: theme === 'dark' ? '#888' : '#6b7280', fontSize: '12px' }}>Miel Pomodoro</span>
          </div>

          {/* Folder Content */}
          <div style={{
            padding: '24px',
            color: theme === 'dark' ? 'white' : '#1f2937',
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