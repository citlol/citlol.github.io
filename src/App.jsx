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


  // Terminal Window component
  const TerminalWindow = ({ children, title = "terminal" }) => (
    <div className="terminal-window w-full max-w-5xl mx-auto border rounded-lg overflow-hidden shadow-2xl bg-black border-gray-700">
      {/* Terminal header */}
      <div className="px-4 py-3 border-b bg-gray-900 border-gray-700">
        <div className="flex items-center space-x-3">
          {/* Window controls */}
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="font-mono text-sm text-gray-400">
            {title}
          </div>
        </div>
      </div>

      {/* Terminal content */}
      <div className="p-6 min-h-[500px]">
        {children}
      </div>
    </div>
  );

  // Navigation helper component for all sections
  const NavigationHelper = () => (
    <div className="mt-8 pt-4 border-t border-gray-600 space-y-2">
      <div className="text-xs text-gray-500">
        Navigation: 
        <button onClick={() => handleNavClick('home')} className="ml-2 text-blue-400 hover:text-blue-300">cd ~</button>
        <button onClick={() => handleNavClick('about')} className="ml-2 text-blue-400 hover:text-blue-300">about</button>
        <button onClick={() => handleNavClick('skills')} className="ml-2 text-blue-400 hover:text-blue-300">skills</button>
        <button onClick={() => handleNavClick('projects')} className="ml-2 text-blue-400 hover:text-blue-300">projects</button>
        <button onClick={() => handleNavClick('contact')} className="ml-2 text-blue-400 hover:text-blue-300">contact</button>
        <button onClick={toggleTheme} className="ml-4 text-yellow-400 hover:text-yellow-300">theme</button>
      </div>
      <div className="text-gray-500">
        user@portfolio:~/{activeSection === 'home' ? '' : activeSection}$ <span className="terminal-cursor">█</span>
      </div>
    </div>
  );

  // Home/Welcome section for terminal
  const WelcomeSection = () => (
    <div className="font-mono text-sm space-y-4 text-gray-300">
      <div className="text-gray-500">
        user@portfolio:~$ ./citlalli.exe --version
      </div>
      
      <div className="space-y-2">
        <div className="text-2xl font-bold text-white">
          citlalli.exe v1.0.0
        </div>
        <div className="text-gray-400">
          Computer Science Student | Accessibility-First Developer
        </div>
      </div>

      <div className="my-6">
        <div className="text-gray-500">
          user@portfolio:~$ cat README.md
        </div>
        <div className="mt-2 pl-4 border-l-2 border-gray-500 space-y-2">
          <p>Building inclusive, accessible digital experiences</p>
          <p>Passionate about creating technology that works for everyone</p>
          <p>Currently seeking internship opportunities</p>
        </div>
      </div>

      <div className="space-y-1">
        <div className="text-gray-500">
          user@portfolio:~$ ls -la
        </div>
        <div className="pl-4 space-y-1">
          {[
            { name: 'about.md', desc: 'Personal information and background', cmd: 'cat about.md' },
            { name: 'skills.json', desc: 'Technical skills and expertise', cmd: 'cat skills.json' },
            { name: 'projects/', desc: 'Portfolio of completed work', cmd: 'ls projects/' },
            { name: 'contact.sh', desc: 'Get in touch with me', cmd: './contact.sh' }
          ].map((file, index) => (
            <div key={index} className="flex items-center space-x-4">
              <button 
                className="text-blue-400 hover:text-blue-300 cursor-pointer hover:underline transition-colors"
                onClick={() => handleNavClick(file.name.split('.')[0])}
                onKeyPress={(e) => handleKeyPress(e, file.name.split('.')[0])}
              >
                {file.name}
              </button>
              <span className="text-xs text-gray-500">
                {file.desc}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <div className="text-gray-500">
          user@portfolio:~$ help
        </div>
        <div className="pl-4 text-xs space-y-1 text-gray-400">
          <p>Available commands:</p>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <button onClick={() => handleNavClick('about')} className="text-left text-blue-400 hover:text-blue-300">cat about.md</button>
            <button onClick={() => handleNavClick('skills')} className="text-left text-blue-400 hover:text-blue-300">cat skills.json</button>
            <button onClick={() => handleNavClick('projects')} className="text-left text-blue-400 hover:text-blue-300">ls projects/</button>
            <button onClick={() => handleNavClick('contact')} className="text-left text-blue-400 hover:text-blue-300">./contact.sh</button>
            <button onClick={() => handleNavClick('home')} className="text-left text-blue-400 hover:text-blue-300">cd ~</button>
            <button onClick={toggleTheme} className="text-left text-yellow-400 hover:text-yellow-300">theme --toggle</button>
          </div>
        </div>
      </div>

      <NavigationHelper />
    </div>
  );

  // About Section for terminal
  const AboutSection = () => (
    <div className="font-mono text-sm space-y-4 text-gray-300">
      <div className="text-gray-500">
        user@portfolio:~/about$ cat about.md
      </div>
      
      <div className="space-y-6">
        <div>
          <div className="text-lg font-bold mb-2 text-white">
            # About Me
          </div>
          <div className="pl-4 border-l-2 border-blue-500 space-y-2">
            <p>Computer science student with a passion for creating meaningful digital experiences.</p>
            <p>My approach combines technical precision with thoughtful design, always keeping</p>
            <p>accessibility and user experience at the forefront.</p>
          </div>
        </div>

        <div>
          <div className="text-lg font-bold mb-2 text-white">
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
            <div className="text-base font-bold mb-2 text-white">
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
            <div className="text-base font-bold mb-2 text-white">
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

      <NavigationHelper />
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
      <div className="font-mono text-sm space-y-4 text-gray-300">
        <div className="text-gray-500">
          user@portfolio:~/skills$ cat skills.json
        </div>
        
        <div className="space-y-6">
          <div className="text-lg font-bold text-white">
            {`{`}
          </div>

          {skillCategories.map((category, index) => (
            <div key={index} className="pl-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-blue-400">"{category.title}":</span>
                <span className="text-gray-400">
                  // {category.title}{category.extension}
                </span>
              </div>
              
              <div className="pl-4">
                <div className="text-white">[</div>
                <div className="pl-4 space-y-1">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="flex items-center space-x-2">
                      <span className="text-green-400">"</span>
                      <span className="text-orange-400">{skill}</span>
                      <span className="text-green-400">"</span>
                      {skillIndex < category.skills.length - 1 && (
                        <span className="text-white">,</span>
                      )}
                    </div>
                  ))}
                </div>
                <div className="text-white">
                  ]{index < skillCategories.length - 1 ? ',' : ''}
                </div>
              </div>
            </div>
          ))}

          <div className="text-lg font-bold text-white">
            {`}`}
          </div>
        </div>

        <NavigationHelper />
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
      <div className="font-mono text-sm space-y-4 text-gray-300">
        <div className="text-gray-500">
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
                <span className="text-xs text-gray-500">
                  [{project.type}]
                </span>
              </div>
              
              <div className="pl-4 space-y-1">
                <div className="text-gray-400">
                  {project.desc}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">
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
          <div className="text-xs text-gray-500">
            Total: {projects.length} projects | Active: {projects.filter(p => p.status === 'active').length} | In Progress: {projects.filter(p => p.status === 'in_progress').length}
          </div>
        </div>
        
        <NavigationHelper />
      </div>
    );
  };

  // Contact Section for terminal
  const ContactSection = () => (
    <div className="font-mono text-sm space-y-4 text-gray-300">
      <div className="text-gray-500">
        user@portfolio:~/contact$ ./contact.sh
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="text-gray-400">
            Initializing contact protocols...
          </div>
          <div className="text-gray-400">
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
            <span className="text-gray-400">email:</span>
            <a 
              href="mailto:citlalli.tdr@gmail.com" 
              className="text-blue-400 hover:text-blue-300 underline"
            >
              citlalli.tdr@gmail.com
            </a>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">linkedin:</span>
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
            <span className="text-gray-400">github:</span>
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

      <NavigationHelper />
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
    <div className={`min-h-screen font-mono transition-colors duration-200 ${
      isDarkMode ? 'bg-black text-white' : 'bg-gray-900 text-white'
    }`}>
      {/* Pure black desktop with terminal in center */}
      <div className="min-h-screen flex items-center justify-center p-4">
        <TerminalWindow title={`citlalli@portfolio:~/${activeSection === 'home' ? '' : activeSection}`}>
          {renderSectionContent()}
        </TerminalWindow>
      </div>
    </div>
  );
}

export default App;