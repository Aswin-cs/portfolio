import React, { useState, useEffect } from 'react';
import AswinLogicLogo from '../AswinLogicLogo/AswinLogicLogo';
import './Loader.css';

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let currentProgress = 0;
    let isWindowLoaded = false;

    const handleLoad = () => {
      isWindowLoaded = true;
    };

    if (document.readyState === 'complete') {
      isWindowLoaded = true;
    } else {
      window.addEventListener('load', handleLoad);
    }

    let timer1 = null;
    let timer2 = null;

    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 12) + 5;

      // If document loading isn't finished yet, cap at 85% until load event fires
      if (!isWindowLoaded && currentProgress > 85) {
        currentProgress = 85;
      }

      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setProgress(100);

        // Allow a slight pause at 100% for smooth visual response
        timer1 = setTimeout(() => {
          setIsFading(true);
          timer2 = setTimeout(() => {
            setIsDone(true);
            if (onComplete) onComplete();
          }, 600);
        }, 300);
      } else {
        setProgress(currentProgress);
      }
    }, 80);

    return () => {
      clearInterval(interval);
      if (timer1) clearTimeout(timer1);
      if (timer2) clearTimeout(timer2);
      window.removeEventListener('load', handleLoad);
    };
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div className={`loader-screen ${isFading ? 'fade-out' : ''}`}>
      <div className="loader-logo-wrapper">
        <AswinLogicLogo color="#ffffff" />
      </div>
      <div className="loader-content">
        <span className="loader-status">
          {progress < 40
            ? 'INITIALIZING PORTFOLIO...'
            : progress < 85
            ? 'LOADING COMPONENTS & ASSETS...'
            : 'SYSTEM READY'}
        </span>
        <div className="loader-bar-bg">
          <div
            className="loader-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="loader-percentage">{progress}%</span>
      </div>
    </div>
  );
};

export default Loader;
