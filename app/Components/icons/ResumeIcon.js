import React from 'react';

const ResumeIcon = ({ isHovered, className, style }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="8"
      strokeLinecap="square"
      strokeLinejoin="miter"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}
    >
      <style>
        {`
        .animated-path {
          stroke-dasharray: 100;
          stroke-dashoffset: 0;
        }

        @keyframes drawReveal {
          0% {
            stroke-dashoffset: 100;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        .resume-icon-animate .path-outer {
          animation: drawReveal 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .resume-icon-animate .path-line-1 {
          animation: drawReveal 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.5s both;
        }

        .resume-icon-animate .path-line-2 {
          animation: drawReveal 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.7s both;
        }

        .resume-icon-animate .path-line-3 {
          animation: drawReveal 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.9s both;
        }
      `}
      </style>

      <g className={isHovered ? 'resume-icon-animate' : ''}>
        {/* Outer Document Shape & Top-Right Fold */}
        <path
          className="animated-path path-outer"
          pathLength="100"
          d="M 20 10 L 20 90 L 80 90 L 80 35 L 55 10 Z M 55 10 L 55 35 L 80 35"
        />

        {/* Horizontal Text Lines */}
        <path
          className="animated-path path-line-1"
          pathLength="100"
          d="M 35 50 L 65 50"
        />
        <path
          className="animated-path path-line-2"
          pathLength="100"
          d="M 35 65 L 65 65"
        />
        <path
          className="animated-path path-line-3"
          pathLength="100"
          d="M 35 80 L 65 80"
        />
      </g>
    </svg>
  );
};

export default ResumeIcon;
