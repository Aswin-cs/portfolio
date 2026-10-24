"use client";
import React, { useRef, useEffect, useState } from "react";
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { useSpring, animated } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
} from '@fortawesome/free-solid-svg-icons';
import { faReact, faNodeJs, faJs, faHtml5, faCss3Alt, faGitAlt, faPython } from '@fortawesome/free-brands-svg-icons';

import ColorBends from "./Components/ColorBends/ColorBends";
import WarpText from "./Components/WarpText/WarpText";
import LogoLoop from "./Components/LogoLoop/LogoLoop";
import ProjectCards from "./Components/ProjectCards/ProjectCards";
import GithubProfile from "./Components/GithubProfile/GithubProfile";
import AswinLogicLogo from "./Components/AswinLogicLogo/AswinLogicLogo";
import TargetCursor from "./Components/TargetCursor/TargetCursor";
import SkillsIcon from "./Components/icons/SkillsIcon";
import { AnimatedFolderIcon } from "./Components/icons/AnimatedFolderIcon";
import ScrollStack, { ScrollStackItem } from "./Components/ScrollStack/ScrollStack";
import SkillCard from "./Components/SkillCard/SkillCard";
import Loader from "./Components/Loader/Loader";

const programmingSkillsData = [
  {
    title: "Frontend",
    skills: [
      { name: "JavaScript", proficiency: 5 },
      { name: "TypeScript", proficiency: 4 },
      { name: "HTML", proficiency: 5 },
      { name: "CSS", proficiency: 4 },
    ]
  },
  {
    title: "Backend",
    skills: [
      { name: "Python", proficiency: 4 },
      { name: "FastAPI", proficiency: 4 },
      { name: "Node.js", proficiency: 5 },
      { name: "Express.js", proficiency: 4 },
      { name: "REST APIs", proficiency: 5 },
    ]
  },
  {
    title: "Database",
    skills: [
      { name: "SQL", proficiency: 4 },
      { name: "PostgreSQL", proficiency: 4 },
      { name: "MongoDB", proficiency: 3 },
      { name: "Redis", proficiency: 3 },
    ]
  },
  {
    title: "Systems",
    skills: [
      { name: "C++", proficiency: 3 },
      { name: "C", proficiency: 3 },
    ]
  }
];

const specializedSkillsData = [
  {
    title: "Generative AI",
    skills: [
      { name: "Gemini Models", proficiency: 5 },
      { name: "RAG Context", proficiency: 4 },
      { name: "Structured Output", proficiency: 5 },
    ]
  },
  {
    title: "IoT & Real-Time",
    skills: [
      { name: "WebSockets", proficiency: 5 },
      { name: "Live Event Streams", proficiency: 4 },
      { name: "Socket.IO", proficiency: 5 },
    ]
  },
  {
    title: "Tooling & DevOps",
    skills: [
      { name: "Git / GitHub", proficiency: 5 },
      { name: "Postman", proficiency: 4 },
      { name: "Vercel Deploy", proficiency: 4 },
      { name: "Antigravity IDE", proficiency: 5 },
    ]
  }
];

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
          <div style={{ width: '90%', maxWidth: '900px', height: 'clamp(200px, 32vh, 320px)', position: 'relative' }}>
            <WarpText
              text={"WELCOME \n TO MY \n PORTFOLIO"}
              warpStrength={0.08}
              warpScale={1.7}
              speed={0.55}
              lens="bulge"
              pointerInfluence={0.42}
              pointerStrength={0.38}
              refraction={0.018}
              chromatic={0.35}
              idleDrift={0.2}
              ripple
              clickRipple
              intro
              lineHeight={1.05}
              fontSize="clamp(3rem, 10vw, 8rem)"
              fontWeight={800}
              style={{ height: '100%', width: '100%' }}
              color="#ffffff"
              letterSpacing="-0.04em"
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
              <SkillCard
                title="Programming skills"
                subtitle="Languages and databases I use, grouped by where they run."
                categories={programmingSkillsData}
              />
            </ScrollStackItem>

            <ScrollStackItem>
              <SkillCard
                title="Engineering & AI Systems"
                subtitle="Agentic AI workflows, real-time telemetry, and production deployment."
                categories={specializedSkillsData}
              />
            </ScrollStackItem>
          </ScrollStack>
        </ParallaxLayer>

        {/* Third Layer Content */}
        <ParallaxLayer
          offset={2}
          speed={0.5}
          style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'column', width: '100vw', paddingTop: '8vh', gap: '4vh' }}
        >
          <div className="logoloop-container">
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