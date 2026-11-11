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

    // Begin capsule smooth close animation slightly before unmount
    const exitTimer = setTimeout(() => {
      setIsClosing(true);
    }, 1150);

    return () => clearTimeout(exitTimer);
  }, [isTransitioning]);

  if (!isTransitioning) return null;

  const isLTR = direction === 'light-to-dark';
  const isDestinationLight = direction === 'dark-to-light';
  const isSwapped = currentPhase === 'swapped';

  // Active node logic: departure active before swap, destination active after swap
  const sunActive = isLTR ? !isSwapped : isSwapped;
  const moonActive = isLTR ? isSwapped : !isSwapped;

  return (
    <div
      className={`absolute right-0 top-full mt-2.5 z-50 origin-top-right w-[calc(100vw-32px)] max-w-[340px] h-[112px] rounded-2xl p-3 sm:p-3.5 overflow-hidden border backdrop-blur-md transition-all duration-300 pointer-events-auto select-none ${
        isDestinationLight && isSwapped
          ? 'bg-[#F9F6F0]/95 border-[#E2DDD3] text-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.8)]'
          : 'bg-[#0B0E0C]/95 border-[#252D27] text-zinc-100 shadow-[0_20px_50px_rgba(0,0,0,0.75),0_0_0_1px_rgba(255,255,255,0.08),inset_0_1px_0_rgba(255,255,255,0.1)]'
      } ${isClosing ? 'opacity-0 scale-95 transition-all duration-200' : 'animate-in fade-in zoom-in-95 opacity-100 scale-100'}`}
      style={{
        perspective: '800px',
      }}
      aria-live="polite"
      aria-label="Theme transition in progress"
    >
      {/* Soft Ambient Interior Glow */}
      <div
        className={`absolute w-36 h-36 rounded-full blur-2xl pointer-events-none -top-10 left-20 transition-colors duration-500 opacity-25 ${
          isDestinationLight ? 'bg-amber-400' : 'bg-[#C5F36A]'
        }`}
      />

      {/* Header Status Label */}
      <div className="flex items-center justify-between font-mono text-[9px] font-bold tracking-widest uppercase mb-1 relative z-10">
        <div
          className={`flex items-center gap-1.5 transition-colors duration-300 ${
            isDestinationLight ? 'text-amber-600' : 'text-[#C5F36A]'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          <span>{isDestinationLight ? 'ENTERING LIGHT MODE' : 'ENTERING DARK MODE'}</span>
        </div>
        <span className="text-zinc-500 text-[8.5px]">PORTAL SHIFT</span>
      </div>

      {/* Ground Track Line */}
      <div
        className={`absolute left-5 right-5 bottom-7 h-[1.5px] rounded-full transition-colors duration-400 z-10 ${
          isDestinationLight && isSwapped
            ? 'bg-gradient-to-r from-zinc-300 via-zinc-400 to-zinc-300'
            : 'bg-gradient-to-r from-zinc-800 via-zinc-600 to-zinc-800'
        }`}
      />

      {/* Sun Node (Left) */}
      <div
        className={`absolute left-4 bottom-3.5 w-7 h-7 rounded-full flex items-center justify-center border z-10 transition-all duration-400 ${
          sunActive
            ? 'bg-amber-100 border-amber-400 text-amber-600 shadow-[0_0_14px_rgba(245,158,11,0.55)] scale-105'
            : 'bg-zinc-900/80 border-zinc-700/60 text-zinc-500'
        }`}
      >
        <Sun className="w-3.5 h-3.5" />
      </div>

      {/* Moon Node (Right) */}
      <div
        className={`absolute right-4 bottom-3.5 w-7 h-7 rounded-full flex items-center justify-center border z-10 transition-all duration-400 ${
          moonActive
            ? 'bg-zinc-900 border-[#C5F36A] text-[#C5F36A] shadow-[0_0_14px_rgba(197,243,106,0.55)] scale-105'
            : 'bg-zinc-900/80 border-zinc-700/60 text-zinc-500'
        }`}
      >
        <Moon className="w-3.5 h-3.5 fill-current" />
      </div>

      {/* 3D Portal Hole Cavity Depth (Behind Character: z-10) */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[17px] w-[74px] h-[22px] z-10 pointer-events-none">
        {/* Soft Portal Glow */}
        <div
          className={`absolute inset-0 rounded-[50%] blur-sm transition-all duration-500 ${
            isDestinationLight ? 'bg-amber-500/20' : 'bg-[#C5F36A]/20'
          }`}
        />
        {/* Deep Subterranean Black Void */}
        <div
          className={`w-full h-full rounded-[50%] border-1.5 transition-all duration-500 ${
            isDestinationLight
              ? 'bg-[radial-gradient(ellipse_at_center,#000000_20%,#15120c_65%,#2b2214_100%)] border-amber-500 shadow-[inset_0_5px_12px_rgba(0,0,0,0.95),0_0_16px_rgba(245,158,11,0.45)]'
              : 'bg-[radial-gradient(ellipse_at_center,#000000_20%,#05080c_65%,#0f161f_100%)] border-[#C5F36A] shadow-[inset_0_5px_12px_rgba(0,0,0,0.95),0_0_16px_rgba(197,243,106,0.45)]'
          }`}
        />
      </div>

      {/* Character Actor Layer (z-20) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        <div
          className={`stickman-journey absolute bottom-7 left-0 w-[26px] h-[38px] ${
            isLTR ? 'journey-ltr' : 'journey-rtl'
          }`}
        >
          <svg
            viewBox="0 0 32 48"
            width="26"
            height="38"
            fill="none"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={isLTR ? 'stickman-ltr-color' : 'stickman-rtl-color'}
          >
            {/* Head and Torso with animated body bobbing */}
            <g className="theme-body-bob">
              <circle cx="16" cy="7.5" r="4.2" stroke="none" />
              <line x1="16" y1="12" x2="16" y2="27" />
            </g>
            {/* Arms with animated natural swing */}
            <path className="theme-arm-back" d="M16 17 L9 23" />
            <path className="theme-arm-front" d="M16 17 L23 23" />
            {/* Legs with animated natural swing */}
            <path className="theme-leg-back" d="M16 27 L10 41" />
            <path className="theme-leg-front" d="M16 27 L22 41" />
          </svg>
        </div>
      </div>

      {/* 3D Portal Front Lip (In Front of Character: z-30 for Genuine 3D Subterranean Occlusion) */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[17px] w-[74px] h-[11px] z-30 pointer-events-none overflow-hidden">
        <div
          className={`w-[74px] h-[22px] -mt-[11px] rounded-[50%] border-1.5 transition-all duration-500 ${
            isDestinationLight
              ? 'border-amber-500 shadow-[0_2px_8px_rgba(245,158,11,0.6)]'
              : 'border-[#C5F36A] shadow-[0_2px_8px_rgba(197,243,106,0.6)]'
          }`}
          style={{
            clipPath: 'inset(50% 0 0 0)',
          }}
        />
      </div>
    </div>
  );
}
