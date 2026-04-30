import React from 'react';

/**
 * Animated Terminal Gear Icon Component
 * Animations (spinning gear, blinking cursor) are triggered 
 * when the user hovers over the SVG.
 */
const SkillsIcon = ({ className = '', width = "1.2rem", height = "1.2rem", ...props }) => {
  return (
    <svg 
      className={`animated-terminal-icon ${className}`} 
      viewBox="0 0 100 100" 
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      {...props}
    >
      {/* Embedded CSS keeps the React component fully self-contained. 
        It handles the static states and the hover animations.
      */}
      <style>
        {`
          .animated-terminal-icon {
            color: currentColor; /* Inherits color from parent text/container */
            transition: transform 0.2s ease;
          }
          
          /* Initial static state for the gear */
          .gear-group {
            transform: translate(66px, 34px);
          }

          /* Trigger animations ONLY when hovering the SVG */
          .animated-terminal-icon:hover .gear-group {
            animation: spin-gear 2s linear infinite;
          }

          .animated-terminal-icon:hover .blinking-cursor {
            animation: blink-cursor 1.2s ease-in-out infinite;
          }

          @keyframes spin-gear {
            0% {
              transform: translate(66px, 34px) rotate(0deg);
            }
            100% {
              transform: translate(66px, 34px) rotate(360deg);
            }
          }

          @keyframes blink-cursor {
            0%, 100% {
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
          }
        `}
      </style>

      {/* Terminal Prompt Arrow '>' */}
      <path 
        d="M 22 42 L 38 58 L 22 74" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="8" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      
      {/* Terminal Prompt Underscore '_' */}
      <line 
        className="blinking-cursor" 
        x1="44" y1="74" x2="68" y2="74" 
        stroke="currentColor" 
        strokeWidth="8" 
        strokeLinecap="round" 
      />
      
      {/* Gear Group Container */}
      <g className="gear-group">
          
          {/* Solid Gear Body (Thick Outline creates the inner hole) */}
          <circle cx="0" cy="0" r="11" fill="none" stroke="currentColor" strokeWidth="7" />
              
          {/* 8 Gear Teeth */}
          <g stroke="currentColor" strokeWidth="6" strokeLinecap="round">
              {/* Horizontal & Vertical Teeth */}
              <line x1="0" y1="-14" x2="0" y2="-20" />
              <line x1="0" y1="14" x2="0" y2="20" />
              <line x1="-14" y1="0" x2="-20" y2="0" />
              <line x1="14" y1="0" x2="20" y2="0" />
              
              {/* Diagonal Teeth (Rotated 45 degrees) */}
              <g transform="rotate(45)">
                  <line x1="0" y1="-14" x2="0" y2="-20" />
                  <line x1="0" y1="14" x2="0" y2="20" />
                  <line x1="-14" y1="0" x2="-20" y2="0" />
                  <line x1="14" y1="0" x2="20" y2="0" />
              </g>
          </g>

      </g>
      
    </svg>
  );
};

export default SkillsIcon;
