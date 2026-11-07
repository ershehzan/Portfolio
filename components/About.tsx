'use client';

import React from 'react';
import Image from 'next/image';
import { Github, Linkedin, Award, Code, CheckCircle2, ArrowUpRight } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 px-6 md:px-12 lg:px-20 border-t border-theme-border bg-theme-elevated transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-14">
          <span className="text-xs font-mono text-theme-accent font-bold tracking-widest uppercase">02</span>
          <span className="h-4 w-[1px] bg-theme-border" />
          <h2 className="text-xs font-mono tracking-widest text-theme-muted uppercase font-semibold">
            ABOUT // IDENTITY & PHILOSOPHY
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Authentic Portrait */}
          <div className="lg:col-span-5 relative group">
            <div className="relative rounded-2xl overflow-hidden border border-theme-border bg-theme-surface shadow-xl">
              <div className="aspect-[3/4] relative">
                <Image
                  src="/assets/shehzan-portrait.jpg"
                  alt="Shehzan Khan — Software Engineer"
                  fill
                  className="object-cover object-center filter grayscale contrast-[1.03] group-hover:grayscale-0 transition-all duration-700"
                  priority
                />
              </div>

              {/* Status pill on photo */}
              <div className="absolute bottom-4 left-4 right-4 glass-panel px-4 py-3 rounded-xl flex items-center justify-between shadow-lg">
                <div>
                  <p className="text-xs font-semibold text-theme-text">Shehzan Khan</p>
                  <p className="text-[11px] text-theme-muted">Software Engineer · C++ & Backend</p>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-theme-accent/15 border border-theme-accent/30 text-theme-accent text-[10px] font-mono font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-theme-accent animate-ping" />
                  AVAILABLE
                </div>
              </div>
            </div>

            {/* Quick stats below photo */}
            <div className="grid grid-cols-2 gap-3 mt-4 text-xs font-mono">
              <div className="glass-panel p-3.5 rounded-xl border border-theme-border">
                <p className="text-theme-muted text-[10px] font-bold">ACTIVE CODING DAYS</p>
                <p className="text-xl font-bold text-theme-text mt-1">616 Days</p>
              </div>
              <div className="glass-panel p-3.5 rounded-xl border border-theme-border">
                <p className="text-theme-muted text-[10px] font-bold">MAX STREAK</p>
                <p className="text-xl font-bold text-theme-accent mt-1">574 Days</p>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Core Philosophy */}
          <div className="lg:col-span-7 space-y-7">
            <div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-theme-text leading-tight">
                Engineering software that works reliably from bits to scale.
              </h3>
              <p className="mt-5 text-base md:text-lg text-theme-muted leading-relaxed">
                I am a Software Engineer focused on <span className="text-theme-text font-semibold">systems programming in C++</span>,{' '}
                <span className="text-theme-text font-semibold">backend architecture</span>, and{' '}
                <span className="text-theme-text font-semibold">algorithmic problem-solving</span>. I care deeply about how systems
                operate under the hood—from bitwise network frame masking to combinatorial optimization algorithms.
              </p>
              <p className="mt-3 text-base md:text-lg text-theme-muted leading-relaxed">
                Whether implementing an RFC 6455 WebSocket client from scratch with Winsock and OpenSSL, developing
                genetic algorithm scheduling engines with 73 passing tests, or building multi-agent AI security pipelines,
                I approach software with craft, precision, and verified correctness.
              </p>
            </div>

            {/* Three Pillar Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
              <div className="p-4 sm:p-5 rounded-xl bg-theme-surface border border-theme-border">
                <Code className="w-5 h-5 text-theme-accent mb-2.5" />
                <h4 className="text-sm font-semibold text-theme-text">Low-Level Rigor</h4>
                <p className="text-xs text-theme-muted mt-1.5 leading-relaxed">
                  C++17, bitwise operations, memory safety, socket polling, and zero-overhead abstractions.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-xl bg-theme-surface border border-theme-border">
                <Award className="w-5 h-5 text-theme-accent mb-2.5" />
                <h4 className="text-sm font-semibold text-theme-text">Combinatorial Optimization</h4>
                <p className="text-xs text-theme-muted mt-1.5 leading-relaxed">
                  Multi-objective Genetic Algorithms, Q-learning, makespan/tardiness minimization, and heuristics.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-xl bg-theme-surface border border-theme-border">
                <CheckCircle2 className="w-5 h-5 text-theme-accent mb-2.5" />
                <h4 className="text-sm font-semibold text-theme-text">Algorithmic Consistency</h4>
                <p className="text-xs text-theme-muted mt-1.5 leading-relaxed">
                  1,335+ verified problems solved across LeetCode, GFG & HackerRank with a 574-day active streak.
                </p>
              </div>
            </div>

            {/* Verified External Profile Links */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-theme-border">
              <a
                href="https://github.com/ershehzan"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-pill px-4 py-2 rounded-full text-xs font-semibold text-theme-text flex items-center gap-2 hover:border-theme-accent transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>github.com/ershehzan</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-theme-accent" />
              </a>

              <a
                href="https://codolio.com/profile/Shehzan_Khan"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-pill px-4 py-2 rounded-full text-xs font-semibold text-theme-text flex items-center gap-2 hover:border-theme-accent transition-colors"
              >
                <Award className="w-4 h-4 text-theme-accent" />
                <span>codolio.com/profile/Shehzan_Khan</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-theme-accent" />
              </a>

              <a
                href="https://www.linkedin.com/in/shehzankhan/"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-pill px-4 py-2 rounded-full text-xs font-semibold text-theme-text flex items-center gap-2 hover:border-theme-accent transition-colors"
              >
                <Linkedin className="w-4 h-4 text-[#0077b5]" />
                <span>linkedin.com/in/shehzankhan</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-theme-accent" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
