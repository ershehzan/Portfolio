'use client';

import React from 'react';
import { ArrowRight, ArrowUpRight, Terminal, ShieldCheck, Cpu } from 'lucide-react';
import SplitText from './react-bits/SplitText';

interface HeroProps {
  onCopyEmail?: () => void;
}

export default function Hero({ onCopyEmail }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex flex-col justify-between pt-24 sm:pt-28 pb-8 sm:pb-12 px-6 md:px-12 lg:px-20 overflow-hidden grid-canvas"
    >
      {/* Layer 1 & 2: Cinematic Background Video with Restrained Theme-Aware Gradient Overlays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/assets/bg-video-poster.png"
          className="w-full h-full object-cover opacity-65 dark:opacity-55 transition-opacity duration-700"
        >
          <source src="/videos/BG_Video.mp4" type="video/mp4" />
        </video>
        {/* Layer 2 (Dark Mode): Restrained Dark Gradient — Keeps text legible while footage shines on right */}
        <div className="hidden dark:block absolute inset-0 bg-gradient-to-r from-[#0B0E0C]/80 via-[#0B0E0C]/40 to-transparent" />
        <div className="hidden dark:block absolute inset-0 bg-gradient-to-t from-[#0B0E0C] via-transparent to-[#0B0E0C]/25" />
        {/* Layer 2 (Light Mode): Soft Warm Neutral Gradient — Preserves video details with crisp text contrast */}
        <div className="block dark:hidden absolute inset-0 bg-gradient-to-r from-[#F5F5EF]/85 via-[#F5F5EF]/45 to-transparent" />
        <div className="block dark:hidden absolute inset-0 bg-gradient-to-t from-[#F5F5EF] via-transparent to-[#F5F5EF]/20" />
      </div>

      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-theme-accent/10 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-1/3 -right-32 w-[28rem] h-[28rem] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Main Content Area */}
      <div className="relative z-10 my-auto pt-2 pb-6 sm:py-6 max-w-5xl">
        {/* Massive Display Headline Animated via SplitText */}
        <SplitText
          lines={['ENGINEER.', 'BUILD.', 'SOLVE.']}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.25rem] font-black tracking-tighter leading-[0.9] text-theme-text select-none"
        />

        {/* Subtitle / Positioning Statement */}
        <div className="mt-7 md:mt-9 max-w-2xl">
          <p className="text-base sm:text-lg md:text-xl text-theme-muted font-normal leading-relaxed">
            Software Engineer specializing in <span className="text-theme-text font-semibold">C++</span>,{' '}
            <span className="text-theme-text font-semibold">backend engineering</span>, and{' '}
            <span className="text-theme-text font-semibold">multi-objective optimization</span>.
            I design reliable systems built to perform under real-world constraints.
          </p>

          {/* Quick Technical Highlights */}
          <div className="flex flex-wrap items-center gap-2.5 mt-6 text-xs font-mono text-theme-text">
            <span className="px-3 py-1.5 rounded-full bg-theme-surface/90 backdrop-blur-sm border border-theme-border flex items-center gap-1.5 shadow-sm">
              <Cpu className="w-3.5 h-3.5 text-theme-accent" />
              C++17 Winsock & OpenSSL
            </span>
            <span className="px-3 py-1.5 rounded-full bg-theme-surface/90 backdrop-blur-sm border border-theme-border flex items-center gap-1.5 shadow-sm">
              <Terminal className="w-3.5 h-3.5 text-theme-accent" />
              Multi-Objective Genetic Algorithms
            </span>
            <span className="px-3 py-1.5 rounded-full bg-theme-surface/90 backdrop-blur-sm border border-theme-border flex items-center gap-1.5 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-theme-accent" />
              1,335+ Verified DSA Solved
            </span>
          </div>
        </div>

        {/* Action Button Row */}
        <div className="flex flex-wrap items-center gap-3.5 mt-8 sm:mt-9">
          <a
            href="#work"
            className="px-7 py-3 rounded-full bg-theme-text text-theme-bg text-xs sm:text-sm font-semibold tracking-wide border border-transparent hover:bg-theme-accent hover:text-theme-accentContrast transition-all duration-200 flex items-center gap-2 shadow-lg group"
          >
            <span>VIEW MY WORK</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>

          <a
            href="https://codolio.com/profile/Shehzan_Khan"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-pill px-7 py-3 rounded-full text-theme-text text-xs sm:text-sm font-semibold tracking-wide hover:border-theme-accent transition-all duration-200 flex items-center gap-2 shadow-sm group"
          >
            <span>CODOLIO PROFILE</span>
            <ArrowUpRight className="w-4 h-4 text-theme-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=ershehzankhan@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-theme-muted hover:text-theme-text underline underline-offset-4 ml-1 transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>ershehzankhan@gmail.com</span>
            <ArrowUpRight className="w-3 h-3 text-theme-accent inline" />
          </a>
        </div>
      </div>

      {/* Bottom Row / Scroll Cue */}
      <div className="relative z-10 flex items-center justify-between text-xs font-mono text-theme-muted border-t border-theme-border pt-4">
        <a
          href="#work"
          className="flex items-center gap-2 hover:text-theme-accent transition-colors"
        >
          <span className="inline-block w-6 h-[1px] bg-current" />
          <span>SCROLL</span>
        </a>

        <div className="flex items-center gap-2 text-theme-subtle text-[11px]">
          <span>FIG 01 // OVERVIEW</span>
        </div>
      </div>
    </section>
  );
}
