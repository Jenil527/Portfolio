import React, { useEffect, useRef, useState } from 'react';
import './InteractiveAvatar.css';

function InteractiveAvatar() {
  const [tracking, setTracking] = useState({ rotX: 0, rotY: 0, transX: 0, transY: 0 });
  const [isWaving, setIsWaving] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const containerRef = useRef(null);

  // Waving logic
  useEffect(() => {
    const waveInterval = setInterval(() => {
      setIsWaving(true);
      setTimeout(() => setIsWaving(false), 1500);
    }, 4000);
    return () => clearInterval(waveInterval);
  }, []);

  // Blinking logic (random intervals)
  useEffect(() => {
    const blink = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
      const nextBlink = Math.random() * 4000 + 2000; // 2-6 seconds
      setTimeout(blink, nextBlink);
    };
    const initialTimeout = setTimeout(blink, 2000);
    return () => clearTimeout(initialTimeout);
  }, []);

  // Mouse tracking logic
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      
      const maxRotation = 5; // Reduced max degrees for subtle 3D rotation
      // Restrict delta values so it doesn't spin wildly if mouse leaves container
      const safeDeltaX = Math.max(-rect.width, Math.min(rect.width, deltaX));
      const safeDeltaY = Math.max(-rect.height, Math.min(rect.height, deltaY));
      
      const rotY = (safeDeltaX / (rect.width / 2)) * maxRotation;
      const rotX = -(safeDeltaY / (rect.height / 2)) * maxRotation;
      
      const angle = Math.atan2(deltaY, deltaX);
      const distance = Math.min(8, Math.hypot(deltaX, deltaY) / 25);
      
      setTracking({
        rotX,
        rotY,
        transX: Math.cos(angle) * distance,
        transY: Math.sin(angle) * distance
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="avatar-container" ref={containerRef}>
      <svg viewBox="0 0 200 200" className="cartoon-avatar" style={{ overflow: 'visible' }}>
        <defs>
          <radialGradient id="faceGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#c68b59" />
            <stop offset="60%" stopColor="#8d5524" />
            <stop offset="100%" stopColor="#5c3a1c" />
          </radialGradient>
          <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8d5524" />
            <stop offset="100%" stopColor="#5c3a1c" />
          </linearGradient>
          <linearGradient id="suitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="tieGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#991b1b" />
          </linearGradient>
          <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
        </defs>

        {/* Background Aura */}
        <circle cx="100" cy="100" r="95" fill="var(--accent-color)" opacity="0.1" style={{ filter: 'blur(10px)' }} />

        {/* Dynamic UI Background Ring */}
        <g className="ui-ring-bg">
          <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="1" strokeDasharray="5 5" />
          <circle cx="100" cy="100" r="85" fill="none" stroke="rgba(56, 189, 248, 0.5)" strokeWidth="2" strokeDasharray="40 10 10 10" />
          <circle cx="100" cy="100" r="75" fill="none" stroke="rgba(56, 189, 248, 0.1)" strokeWidth="4" />
          {/* Tech Nodes */}
          <circle cx="10" cy="100" r="3" fill="#38bdf8" />
          <circle cx="190" cy="100" r="3" fill="#38bdf8" />
          <circle cx="100" cy="15" r="3" fill="#38bdf8" />
        </g>

        {/* BREATHING TORSO */}
        <g className="breathing-torso" style={{ filter: 'drop-shadow(0px -5px 10px rgba(0,0,0,0.5))' }}>
          {/* Suit Shoulders */}
          <path d="M 40 160 C 20 180, 20 200, 20 200 L 180 200 C 180 200, 180 180, 160 160 C 130 140, 70 140, 40 160 Z" fill="#0f172a" />

          {/* Neck Base */}
          <rect x="85" y="125" width="30" height="25" fill="url(#skinGrad)" />

          {/* White Dress Shirt */}
          <path d="M 70 140 L 100 180 L 130 140 Z" fill="#f8f9fa" />

          {/* Tie Sway Group */}
          <g className="tie-sway">
            <path d="M 96 148 L 104 148 L 102 185 L 100 190 L 98 185 Z" fill="url(#tieGrad)" style={{ filter: 'drop-shadow(0px 3px 3px rgba(0,0,0,0.4))' }} />
            <polygon points="95,140 105,140 103,150 97,150" fill="#991b1b" />
          </g>

          {/* Sharp Suit Jacket Fronts */}
          <path d="M 45 160 L 75 140 L 100 190 L 100 200 L 20 200 Z" fill="url(#suitGrad)" style={{ filter: 'drop-shadow(3px 0px 5px rgba(0,0,0,0.5))' }} />
          <path d="M 155 160 L 125 140 L 100 190 L 100 200 L 180 200 Z" fill="url(#suitGrad)" style={{ filter: 'drop-shadow(-3px 0px 5px rgba(0,0,0,0.5))' }} />

          {/* Suit Collars */}
          <path d="M 60 140 L 75 140 L 85 160 L 75 165 Z" fill="#0f172a" style={{ filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.4))' }} />
          <path d="M 140 140 L 125 140 L 115 160 L 125 165 Z" fill="#0f172a" style={{ filter: 'drop-shadow(-2px 2px 2px rgba(0,0,0,0.4))' }} />
        </g>

        {/* BREATHING HEAD */}
        <g className="breathing-head" style={{ filter: 'drop-shadow(0px 8px 10px rgba(0,0,0,0.5))' }}>
          {/* True 3D Rotational Parallax Group */}
          <g style={{ 
            transform: `perspective(600px) rotateX(${tracking.rotX}deg) rotateY(${tracking.rotY}deg) translate(${tracking.transX}px, ${tracking.transY}px)`, 
            transformOrigin: '100px 100px',
            transition: 'transform 0.1s ease-out' 
          }}>
            
            {/* Ears */}
            <path d="M 55 90 C 40 85, 45 110, 55 105 Z" fill="url(#skinGrad)" />
            <path d="M 145 90 C 160 85, 155 110, 145 105 Z" fill="url(#skinGrad)" />

            {/* \_/ Shaped Jawline (Strong, Tapered, slightly longer) */}
            <path d="M 50 60 L 50 100 Q 55 125, 75 145 L 125 145 Q 145 125, 150 100 L 150 60 C 150 20, 50 20, 50 60 Z" fill="url(#faceGrad)" />

            {/* Neat Properly Set Combed Hair with Partition */}
            
            {/* Left Hair Block (Small Side) */}
            <path d="M 48 70 C 48 30, 58 22, 66 22 L 64 55 Q 54 65, 48 70 Z" fill="url(#hairGrad)" style={{ filter: 'drop-shadow(-2px 3px 2px rgba(0,0,0,0.3))' }} />
            
            {/* Right Hair Block (Comb-over) */}
            <path d="M 68 21 C 100 15, 152 15, 152 70 Q 110 45, 66 55 Z" fill="url(#hairGrad)" style={{ filter: 'drop-shadow(0px 3px 3px rgba(0,0,0,0.5))' }} />

            {/* Side-part swoops for a combed over look */}
            <path d="M 68 21 Q 100 18, 135 30 Q 148 40, 152 60 Q 110 40, 66 55 Z" fill="#1e293b" />
            <path d="M 70 26 Q 105 23, 130 35 Q 140 45, 145 60 Q 110 45, 69 50 Z" fill="#334155" opacity="0.6" />
            
            {/* Comb lines (texture) */}
            <path d="M 78 30 Q 100 25, 125 40" stroke="#0f172a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M 83 35 Q 105 30, 130 45" stroke="#0f172a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M 88 40 Q 110 35, 135 50" stroke="#0f172a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M 93 45 Q 115 40, 140 55" stroke="#0f172a" strokeWidth="1.5" fill="none" strokeLinecap="round" />

            {/* Sideburns */}
            <path d="M 48 70 L 48 95 Q 46 88 48 70 Z" fill="url(#hairGrad)" />
            <path d="M 152 70 L 152 95 Q 154 88 152 70 Z" fill="url(#hairGrad)" />

            {/* Eyebrows */}
            <path d="M 65 75 L 85 80" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
            <path d="M 135 75 L 115 80" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />

            {/* Eyes */}
            <g style={{ filter: 'drop-shadow(0px 2px 3px rgba(0,0,0,0.3))' }}>
              {isBlinking ? (
                // Closed Eyes
                <g>
                  <path d="M 65 95 Q 75 100 85 95" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" fill="none" />
                  <path d="M 115 95 Q 125 100 135 95" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" fill="none" />
                </g>
              ) : (
                // Open Eyes
                <g>
                  {/* Eye Whites */}
                  <path d="M 62 93 Q 75 75 88 93 Q 75 102 62 93 Z" fill="#ffffff" />
                  <path d="M 112 93 Q 125 75 138 93 Q 125 102 112 93 Z" fill="#ffffff" />
                  
                  {/* Brown Irises */}
                  <circle cx={75 + tracking.transX} cy={91 + tracking.transY} r="6" fill="#6b4423" />
                  <circle cx={125 + tracking.transX} cy={91 + tracking.transY} r="6" fill="#6b4423" />
                  
                  {/* Pupils */}
                  <circle cx={75 + tracking.transX} cy={91 + tracking.transY} r="3" fill="#0f172a" />
                  <circle cx={125 + tracking.transX} cy={91 + tracking.transY} r="3" fill="#0f172a" />
                  
                  {/* Glossy Highlights */}
                  <circle cx={73 + tracking.transX} cy={88 + tracking.transY} r="2.5" fill="#ffffff" />
                  <circle cx={123 + tracking.transX} cy={88 + tracking.transY} r="2.5" fill="#ffffff" />
                </g>
              )}
            </g>

            {/* Round "o-o" Sunglasses */}
            <g style={{ filter: 'drop-shadow(0px 5px 4px rgba(0,0,0,0.5))', transform: `translate(${tracking.transX * 0.8}px, ${tracking.transY * 0.8}px)` }}>
              {/* Frames */}
              <circle cx="75" cy="91" r="17" fill="#1a1a1a" />
              <circle cx="125" cy="91" r="17" fill="#1a1a1a" />
              {/* Lenses */}
              <circle cx="75" cy="91" r="13" fill="#050505" />
              <circle cx="125" cy="91" r="13" fill="#050505" />
              {/* Bridge */}
              <path d="M 92 91 L 108 91" stroke="#1a1a1a" strokeWidth="4" strokeLinecap="round" />
              {/* Arms */}
              <path d="M 58 91 L 44 85" stroke="#1a1a1a" strokeWidth="4" strokeLinecap="round" />
              <path d="M 142 91 L 156 85" stroke="#1a1a1a" strokeWidth="4" strokeLinecap="round" />
              {/* Glossy Reflections */}
              <path d="M 66 83 A 10 10 0 0 1 76 80" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.2" />
              <path d="M 116 83 A 10 10 0 0 1 126 80" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.2" />
            </g>

            {/* Anime Nose Shadow */}
            <path d="M 100 108 L 98 115 L 102 115 Z" fill="#b37c56" />

            {/* Well-Groomed Mustache */}
            <path d="M 82 122 Q 100 116 118 122 Q 115 126 100 124 Q 85 126 82 122 Z" fill="#1e293b" style={{ filter: 'drop-shadow(0px 2px 1px rgba(0,0,0,0.2))' }} />

            {/* Mouth */}
            {isWaving ? (
              // Big Smile
              <path d="M 90 125 Q 100 135 110 125" stroke="#3a1e05" strokeWidth="3" fill="none" strokeLinecap="round" />
            ) : (
              // Cool Smirk
              <path d="M 95 125 L 105 122" stroke="#3a1e05" strokeWidth="3" fill="none" strokeLinecap="round" />
            )}
          </g>
        </g>

        {/* Waving Hand */}
        <g className={`waving-hand ${isWaving ? 'visible' : 'hidden'}`}>
          <g className="hand-wrapper" style={{ filter: 'drop-shadow(-5px 10px 8px rgba(0,0,0,0.6))' }}>
            <rect x="-10" y="-15" width="20" height="25" rx="10" fill="url(#skinGrad)" />
            <rect x="-12" y="-25" width="6" height="15" rx="3" fill="url(#skinGrad)" />
            <rect x="-4" y="-30" width="6" height="20" rx="3" fill="url(#skinGrad)" />
            <rect x="4" y="-28" width="6" height="18" rx="3" fill="url(#skinGrad)" />
            <rect x="12" y="-20" width="6" height="12" rx="3" fill="url(#skinGrad)" />
            <rect x="-18" y="-10" width="10" height="6" rx="3" fill="url(#skinGrad)" transform="rotate(-30 -18 -10)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

export default InteractiveAvatar;

