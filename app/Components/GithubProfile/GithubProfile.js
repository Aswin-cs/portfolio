import React, { useState, useEffect, useRef } from 'react';
import { useSpring, useTrail, animated, config } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import './GithubProfile.css';

const GithubProfile = () => {
  const [hovered, setHovered] = useState(false);
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

  const springProps = useSpring({
    transform: hovered ? 'scale(1.05) translateY(-5px)' : 'scale(1) translateY(0px)',
    boxShadow: hovered 
      ? '0 20px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 255, 255, 0.1)' 
      : '0 10px 20px rgba(0, 0, 0, 0.3), 0 0 0px rgba(255, 255, 255, 0)',
    config: config.wobbly
  });

  return (
    <div ref={containerRef} className="github-profile-container">
      <animated.h1 style={trail[0]} className="sync-logic-heading">SYNC_LOGIC</animated.h1>
      <animated.h3 style={trail[1]} className="sync-logic-subheading">Ready to collaborate with me? Let's build something amazing together.</animated.h3>
      
      <animated.div style={trail[2]}>
        <animated.a 
          href="https://github.com/Aswin-cs" 
          target="_blank" 
          rel="noopener noreferrer"
          className="github-profile-box"
          style={springProps}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="github-icon-wrapper">
            <FontAwesomeIcon icon={faGithub} className="github-icon" />
          </div>
          <div className="github-info">
            <span className="github-username">@Aswin-cs</span>
            <span className="github-cta">View GitHub Profile</span>
          </div>
        </animated.a>
      </animated.div>
    </div>
  );
};

export default GithubProfile;
