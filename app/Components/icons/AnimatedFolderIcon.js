import React from 'react';

export const AnimatedFolderIcon = ({ 
  isOpen, 
  size = "1.2rem", 
  color = "currentColor", 
  style = {},
  ...props 
}) => {
  const absoluteFillStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  };

  const transitionStyle = {
    transition: 'all 500ms ease-out'
  };

  return (
    <div 
      style={{ 
        position: 'relative',
        perspective: '600px', 
        display: 'inline-block',
        width: size,
        height: size,
        ...style 
      }} 
      {...props}
    >
      {/* 1. Back folder tab and body (Static base) */}
      <svg 
        style={absoluteFillStyle} 
        viewBox="0 0 24 24" 
        fill={color}
      >
        <path d="M2 6C2 4.89543 2.89543 4 4 4H9.17157C9.70198 4 10.2107 4.21071 10.5858 4.58579L12.4142 6.41421C12.7893 6.78929 13.298 7 13.8284 7H20C21.1046 7 22 7.89543 22 9V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6Z" />
      </svg>
      
      {/* 2. Paper inside (Animates up when open) */}
      <svg 
        style={{ 
          ...absoluteFillStyle,
          ...transitionStyle,
          pointerEvents: 'none',
          transform: isOpen ? 'translateY(-2px) scale(0.92)' : 'translateY(2px) scale(0.85)', 
          opacity: isOpen ? 1 : 0,
          zIndex: 10
        }}
        viewBox="0 0 24 24"
      >
        <rect x="4" y="6" width="16" height="13" rx="0.5" fill="#ffffff" stroke="#000000" strokeWidth="0.5" />
        <path d="M7 9h10M7 12h10M7 15h6" stroke="#000000" strokeWidth="1" strokeLinecap="round" />
      </svg>

      {/* 3. Front flap (Rotates forward using 3D transform) */}
      <svg 
        style={{ 
          ...absoluteFillStyle,
          ...transitionStyle,
          transformOrigin: '50% 83.33%',
          transform: isOpen ? 'rotateX(45deg) translateY(1px)' : 'rotateX(0deg) translateY(0px)',
          filter: isOpen ? 'drop-shadow(0px -2px 4px rgba(0,0,0,0.2))' : 'none',
          zIndex: 20
        }}
        viewBox="0 0 24 24" 
        fill={color}
      >
        <path 
          d="M2 10.5C2 9.67157 2.67157 9 3.5 9H20.5C21.3284 9 22 9.67157 22 10.5V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V10.5Z" 
          stroke="#ffffff"
          strokeWidth={isOpen ? "0.5" : "0"} 
        />
      </svg>
    </div>
  );
};
