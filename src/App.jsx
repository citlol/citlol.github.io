import React, { useState, useEffect } from 'react';
import './App.css';
import Typewriter from 'typewriter-effect';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return true; // Default to dark mode
  });

  // Update theme when isDarkMode changes
  useEffect(() => {
    const html = document.documentElement;
    
    if (isDarkMode) {
      html.classList.add('dark');
      html.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      html.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Initialize theme on first load
  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add('dark');
    } else {
      html.classList.add('light');
    }
  }, []);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  // Handle navigation clicks
  const handleNavClick = (section) => {
    setActiveSection(section);
  };

  // Handle keyboard navigation
  const handleKeyPress = (e, section) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleNavClick(section);
    }
  };

  // Desktop Taskbar component
  const Taskbar = () => (
    <div className={`taskbar fixed bottom-0 left-0 right-0 z-50 h-12 border-t backdrop-blur-sm transition-colors duration-200 ${
      isDarkMode 
        ? 'bg-gray-900/95 border-gray-700' 
        : 'bg-gray-200/95 border-gray-300'
    }`} role="navigation" aria-label="Desktop taskbar">
      <div className="flex items-center justify-between h-full px-4">
        {/* Left side - Applications */}
        <div className="flex items-center space-x-2">
          {[
            { name: 'about', icon: '📄', label: 'About' },
            { name: 'skills', icon: '⚡', label: 'Skills' },
            { name: 'projects', icon: '📁', label: 'Projects' },
            { name: 'contact', icon: '📧', label: 'Contact' }
          ].map((app) => (
            <button
              key={app.name}
              onClick={() => handleNavClick(app.name)}
              onKeyPress={(e) => handleKeyPress(e, app.name)}
              className={`desktop-icon flex items-center space-x-1 px-3 py-1 rounded-md text-sm font-mono transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                activeSection === app.name
                  ? isDarkMode
                    ? 'bg-gray-800 text-white border border-gray-600 focus:ring-gray-500'
                    : 'bg-white text-black border border-gray-400 focus:ring-gray-500'
                  : isDarkMode
                  ? 'text-gray-400 hover:bg-gray-800 hover:text-white focus:ring-gray-500'
                  : 'text-gray-600 hover:bg-white hover:text-black focus:ring-gray-500'
              }`}
              aria-current={activeSection === app.name ? 'page' : undefined}
              title={app.label}
            >
              <span className="text-base">{app.icon}</span>
              <span className="hidden sm:inline">{app.name}</span>
            </button>
          ))}
        </div>

        {/* Right side - System tray */}
        <div className="flex items-center space-x-4">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className={`px-2 py-1 text-xs font-mono rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isDarkMode
                ? 'text-gray-400 hover:text-white hover:bg-gray-800 focus:ring-gray-500'
                : 'text-gray-600 hover:text-black hover:bg-gray-100 focus:ring-gray-500'
            }`}
            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
            title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          
          {/* Clock */}
          <div className={`text-xs font-mono ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {currentTime.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: false 
            })}
          </div>
        </div>
      </div>
    </div>
  );

  // Terminal Window component
  const TerminalWindow = ({ children, title = "terminal" }) => (
    <div className={`terminal-window w-full max-w-5xl mx-auto border rounded-lg overflow-hidden shadow-2xl transition-colors duration-200 ${
      isDarkMode 
        ? 'bg-gray-950 border-gray-800' 
        : 'bg-white border-gray-300'
    }`}>
      {/* Terminal header */}
      <div className={`px-4 py-3 border-b flex items-center justify-between transition-colors duration-200 ${
        isDarkMode 
          ? 'bg-gray-900 border-gray-800' 
          : 'bg-gray-200 border-gray-300'
      }`}>
        <div className="flex items-center space-x-3">
          {/* Window controls */}
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className={`font-mono text-sm transition-colors duration-200 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {title}
          </div>
        </div>
        
        {/* Terminal title on right */}
        <div className={`font-mono text-sm transition-colors duration-200 ${
          isDarkMode ? 'text-gray-500' : 'text-gray-500'
        }`}>
          citlalli@portfolio:~/{activeSection}
        </div>
      </div>

      {/* Terminal content */}
      <div className="p-6 min-h-[500px]">
        {children}
      </div>
    </div>
  );

  // Home/Welcome section for terminal
  const WelcomeSection = () => (
    <div className={`font-mono text-sm space-y-4 ${
      isDarkMode ? 'text-gray-300' : 'text-gray-700'
    }`}>
      <div className={`${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
        user@portfolio:~$ ./citlalli.exe --version
      </div>
      
      <div className="space-y-2">
        <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
          citlalli.exe v1.0.0
        </div>
        <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Computer Science Student | Accessibility-First Developer
        </div>
      </div>

      <div className="my-6">
        <div className={`${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
          user@portfolio:~$ cat README.md
        </div>
        <div className="mt-2 pl-4 border-l-2 border-gray-500 space-y-2">
          <p>Building inclusive, accessible digital experiences</p>
          <p>Passionate about creating technology that works for everyone</p>
          <p>Currently seeking internship opportunities</p>
        </div>
      </div>

      <div className="space-y-1">
        <div className={`${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
          user@portfolio:~$ ls -la
        </div>
        <div className="pl-4 space-y-1">
          {[
            { name: 'about.md', desc: 'Personal information and background' },
            { name: 'skills.json', desc: 'Technical skills and expertise' },
            { name: 'projects/', desc: 'Portfolio of completed work' },
            { name: 'contact.sh', desc: 'Get in touch with me' }
          ].map((file, index) => (
            <div key={index} className="flex items-center space-x-4">
              <span className={`text-blue-400 cursor-pointer hover:underline`}
                    onClick={() => handleNavClick(file.name.split('.')[0])}>
                {file.name}
              </span>
              <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                {file.desc}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-gray-600">
        <div className={`${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
          user@portfolio:~$ <span className="terminal-cursor">█</span>
        </div>
      </div>
    </div>
  );

  // About Section for terminal
  const AboutSection = () => (
    <div className={`font-mono text-sm space-y-4 ${
      isDarkMode ? 'text-gray-300' : 'text-gray-700'
    }`}>
      <div className={`${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
        user@portfolio:~/about$ cat about.md
      </div>
      
      <div className="space-y-6">
        <div>
          <div className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
            # About Me
          </div>
          <div className="pl-4 border-l-2 border-blue-500 space-y-2">
            <p>Computer science student with a passion for creating meaningful digital experiences.</p>
            <p>My approach combines technical precision with thoughtful design, always keeping</p>
            <p>accessibility and user experience at the forefront.</p>
          </div>
        </div>

        <div>
          <div className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
            ## Philosophy
          </div>
          <div className="pl-4 border-l-2 border-green-500 space-y-2">
            <p><span className="text-yellow-400">accessibility_first_development:</span> I believe technology should be</p>
            <p>inclusive and accessible to everyone. My projects prioritize semantic HTML, proper ARIA</p>
            <p>implementation, and comprehensive keyboard navigation.</p>
            <br />
            <p>Currently seeking internship opportunities where I can contribute to innovative projects</p>
            <p>while continuing to grow as a developer.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className={`text-base font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
              ### Current Focus
            </div>
            <div className="pl-4 space-y-1">
              {[
                'modern react development',
                'accessible web applications', 
                'clean, maintainable code',
                'user-centered design'
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="text-green-400">▸</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className={`text-base font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
              ### Interests
            </div>
            <div className="pl-4 space-y-1">
              {[
                'web accessibility standards',
                'ui/ux design principles',
                'open source contribution',
                'tech communities'
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="text-blue-400">▸</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-gray-600">
        <div className={`${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
          user@portfolio:~/about$ <span className="terminal-cursor">█</span>
        </div>
      </div>
    </div>
  );

  // Skills Section for terminal
  const SkillsSection = () => {
    const skillCategories = [
      {
        title: "frontend",
        extension: ".js",
        skills: ["react", "tailwind_css", "next.js", "html", "css"]
      },
      {
        title: "backend", 
        extension: ".py",
        skills: ["node.js", "mongodb", "rest_apis"]
      },
      {
        title: "tools",
        extension: ".config", 
        skills: ["git", "procreate", "figma", "linux", "accessibility_testing"]
      }
    ];

    return (
      <div className={`font-mono text-sm space-y-4 ${
        isDarkMode ? 'text-gray-300' : 'text-gray-700'
      }`}>
        <div className={`${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
          user@portfolio:~/skills$ cat skills.json
        </div>
        
        <div className="space-y-6">
          <div className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
            {`{`}
          </div>

          {skillCategories.map((category, index) => (
            <div key={index} className="pl-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-blue-400">"{category.title}":</span>
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  // {category.title}{category.extension}
                </span>
              </div>
              
              <div className="pl-4">
                <div className={`${isDarkMode ? 'text-white' : 'text-black'}`}>[</div>
                <div className="pl-4 space-y-1">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="flex items-center space-x-2">
                      <span className="text-green-400">"</span>
                      <span className="text-orange-400">{skill}</span>
                      <span className="text-green-400">"</span>
                      {skillIndex < category.skills.length - 1 && (
                        <span className={isDarkMode ? 'text-white' : 'text-black'}>,</span>
                      )}
                    </div>
                  ))}
                </div>
                <div className={`${isDarkMode ? 'text-white' : 'text-black'}`}>
                  ]{index < skillCategories.length - 1 ? ',' : ''}
                </div>
              </div>
            </div>
          ))}

          <div className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
            {`}`}
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-600">
          <div className={`${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
            user@portfolio:~/skills$ <span className="terminal-cursor">█</span>
          </div>
        </div>
      </div>
    );
  };

  // Projects Section for terminal
  const ProjectsSection = () => {
    const projects = [
      {
        name: "accessibility_checker",
        type: "web_app",
        desc: "Tool for automated accessibility testing",
        tech: ["react", "node.js", "axe-core"],
        status: "active"
      },
      {
        name: "portfolio_terminal",
        type: "website", 
        desc: "Interactive desktop-style portfolio",
        tech: ["react", "tailwind", "typewriter"],
        status: "active"
      },
      {
        name: "inclusive_ui_lib",
        type: "library",
        desc: "Accessible React component library",
        tech: ["react", "typescript", "storybook"],
        status: "in_progress"
      },
      {
        name: "screen_reader_tester",
        type: "tool",
        desc: "Cross-platform screen reader testing suite",
        tech: ["python", "selenium", "pytest"],
        status: "planned"
      }
    ];

    return (
      <div className={`font-mono text-sm space-y-4 ${
        isDarkMode ? 'text-gray-300' : 'text-gray-700'
      }`}>
        <div className={`${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
          user@portfolio:~/projects$ ls -la
        </div>
        
        <div className="space-y-4">
          {projects.map((project, index) => (
            <div key={index} className="pl-4 space-y-2">
              <div className="flex items-center space-x-4">
                <span className={`text-blue-400`}>{project.name}/</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  project.status === 'active' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                  project.status === 'in_progress' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                  'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                }`}>
                  {project.status}
                </span>
                <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                  [{project.type}]
                </span>
              </div>
              
              <div className="pl-4 space-y-1">
                <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {project.desc}
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                    tech:
                  </span>
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="text-orange-400 text-xs">
                      {tech}{techIndex < project.tech.length - 1 ? ',' : ''}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-4 text-xs">
                  <button className={`text-blue-400 hover:underline ${
                    project.status === 'planned' ? 'opacity-50 cursor-not-allowed' : ''
                  }`} disabled={project.status === 'planned'}>
                    ./view_demo
                  </button>
                  <button className={`text-green-400 hover:underline ${
                    project.status === 'planned' ? 'opacity-50 cursor-not-allowed' : ''
                  }`} disabled={project.status === 'planned'}>
                    ./source_code
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-600 space-y-2">
          <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
            Total: {projects.length} projects | Active: {projects.filter(p => p.status === 'active').length} | In Progress: {projects.filter(p => p.status === 'in_progress').length}
          </div>
          <div className={`${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
            user@portfolio:~/projects$ <span className="terminal-cursor">█</span>
          </div>
        </div>
      </div>
    );
  };

  // Contact Section for terminal
  const ContactSection = () => (
    <div className={`font-mono text-sm space-y-4 ${
      isDarkMode ? 'text-gray-300' : 'text-gray-700'
    }`}>
      <div className={`${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
        user@portfolio:~/contact$ ./contact.sh
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Initializing contact protocols...
          </div>
          <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Scanning available communication channels...
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-green-400">✓</span>
            <span>email service active</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-green-400">✓</span>
            <span>linkedin connection established</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-green-400">✓</span>
            <span>github repository accessible</span>
          </div>
        </div>

        <div className="py-4 space-y-2">
          <p>Let's connect! I'm always interested in discussing new opportunities,</p>
          <p>collaborations, and innovative projects.</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>email:</span>
            <a 
              href="mailto:citlalli.tdr@gmail.com" 
              className="text-blue-400 hover:text-blue-300 underline"
            >
              citlalli.tdr@gmail.com
            </a>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>linkedin:</span>
            <a 
              href="https://linkedin.com/in/citlalli-trejo-del-rio" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              linkedin.com/in/citlalli-trejo-del-rio
            </a>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>github:</span>
            <a 
              href="https://github.com/citlol" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              github.com/citlol
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-gray-600">
        <div className={`${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
          user@portfolio:~/contact$ <span className="terminal-cursor">█</span>
        </div>
      </div>
    </div>
  );

  // Render current section content
  const renderSectionContent = () => {
    switch (activeSection) {
      case 'home':
        return <WelcomeSection />;
      case 'about':
        return <AboutSection />;
      case 'skills':
        return <SkillsSection />;
      case 'projects':
        return <ProjectsSection />;
      case 'contact':
        return <ContactSection />;
      default:
        return <WelcomeSection />;
    }
  };

  return (
    <div className={`min-h-screen font-mono transition-colors duration-200 relative ${
      isDarkMode ? 'bg-black text-white' : 'bg-white text-black'
    }`}>
      {/* Desktop background */}
      <div className="absolute inset-0 bg-grid opacity-10"></div>
      
      {/* Main desktop area */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 pb-16">
        <TerminalWindow title={`citlalli@portfolio:~/${activeSection === 'home' ? '' : activeSection}`}>
          {renderSectionContent()}
        </TerminalWindow>
      </div>
      
      {/* Desktop Taskbar */}
      <Taskbar />
    </div>
  );
}

export default App;