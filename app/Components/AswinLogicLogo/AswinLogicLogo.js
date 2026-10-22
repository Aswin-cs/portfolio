import React, { useState, useEffect, useRef, useCallback } from 'react';

// Audio sources in /public/sfx
const SFX_PULSE = '/sfx/Precision_15-pulse_1st.wav';

const AswinLogicLogo = ({
  className = '',
  style = {},
  color = "#ffffff",
  sound = true,
  playOnMount = false
}) => {
  const [playCount, setPlayCount] = useState(0);
  const timeoutsRef = useRef([]);
  const activeAudiosRef = useRef([]);

  const sigma = [
    { x: 60, y: 10 }, { x: 70, y: 10 }, { x: 80, y: 10 }, { x: 90, y: 10 }, { x: 100, y: 10 },
    { x: 90, y: 20 },
    { x: 80, y: 30 },
    { x: 70, y: 40 },
    { x: 80, y: 50 },
    { x: 90, y: 60 },
    { x: 60, y: 70 }, { x: 70, y: 70 }, { x: 80, y: 70 }, { x: 90, y: 70 }, { x: 100, y: 70 }
  ];

  const triggerHaptic = useCallback(() => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate([
          15, 35, 15, 35, 15, 35, 15, 35, 15, 35,
          15, 35, 15, 35, 15, 35, 15, 35, 15, 35,
          15, 35, 15, 35, 15, 35, 15, 35, 15
        ]);
      } catch (e) {}
    }
  }, []);

  const clearPendingSounds = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    activeAudiosRef.current.forEach((audio) => {
      try {
        audio.pause();
        audio.currentTime = 0;
      } catch (e) {}
    });
    activeAudiosRef.current = [];
  }, []);

  const playAudio = useCallback((src, volume = 0.6) => {
    if (!sound || typeof window === 'undefined') return;
    try {
      const audio = new Audio(src);
      audio.volume = volume;
      activeAudiosRef.current.push(audio);
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser policy blocks autoplay, unlock on the first user interaction
          const unlock = () => {
            audio.play().catch(() => {});
            window.removeEventListener('pointerdown', unlock);
            window.removeEventListener('keydown', unlock);
          };
          window.addEventListener('pointerdown', unlock, { once: true });
          window.addEventListener('keydown', unlock, { once: true });
        });
      }
      audio.onended = () => {
        activeAudiosRef.current = activeAudiosRef.current.filter((a) => a !== audio);
      };
    } catch (e) {}
  }, [sound]);

  const triggerAudioSequence = useCallback((isInitial = false) => {
    clearPendingSounds();
    if (!sound) return;

    if (isInitial) {
      // File 1 (1.00s – 1.75s): The 15-pixel Sigma (\Sigma) staging arpeggio at 20Hz (50ms intervals)
      const t1 = setTimeout(() => {
        playAudio(SFX_PULSE, 0.6);
        triggerHaptic();
      }, 1000);

      timeoutsRef.current.push(t1);
    } else {
      // Immediate playback matching Sigma pixel pop (0s to 0.75s) and navigator.vibrate
      playAudio(SFX_PULSE, 0.6);
      triggerHaptic();
    }
  }, [clearPendingSounds, playAudio, sound, triggerHaptic]);

  useEffect(() => {
    if (playOnMount) {
      triggerAudioSequence(true);
    }

    return () => {
      // Clear pending timers if unmounted before 1.0s
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, [playOnMount, triggerAudioSequence]);

  const triggerInteraction = () => {
    setPlayCount((c) => c + 1);
    triggerAudioSequence(false);
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-10 -10 220 120"
      className={className}
      style={{ display: 'block', maxWidth: '100%', height: 'auto', cursor: 'pointer', pointerEvents: 'all', ...style }}
      onMouseEnter={triggerInteraction}
      onClick={triggerInteraction}
      onTouchStart={triggerInteraction}
    >
      {/* Transparent hit area ensuring full click/hover coverage */}
      <rect x="-10" y="-10" width="220" height="120" fill="transparent" />
      <style>
        {`
          .al-slash-group {
            opacity: 0;
            animation: alFlyIn 0.5s cubic-bezier(0.25, 1, 0.5, 1) forwards;
          }
          .al-bracket-group {
            opacity: 0;
            animation: alFadeIn 0.5s 0.5s forwards;
          }
          .al-sigma-pixel {
            opacity: 0;
            transform-box: fill-box;
            transform-origin: center;
            animation: alPopIn 0.3s forwards;
          }
          .al-cursor-pixel {
            opacity: 0;
            animation: alBlink 1s 2.25s infinite;
          }

          @keyframes alFlyIn {
            0% { transform: translateX(-100px); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }
          @keyframes alFadeIn {
            0% { opacity: 0; }
            100% { opacity: 0.4; }
          }
          @keyframes alPopIn {
            0% { transform: scale(0); opacity: 0; }
            70% { transform: scale(1.2); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes alBlink {
            0%, 49% { opacity: 1; }
            50%, 100% { opacity: 0; }
          }
        `}
      </style>

      {/* Brackets */}
      <g className="al-bracket-group" fill="none" stroke={"#d5d5d5ff"} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 45 10 L 15 40 L 45 70" />
        <path d="M 165 10 L 195 40 L 165 70" />
      </g>

      {/* Slash */}
      <g className="al-slash-group" fill="none" stroke={"#d9d9d9c9"} strokeWidth="10" strokeLinecap="round">
        <path d="M 150 10 L 125 70" />
      </g>

      {/* Sigma */}
      <g fill={"#ffffffff"} key={`sigma-${playCount}`}>
        {sigma.map((p, i) => (
          <rect
            key={`sig-${i}`}
            x={p.x}
            y={p.y}
            width="10"
            height="10"
            className="al-sigma-pixel"
            style={{ animationDelay: `${(playCount === 0 ? 1.0 : 0) + i * 0.05}s` }}
          />
        ))}
      </g>

      {/* Cursor */}
      <rect
        key={`cursor-${playCount}`}
        className="al-cursor-pixel"
        x="60"
        y="90"
        width="50"
        height="10"
        fill={color}
        style={{ animationDelay: `${playCount === 0 ? 2.25 : 1.25}s` }}
      />
    </svg>
  );
};

export default AswinLogicLogo;
