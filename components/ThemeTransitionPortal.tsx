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
      className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-auto bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
      aria-live="polite"
      aria-label="Theme transition in progress"
    >
      <div
        className={`relative w-[340px] sm:w-[430px] h-[136px] rounded-3xl p-4 overflow-hidden shadow-2xl transition-all duration-500 border ${
          isNowLight
            ? 'bg-[#f4efe6] border-[#ded5c5] text-zinc-800 shadow-amber-900/10'
            : 'bg-[#13161c] border-[#252c38] text-zinc-100 shadow-black/60'
        }`}
      >
        {/* Subtle Ambient Glow */}
        <div
          className={`absolute -top-10 -left-10 w-36 h-36 rounded-full blur-2xl pointer-events-none transition-colors duration-500 ${
            isNowLight ? 'bg-amber-400/20' : 'bg-[#C5F36A]/15'
          }`}
        />

        {/* Header Status Label */}
        <div className="flex items-center justify-between text-[10px] font-mono font-bold tracking-widest uppercase mb-1">
          <span className={isNowLight ? 'text-amber-800/80' : 'text-[#C5F36A]'}>
            {direction === 'dark-to-light' ? '● ENTERING LIGHT MODE' : '● ENTERING DARK MODE'}
          </span>
          <span className={isNowLight ? 'text-zinc-500' : 'text-zinc-400'}>
            PORTAL SHIFT
          </span>
        </div>

        {/* Ground Track */}
        <div
          className={`absolute left-6 right-6 bottom-7 h-[2px] rounded-full transition-colors duration-500 ${
            isNowLight
              ? 'bg-gradient-to-r from-zinc-300 via-zinc-400 to-zinc-300'
              : 'bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800'
          }`}
        />

        {/* Origin World Knob (Left Side) */}
        <div
          className={`absolute left-6 bottom-4 w-9 h-9 rounded-full flex items-center justify-center shadow-lg border transition-all duration-500 ${
            isStartingDark
              ? 'bg-zinc-900 border-zinc-700 text-[#C5F36A] shadow-[#C5F36A]/10'
              : 'bg-amber-50 border-amber-200 text-amber-500 shadow-amber-500/10'
          }`}
        >
          {isStartingDark ? (
            <Moon className="w-4 h-4 fill-[#C5F36A]/30" />
          ) : (
            <Sun className="w-4 h-4 fill-amber-500/30" />
          )}
        </div>

        {/* Destination World Indicator (Right Side) */}
        <div
          className={`absolute right-6 bottom-4 w-9 h-9 rounded-full flex items-center justify-center shadow-lg border transition-all duration-500 ${
            isStartingDark
              ? 'bg-amber-100/80 border-amber-300 text-amber-600 shadow-amber-500/20'
              : 'bg-zinc-900 border-zinc-700 text-[#C5F36A] shadow-[#C5F36A]/20'
          }`}
        >
          {isStartingDark ? (
            <Sun className="w-4 h-4 fill-amber-500/30" />
          ) : (
            <Moon className="w-4 h-4 fill-[#C5F36A]/30" />
          )}
        </div>

        {/* 3D Portal Hole in the Center */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-5 w-24 h-7 z-10 pointer-events-none">
          <div
            className={`w-full h-full rounded-[50%] transition-all duration-500 ${
              isNowLight
                ? 'bg-[radial-gradient(ellipse_at_center,#18181b_20%,#3f3f46_70%,#71717a_100%)] border-2 border-amber-500 shadow-[inset_0_4px_10px_rgba(0,0,0,0.8),0_0_16px_rgba(245,158,11,0.5)]'
                : 'bg-[radial-gradient(ellipse_at_center,#000000_20%,#090d14_70%,#182130_100%)] border-2 border-[#C5F36A] shadow-[inset_0_4px_10px_rgba(0,0,0,0.9),0_0_18px_rgba(197,243,106,0.5)]'
            }`}
          />
        </div>

        {/* Animated Stickman Character Journey */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="theme-char-journey absolute bottom-7 left-0 w-8 h-12 z-20">
            <svg
              viewBox="0 0 32 48"
              width="32"
              height="48"
              fill="none"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-colors duration-300 ${
                isNowLight ? 'stroke-zinc-900' : 'stroke-[#C5F36A]'
              }`}
            >
              {/* Head */}
              <circle
                cx="16"
                cy="8"
                r="4.5"
                className={`transition-colors duration-300 ${
                  isNowLight ? 'fill-zinc-900' : 'fill-[#C5F36A]'
                }`}
              />
              {/* Torso */}
              <line x1="16" y1="13" x2="16" y2="28" />
              {/* Arms */}
              <path className="theme-arm-back" d="M16 18 L9 24" />
              <path className="theme-arm-front" d="M16 18 L23 24" />
              {/* Legs */}
              <path className="theme-leg-back" d="M16 28 L10 42" />
              <path className="theme-leg-front" d="M16 28 L22 42" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
