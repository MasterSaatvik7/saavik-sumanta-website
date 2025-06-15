import React, { useState, useRef, useEffect } from 'react';

// 3D Sphere Component
const Sphere3D = ({ isActive }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const rotationRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = 200;
      canvas.height = 200;
    };
    
    resizeCanvas();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 60;
      
      // Draw sphere wireframe
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 1;
      
      // Vertical circles
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, Math.sin(angle) * radius, radius, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      
      // Horizontal circles
      for (let i = 0; i < 5; i++) {
        const y = centerY + (i - 2) * 25;
        const r = Math.sqrt(Math.max(0, radius * radius - Math.pow(y - centerY, 2)));
        if (r > 0) {
          ctx.beginPath();
          ctx.arc(centerX, y, r, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
      
      // Add some orbital rings
      ctx.strokeStyle = '#666';
      ctx.lineWidth = 2;
      
      // Ring 1
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, radius + 15, 8, rotationRef.current.x, 0, Math.PI * 2);
      ctx.stroke();
      
      // Ring 2
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, 8, radius + 15, rotationRef.current.y, 0, Math.PI * 2);
      ctx.stroke();
      
      rotationRef.current.x += 0.02;
      rotationRef.current.y += 0.015;
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive]);

  if (!isActive) {
    return (
      <div className="sphere-static">
        <svg width="160" height="160" viewBox="0 0 160 160">
          <circle cx="80" cy="80" r="60" fill="none" stroke="#333" strokeWidth="2"/>
          <ellipse cx="80" cy="80" rx="60" ry="20" fill="none" stroke="#333"/>
          <ellipse cx="80" cy="80" rx="20" ry="60" fill="none" stroke="#333"/>
          <ellipse cx="80" cy="80" rx="75" ry="8" fill="none" stroke="#666" strokeWidth="2"/>
          <ellipse cx="80" cy="80" rx="8" ry="75" fill="none" stroke="#666" strokeWidth="2"/>
        </svg>
      </div>
    );
  }

  return <canvas ref={canvasRef} className="sphere-canvas" />;
};

export default function Portfolio() {
  const [is3DMode, setIs3DMode] = useState(false);
  const [currentSection, setCurrentSection] = useState('about');

  const toggleMode = () => {
    setIs3DMode(!is3DMode);
  };

  const scrollToSection = (sectionId) => {
    setCurrentSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh',
      color: '#333'
    }}>
      {/* Header Section */}
      <header style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: '#fafafa',
        borderBottom: '1px solid #e0e0e0'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '60px',
          marginBottom: '40px'
        }}>
          <Sphere3D isActive={is3DMode} />
          
          <div>
            <h1 style={{
              fontSize: '4rem',
              fontWeight: '300',
              margin: 0,
              letterSpacing: '-2px'
            }}>
              Saatvik Sumanta
            </h1>
            <p style={{
              fontSize: '1.5rem',
              color: '#666',
              margin: '10px 0 0 0',
              fontWeight: '400'
            }}>
              AI, Robotics, Quantum Enthusiast
            </p>
          </div>
        </div>

        <button
          onClick={() => scrollToSection('about')}
          style={{
            padding: '15px 30px',
            border: '2px solid #333',
            backgroundColor: 'transparent',
            fontSize: '1rem',
            cursor: 'pointer',
            borderRadius: '4px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#333';
            e.target.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#333';
          }}
        >
          Enter the Lab
        </button>

        {/* 3D Mode Toggle */}
        <button
          onClick={toggleMode}
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '40px',
            padding: '12px 24px',
            border: '1px solid #ccc',
            backgroundColor: is3DMode ? '#333' : 'white',
            color: is3DMode ? 'white' : '#333',
            borderRadius: '25px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            transition: 'all 0.3s ease'
          }}
        >
          3D Mode
        </button>
      </header>

      {/* About Section */}
      <section id="about" style={{
        padding: '100px 40px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '3rem',
          fontWeight: '300',
          marginBottom: '60px',
          letterSpacing: '-1px'
        }}>
          About
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gap: '60px',
          alignItems: 'start'
        }}>
          {/* Timeline */}
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute',
              left: '15px',
              top: '0',
              bottom: '0',
              width: '2px',
              backgroundColor: '#ddd'
            }} />
            
            <div style={{ position: 'relative', marginBottom: '40px' }}>
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: 'white',
                border: '3px solid #333',
                marginBottom: '15px'
              }} />
              <div style={{
                marginLeft: '50px',
                marginTop: '-45px'
              }}>
                <div style={{
                  height: '4px',
                  backgroundColor: '#ddd',
                  marginBottom: '8px',
                  width: '200px'
                }} />
                <div style={{
                  height: '4px',
                  backgroundColor: '#ddd',
                  width: '150px'
                }} />
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: 'white',
                border: '3px solid #ccc',
                marginBottom: '15px'
              }} />
              <div style={{
                marginLeft: '50px',
                marginTop: '-45px'
              }}>
                <div style={{
                  height: '4px',
                  backgroundColor: '#ddd',
                  marginBottom: '8px',
                  width: '180px'
                }} />
                <div style={{
                  height: '4px',
                  backgroundColor: '#ddd',
                  width: '160px'
                }} />
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <div style={{
              height: '4px',
              backgroundColor: '#ddd',
              marginBottom: '12px',
              width: '100%'
            }} />
            <div style={{
              height: '4px',
              backgroundColor: '#ddd',
              marginBottom: '12px',
              width: '90%'
            }} />
            <div style={{
              height: '4px',
              backgroundColor: '#ddd',
              marginBottom: '30px',
              width: '60%'
            }} />

            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: '#555',
              marginBottom: '30px'
            }}>
              Enthusiastic and creative engineering undergraduate student with a natural curiosity for building 
              intuitive and scalable systems that solve real world problems. Known for being a collaborative 
              team player who thrives in dynamic environments, delivering robust solutions with precision and 
              innovation.
            </p>

            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: '#555'
            }}>
              Currently working as a Quantum ML Developer Intern at KwantumG Research Labs, where I develop 
              quantum computing algorithms and conduct research on Quantum Machine Learning applications.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" style={{
        padding: '100px 40px',
        backgroundColor: '#fafafa',
        borderTop: '1px solid #e0e0e0'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '3rem',
            fontWeight: '300',
            marginBottom: '60px',
            letterSpacing: '-1px'
          }}>
            Projects
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '40px'
          }}>
            {/* Project Cards */}
            {[1, 2, 3].map((i) => (
              <div key={i} style={{
                backgroundColor: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '40px 30px',
                minHeight: '200px',
                position: 'relative',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                {i === 2 && (
                  <svg style={{
                    position: 'absolute',
                    top: '30px',
                    right: '30px',
                    width: '60px',
                    height: '40px'
                  }} viewBox="0 0 60 40">
                    <path d="M0 20 L60 0 L60 40 Z" fill="none" stroke="#ddd" strokeWidth="2"/>
                  </svg>
                )}
                {i === 3 && (
                  <svg style={{
                    position: 'absolute',
                    top: '30px',
                    right: '30px',
                    width: '60px',
                    height: '40px'
                  }} viewBox="0 0 60 40">
                    <path d="M0 0 L60 20 L0 40 Z" fill="none" stroke="#ddd" strokeWidth="2"/>
                  </svg>
                )}
                <div style={{
                  height: '4px',
                  backgroundColor: '#ddd',
                  marginBottom: '12px',
                  width: '70%'
                }} />
                <div style={{
                  height: '4px',
                  backgroundColor: '#ddd',
                  marginBottom: '12px',
                  width: '50%'
                }} />
                <div style={{
                  height: '4px',
                  backgroundColor: '#ddd',
                  width: '60%'
                }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Lab Section */}
      <section id="learning-lab" style={{
        padding: '100px 40px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '3rem',
          fontWeight: '300',
          marginBottom: '60px',
          letterSpacing: '-1px'
        }}>
          Learning Lab
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '40px',
          alignItems: 'start'
        }}>
          {/* Lab Content */}
          <div>
            <div style={{
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              padding: '40px',
              backgroundColor: 'white',
              marginBottom: '30px'
            }}>
              <div style={{
                height: '4px',
                backgroundColor: '#ddd',
                marginBottom: '12px',
                width: '80%'
              }} />
              <div style={{
                height: '4px',
                backgroundColor: '#ddd',
                width: '60%'
              }} />
            </div>

            <div style={{
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              padding: '40px',
              backgroundColor: 'white'
            }}>
              <div style={{
                height: '4px',
                backgroundColor: '#ddd',
                marginBottom: '12px',
                width: '70%'
              }} />
              <div style={{
                height: '4px',
                backgroundColor: '#ddd',
                width: '50%'
              }} />
            </div>
          </div>

          {/* Side Panel */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '30px',
            alignItems: 'center'
          }}>
            {/* Circles */}
            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
              {[1, 2, 3].map((i) => (
                <div key={i} style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  border: '2px solid #ddd',
                  backgroundColor: 'white'
                }} />
              ))}
            </div>

            <button
              onClick={() => scrollToSection('contact')}
              style={{
                padding: '15px 30px',
                border: '2px solid #333',
                backgroundColor: 'transparent',
                fontSize: '1rem',
                cursor: 'pointer',
                borderRadius: '4px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#333';
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#333';
              }}
            >
              Contact
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{
        padding: '100px 40px',
        backgroundColor: '#333',
        color: 'white',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '3rem',
            fontWeight: '300',
            marginBottom: '60px',
            letterSpacing: '-1px'
          }}>
            Contact
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '60px'
          }}>
            <div>
              <p style={{
                fontSize: '1.2rem',
                lineHeight: '1.8',
                marginBottom: '30px',
                color: '#ccc'
              }}>
                Let's collaborate on quantum computing, AI, or robotics projects.
              </p>
              
              <div style={{ marginBottom: '20px' }}>
                <strong>Email:</strong> saatvik.sumanta02@gmail.com
              </div>
              <div style={{ marginBottom: '20px' }}>
                <strong>Phone:</strong> +91-8373917074
              </div>
              <div style={{ marginBottom: '20px' }}>
                <strong>Location:</strong> Chennai, Tamil Nadu
              </div>
              <div>
                <a 
                  href="https://www.linkedin.com/in/saatvik-sumanta" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    color: '#78cce2',
                    textDecoration: 'none',
                    fontSize: '1.1rem'
                  }}
                >
                  LinkedIn Profile →
                </a>
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Sphere3D isActive={true} />
            </div>
          </div>
        </div>

        {/* 3D Mode Toggle in Contact */}
        <button
          onClick={toggleMode}
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '40px',
            padding: '12px 24px',
            border: '1px solid #666',
            backgroundColor: is3DMode ? 'white' : 'transparent',
            color: is3DMode ? '#333' : 'white',
            borderRadius: '25px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            transition: 'all 0.3s ease'
          }}
        >
          3D Mode
        </button>
      </section>
    </div>
  );
}