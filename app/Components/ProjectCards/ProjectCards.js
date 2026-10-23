import React, { useRef, useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import BorderGlow from '../BorderGlow/BorderGlow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain, faTrophy, faChevronLeft, faChevronRight, faScaleBalanced, faRecycle } from '@fortawesome/free-solid-svg-icons';
import GithubIcon from '../icons/GithubIcon';
import './ProjectCards.css';

const projects = [
  {
    icon: faBrain,
    title: "WHAT-IF MAP",
    description: "What-If Map is a futuristic, interactive AI decision-mapping platform built to model, visualize, and analyze multi-branch scenarios. Powered by Google Gemini AI, interactive flowchart engines, and high-performance canvas physics, it helps users explore critical choices, projected outcomes, and cognitive decision lineage.",
    stack: ['NEXT.JS', 'REACT', 'GEMINI AI', 'CANVAS PHYSICS', 'NODE.JS'],
    delay: 100,
    githubLink: "https://github.com/Aswin-cs/what-if-map"
  },
  {
    icon: faScaleBalanced,
    title: "JURISAI",
    description: "JurisAI is an AI-powered legal intelligence engine designed to provide rapid contract risk assessment, clause-by-clause statutory analysis, interactive follow-up legal consultation, and executive summary exports for individuals, legal professionals, and business operators.",
    stack: ['NEXT.JS', 'GEMINI AI', 'REACT', 'RAG ENGINE', 'MONGOOSE'],
    delay: 200,
    githubLink: "https://github.com/Aswin-cs/ai-app#jurisai--legal-intelligence--contract-risk-assessment-platform"
  },
  {
    icon: faRecycle,
    title: "SAFAIWATCH",
    description: "SafaiWatch is a full-stack civic sanitation platform to report, verify, and clean waste hotspots in real time. Featuring interactive Leaflet maps, Socket.IO live updates, and Google Gemini AI spot verification, it delivers an end-to-end urban cleanliness tracking and community participation system.",
    stack: ['NEXT.JS', 'SOCKET.IO', 'GEMINI AI', 'NODE.JS', 'MONGODB'],
    delay: 300,
    githubLinks: [
      { label: 'Frontend', url: 'https://github.com/Aswin-cs/safaiwatch-frontend' },
      { label: 'Backend', url: 'https://github.com/Aswin-cs/safaiwatch-backend' }
    ]
  },
  {
    icon: faTrophy,
    title: "SMART STADIUMS & TOURNAMENT OPERATIONS",
    description: "Smart Stadiums & Tournament Operations is a web application built with Next.js, React, and Mongoose. It features user authentication via Next-Auth and integrates Google Generative AI capabilities.",
    stack: ['NEXT.JS', 'REACT', 'MONGOOSE', 'NEXT-AUTH', 'GOOGLE AI'],
    delay: 400,
    githubLink: "https://github.com/Aswin-cs/Smart-Stadiums-and-Tournament-Operations"
  }
];

const ProjectCard = ({ icon, title, description, stack, delay, githubLink, githubLinks, isActive, offset, isDesktop }) => {
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
    const currentDom = domRef.current;
    if (currentDom) {
      observer.observe(currentDom);
    }
    return () => {
      if (currentDom) observer.unobserve(currentDom);
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
            {githubLinks ? (
              <div className="multi-links-group">
                {githubLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${title} - ${link.label} repository`}
                    className="github-icon-container multi-link"
                    title={`${link.label} Repository`}
                  >
                    <GithubIcon className="github-icon" />
                    <span className="link-badge">{link.label === 'Frontend' ? 'FE' : 'BE'}</span>
                  </a>
                ))}
              </div>
            ) : (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${title} on GitHub`}
                className="github-icon-container"
              >
                <GithubIcon className="github-icon" />
              </a>
            )}
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

const triggerHaptic = (style = 'light') => {
  if (typeof window === 'undefined') return;

  if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
    try {
      switch (style) {
        case 'light':
          navigator.vibrate(10);
          break;
        case 'medium':
          navigator.vibrate(18);
          break;
        case 'snap':
          navigator.vibrate([12, 16, 14]);
          break;
        case 'boundary':
          navigator.vibrate([15, 25, 20]);
          break;
        default:
          navigator.vibrate(10);
      }
    } catch {
      // Ignore vibration errors if not permitted
    }
  }
};

const ProjectCards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const isMouseDownRef = useRef(false);
  const hasMovedRef = useRef(false);
  const currentDragOffsetRef = useRef(0);
  const wheelThrottleRef = useRef(false);
  const hasCrossedThresholdRef = useRef(false);
  const hasHitBoundaryRef = useRef(false);
  const isInitialMount = useRef(true);

  // Check if desktop layout
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1250);
    };
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Haptic feedback whenever project card changes (skip initial mount)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    triggerHaptic('snap');
  }, [currentIndex]);

  // Auto-switch between project cards on mobile layout (paused when dragging)
  useEffect(() => {
    if (isDesktop || isDragging) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % projects.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isDesktop, isDragging]);

  const handleDragStart = (clientX, clientY) => {
    startXRef.current = clientX;
    startYRef.current = clientY;
    hasMovedRef.current = false;
    currentDragOffsetRef.current = 0;
    hasCrossedThresholdRef.current = false;
    hasHitBoundaryRef.current = false;
  };

  const handleDragMove = (clientX, clientY) => {
    const diffX = clientX - startXRef.current;
    const diffY = clientY - startYRef.current;

    // Prioritize horizontal drag over vertical page scroll
    if (Math.abs(diffX) > Math.abs(diffY) || Math.abs(diffX) > 8) {
      if (Math.abs(diffX) > 6) {
        hasMovedRef.current = true;
      }

      // Haptic tick when user drags past threshold for snap
      if (Math.abs(diffX) >= 40 && !hasCrossedThresholdRef.current) {
        hasCrossedThresholdRef.current = true;
        triggerHaptic('light');
      } else if (Math.abs(diffX) < 40 && hasCrossedThresholdRef.current) {
        hasCrossedThresholdRef.current = false;
      }

      // Boundary resistance & haptic bump
      const isAtStart = currentIndex === 0 && diffX > 0;
      const isAtEnd = currentIndex === projects.length - 1 && diffX < 0;

      if ((isAtStart && diffX > 35) || (isAtEnd && diffX < -35)) {
        if (!hasHitBoundaryRef.current) {
          hasHitBoundaryRef.current = true;
          triggerHaptic('boundary');
        }
      }

      let offset = diffX;
      if (isAtStart || isAtEnd) {
        offset = diffX * 0.35;
      }
      currentDragOffsetRef.current = offset;
      setDragOffset(offset);
    }
  };

  const handleDragEnd = () => {
    const offset = currentDragOffsetRef.current;
    const threshold = 40; // minimum drag distance to switch cards

    if (offset < -threshold) {
      // Swiped/dragged left -> next project
      setCurrentIndex(prev => Math.min(projects.length - 1, prev + 1));
    } else if (offset > threshold) {
      // Swiped/dragged right -> previous project
      setCurrentIndex(prev => Math.max(0, prev - 1));
    }

    setDragOffset(0);
    currentDragOffsetRef.current = 0;
    setIsDragging(false);
    isMouseDownRef.current = false;
    hasCrossedThresholdRef.current = false;
    hasHitBoundaryRef.current = false;
  };

  // Touch handlers
  const onTouchStart = (e) => {
    if (isDesktop) return;
    setIsDragging(true);
    handleDragStart(e.touches[0].clientX, e.touches[0].clientY);
  };

  const onTouchMove = (e) => {
    if (isDesktop || !isDragging) return;
    handleDragMove(e.touches[0].clientX, e.touches[0].clientY);
  };

  const onTouchEnd = () => {
    if (isDesktop) return;
    handleDragEnd();
  };

  // Mouse drag handlers
  const onMouseDown = (e) => {
    if (isDesktop || e.button !== 0 || e.target.closest('a') || e.target.closest('button')) return;
    isMouseDownRef.current = true;
    setIsDragging(true);
    handleDragStart(e.clientX, e.clientY);
  };

  const onMouseMove = (e) => {
    if (isDesktop || !isMouseDownRef.current) return;
    handleDragMove(e.clientX, e.clientY);
  };

  const onMouseUp = () => {
    if (isDesktop || !isMouseDownRef.current) return;
    handleDragEnd();
  };

  const onMouseLeave = () => {
    if (isDesktop || !isMouseDownRef.current) return;
    handleDragEnd();
  };

  // Horizontal wheel / trackpad scroll handler
  const onWheel = (e) => {
    if (isDesktop || wheelThrottleRef.current) return;
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : (e.shiftKey ? e.deltaY : 0);
    if (Math.abs(delta) > 25) {
      wheelThrottleRef.current = true;
      if (delta > 0) {
        setCurrentIndex(prev => Math.min(projects.length - 1, prev + 1));
      } else {
        setCurrentIndex(prev => Math.max(0, prev - 1));
      }
      setTimeout(() => {
        wheelThrottleRef.current = false;
      }, 450);
    }
  };

  // Prevent link click when gesture was a drag
  const handleClickCapture = (e) => {
    if (hasMovedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      hasMovedRef.current = false;
    }
  };

  const trackProps = useSpring({
    transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
    config: isDragging ? { tension: 380, friction: 32 } : { tension: 140, friction: 26 }
  });

  return (
    <div
      className={`carousel-viewport ${isDragging ? 'is-dragging' : ''}`}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onWheel={onWheel}
      onClickCapture={handleClickCapture}
    >
      <animated.div className="projects-track" style={trackProps}>
        {projects.map((project, index) => (
          <ProjectCard
            key={project.title}
            icon={project.icon}
            title={project.title}
            description={project.description}
            stack={project.stack}
            delay={project.delay}
            githubLink={project.githubLink}
            githubLinks={project.githubLinks}
            index={index}
            isActive={currentIndex === index}
            offset={index - currentIndex}
            isDesktop={isDesktop}
          />
        ))}
      </animated.div>

      <div className="carousel-navigation">
        <button
          aria-label="Previous Project"
          className={`nav-btn ${currentIndex === 0 ? 'disabled' : ''}`}
          onClick={() => {
            triggerHaptic('light');
            setCurrentIndex(prev => Math.max(0, prev - 1));
          }}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <div className="nav-indicators">
          {projects.map((_, i) => (
            <span
              key={i}
              role="button"
              tabIndex={0}
              aria-label={`Go to project ${i + 1}`}
              className={`indicator ${currentIndex === i ? 'active' : ''}`}
              onClick={() => {
                triggerHaptic('light');
                setCurrentIndex(i);
              }}
            />
          ))}
        </div>
        <button
          aria-label="Next Project"
          className={`nav-btn ${currentIndex === projects.length - 1 ? 'disabled' : ''}`}
          onClick={() => {
            triggerHaptic('light');
            setCurrentIndex(prev => Math.min(projects.length - 1, prev + 1));
          }}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};

export default ProjectCards;
