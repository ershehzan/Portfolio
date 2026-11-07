'use client';

import React from 'react';
import { ArrowRight, ArrowUpRight, Terminal, ShieldCheck, Cpu } from 'lucide-react';

interface HeroProps {
  onCopyEmail: () => void;
}

export default function Hero({ onCopyEmail }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex flex-col justify-between pt-28 pb-12 px-6 md:px-12 lg:px-20 overflow-hidden grid-canvas"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-theme-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -right-32 w-[28rem] h-[28rem] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative technical coordinate badge */}
      <div className="flex items-center justify-between text-xs font-mono text-theme-muted tracking-widest pt-4">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-theme-accent animate-ping" />
          <span>SYS // DEV_ID: SK-2026 // INDIA</span>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <span>LAT: 22.7196° N, 75.8577° E</span>
          <span className="text-theme-accent font-semibold">● ACTIVE</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="my-auto py-10 max-w-5xl">
        {/* Massive Display Headline */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.25rem] font-black tracking-tighter leading-[0.9] text-theme-text select-none">
          ENGINEER.
          <br />
          BUILD.
          <br />
          SOLVE.
        </h1>

        {/* Subtitle / Positioning Statement */}
        <div className="mt-8 md:mt-10 max-w-2xl">
          <p className="text-base sm:text-lg md:text-xl text-theme-muted font-normal leading-relaxed">
            Software Engineer specializing in <span className="text-theme-text font-semibold">C++</span>,{' '}
            <span className="text-theme-text font-semibold">backend engineering</span>, and{' '}
            <span className="text-theme-text font-semibold">multi-objective optimization</span>.
            I design reliable systems built to perform under real-world constraints.
          </p>

          {/* Quick Technical Highlights */}
          <div className="flex flex-wrap items-center gap-2.5 mt-6 text-xs font-mono text-theme-text">
            <span className="px-3 py-1.5 rounded-full bg-theme-surface border border-theme-border flex items-center gap-1.5 shadow-sm">
              <Cpu className="w-3.5 h-3.5 text-theme-accent" />
              C++17 Winsock & OpenSSL
            </span>
            <span className="px-3 py-1.5 rounded-full bg-theme-surface border border-theme-border flex items-center gap-1.5 shadow-sm">
              <Terminal className="w-3.5 h-3.5 text-theme-accent" />
              Multi-Objective Genetic Algorithms
            </span>
            <span className="px-3 py-1.5 rounded-full bg-theme-surface border border-theme-border flex items-center gap-1.5 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-theme-accent" />
              1,335+ Verified DSA Solved
            </span>
          </div>
        </div>

        {/* Action Button Row */}
        <div className="flex flex-wrap items-center gap-3.5 mt-9">
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

          <button
            onClick={onCopyEmail}
            className="text-xs font-mono text-theme-muted hover:text-theme-text underline underline-offset-4 ml-1 transition-colors cursor-pointer"
          >
            ershehzankhan@gmail.com
          </button>
        </div>
      </div>

      {/* Bottom Row / Scroll Cue */}
      <div className="flex items-center justify-between text-xs font-mono text-theme-muted border-t border-theme-border pt-4">
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
