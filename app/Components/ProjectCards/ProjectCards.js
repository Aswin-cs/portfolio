import React, { useRef, useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import BorderGlow from '../BorderGlow/BorderGlow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrochip, faBrain, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import './ProjectCards.css';

const ProjectCard = ({ icon, title, description, stack, delay, githubLink }) => {
  const [isVisible, setVisible] = useState(false);
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

  const props = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0px)' : 'translateY(50px)',
    config: { mass: 1, tension: 80, friction: 26 },
    delay: delay
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
              <FontAwesomeIcon icon={faGithub} className="github-icon" />
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

  // Auto-switch between project cards every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % 2);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const trackProps = useSpring({
    transform: `translateX(-${currentIndex * 100}%)`,
    config: { tension: 170, friction: 26 }
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
        />
        <ProjectCard
          icon={faBrain}
          title="THE IDEA VALIDATOR"
          description="A niche feedback platform leveraging complex data schemas. Features credibility-weighted voting algorithms for specialized communities."
          stack={['NEXT.JS', 'MONGOOSE', 'ZOD', 'NODE.JS']}
          delay={300}
          githubLink="https://github.com/Aswin-cs/review-app"
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
