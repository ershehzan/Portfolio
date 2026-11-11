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

    // Begin pill smooth close animation slightly before unmount
    const exitTimer = setTimeout(() => {
      setIsClosing(true);
    }, 950);

    return () => clearTimeout(exitTimer);
  }, [isTransitioning]);

  if (!isTransitioning) return null;

  const isDestinationLight = direction === 'dark-to-light';
  const isSwapped = currentPhase === 'swapped';

  return (
    <div
      className={`absolute right-0 top-full mt-2.5 z-50 origin-top-right w-[204px] h-[48px] rounded-full overflow-hidden border backdrop-blur-md pointer-events-auto select-none transition-all duration-300 ${
        isDestinationLight && isSwapped
          ? 'bg-[#F9F6F0]/95 border-[#E2DDD3] text-zinc-800 shadow-[0_12px_32px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.8)]'
          : 'bg-[#0B0E0C]/95 border-[#252D27] text-zinc-100 shadow-[0_12px_32px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.08),inset_0_1px_0_rgba(255,255,255,0.1)]'
      } ${
        isClosing
          ? 'opacity-0 scale-95 transition-all duration-200'
          : 'animate-in fade-in zoom-in-95 opacity-100 scale-100'
      }`}
      aria-live="polite"
      aria-label="Theme transition in progress"
    >
      {/* Subtle Ambient Inner Glow */}
      <div
        className={`absolute w-20 h-20 rounded-full blur-xl pointer-events-none -top-4 right-5 transition-colors duration-400 opacity-30 ${
          isDestinationLight ? 'bg-amber-400' : 'bg-[#C5F36A]'
        }`}
      />

      {/* Left Icon: Morphing Sun / Moon Indicator */}
      <div
        className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center z-10 transition-all duration-300 ${
          isDestinationLight && isSwapped
            ? 'text-amber-500 scale-105'
            : 'text-zinc-100 scale-100'
        }`}
      >
        {isSwapped ? (
          isDestinationLight ? (
            <Sun className="w-4 h-4 fill-current animate-in zoom-in-75 duration-300" />
          ) : (
            <Moon className="w-4 h-4 fill-current text-[#C5F36A] animate-in zoom-in-75 duration-300" />
          )
        ) : isDestinationLight ? (
          <Moon className="w-4 h-4 fill-current text-zinc-300" />
        ) : (
          <Sun className="w-4 h-4 fill-current text-amber-400" />
        )}
      </div>

      {/* Right Portal Cavity (z-10) */}
      <div className="absolute right-4.5 bottom-2 w-9 h-3 z-10 pointer-events-none">
        <div
          className={`w-full h-full rounded-[50%] border-1.5 transition-all duration-400 ${
            isDestinationLight
              ? 'bg-[radial-gradient(ellipse_at_center,#000000_30%,#15110a_70%,#2b2010_100%)] border-amber-500 shadow-[inset_0_3px_8px_rgba(0,0,0,0.95),0_0_10px_rgba(245,158,11,0.4)]'
              : 'bg-[radial-gradient(ellipse_at_center,#000000_30%,#05080c_70%,#111822_100%)] border-[#C5F36A] shadow-[inset_0_3px_8px_rgba(0,0,0,0.95),0_0_10px_rgba(197,243,106,0.4)]'
          }`}
        />
      </div>

      {/* Character Actor Layer (z-20) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        <div className="stickman-journey absolute bottom-2 left-0 w-[18px] h-[24px] animate-short-dive">
          <svg
            viewBox="0 0 24 36"
            width="18"
            height="24"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2.2"
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

      {/* Right Portal Front Lip (z-30: Genuine 3D Subterranean Front-Rim Occlusion) */}
      <div className="absolute right-4.5 bottom-2 w-9 h-1.5 z-30 pointer-events-none overflow-hidden">
        <div
          className={`w-9 h-3 -mt-1.5 rounded-[50%] border-1.5 transition-all duration-400 ${
            isDestinationLight
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
