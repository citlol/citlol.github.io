import React, { useState, useEffect } from 'react';
import './App.css';
import Typewriter from 'typewriter-effect';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
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

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  // Handle navigation clicks
  const handleNavClick = (section) => {
    setActiveSection(section);
    setIsMenuOpen(false);
  };

  // Handle keyboard navigation
  const handleKeyPress = (e, section) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleNavClick(section);
    }
  };

  // Navigation component
  const Navigation = () => (
    <nav className={`backdrop-blur-sm border-b sticky top-0 z-50 transition-colors duration-200 ${
      isDarkMode 
        ? 'bg-black/95 border-gray-800' 
        : 'bg-white/95 border-gray-200'
    }`} role="navigation" aria-label="Main navigation">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className={`text-xl font-mono tracking-wider transition-colors duration-200 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              portfolio.exe
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`px-3 py-2 text-sm font-mono rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isDarkMode
                  ? 'text-gray-400 hover:text-white hover:bg-gray-800 focus:ring-gray-500 focus:ring-offset-black'
                  : 'text-gray-600 hover:text-black hover:bg-gray-100 focus:ring-gray-500 focus:ring-offset-white'
              }`}
              aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
            >
              {isDarkMode ? 'light_mode.js' : 'dark_mode.js'}
            </button>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-baseline space-x-6">
                {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => handleNavClick(item.toLowerCase())}
                    onKeyPress={(e) => handleKeyPress(e, item.toLowerCase())}
                    className={`px-3 py-2 text-sm font-mono transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md ${
                      activeSection === item.toLowerCase()
                        ? isDarkMode
                          ? 'text-white bg-gray-800 focus:ring-gray-500 focus:ring-offset-black'
                          : 'text-black bg-gray-200 focus:ring-gray-500 focus:ring-offset-white'
                        : isDarkMode
                        ? 'text-gray-400 hover:text-white hover:bg-gray-900 focus:ring-gray-500 focus:ring-offset-black'
                        : 'text-gray-600 hover:text-black hover:bg-gray-100 focus:ring-gray-500 focus:ring-offset-white'
                    }`}
                    aria-current={activeSection === item.toLowerCase() ? 'page' : undefined}
                  >
                    {item.toLowerCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isDarkMode
                    ? 'text-gray-400 hover:text-white hover:bg-gray-900 focus:ring-gray-500 focus:ring-offset-black'
                    : 'text-gray-600 hover:text-black hover:bg-gray-100 focus:ring-gray-500 focus:ring-offset-white'
                }`}
                aria-expanded={isMenuOpen}
                aria-label="Toggle navigation menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={`md:hidden border-t transition-colors duration-200 ${
            isDarkMode ? 'border-gray-800' : 'border-gray-200'
          }`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item.toLowerCase())}
                  className={`w-full text-left px-3 py-2 text-base font-mono transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md ${
                    activeSection === item.toLowerCase()
                      ? isDarkMode
                        ? 'text-white bg-gray-800 focus:ring-gray-500 focus:ring-offset-black'
                        : 'text-black bg-gray-200 focus:ring-gray-500 focus:ring-offset-white'
                      : isDarkMode
                      ? 'text-gray-400 hover:text-white hover:bg-gray-900 focus:ring-gray-500 focus:ring-offset-black'
                      : 'text-gray-600 hover:text-black hover:bg-gray-100 focus:ring-gray-500 focus:ring-offset-white'
                  }`}
                  aria-current={activeSection === item.toLowerCase() ? 'page' : undefined}
                >
                  {item.toLowerCase()}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );

  // Hero Section
  const HeroSection = () => (
    <section className={`min-h-screen flex items-center justify-center relative overflow-hidden ${
      isDarkMode ? 'bg-black' : 'bg-white'
    }`} aria-labelledby="hero-heading">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-grid opacity-20"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Simple prompt indicator */}
        <div className="mb-12">
          <div className={`font-mono text-lg ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>user@portfolio:~$</span> ./citlalli.exe
          </div>
        </div>
        
        {/* Main title with better spacing */}
        <h1 id="hero-heading" className={`text-5xl sm:text-6xl lg:text-7xl font-mono mb-8 tracking-wider ${
          isDarkMode ? 'text-white' : 'text-black'
        }`}>
          citlalli.exe
        </h1>
        
        {/* Subtitle */}
        <div className="mb-12">
          <p className={`font-mono text-lg italic mb-6 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            // building inclusive, accessible digital experiences
          </p>
          
          {/* File extensions */}
          <div className={`font-mono text-base space-y-2 ${
            isDarkMode ? 'text-gray-500' : 'text-gray-600'
          }`}>
            <p>cs_student.cpp</p>
            <p>inclusive_dev.sh</p>
          </div>
        </div>
        
        {/* Clean buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => handleNavClick('contact')}
            className={`px-8 py-3 font-mono border-2 transition-all duration-200 ${
              isDarkMode
                ? 'bg-white text-black border-white hover:bg-gray-100'
                : 'bg-black text-white border-black hover:bg-gray-900'
            }`}
            aria-label="Navigate to contact section"
          >
            ./contact
          </button>
          <button
            onClick={() => handleNavClick('projects')}
            className={`px-8 py-3 font-mono border-2 transition-all duration-200 ${
              isDarkMode
                ? 'bg-transparent text-white border-white hover:bg-white hover:text-black'
                : 'bg-transparent text-black border-black hover:bg-black hover:text-white'
            }`}
            aria-label="Navigate to projects section"
          >
            ./projects
          </button>
        </div>
        
      </div>
    </section>
  );

  // About Section
  const AboutSection = () => (
    <section className={`py-20 transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-950' : 'bg-gray-100'
    }`} aria-labelledby="about-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="about-heading" className={`text-3xl font-mono mb-12 tracking-wider transition-colors duration-200 ${
          isDarkMode ? 'text-white' : 'text-black'
        }`}>about.md</h2>

        <div className="space-y-8">
          <div className={`border p-6 rounded-lg backdrop-blur-sm transition-colors duration-200 ${
            isDarkMode 
              ? 'bg-black/50 border-gray-800' 
              : 'bg-white border-gray-300'
          }`}>
            <div className={`font-mono text-sm mb-4 transition-colors duration-200 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>// bio</div>
            <p className={`leading-relaxed mb-6 font-mono transition-colors duration-200 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              computer science student with a passion for creating meaningful digital experiences.
              my approach combines technical precision with thoughtful design, always keeping
              accessibility and user experience at the forefront.
            </p>
          </div>

          <div className={`border p-6 rounded-lg backdrop-blur-sm transition-colors duration-200 ${
            isDarkMode 
              ? 'bg-black/50 border-gray-800' 
              : 'bg-white border-gray-300'
          }`}>
            <div className={`font-mono text-sm mb-4 transition-colors duration-200 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>// philosophy</div>
            <p className={`leading-relaxed mb-4 font-mono transition-colors duration-200 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <span className={isDarkMode ? 'text-white' : 'text-black'}>accessibility_first_development:</span> i believe technology should be
              inclusive and accessible to everyone. my projects prioritize semantic html, proper aria
              implementation, and comprehensive keyboard navigation.
            </p>
            <p className={`leading-relaxed font-mono transition-colors duration-200 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              currently seeking internship opportunities where i can contribute to innovative projects
              while continuing to grow as a developer.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className={`border p-6 rounded-lg backdrop-blur-sm transition-colors duration-200 ${
              isDarkMode 
                ? 'bg-black/50 border-gray-800' 
                : 'bg-white border-gray-300'
            }`}>
              <div className={`font-mono text-sm mb-4 transition-colors duration-200 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>// current_focus</div>
              <ul className={`space-y-2 font-mono text-sm transition-colors duration-200 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <li className="flex items-start">
                  <span className={`mr-2 transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-500' : 'text-gray-400'
                  }`}>•</span>
                  modern react development
                </li>
                <li className="flex items-start">
                  <span className={`mr-2 transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-500' : 'text-gray-400'
                  }`}>•</span>
                  accessible web applications
                </li>
                <li className="flex items-start">
                  <span className={`mr-2 transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-500' : 'text-gray-400'
                  }`}>•</span>
                  clean, maintainable code
                </li>
                <li className="flex items-start">
                  <span className={`mr-2 transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-500' : 'text-gray-400'
                  }`}>•</span>
                  user-centered design
                </li>
              </ul>
            </div>

            <div className={`border p-6 rounded-lg backdrop-blur-sm transition-colors duration-200 ${
              isDarkMode 
                ? 'bg-black/50 border-gray-800' 
                : 'bg-white border-gray-300'
            }`}>
              <div className={`font-mono text-sm mb-4 transition-colors duration-200 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>// interests</div>
              <ul className={`space-y-2 font-mono text-sm transition-colors duration-200 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <li className="flex items-start">
                  <span className={`mr-2 transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-500' : 'text-gray-400'
                  }`}>•</span>
                  web accessibility standards
                </li>
                <li className="flex items-start">
                  <span className={`mr-2 transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-500' : 'text-gray-400'
                  }`}>•</span>
                  ui/ux design principles
                </li>
                <li className="flex items-start">
                  <span className={`mr-2 transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-500' : 'text-gray-400'
                  }`}>•</span>
                  open source contribution
                </li>
                <li className="flex items-start">
                  <span className={`mr-2 transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-500' : 'text-gray-400'
                  }`}>•</span>
                  tech communities
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // Skills Section
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
        skills: ["node.js", "mongodb", "rest_apis", "linux"]
      },
      {
        title: "tools",
        extension: ".config",
        skills: ["git", "procreate", "figma", "accessibility_testing"]
      }
    ];

    return (
      <section className={`py-20 transition-colors duration-200 ${
        isDarkMode ? 'bg-black' : 'bg-white'
      }`} aria-labelledby="skills-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="skills-heading" className={`text-3xl font-mono mb-12 tracking-wider text-center transition-colors duration-200 ${
            isDarkMode ? 'text-white' : 'text-black'
          }`}>
            skills.json
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => (
              <div key={index} className={`border rounded-lg overflow-hidden transition-colors duration-200 ${
                isDarkMode 
                  ? 'bg-gray-950 border-gray-800' 
                  : 'bg-white border-gray-300'
              }`}>
                {/* File header */}
                <div className={`px-4 py-2 border-b transition-colors duration-200 ${
                  isDarkMode 
                    ? 'bg-gray-900 border-gray-800' 
                    : 'bg-gray-200 border-gray-300'
                }`}>
                  <div className={`font-mono text-sm transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {category.title}{category.extension}
                  </div>
                </div>

                {/* File content */}
                <div className="p-6">
                  <div className="space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <div
                        key={skillIndex}
                        className={`font-mono text-sm transition-colors duration-200 cursor-default flex items-center ${
                          isDarkMode 
                            ? 'text-gray-300 hover:text-white' 
                            : 'text-gray-700 hover:text-black'
                        }`}
                      >
                        <span className={`mr-3 transition-colors duration-200 ${
                          isDarkMode ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          ├─
                        </span>
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Projects Section
  const ProjectsSection = () => (
    <section className={`py-20 transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-950' : 'bg-gray-100'
    }`} aria-labelledby="projects-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="projects-heading" className={`text-3xl font-mono mb-12 tracking-wider text-center transition-colors duration-200 ${
          isDarkMode ? 'text-white' : 'text-black'
        }`}>
          projects/
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((project) => (
            <div key={project} className={`border rounded-lg overflow-hidden transition-all duration-200 group ${
              isDarkMode 
                ? 'bg-black border-gray-800 hover:border-gray-700' 
                : 'bg-white border-gray-300 hover:border-gray-400'
            }`}>
              {/* Terminal header */}
              <div className={`px-4 py-2 border-b transition-colors duration-200 ${
                isDarkMode 
                  ? 'bg-gray-900 border-gray-800' 
                  : 'bg-gray-200 border-gray-300'
              }`}>
                <div className="flex items-center space-x-2">
                  <div className="terminal-dots">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <div className={`font-mono text-xs transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    project_{project}.md
                  </div>
                </div>
              </div>

              {/* Project preview */}
              <div className={`h-48 flex items-center justify-center relative overflow-hidden transition-colors duration-200 ${
                isDarkMode 
                  ? 'bg-gray-900' 
                  : 'bg-gray-100'
              }`}>
                <div className={`absolute inset-0 transition-colors duration-200 ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-gray-800 to-gray-900' 
                    : 'bg-gradient-to-br from-gray-200 to-gray-300'
                }`}></div>
                <div className={`relative z-10 font-mono text-sm transition-colors duration-200 ${
                  isDarkMode ? 'text-gray-500' : 'text-gray-600'
                }`}>
                  // project preview
                </div>
              </div>

              {/* Project info */}
              <div className="p-6">
                <h3 className={`font-mono text-lg mb-2 transition-colors duration-200 ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}>
                  project_{project}
                </h3>
                <p className={`font-mono text-sm mb-4 leading-relaxed transition-colors duration-200 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-700'
                }`}>
                  a brief description of this project and the technologies used to build it.
                </p>

                <div className="flex space-x-4">
                  <button className={`font-mono text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 border-b border-transparent hover:border-current ${
                    isDarkMode 
                      ? 'text-gray-400 hover:text-white focus:ring-gray-500 focus:ring-offset-black' 
                      : 'text-gray-600 hover:text-black focus:ring-gray-500 focus:ring-offset-white'
                  }`}>
                    [live_demo]
                  </button>
                  <button className={`font-mono text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 border-b border-transparent hover:border-current ${
                    isDarkMode 
                      ? 'text-gray-400 hover:text-white focus:ring-gray-500 focus:ring-offset-black' 
                      : 'text-gray-600 hover:text-black focus:ring-gray-500 focus:ring-offset-white'
                  }`}>
                    [source_code]
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // Contact Section  
  const ContactTerminal = () => (
    <div className={`font-mono text-sm whitespace-pre-wrap px-4 transition-colors duration-200 ${
      isDarkMode ? 'text-gray-300' : 'text-gray-700'
    }`}>
      <Typewriter
        options={{
          delay: 30,
          cursor: '█',
          autoStart: true,
          html: true,
        }}
        onInit={(typewriter) => {
          const textColor = isDarkMode ? '#9ca3af' : '#6b7280';
          const successColor = isDarkMode ? '#4ade80' : '#16a34a';
          const commandColor = isDarkMode ? '#9ca3af' : '#6b7280';
          const blueColor = isDarkMode ? '#60a5fa' : '#2563eb';
          
          typewriter
            .typeString(`&nbsp;&nbsp;&nbsp;&nbsp;user@portfolio:~$ ./contact.sh<br/><br/>`)
            .pauseFor(500)
            .typeString(`&nbsp;&nbsp;&nbsp;&nbsp;initializing contact protocols...<br/>`)
            .pauseFor(500)
            .typeString(`&nbsp;&nbsp;&nbsp;&nbsp;scanning available communication channels...<br/>`)
            .pauseFor(400)
            .typeString(`&nbsp;&nbsp;&nbsp;&nbsp;<span style='color: ${successColor}'>✓ email service active</span><br/>`)
            .typeString(`&nbsp;&nbsp;&nbsp;&nbsp;<span style='color: ${successColor}'>✓ linkedin connection established</span><br/>`)
            .typeString(`&nbsp;&nbsp;&nbsp;&nbsp;<span style='color: ${successColor}'>✓ github repository accessible</span><br/><br/>`)
            .typeString(`&nbsp;&nbsp;&nbsp;&nbsp;let's connect! i'm always interested in discussing new opportunities,<br/>`)
            .typeString(`&nbsp;&nbsp;&nbsp;&nbsp;collaborations, and innovative projects.<br/><br/>`)
            .typeString(`&nbsp;&nbsp;&nbsp;&nbsp;email: <a href='mailto:citlalli.tdr@gmail.com' style='color: ${blueColor}; text-decoration: underline;'>citlalli.tdr@gmail.com</a><br/>`)
            .typeString(`&nbsp;&nbsp;&nbsp;&nbsp;linkedin: <a href='https://linkedin.com/in/citlalli-trejo-del-rio' target='_blank' rel='noopener noreferrer' style='color: ${blueColor}; text-decoration: underline;'>linkedin.com/in/citlalli-trejo-del-rio</a><br/>`)
            .typeString(`&nbsp;&nbsp;&nbsp;&nbsp;github: <a href='https://github.com/citlol' target='_blank' rel='noopener noreferrer' style='color: ${blueColor}; text-decoration: underline;'>github.com/citlol</a><br/><br/>`)
            .typeString(`<br/><br/>&nbsp;&nbsp;&nbsp;&nbsp;user@portfolio:~$`)
            .start();
        }}
      />
    </div>
  );

  const ContactSection = () => (
    <section className={`py-20 transition-colors duration-200 ${
      isDarkMode ? 'bg-black' : 'bg-white'
    }`} aria-labelledby="contact-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="contact-heading" className={`text-3xl font-mono mb-12 tracking-wider text-center transition-colors duration-200 ${
          isDarkMode ? 'text-white' : 'text-black'
        }`}>contact.sh</h2>

        <div className={`border rounded-lg overflow-hidden transition-colors duration-200 ${
          isDarkMode 
            ? 'bg-gray-950 border-gray-800' 
            : 'bg-white border-gray-300'
        }`}>
          {/* Terminal header */}
          <div className={`px-4 py-3 border-b transition-colors duration-200 ${
            isDarkMode 
              ? 'bg-gray-900 border-gray-800' 
              : 'bg-gray-200 border-gray-300'
          }`}>
            <div className="flex items-center space-x-2">
              <div className="terminal-dots flex space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className={`font-mono text-sm transition-colors duration-200 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>terminal</div>
            </div>
          </div>

          {/* Terminal content */}
          <div className="p-8">
            <ContactTerminal />
          </div>
        </div>
      </div>
    </section>
  );

  // Render current section
  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <HeroSection />;
      case 'about':
        return <AboutSection />;
      case 'skills':
        return <SkillsSection />;
      case 'projects':
        return <ProjectsSection />;
      case 'contact':
        return <ContactSection />;
      default:
        return <HeroSection />;
    }
  };

  return (
    <div className={`min-h-screen font-mono transition-colors duration-200 ${
      isDarkMode ? 'bg-black text-white' : 'bg-white text-black'
    }`}>
      <Navigation />
      <main role="main">
        {renderSection()}
      </main>
      
      {/* Footer */}
      <footer className={`border-t py-8 transition-colors duration-200 ${
        isDarkMode 
          ? 'bg-gray-950 border-gray-800' 
          : 'bg-gray-200 border-gray-300'
      }`} role="contentinfo">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className={`font-mono text-sm transition-colors duration-200 ${
            isDarkMode ? 'text-gray-500' : 'text-gray-700'
          }`}>
            © 2025 citlalli trejo del rio •{' '}
            <a
              href="https://www.w3.org/WAI/"
              target="_blank"
              rel="noopener noreferrer"
              className={`underline transition-colors duration-200 ${
                isDarkMode 
                  ? 'hover:text-white' 
                  : 'hover:text-black'
              }`}
            >
              WAI principles
            </a>{' '}
            driven • <span className={`ml-2 ${
              isDarkMode ? 'text-gray-600' : 'text-gray-500'
            }`}>v1.0.0</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;