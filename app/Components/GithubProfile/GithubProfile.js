import React, { useState, useEffect, useRef } from 'react';
import { useSpring, useTrail, animated, config } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import './GithubProfile.css';

const GithubProfile = () => {
  const [hoveredGithub, setHoveredGithub] = useState(false);
  const [hoveredResume, setHoveredResume] = useState(false);
  const [inView, setInView] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.3 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const trail = useTrail(3, {
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(60px)',
    config: { mass: 1, tension: 120, friction: 14 }
  });

  const springPropsGithub = useSpring({
    transform: hoveredGithub ? 'scale(1.05) translateY(-5px)' : 'scale(1) translateY(0px)',
    boxShadow: hoveredGithub 
      ? '0 20px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 255, 255, 0.1)' 
      : '0 10px 20px rgba(0, 0, 0, 0.3), 0 0 0px rgba(255, 255, 255, 0)',
    config: config.wobbly
  });

  const springPropsResume = useSpring({
    transform: hoveredResume ? 'scale(1.05) translateY(-5px)' : 'scale(1) translateY(0px)',
    boxShadow: hoveredResume 
      ? '0 20px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 255, 255, 0.1)' 
      : '0 10px 20px rgba(0, 0, 0, 0.3), 0 0 0px rgba(255, 255, 255, 0)',
    config: config.wobbly
  });

  return (
    <div ref={containerRef} className="github-profile-container">
      <animated.h1 style={trail[0]} className="sync-logic-heading">SYNC_LOGIC</animated.h1>
      <animated.h3 style={trail[1]} className="sync-logic-subheading">Ready to collaborate with me? Let's build something amazing together.</animated.h3>
      
      <animated.div style={trail[2]} className="action-boxes">
        <animated.a 
          href="https://github.com/Aswin-cs" 
          target="_blank" 
          rel="noopener noreferrer"
          className="github-profile-box"
          style={springPropsGithub}
          onMouseEnter={() => setHoveredGithub(true)}
          onMouseLeave={() => setHoveredGithub(false)}
        >
          <div className="github-icon-wrapper">
            <FontAwesomeIcon icon={faGithub} className="github-icon" />
          </div>
          <div className="github-info">
            <span className="github-username">@Aswin-cs</span>
            <span className="github-cta">View GitHub Profile</span>
          </div>
        </animated.a>

        <animated.a 
          href="/Aswin's_resume.pdf" 
          download="Aswin_Resume.pdf"
          className="github-profile-box"
          style={springPropsResume}
          onMouseEnter={() => setHoveredResume(true)}
          onMouseLeave={() => setHoveredResume(false)}
        >
          <div className="github-icon-wrapper">
            <FontAwesomeIcon icon={faFilePdf} className="github-icon" />
          </div>
          <div className="github-info">
            <span className="github-username">Resume</span>
            <span className="github-cta">Download PDF</span>
          </div>
        </animated.a>
      </animated.div>
    </div>
  );
};

export default GithubProfile;
