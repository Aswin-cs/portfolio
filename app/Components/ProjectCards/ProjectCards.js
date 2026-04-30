import React, { useRef, useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import BorderGlow from '../BorderGlow/BorderGlow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrochip, faBrain, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import GithubIcon from '../icons/GithubIcon';
import './ProjectCards.css';

const ProjectCard = ({ icon, title, description, stack, delay, githubLink, isActive, offset, isDesktop }) => {
  const [isVisible, setVisible] = useState(false);
  const [hasAppeared, setHasAppeared] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      });
    });
    if (domRef.current) {
      observer.observe(domRef.current);
    }
    return () => {
      if (domRef.current) observer.unobserve(domRef.current);
    };
  }, []);

  useEffect(() => {
    if (isVisible && !hasAppeared) {
      const timer = setTimeout(() => setHasAppeared(true), delay + 600);
      return () => clearTimeout(timer);
    }
  }, [isVisible, delay, hasAppeared]);

  const props = useSpring({
    opacity: isVisible ? (isDesktop ? 1 : isActive ? 1 : 0.3) : 0,
    transform: isVisible 
      ? (isDesktop 
          ? 'perspective(1200px) translateY(0px) scale(1) rotateY(0deg) translateZ(0px)' 
          : (isActive 
              ? 'perspective(1200px) translateY(0px) scale(1) rotateY(0deg) translateZ(0px)' 
              : `perspective(1200px) translateY(0px) scale(0.85) rotateY(${-offset * 25}deg) translateZ(-50px)`))
      : 'perspective(1200px) translateY(50px) scale(0.8) rotateY(0deg) translateZ(0px)',
    config: { mass: 1, tension: 120, friction: 22 },
    delay: hasAppeared ? 0 : delay
  });

  return (
    <animated.div ref={domRef} style={props} className="project-card-wrapper">
      <BorderGlow
        edgeSensitivity={30}
        glowColor="0 0 100"
        backgroundColor="#151515"
        borderRadius={30}
        glowRadius={30}
        glowIntensity={0.6}
        coneSpread={25}
        animated={true}
        colors={['#ffffff', '#888888', '#222222']}
        className="project-card-glow"
      >
        <div className="project-card">
          <div className="card-header-icons">
            <div className="main-icon-container">
              <FontAwesomeIcon icon={icon} className="main-icon" />
            </div>
            <a href={githubLink} target="_blank" rel="noopener noreferrer" className="github-icon-container">
              <GithubIcon className="github-icon" />
            </a>
          </div>

          <h2 className="project-title">{title}</h2>
          <p className="project-description">{description}</p>

          <div className="divider"></div>

          <div className="project-stack">
            {stack.map((tech, index) => (
              <span key={index} className="stack-pill">{tech}</span>
            ))}
          </div>
        </div>
      </BorderGlow>
    </animated.div>
  );
};

const ProjectCards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);

  // Check if desktop layout
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 900);
    };
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-switch between project cards every 4 seconds
  useEffect(() => {
    if (isDesktop) return; // Only auto-switch on mobile layout
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % 2);
    }, 4000); // Increased interval for better reading
    return () => clearInterval(interval);
  }, [isDesktop]);

  const trackProps = useSpring({
    transform: `translateX(-${currentIndex * 100}%)`,
    config: { tension: 140, friction: 28 } // Smoother sliding
  });

  return (
    <div className="carousel-viewport">
      <animated.div className="projects-track" style={trackProps}>
        <ProjectCard
          icon={faMicrochip}
          title="SMART GARBAGE MANAGEMENT"
          description="An IoT-integrated dashboard for urban waste optimization. Built with a mathematical routing engine and high-concurrency Node.js handlers."
          stack={['REACT', 'NODE.JS', 'MONGODB', 'NEXT.JS']}
          delay={100}
          githubLink="https://github.com/Aswin-cs/smart-garbage-system"
          index={0}
          isActive={currentIndex === 0}
          offset={0 - currentIndex}
          isDesktop={isDesktop}
        />
        <ProjectCard
          icon={faBrain}
          title="THE IDEA VALIDATOR"
          description="A niche feedback platform leveraging complex data schemas. Features credibility-weighted voting algorithms for specialized communities."
          stack={['NEXT.JS', 'MONGOOSE', 'ZOD', 'NODE.JS']}
          delay={300}
          githubLink="https://github.com/Aswin-cs/review-app"
          index={1}
          isActive={currentIndex === 1}
          offset={1 - currentIndex}
          isDesktop={isDesktop}
        />
      </animated.div>

      <div className="carousel-navigation">
        <button
          className={`nav-btn ${currentIndex === 0 ? 'disabled' : ''}`}
          onClick={() => setCurrentIndex(0)}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <div className="nav-indicators">
          <span className={`indicator ${currentIndex === 0 ? 'active' : ''}`} />
          <span className={`indicator ${currentIndex === 1 ? 'active' : ''}`} />
        </div>
        <button
          className={`nav-btn ${currentIndex === 1 ? 'disabled' : ''}`}
          onClick={() => setCurrentIndex(1)}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};

export default ProjectCards;
