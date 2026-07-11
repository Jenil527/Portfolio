import React from 'react';
import './Hero.css';

import InteractiveAvatar from './InteractiveAvatar';

function Hero() {
  return (
    <section className="hero" id="about">
      <div className="container hero-content">
        <div className="hero-text animate-fade-up">
          <p className="greeting">Hi, my name is</p>
          <h1 className="name">Jenil Patel.</h1>
          <h2 className="role">I'm currently pursuing my Bachelor of Science in Computer Science at the University of Regina.</h2>
          <p className="bio">
            I am a motivated and adaptable Computer Science student with strong analytical, communication, and teamwork skills. Proven ability to quickly learn new technologies and contribute to team success. Eager to develop professionally and committed to continuous learning and improvement. Collaborative team player with strong commitment to agile methodologies and process optimization and increasing team productivity.
          </p>
          <div className="hero-cta">
            <a href="#projects" className="btn btn-primary">View My Work</a>
            <a href="/resume.pdf" download="Jenil_Patel_Resume.pdf" className="btn btn-outline">Download Resume</a>
            <a href="#contact" className="btn btn-outline">Get In Touch</a>
          </div>
        </div>
        <div className="hero-image glass animate-fade-up" style={{ animationDelay: '0.2s', padding: '1rem' }}>
           <InteractiveAvatar />
        </div>
      </div>
    </section>
  );
}

export default Hero;
