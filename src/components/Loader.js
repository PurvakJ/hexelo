// components/Loader.js
import React, { useEffect, useState } from 'react';
import './Loader.css';

function Loader({ onLoadingComplete }) {
  const [animationState, setAnimationState] = useState('initial');
  const [showText, setShowText] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(-1);

  useEffect(() => {
    // Start logo animation - pulsing and rotating
    setAnimationState('pulsing-rotating');

    // After 2 seconds, start the transition
    const pulseTimer = setTimeout(() => {
      setAnimationState('centering');
    }, 2000);

    // Show letters one by one
    const showLetters = () => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < 6) {
          setCurrentLetterIndex(index);
          index++;
        } else {
          clearInterval(interval);
          setShowText(true);
        }
      }, 150); // Show a new letter every 150ms

      return () => clearInterval(interval);
    };

    // Start showing letters after 2.2 seconds
    const lettersTimer = setTimeout(showLetters, 2200);

    // After 3.5 seconds, show the tagline
    const taglineTimer = setTimeout(() => {
      setShowTagline(true);
    }, 3500);

    // After 4.5 seconds, complete loading
    const completeTimer = setTimeout(() => {
      setAnimationState('complete');
      if (onLoadingComplete) {
        setTimeout(onLoadingComplete, 500); // Wait for exit animation
      }
    }, 4500);

    return () => {
      clearTimeout(pulseTimer);
      clearTimeout(lettersTimer);
      clearTimeout(taglineTimer);
      clearTimeout(completeTimer);
    };
  }, [onLoadingComplete]);

  // Array of letters for the word HEXELO
  const letters = ['H', 'E', 'X', 'E', 'L', 'O'];

  return (
    <div className={`loader-container ${animationState === 'complete' ? 'fade-out' : ''}`}>
      {/* Background decoration */}
      <div className="loader-background">
        <span>HARDWARE</span>
        <span>HARDWARE</span>
        <span>HARDWARE</span>
      </div>
      
      {/* Floating hardware icons */}
      <div className="hardware-icon">🔩</div>
      <div className="hardware-icon">🔧</div>
      <div className="hardware-icon">⚙️</div>
      <div className="hardware-icon">🔨</div>
      <div className="hardware-icon">🔒</div>
      <div className="hardware-icon">🚪</div>

      <div className="loader-content">
        {/* Logo with enhanced animations */}
        <div className={`logo-wrapper ${animationState}`}>
          <img 
            src="https://i.postimg.cc/Njyq9QbM/Whats-App-Image-2026-03-19-at-12-33-09-removebg-preview.png" 
            alt="Hexelo Logo" 
            className="loader-logo"
          />
          <div className="logo-ring"></div>
          <div className="logo-ring-outer"></div>
        </div>
        
        {/* Text container with sequential letter reveal */}
        <div className={`text-container ${showText ? 'visible' : ''}`}>
          {letters.map((letter, index) => (
            <span 
              key={index} 
              className={`letter ${currentLetterIndex >= index ? 'revealed' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Tagline with slide-up animation */}
        <div className={`tagline-container ${showTagline ? 'visible' : ''}`}>
          <span className="tagline">Premium Hardware Solutions</span>
        </div>

        {/* Loading bar with enhanced animation */}
        <div className={`loading-bar-container ${showTagline ? 'visible' : ''}`}>
          <div className="loading-bar">
            <div className="loading-bar-progress"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loader;