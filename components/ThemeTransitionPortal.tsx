'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeTransitionPortalProps {
  isTransitioning: boolean;
  direction: 'dark-to-light' | 'light-to-dark';
  currentPhase: 'entering' | 'swapped';
}

export default function ThemeTransitionPortal({
  isTransitioning,
  direction,
  currentPhase,
}: ThemeTransitionPortalProps) {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!isTransitioning) {
      setIsClosing(false);
      return;
    }

    // Begin pill smooth close animation slightly before unmount (at 1750ms of 2050ms total)
    const exitTimer = setTimeout(() => {
      setIsClosing(true);
    }, 1750);

    return () => clearTimeout(exitTimer);
  }, [isTransitioning]);

  if (!isTransitioning) return null;

  const isSwapped = currentPhase === 'swapped';
  // Both Light->Dark and Dark->Light execute identical physical choreography (Center -> Right Portal Dive).
  // Separate theme visual styling:
  // - dark-to-light: starts dark, transitions to light when swapped
  // - light-to-dark: starts light, transitions to dark when swapped
  const isLightNow = direction === 'dark-to-light' ? isSwapped : !isSwapped;

  return (
    <div
      className={`absolute right-0 top-1/2 -translate-y-1/2 z-50 origin-right w-[84px] md:w-[184px] h-[36px] md:h-[38px] rounded-full overflow-hidden border backdrop-blur-md pointer-events-auto select-none transition-all duration-300 ${
        isLightNow
          ? 'bg-[#FBF9F5]/95 border-[#E2DDD3] text-zinc-800 shadow-[0_4px_16px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.04)]'
          : 'bg-[#121614]/95 border-[#252D27] text-zinc-100 shadow-[0_4px_16px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.06)]'
      } ${
        isClosing
          ? 'opacity-0 scale-95 transition-all duration-300'
          : 'animate-in fade-in zoom-in-95 opacity-100 scale-100'
      }`}
      aria-live="polite"
      aria-label="Theme transition in progress"
    >
      {/* Subtle Ambient Inner Glow */}
      <div
        className={`absolute w-14 h-14 rounded-full blur-lg pointer-events-none -top-3 right-3 transition-colors duration-500 opacity-20 ${
          isLightNow ? 'bg-amber-400' : 'bg-[#C5F36A]'
        }`}
      />

      {/* Left Icon: Morphing Sun / Moon Indicator */}
      <div
        className={`absolute left-2 md:left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 md:w-5 md:h-5 flex items-center justify-center z-10 transition-all duration-400 ${
          isLightNow
            ? 'text-amber-500 scale-105'
            : 'text-zinc-100 scale-100'
        }`}
      >
        {isLightNow ? (
          <Sun
            key="sun-icon"
            className={`w-3.5 h-3.5 md:w-4 md:h-4 fill-current ${
              isSwapped ? 'animate-in zoom-in-75 duration-300' : ''
            }`}
          />
        ) : (
          <Moon
            key="moon-icon"
            className={`w-3.5 h-3.5 md:w-4 md:h-4 fill-current text-[#C5F36A] ${
              isSwapped ? 'animate-in zoom-in-75 duration-300' : ''
            }`}
          />
        )}
      </div>

      {/* Right Portal Cavity (z-10, Subterranean Radial Cavity Behind Actor) */}
      <div className="absolute right-1.5 md:right-3 bottom-1.5 w-5 md:w-8 h-2 md:h-2.5 z-10 pointer-events-none">
        <div
          className={`w-full h-full rounded-[50%] border-1.5 transition-all duration-400 ${
            isLightNow
              ? 'bg-[radial-gradient(ellipse_at_center,#000000_30%,#15110a_70%,#2b2010_100%)] border-amber-500 shadow-[inset_0_2px_6px_rgba(0,0,0,0.95),0_0_8px_rgba(245,158,11,0.35)]'
              : 'bg-[radial-gradient(ellipse_at_center,#000000_30%,#05080c_70%,#111822_100%)] border-[#C5F36A] shadow-[inset_0_2px_6px_rgba(0,0,0,0.95),0_0_8px_rgba(197,243,106,0.35)]'
          }`}
        />
      </div>

      {/* Desktop Character Actor Layer (z-20) - Identical Center-to-Right Choreography */}
      <div className="hidden md:block absolute inset-0 pointer-events-none overflow-hidden z-20">
        <div className="stickman-journey absolute bottom-1.5 left-0 w-[16px] h-[22px] animate-short-dive">
          <svg
            viewBox="0 0 24 36"
            width="16"
            height="22"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2.0"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Tiny White Stickman Body & Head */}
            <g className="theme-body-bob">
              <circle cx="12" cy="5.5" r="3.2" fill="#FFFFFF" stroke="none" />
              <line x1="12" y1="9" x2="12" y2="20" />
            </g>
            {/* Natural Limb Swing */}
            <path className="theme-arm-back" d="M12 13 L7 18" />
            <path className="theme-arm-front" d="M12 13 L17 18" />
            <path className="theme-leg-back" d="M12 20 L7 31" />
            <path className="theme-leg-front" d="M12 20 L17 31" />
          </svg>
        </div>
      </div>

      {/* Mobile Character Actor Layer (z-20) - Identical Center-to-Right Choreography */}
      <div className="block md:hidden absolute inset-0 pointer-events-none overflow-hidden z-20">
        <div className="stickman-journey absolute bottom-1.5 left-0 w-[12px] h-[16px] animate-short-dive-mobile">
          <svg
            viewBox="0 0 24 36"
            width="12"
            height="16"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <g className="theme-body-bob">
              <circle cx="12" cy="5.5" r="3.2" fill="#FFFFFF" stroke="none" />
              <line x1="12" y1="9" x2="12" y2="20" />
            </g>
            <path className="theme-arm-back" d="M12 13 L7 18" />
            <path className="theme-arm-front" d="M12 13 L17 18" />
            <path className="theme-leg-back" d="M12 20 L7 31" />
            <path className="theme-leg-front" d="M12 20 L17 31" />
          </svg>
        </div>
      </div>

      {/* Right Portal Front Lip (z-30: Genuine 3D Subterranean Front-Rim Occlusion) */}
      <div className="absolute right-1.5 md:right-3 bottom-1.5 w-5 md:w-8 h-1 md:h-1.25 z-30 pointer-events-none overflow-hidden">
        <div
          className={`w-5 md:w-8 h-2 md:h-2.5 -mt-1 md:-mt-1.25 rounded-[50%] border-1.5 transition-all duration-400 ${
            isLightNow
              ? 'border-amber-500 shadow-[0_1px_4px_rgba(245,158,11,0.5)]'
              : 'border-[#C5F36A] shadow-[0_1px_4px_rgba(197,243,106,0.5)]'
          }`}
          style={{
            clipPath: 'inset(50% 0 0 0)',
          }}
        />
      </div>
    </div>
  );
}
