"use client"
import React, { useRef, useEffect, useState } from "react";
import Silk from "./Components/Backgrounds/Silk";
import GlitchText from "./Components/GlitchText/GlitchText";
import LogoLoop from "./Components/LogoLoop/LogoLoop";
import ProjectCards from "./Components/ProjectCards/ProjectCards";
import { faReact, faNodeJs, faJs, faHtml5, faCss3Alt, faGitAlt, faGithub } from '@fortawesome/free-brands-svg-icons';
import GithubProfile from "./Components/GithubProfile/GithubProfile";
import AswinLogicLogo from "./Components/AswinLogicLogo/AswinLogicLogo";

const techLogos = [
  { node: <FontAwesomeIcon icon={faReact} />, title: "React", href: "https://react.dev" },
  { node: <FontAwesomeIcon icon={faNodeJs} />, title: "Node.js", href: "https://nodejs.org" },
  { node: <FontAwesomeIcon icon={faJs} />, title: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { node: <FontAwesomeIcon icon={faHtml5} />, title: "HTML5", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { node: <FontAwesomeIcon icon={faCss3Alt} />, title: "CSS3", href: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
  { node: <FontAwesomeIcon icon={faGitAlt} />, title: "Git", href: "https://git-scm.com" }
];
import ScrollStack, { ScrollStackItem } from "./Components/ScrollStack/ScrollStack";

import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTerminal, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { useSpring, animated } from 'react-spring';

const Page = () => {
  const parallaxRef = useRef(null);
  const isScrolling = useRef(false);
  const lastPage = useRef(0);
  const [showNav, setShowNav] = useState(false);
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
      const scrollable = e.target.closest('.projects-container') || e.target.closest('.scroll-stack-scroller');

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
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchEnd = (e) => {
      const scrollable = e.target.closest('.projects-container') || e.target.closest('.scroll-stack-scroller');
      const deltaY = touchStartY - e.changedTouches[0].clientY;

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
      <Parallax ref={parallaxRef} pages={4} style={{ top: '0', left: '0', background: '#504B55' }}>
        {/* Background Layer */}
        <ParallaxLayer offset={0} speed={0} factor={4}>
          <div className="silk-background">
            <Silk
              speed={5}
              scale={0.4}
              color="#797979ff"
              noiseIntensity={1.5}
              rotation={0}
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
          <GlitchText
            speed={1}
            enableShadows={true}
            enableOnHover={false}
          >
            WELCOME TO MY PORTFOLIO
          </GlitchText>
        </ParallaxLayer>

        {/* Second Layer Content: Scroll Stack */}
        <ParallaxLayer
          offset={1}
          speed={0.5}
          style={{ width: '100vw', height: '100vh' }}
        >
          <ScrollStack>
            <ScrollStackItem>
              <div className="terminal-header">
                <div className="terminal-buttons">
                  <span className="btn close"></span>
                  <span className="btn minimize"></span>
                  <span className="btn maximize"></span>
                </div>
                <div className="terminal-title">coreStack.js</div>
              </div>
              <div className="terminal-body">
                <div className="code-line"><span className="keyword">const</span> <span className="variable">coreStack</span> <span className="operator">=</span> {'{'}</div>
                <div className="code-line indent">  <span className="property">frontend</span>: [<span className="string">'React.js'</span>, <span className="string">'Next.js (App Router)'</span>, <span className="string">'HTML5/CSS3'</span>],</div>
                <div className="code-line indent">  <span className="property">backend</span>: [<span className="string">'Node.js'</span>, <span className="string">'Express.js'</span>, <span className="string">'RESTful API Design'</span>],</div>
                <div className="code-line indent">  <span className="property">database</span>: [<span className="string">'MongoDB'</span>, <span className="string">'Mongoose (Schema)'</span>, <span className="string">'PostgreSQL'</span>]</div>
                <div className="code-line">{'}'};</div>
              </div>
            </ScrollStackItem>

            <ScrollStackItem>
              <div className="terminal-header">
                <div className="terminal-buttons">
                  <span className="btn close"></span>
                  <span className="btn minimize"></span>
                  <span className="btn maximize"></span>
                </div>
                <div className="terminal-title">engineeringAndLogic.js</div>
              </div>
              <div className="terminal-body">
                <div className="code-line"><span className="keyword">const</span> <span className="variable">engineeringAndLogic</span> <span className="operator">=</span> {'{'}</div>
                <div className="code-line indent">  <span className="property">mathematics</span>: [<span className="string">'Abstract Algebra'</span>, <span className="string">'Graph Theory'</span>, <span className="string">'Linear Algebra'</span>],</div>
                <div className="code-line indent">  <span className="property">logic</span>: [<span className="string">'Data Structures & Algorithms'</span>, <span className="string">'System Design'</span>],</div>
                <div className="code-line indent">  <span className="property">tools</span>: [<span className="string">'Git/GitHub'</span>, <span className="string">'Vercel'</span>, <span className="string">'Postman'</span>, <span className="string">'Antigravity'</span>]</div>
                <div className="code-line">{'}'};</div>
              </div>
            </ScrollStackItem>

            <ScrollStackItem>
              <div className="terminal-header">
                <div className="terminal-buttons">
                  <span className="btn close"></span>
                  <span className="btn minimize"></span>
                  <span className="btn maximize"></span>
                </div>
                <div className="terminal-title">nicheSpecializations.js</div>
              </div>
              <div className="terminal-body">
                <div className="code-line"><span className="keyword">const</span> <span className="variable">nicheSpecializations</span> <span className="operator">=</span> {'{'}</div>
                <div className="code-line indent">  <span className="property">iotIntegration</span>: <span className="string">'Real-time data handling (MQTT/WebSockets)'</span>,</div>
                <div className="code-line indent">  <span className="property">aiImplementation</span>: <span className="string">'Integrating generative AI tools into web ecosystems'</span>,</div>
                <div className="code-line indent">  <span className="property">dataScience</span>: <span className="string">'Transitioning foundational math into data modeling'</span></div>
                <div className="code-line">{'}'};</div>
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
              logoHeight={64}
              gap={64}
              hoverSpeed={0}
              scaleOnHover
              fadeOut
              fadeOutColor="#504B55"
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
          <GithubProfile />
        </ParallaxLayer>
      </Parallax>

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
          <FontAwesomeIcon icon={faTerminal} title="Skills" />
        </div>
        <div className="navbar-item" onClick={() => {
          lastPage.current = 2;
          parallaxRef.current.scrollTo(2);
        }} title="Projects">
          <FontAwesomeIcon icon={faFolderOpen} title="Projects" />
        </div>
        <div className="navbar-item navbar-logo " onClick={() => {
          lastPage.current = 3;
          parallaxRef.current.scrollTo(3);
        }} title="Contact & GitHub">
          <AswinLogicLogo color="currentColor" />
        </div>
      </animated.div>
    </>
  );
};

export default Page;