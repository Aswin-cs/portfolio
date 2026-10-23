"use client";
import React, { useRef, useEffect, useState } from "react";
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { useSpring, animated } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faLayerGroup,
  faCode,
  faServer,
  faDatabase,
  faTerminal,
  faMicrochip,
  faSquareRootVariable,
  faCubes,
  faWrench,
  faBolt,
  faNetworkWired,
  faBrain,
  faChartLine
} from '@fortawesome/free-solid-svg-icons';
import { faReact, faNodeJs, faJs, faHtml5, faCss3Alt, faGitAlt, faPython } from '@fortawesome/free-brands-svg-icons';

import ColorBends from "./Components/ColorBends/ColorBends";
import TechText from "./Components/TechText/TechText";
import LogoLoop from "./Components/LogoLoop/LogoLoop";
import ProjectCards from "./Components/ProjectCards/ProjectCards";
import GithubProfile from "./Components/GithubProfile/GithubProfile";
import AswinLogicLogo from "./Components/AswinLogicLogo/AswinLogicLogo";
import TargetCursor from "./Components/TargetCursor/TargetCursor";
import SkillsIcon from "./Components/icons/SkillsIcon";
import { AnimatedFolderIcon } from "./Components/icons/AnimatedFolderIcon";
import ScrollStack, { ScrollStackItem } from "./Components/ScrollStack/ScrollStack";
import Loader from "./Components/Loader/Loader";

const techLogos = [
  { node: <FontAwesomeIcon icon={faNodeJs} />, title: "Node.js", href: "https://nodejs.org" },
  { node: <FontAwesomeIcon icon={faReact} />, title: "React", href: "https://react.dev" },
  { node: <FontAwesomeIcon icon={faJs} />, title: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { node: <FontAwesomeIcon icon={faHtml5} />, title: "HTML5", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { node: <FontAwesomeIcon icon={faGitAlt} />, title: "Git", href: "https://git-scm.com" },
  { node: <FontAwesomeIcon icon={faCss3Alt} />, title: "CSS3", href: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
  { node: <FontAwesomeIcon icon={faPython} />, title: "Python", href: "https://python.org" },

];

const Page = () => {
  const parallaxRef = useRef(null);
  const isScrolling = useRef(false);
  const lastPage = useRef(0);
  const [showNav, setShowNav] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const hideTimeout = useRef(null);

  const navAnimation = useSpring({
    opacity: showNav ? 1 : 0,
    transform: showNav ? 'translate(-50%, 0)' : 'translate(-50%, 50px)',
    config: { tension: 280, friction: 20 }
  });

  const resetHideTimer = () => {
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    setShowNav(true);
    hideTimeout.current = setTimeout(() => {
      setShowNav(false);
    }, 5000);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      // If mouse is in the bottom 100px of the screen
      if (window.innerHeight - e.clientY < 100) {
        resetHideTimer();
      }
    };

    const handleTouch = () => {
      resetHideTimer();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouch);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouch);
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
  }, []);

  // Snap-scroll: intercept wheel & touch on the Parallax container in capture phase
  // so the Parallax's built-in onWheel (which calls stop()) never fires.
  const totalPages = 4;
  useEffect(() => {
    // The Parallax ref exposes a `container` ref — wait until it's ready
    const getContainer = () => parallaxRef.current?.container?.current;

    const handleWheel = (e) => {
      const isCarousel = e.target.closest('.carousel-viewport') || e.target.closest('.projects-container');
      if (isCarousel && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        return; // Allow horizontal scrolling in project cards
      }

      const scrollable = isCarousel || e.target.closest('.scroll-stack-scroller');

      if (scrollable) {
        if (e.deltaY < 0 && scrollable.scrollTop <= 10) {
          // Scrolling UP and at the TOP of the container -> allow global snap
        } else if (e.deltaY > 0 && Math.abs(scrollable.scrollHeight - scrollable.scrollTop - scrollable.clientHeight) <= 10) {
          // Scrolling DOWN and at the BOTTOM of the container -> allow global snap
        } else {
          return; // Otherwise, allow internal scrolling
        }
      }

      e.preventDefault();
      e.stopPropagation(); // prevent Parallax's own onWheel from calling stop()
      if (isScrolling.current) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      const nextPage = Math.min(Math.max(lastPage.current + direction, 0), totalPages - 1);

      if (nextPage !== lastPage.current) {
        isScrolling.current = true;
        lastPage.current = nextPage;
        parallaxRef.current.scrollTo(nextPage);
        setTimeout(() => { isScrolling.current = false; }, 1000);
      }
    };

    // Touch swipe support
    let touchStartY = 0;
    let touchStartX = 0;
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
    };
    const handleTouchEnd = (e) => {
      const deltaX = touchStartX - e.changedTouches[0].clientX;
      const deltaY = touchStartY - e.changedTouches[0].clientY;

      // If swipe is predominantly horizontal, ignore full-page vertical snap
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        return;
      }

      const scrollable = e.target.closest('.projects-container') || e.target.closest('.carousel-viewport') || e.target.closest('.scroll-stack-scroller');

      if (scrollable) {
        if (deltaY < -40 && scrollable.scrollTop <= 10) {
          // Swiping DOWN (scrolling up) and at TOP -> allow global snap
        } else if (deltaY > 40 && Math.abs(scrollable.scrollHeight - scrollable.scrollTop - scrollable.clientHeight) <= 10) {
          // Swiping UP (scrolling down) and at BOTTOM -> allow global snap
        } else if (Math.abs(deltaY) >= 40) {
          return; // Otherwise, let internal container scroll
        }
      }

      if (isScrolling.current) return;
      if (Math.abs(deltaY) < 50) return;

      const direction = deltaY > 0 ? 1 : -1;
      const nextPage = Math.min(Math.max(lastPage.current + direction, 0), totalPages - 1);

      if (nextPage !== lastPage.current) {
        isScrolling.current = true;
        lastPage.current = nextPage;
        parallaxRef.current.scrollTo(nextPage);
        setTimeout(() => { isScrolling.current = false; }, 1000);
      }
    };

    // Poll briefly until container DOM node is available
    let container = null;
    const interval = setInterval(() => {
      container = getContainer();
      if (container) {
        clearInterval(interval);
        container.addEventListener('wheel', handleWheel, { passive: false, capture: true });
        container.addEventListener('touchstart', handleTouchStart, { passive: true });
        container.addEventListener('touchend', handleTouchEnd, { passive: true });
      }
    }, 100);

    return () => {
      clearInterval(interval);
      if (container) {
        container.removeEventListener('wheel', handleWheel, { capture: true });
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, []);

  return (
    <>
      <Loader />
      <Parallax ref={parallaxRef} pages={4} style={{ top: '0', left: '0', background: '#000000' }}>

        {/* Background Layer */}
        <ParallaxLayer offset={0} speed={0} factor={4} style={{ pointerEvents: 'none', zIndex: 0 }}>
          <div style={{ position: 'sticky', top: 0, width: '100%', height: '100vh', overflow: 'hidden' }}>
            <ColorBends
              colors={["#ff0062ff", "#0057f8ff", "#000000ff"]}
              rotation={90}
              speed={0.2}
              scale={1}
              frequency={1}
              warpStrength={1}
              mouseInfluence={1}
              noise={0.15}
              parallax={0.5}
              iterations={1}
              intensity={1.5}
              bandWidth={6}
              transparent
            />
          </div>
        </ParallaxLayer>

        {/* Main Text Layer */}
        <ParallaxLayer
          offset={0}
          speed={0.5}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '2vh' }}
        >
          <AswinLogicLogo style={{ width: 'min(200px, 30vw)', marginBottom: '1rem' }} color="rgba(255, 255, 255, 0.8)" />
          <div style={{ width: '90%', maxWidth: '1000px', height: '160px', position: 'relative' }}>
            <TechText
              text="WELCOME TO MY PORTFOLIO"
              fontFamily="Expletus Sans, sans-serif"
              fontWeight={600}
              fontSize={120}
              color="#ffffff"
              accentColor="#ffffff"
              reveal="letter"
              dashLength={4}
              dashGap={2}
              specks={15}
              intro="none"
              introDuration={2}
              clickKick
              guides={false}
            />
          </div>
        </ParallaxLayer>

        {/* Second Layer Content: Scroll Stack */}
        <ParallaxLayer
          offset={1}
          speed={0.5}
          style={{ width: '100vw', height: '100vh' }}
        >
          <ScrollStack>
            <ScrollStackItem>
              <div className="bento-skill-card card-theme-cyan">
                <div className="bento-header">
                  <div className="bento-header-left">
                    <div className="bento-icon-badge">
                      <FontAwesomeIcon icon={faLayerGroup} />
                    </div>
                    <div className="bento-header-info">
                      <span className="bento-card-tag">01 / Full-Stack Platform</span>
                      <h3 className="bento-card-title">Core Development Stack</h3>
                    </div>
                  </div>
                  <span className="bento-header-badge">Production Architecture</span>
                </div>

                <div className="bento-grid">
                  <div className="bento-cell">
                    <div className="bento-cell-title">
                      <FontAwesomeIcon icon={faCode} />
                      <span>Frontend Architecture</span>
                    </div>
                    <div className="bento-pills">
                      <span className="bento-pill"><FontAwesomeIcon icon={faReact} /> React.js</span>
                      <span className="bento-pill"><FontAwesomeIcon icon={faReact} /> Next.js (App Router)</span>
                      <span className="bento-pill"><FontAwesomeIcon icon={faHtml5} /> HTML5 / CSS3</span>
                      <span className="bento-pill"><FontAwesomeIcon icon={faJs} /> JavaScript (ES6+)</span>
                    </div>
                  </div>

                  <div className="bento-cell">
                    <div className="bento-cell-title">
                      <FontAwesomeIcon icon={faServer} />
                      <span>Backend & Microservices</span>
                    </div>
                    <div className="bento-pills">
                      <span className="bento-pill"><FontAwesomeIcon icon={faNodeJs} /> Node.js</span>
                      <span className="bento-pill">Express.js</span>
                      <span className="bento-pill">FastAPI</span>
                      <span className="bento-pill">RESTful API Architecture</span>
                    </div>
                  </div>

                  <div className="bento-cell">
                    <div className="bento-cell-title">
                      <FontAwesomeIcon icon={faDatabase} />
                      <span>Database & Persistence</span>
                    </div>
                    <div className="bento-pills">
                      <span className="bento-pill">MongoDB</span>
                      <span className="bento-pill">Mongoose Schemas</span>
                      <span className="bento-pill">PostgreSQL</span>
                      <span className="bento-pill">Connection Pooling</span>
                    </div>
                  </div>

                  <div className="bento-cell">
                    <div className="bento-cell-title">
                      <FontAwesomeIcon icon={faTerminal} />
                      <span>Core Languages</span>
                    </div>
                    <div className="bento-pills">
                      <span className="bento-pill"><FontAwesomeIcon icon={faPython} /> Python</span>
                      <span className="bento-pill">C</span>
                      <span className="bento-pill">C++</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollStackItem>

            <ScrollStackItem>
              <div className="bento-skill-card card-theme-violet">
                <div className="bento-header">
                  <div className="bento-header-left">
                    <div className="bento-icon-badge">
                      <FontAwesomeIcon icon={faMicrochip} />
                    </div>
                    <div className="bento-header-info">
                      <span className="bento-card-tag">02 / Theoretical & Applied Systems</span>
                      <h3 className="bento-card-title">Engineering & Systems Logic</h3>
                    </div>
                  </div>
                  <span className="bento-header-badge">Foundations & Tooling</span>
                </div>

                <div className="bento-grid bento-grid-3col">
                  <div className="bento-cell">
                    <div className="bento-cell-title">
                      <FontAwesomeIcon icon={faSquareRootVariable} />
                      <span>Foundational Math</span>
                    </div>
                    <div className="bento-pills">
                      <span className="bento-pill">Abstract Algebra</span>
                      <span className="bento-pill">Graph Theory</span>
                      <span className="bento-pill">Linear Algebra</span>
                      <span className="bento-pill">Discrete Mathematics</span>
                    </div>
                  </div>

                  <div className="bento-cell">
                    <div className="bento-cell-title">
                      <FontAwesomeIcon icon={faCubes} />
                      <span>Computer Science Logic</span>
                    </div>
                    <div className="bento-pills">
                      <span className="bento-pill">Data Structures (DSA)</span>
                      <span className="bento-pill">Algorithm Analysis</span>
                      <span className="bento-pill">System Design</span>
                      <span className="bento-pill">State Machines</span>
                    </div>
                  </div>

                  <div className="bento-cell">
                    <div className="bento-cell-title">
                      <FontAwesomeIcon icon={faWrench} />
                      <span>Production Tooling</span>
                    </div>
                    <div className="bento-pills">
                      <span className="bento-pill"><FontAwesomeIcon icon={faGitAlt} /> Git / GitHub</span>
                      <span className="bento-pill">Vercel Deployment</span>
                      <span className="bento-pill">Postman API Testing</span>
                      <span className="bento-pill">Antigravity IDE</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollStackItem>

            <ScrollStackItem>
              <div className="bento-skill-card card-theme-emerald">
                <div className="bento-header">
                  <div className="bento-header-left">
                    <div className="bento-icon-badge">
                      <FontAwesomeIcon icon={faBolt} />
                    </div>
                    <div className="bento-header-info">
                      <span className="bento-card-tag">03 / Emerging Capabilities & R&D</span>
                      <h3 className="bento-card-title">Niche Specializations</h3>
                    </div>
                  </div>
                  <span className="bento-header-badge">AI, IoT & Analytics</span>
                </div>

                <div className="bento-grid bento-grid-3col">
                  <div className="bento-feature-cell">
                    <div>
                      <div className="bento-feature-top">
                        <div className="bento-feature-icon">
                          <FontAwesomeIcon icon={faNetworkWired} />
                        </div>
                        <div className="bento-feature-heading">
                          <span className="bento-feature-title">IoT & Real-Time</span>
                          <span className="bento-feature-subtitle">Telemetry Ingestion</span>
                        </div>
                      </div>
                      <p className="bento-feature-desc" style={{ marginTop: '0.85rem' }}>
                        High-throughput telemetry handling and full-duplex live synchronization.
                      </p>
                    </div>
                    <div className="bento-pills">
                      <span className="bento-pill">MQTT Protocols</span>
                      <span className="bento-pill">WebSockets</span>
                      <span className="bento-pill">Live Event Streams</span>
                    </div>
                  </div>

                  <div className="bento-feature-cell">
                    <div>
                      <div className="bento-feature-top">
                        <div className="bento-feature-icon">
                          <FontAwesomeIcon icon={faBrain} />
                        </div>
                        <div className="bento-feature-heading">
                          <span className="bento-feature-title">Generative AI</span>
                          <span className="bento-feature-subtitle">Agentic Architectures</span>
                        </div>
                      </div>
                      <p className="bento-feature-desc" style={{ marginTop: '0.85rem' }}>
                        Integrating generative AI reasoning, RAG context pipelines, and structured inference into web ecosystems.
                      </p>
                    </div>
                    <div className="bento-pills">
                      <span className="bento-pill">Gemini Models</span>
                      <span className="bento-pill">RAG Pipelines</span>
                      <span className="bento-pill">Structured Output</span>
                    </div>
                  </div>

                  <div className="bento-feature-cell">
                    <div>
                      <div className="bento-feature-top">
                        <div className="bento-feature-icon">
                          <FontAwesomeIcon icon={faChartLine} />
                        </div>
                        <div className="bento-feature-heading">
                          <span className="bento-feature-title">Data Science</span>
                          <span className="bento-feature-subtitle">Foundations to Modeling</span>
                        </div>
                      </div>
                      <p className="bento-feature-desc" style={{ marginTop: '0.85rem' }}>
                        Transitioning foundational mathematics, linear algebra, and graph theory into data modeling pipelines.
                      </p>
                    </div>
                    <div className="bento-pills">
                      <span className="bento-pill">Data Modeling</span>
                      <span className="bento-pill">Statistical Analysis</span>
                      <span className="bento-pill">Graph Inference</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollStackItem>
          </ScrollStack>
        </ParallaxLayer>

        {/* Third Layer Content */}
        <ParallaxLayer
          offset={2}
          speed={0.5}
          style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'column', width: '100vw', paddingTop: '8vh', gap: '4vh' }}
        >
          <div style={{ width: '100%', height: '120px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
            <LogoLoop
              logos={techLogos}
              speed={120}
              direction="left"
              logoHeight={96}
              gap={96}
              hoverSpeed={0}
              scaleOnHover
              fadeOut
              fadeOutColor="#ffffffff"
              ariaLabel="Technology stack"
            />
          </div>

          <ProjectCards />
        </ParallaxLayer>

        {/* Fourth Layer Content: Sync Logic & GitHub */}
        <ParallaxLayer
          offset={3}
          speed={0.5}
          style={{ width: '100vw', height: '100vh', position: 'relative' }}
        >
          <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
            <AswinLogicLogo style={{ width: 'min(150px, 25vw)' }} color="rgba(255, 255, 255, 0.6)" />
          </div>
          <TargetCursor
            spinDuration={3}
            hideDefaultCursor={false}
            hoverDuration={0.5}
            parallaxOn={true}
          />
          <GithubProfile />

        </ParallaxLayer>
      </Parallax>
      <>
        <animated.div style={navAnimation} className="navbar">
          <div className="navbar-item" onClick={() => {
            lastPage.current = 0;
            parallaxRef.current.scrollTo(0);
          }} title="Home">
            <FontAwesomeIcon icon={faHome} title="Home" />
          </div>
          <div className="navbar-item" onClick={() => {
            lastPage.current = 1;
            parallaxRef.current.scrollTo(1);
          }} title="Skills">
            <SkillsIcon style={{ width: '1.5rem', height: '1.5rem', scale: "1.2" }} />
          </div>
          <div
            className="navbar-item"
            onClick={() => {
              lastPage.current = 2;
              parallaxRef.current.scrollTo(2);
            }}
            onMouseEnter={() => setHoveredItem('projects')}
            onMouseLeave={() => setHoveredItem(null)}
            title="Projects"
          >
            <AnimatedFolderIcon
              isOpen={hoveredItem === 'projects'}
              size="1.2rem"
              color="currentColor"
            />
          </div>
          <div className="navbar-item navbar-logo" onClick={() => {
            lastPage.current = 3;
            parallaxRef.current.scrollTo(3);
          }} title="Contact & GitHub">
            <AswinLogicLogo color="currentColor" />
          </div>
        </animated.div>
      </>
    </>
  );
};

export default Page;