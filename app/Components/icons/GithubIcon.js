import React from 'react';

const GithubIcon = ({ className, size, style, isHovered, ...props }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 16 16" 
      width={size || "1em"} 
      height={size || "1em"} 
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}
      {...props}
    >
      <defs>
        <style>
          {`
            @keyframes wave-animation {
              0%, 100% { transform: rotate(0deg); }
              20% { transform: rotate(-35deg); }
              40% { transform: rotate(15deg); }
              60% { transform: rotate(-25deg); }
              80% { transform: rotate(10deg); }
            }
            
            .cat-arm {
              transform-origin: 6.05px 12.6px;
            }
            
            svg:hover .cat-arm,
            .github-icon-animate .cat-arm {
              animation: wave-animation 0.8s ease-in-out;
            }
          `}
        </style>
        
        <clipPath id="circleClip">
          <circle cx="8" cy="8" r="8" />
        </clipPath>
      </defs>

      <g className={isHovered ? 'github-icon-animate' : ''}>
        <circle cx="8" cy="8" r="8" fill="#ffffff" />
        
        <path 
          fill="#171515" 
          fillRule="evenodd" 
          d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" 
        />
        
        <polygon 
          points="0,10.5 3.0,10.5 6.05,12.6 6.01,13.72 5.0,15 0,15" 
          fill="#171515" 
          clipPath="url(#circleClip)" 
        />

        <path 
          className="cat-arm" 
          fill="#ffffff" 
          stroke="#ffffff" 
          strokeWidth="0.05" 
          d="M 6.01 13.72 c -2.01 .37 -2.53 -.49 -2.69 -.94 c -.09 -.23 -.48 -.94 -.82 -1.13 c -.28 -.15 -.68 -.52 -.01 -.53 c .63 -.01 1.08 .58 1.23 .82 c .72 1.21 1.87 .87 2.33 .66 L 9.0 12.0 L 9.0 14.5 Z" 
        />
      </g>
    </svg>
  );
};

export default GithubIcon;
