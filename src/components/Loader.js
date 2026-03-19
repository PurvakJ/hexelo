import React, { useEffect, useState } from 'react';
import './Loader.css';

function Loader({ onLoadingComplete }) {
  const [animationState, setAnimationState] = useState('initial');
  const [showText, setShowText] = useState(false);
  const [showTagline, setShowTagline] = useState(false);

  useEffect(() => {
    // Start circle animation
    setAnimationState('pulsing');

    // After 2 seconds, start the transition to center
    const pulseTimer = setTimeout(() => {
      setAnimationState('centering');
    }, 2000);

    // After 2.5 seconds, show the main text
    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 2500);

    // After 3.2 seconds, show the tagline
    const taglineTimer = setTimeout(() => {
      setShowTagline(true);
    }, 3200);

    // After 4 seconds, complete loading
    const completeTimer = setTimeout(() => {
      setAnimationState('complete');
      if (onLoadingComplete) {
        setTimeout(onLoadingComplete, 500); // Wait for exit animation
      }
    }, 4000);

    return () => {
      clearTimeout(pulseTimer);
      clearTimeout(textTimer);
      clearTimeout(taglineTimer);
      clearTimeout(completeTimer);
    };
  }, [onLoadingComplete]);

  return (
    <div className={`loader-container ${animationState === 'complete' ? 'fade-out' : ''}`}>
      <div className="loader-content">
        <div className={`logo-wrapper ${animationState}`}>
          <img 
            src="https://i.postimg.cc/Njyq9QbM/Whats-App-Image-2026-03-19-at-12-33-09-removebg-preview.png" 
            alt="Hexelo Logo" 
            className="loader-logo"
          />
        </div>
        
        <div className={`text-container ${showText ? 'visible' : ''}`}>
          <span className="letter">H</span>
          <span className="letter">E</span>
          <span className="letter">X</span>
          <span className="letter">E</span>
          <span className="letter">L</span>
          <span className="letter">O</span>
        </div>

        <div className={`tagline-container ${showTagline ? 'visible' : ''}`}>
          <span className="tagline">Premium Hardware Solutions</span>
        </div>
      </div>
    </div>
  );
}

export default Loader;