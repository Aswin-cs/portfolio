import React, { useRef, useState, useEffect } from 'react';
import { useSpring, useTrail, animated } from 'react-spring';
import BorderGlow from '../BorderGlow/BorderGlow';
import './SkillsTerminal.css';

const SkillsTerminal = () => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      });
    }, { threshold: 0.1 });
    if (domRef.current) {
      observer.observe(domRef.current);
    }
    return () => {
      if (domRef.current) observer.unobserve(domRef.current);
    };
  }, []);

  const props = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0px)' : 'translateY(40px)',
    config: { mass: 1, tension: 90, friction: 20 },
    delay: 200
  });

  const lines = [
    <><span className="keyword">const</span> <span className="variable">coreStack</span> <span className="operator">=</span> {'{'}</>,
    <div className="indent">  <span className="property">frontend</span>: [<span className="string">'React.js'</span>, <span className="string">'Next.js (App Router)'</span>, <span className="string">'Tailwind CSS'</span>, <span className="string">'HTML5/CSS3'</span>],</div>,
    <div className="indent">  <span className="property">backend</span>: [<span className="string">'Node.js'</span>, <span className="string">'Express.js'</span>, <span className="string">'RESTful API Design'</span>],</div>,
    <div className="indent">  <span className="property">database</span>: [<span className="string">'MongoDB'</span>, <span className="string">'Mongoose (Schema Design)'</span>, <span className="string">'PostgreSQL'</span>]</div>,
    <>{'}'};</>,
    <div style={{ height: '1.2rem' }}></div>,
    <><span className="keyword">const</span> <span className="variable">engineeringAndLogic</span> <span className="operator">=</span> {'{'}</>,
    <div className="indent">  <span className="property">mathematics</span>: [<span className="string">'Abstract Algebra (Ring & Group Theory)'</span>, <span className="string">'Graph Theory'</span>, <span className="string">'Linear Algebra'</span>],</div>,
    <div className="indent">  <span className="property">logic</span>: [<span className="string">'Data Structures & Algorithms in JS'</span>, <span className="string">'System Design'</span>],</div>,
    <div className="indent">  <span className="property">tools</span>: [<span className="string">'Git/GitHub'</span>, <span className="string">'Vercel'</span>, <span className="string">'Postman'</span>, <span className="string">'Antigravity Platform'</span>]</div>,
    <>{'}'};</>,
    <div style={{ height: '1.2rem' }}></div>,
    <><span className="keyword">const</span> <span className="variable">nicheSpecializations</span> <span className="operator">=</span> {'{'}</>,
    <div className="indent">  <span className="property">iotIntegration</span>: <span className="string">'Real-time data handling (MQTT/WebSockets)'</span>,</div>,
    <div className="indent">  <span className="property">aiImplementation</span>: <span className="string">'Integrating generative AI tools into web ecosystems'</span>,</div>,
    <div className="indent">  <span className="property">dataScience</span>: <span className="string">'Transitioning foundational math into data modeling & analysis'</span></div>,
    <>{'}'};</>
  ];

  const trail = useTrail(lines.length, {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateX(0px)' : 'translateX(20px)',
    config: { mass: 1, tension: 280, friction: 30 },
    delay: 500
  });

  return (
    <animated.div ref={domRef} style={props} className="skills-terminal-wrapper">
      <BorderGlow
        edgeSensitivity={30}
        glowColor="0 0 100"
        backgroundColor="#0a0a0a"
        borderRadius={14}
        glowRadius={30}
        glowIntensity={0.5}
        coneSpread={25}
        animated={true}
        colors={['#ffffff', '#666666', '#111111']}
        className="terminal-glow-wrapper"
      >
        <div className="terminal-container">
          <div className="terminal-header">
            <div className="terminal-buttons">
              <span className="btn close"></span>
              <span className="btn minimize"></span>
              <span className="btn maximize"></span>
            </div>
            <div className="terminal-title">skills.js</div>
          </div>
          <div className="terminal-body">
            {trail.map((style, index) => (
              <animated.div style={style} key={index} className="code-line">
                {lines[index]}
              </animated.div>
            ))}
          </div>
        </div>
      </BorderGlow>
    </animated.div>
  );
};

export default SkillsTerminal;
