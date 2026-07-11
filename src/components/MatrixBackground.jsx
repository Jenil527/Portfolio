import React, { useEffect, useRef } from 'react';

const MatrixBackground = ({ isRaining }) => {
  const canvasRef = useRef(null);
  const dropsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const fontSize = 16;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-='.split('');

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const newColumns = Math.floor(canvas.width / fontSize);
      if (newColumns > dropsRef.current.length) {
        for(let i = dropsRef.current.length; i < newColumns; i++) {
          dropsRef.current[i] = Math.random() * canvas.height / fontSize;
        }
      }
    };

    // Initial setup
    if (dropsRef.current.length === 0) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const columns = Math.floor(canvas.width / fontSize);
      for (let x = 0; x < columns; x++) {
        dropsRef.current[x] = Math.random() * canvas.height / fontSize;
      }
    }

    let interval;
    
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < dropsRef.current.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        
        if (Math.random() > 0.95) {
          ctx.fillStyle = '#ffffff'; // var(--accent-color)
        } else {
          ctx.fillStyle = '#888888'; // var(--accent-secondary)
        }
        
        ctx.fillText(text, i * fontSize, dropsRef.current[i] * fontSize);

        if (dropsRef.current[i] * fontSize > canvas.height && Math.random() > 0.975) {
          dropsRef.current[i] = 0;
        }

        dropsRef.current[i]++;
      }
    };

    if (isRaining) {
      interval = setInterval(draw, 33); // ~30fps
    }

    window.addEventListener('resize', handleResize);

    return () => {
      if (interval) clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [isRaining]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: 'block',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        opacity: 0.5 // Adjust opacity to not overpower the content
      }}
    />
  );
};

export default MatrixBackground;
