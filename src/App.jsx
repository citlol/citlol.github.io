import React, { useState } from 'react';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  const handleNavClick = (section) => {
    setActiveSection(section);
  };

  return (
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
        <div style={{ fontSize: '48px' }}>📁</div>
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
        <div style={{ fontSize: '48px' }}>📁</div>
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
        <div style={{ fontSize: '48px' }}>📁</div>
        <span>Folder</span>
      </div>

      {/* Terminal Window */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
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
    </div>
  );
}

export default App;