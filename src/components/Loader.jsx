import React from 'react';
import './Loader.css';
import loadingVideo from '../assets/Video Project.mp4';

function Loader({ onFinish }) {
  return (
    <div className="loader-container">
      <video 
        className="loader-video" 
        src={loadingVideo} 
        autoPlay 
        muted 
        playsInline 
        onEnded={onFinish}
      />
    </div>
  );
}

export default Loader;
