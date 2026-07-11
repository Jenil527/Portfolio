import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar glass">
      <div className="container nav-content">
        <a href="#" className="logo">J<span>P</span></a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="/resume.pdf" download="Jenil_Patel_Resume.pdf" className="btn btn-outline btn-sm">Resume</a></li>
          <li><a href="#contact" className="btn btn-primary btn-sm">Contact Me</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
