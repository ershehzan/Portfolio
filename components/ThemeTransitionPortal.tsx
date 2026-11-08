'use client';

import React from 'react';
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
  if (!isTransitioning) return null;

  const isStartingDark = direction === 'dark-to-light';
  const isNowLight = currentPhase === 'swapped' ? isStartingDark : !isStartingDark;

  return (
    <div
      className={`absolute right-0 top-full mt-3 z-50 origin-top-right w-[calc(100vw-32px)] max-w-[480px] sm:w-[480px] h-[150px] sm:h-[165px] rounded-3xl p-4 sm:p-5 overflow-hidden shadow-2xl transition-all duration-300 animate-in fade-in zoom-in-95 border ${
        isNowLight
          ? 'bg-[#f4efe6] border-[#ded5c5] text-zinc-800 shadow-amber-950/15'
          : 'bg-[#12151b] border-[#252c38] text-zinc-100 shadow-black/80'
      }`}
      style={{
        // subtle perspective for depth
        perspective: '800px',
      }}
      aria-live="polite"
      aria-label="Theme transition in progress"
    >
      {/* Subtle Ambient Glow inside panel */}
      <div
        className={`absolute -top-10 -left-10 w-40 h-40 rounded-full blur-2xl pointer-events-none transition-colors duration-500 ${
          isNowLight ? 'bg-amber-400/20' : 'bg-[#C5F36A]/15'
        }`}
      />

      {/* Header Status Label */}
      <div className="flex items-center justify-between text-[10px] font-mono font-bold tracking-widest uppercase mb-1">
        <span className={isNowLight ? 'text-amber-800' : 'text-[#C5F36A]'}>
          {direction === 'dark-to-light' ? '● ENTERING LIGHT MODE' : '● ENTERING DARK MODE'}
        </span>
        <span className={isNowLight ? 'text-zinc-500' : 'text-zinc-400'}>
          PORTAL SHIFT
        </span>
      </div>

      {/* Ground Track */}
      <div
        className={`absolute left-6 right-6 bottom-8 sm:bottom-9 h-[2px] rounded-full transition-colors duration-500 ${
          isNowLight
            ? 'bg-gradient-to-r from-zinc-300 via-zinc-400 to-zinc-300'
            : 'bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800'
        }`}
      />

      {/* Sun Icon on the Left */}
      <div
        className={`absolute left-6 bottom-5 sm:bottom-6 w-9 h-9 rounded-full flex items-center justify-center shadow-lg border transition-all duration-500 ${
          !isNowLight
            ? 'bg-zinc-900 border-zinc-700 text-amber-400/70 shadow-black/40'
            : 'bg-amber-100 border-amber-300 text-amber-600 shadow-amber-500/25 ring-2 ring-amber-400/30'
        }`}
      >
        <Sun className="w-4 h-4 fill-current" />
      </div>

      {/* Moon Icon on the Right */}
      <div
        className={`absolute right-6 bottom-5 sm:bottom-6 w-9 h-9 rounded-full flex items-center justify-center shadow-lg border transition-all duration-500 ${
          !isNowLight
            ? 'bg-zinc-900 border-[#C5F36A]/40 text-[#C5F36A] shadow-[#C5F36A]/20 ring-2 ring-[#C5F36A]/30'
            : 'bg-zinc-100 border-zinc-300 text-zinc-400 shadow-zinc-300/40'
        }`}
      >
        <Moon className="w-4 h-4 fill-current" />
      </div>

      {/* 3D Portal Hole in the Middle */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-5 sm:bottom-6 w-28 h-8 z-10 pointer-events-none">
        <div
          className={`w-full h-full rounded-[50%] transition-all duration-500 ${
            isNowLight
              ? 'bg-[radial-gradient(ellipse_at_center,#18181b_20%,#3f3f46_70%,#71717a_100%)] border-2 border-amber-500 shadow-[inset_0_4px_12px_rgba(0,0,0,0.85),0_0_20px_rgba(245,158,11,0.5)]'
              : 'bg-[radial-gradient(ellipse_at_center,#000000_20%,#090d14_70%,#182130_100%)] border-2 border-[#C5F36A] shadow-[inset_0_4px_12px_rgba(0,0,0,0.95),0_0_22px_rgba(197,243,106,0.6)]'
          }`}
        />
      </div>

      {/* Animated Lime-Green Stickman Character Journey */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className={`theme-char-journey absolute bottom-8 sm:bottom-9 left-0 w-8 h-12 z-20 ${
            direction === 'light-to-dark' ? 'journey-ltr' : 'journey-rtl'
          }`}
        >
          <svg
            viewBox="0 0 32 48"
            width="32"
            height="48"
            fill="none"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-[#C5F36A]"
          >
            {/* Head */}
            <circle
              cx="16"
              cy="8"
              r="4.5"
              className="fill-[#C5F36A]"
            />
            {/* Torso */}
            <line x1="16" y1="13" x2="16" y2="28" />
            {/* Arms with animated swing */}
            <path className="theme-arm-back" d="M16 18 L9 24" />
            <path className="theme-arm-front" d="M16 18 L23 24" />
            {/* Legs with animated swing */}
            <path className="theme-leg-back" d="M16 28 L10 42" />
            <path className="theme-leg-front" d="M16 28 L22 42" />
          </svg>
        </div>
      </div>
    </div>
  );
}
