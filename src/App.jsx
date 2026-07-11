import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Loader from './components/Loader'
import MatrixBackground from './components/MatrixBackground'

function App() {
  const [loading, setLoading] = useState(true);
  const [isRaining, setIsRaining] = useState(true);

  if (loading) {
    return <Loader onFinish={() => setLoading(false)} />;
  }

  return (
    <>
      <MatrixBackground isRaining={isRaining} />
      
      <button 
        onClick={() => setIsRaining(!isRaining)}
        className="btn btn-primary"
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          zIndex: 1000,
          borderRadius: '50%',
          width: '56px',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
          boxShadow: '0 4px 15px rgba(102, 252, 241, 0.4)',
          border: 'none',
          cursor: 'pointer'
        }}
        aria-label={isRaining ? "Pause Rain" : "Play Rain"}
      >
        {isRaining ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
        )}
      </button>

      <div className="App animate-fade-up">
        <Navbar />
        <Hero />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </div>
    </>
  )
}

export default App
