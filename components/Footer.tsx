'use client';

import React from 'react';
import { ArrowUpRight, Copy, Mail, Github, Linkedin, Award } from 'lucide-react';

interface FooterProps {
  onCopyEmail: () => void;
  copied: boolean;
}

export default function Footer({ onCopyEmail, copied }: FooterProps) {
  return (
    <footer id="contact" className="relative bg-theme-bg text-theme-text overflow-hidden pt-12 border-t border-theme-border transition-colors duration-300">
      {/* Mountain Ridge Horizon Silhouette Cutout from LastPage.png */}
      <div className="w-full overflow-hidden leading-none select-none">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-14 sm:h-20 md:h-24 text-theme-border opacity-70"
        >
          {/* Layered mountain peaks matching LastPage.png */}
          <path
            d="M0,45 L110,82 L240,30 L380,95 L520,38 L680,85 L820,25 L970,90 L1120,40 L1260,82 L1380,32 L1440,60 L1440,120 L0,120 Z"
            fill="currentColor"
            opacity="0.3"
          />
          <path
            d="M0,65 L130,35 L260,88 L390,20 L530,78 L670,30 L810,88 L950,22 L1090,75 L1230,28 L1370,72 L1440,45 L1440,120 L0,120 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-6 pb-16">
        
        {/* Playful Floating Chunky Name Badge Lettering Restored from LastPage.png */}
        {/* All letters are UPPERCASE, bold, white with black outline and centered */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 my-10 sm:my-16 select-none flex-wrap py-2">
          
          {/* 1. 'S' - Blue Rounded Square */}
          <div className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-2xl sm:rounded-3xl bg-[#2563eb] text-white flex items-center justify-center font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl shadow-2xl border-2 sm:border-3 border-[#18181b]/30 transform -rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-300 shrink-0">
            <span
              style={{
                WebkitTextStroke: '2px #111827',
                textShadow: '0 3px 6px rgba(0,0,0,0.5)',
              }}
            >
              S
            </span>
          </div>

          {/* 2. 'H' - Red Circle */}
          <div className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-[#ef4444] text-white flex items-center justify-center font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl shadow-2xl border-2 sm:border-3 border-[#18181b]/30 transform rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-300 shrink-0">
            <span
              style={{
                WebkitTextStroke: '2px #111827',
                textShadow: '0 3px 6px rgba(0,0,0,0.5)',
              }}
            >
              H
            </span>
          </div>

          {/* 3. 'E' - Pink Hexagon */}
          <div
            className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-[#ec4899] text-white flex items-center justify-center font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl shadow-2xl transform -rotate-4 hover:rotate-0 hover:scale-105 transition-all duration-300 shrink-0"
            style={{
              clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
            }}
          >
            <span
              style={{
                WebkitTextStroke: '2px #111827',
                textShadow: '0 3px 6px rgba(0,0,0,0.5)',
              }}
            >
              E
            </span>
          </div>

          {/* 4. 'H' - Orange Rounded Square */}
          <div className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-2xl sm:rounded-3xl bg-[#f59e0b] text-white flex items-center justify-center font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl shadow-2xl border-2 sm:border-3 border-[#18181b]/30 transform rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-300 shrink-0">
            <span
              style={{
                WebkitTextStroke: '2px #111827',
                textShadow: '0 3px 6px rgba(0,0,0,0.5)',
              }}
            >
              H
            </span>
          </div>

          {/* 5. 'Z' - Green Heart Shape */}
          <div className="relative w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 flex items-center justify-center transform -rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-300 shrink-0">
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full text-[#10b981] drop-shadow-xl"
              fill="currentColor"
            >
              <path d="M50,90 C25,72 5,54 5,32 C5,15 18,4 34,4 C43,4 50,9 50,9 C50,9 57,4 66,4 C82,4 95,15 95,32 C95,54 75,72 50,90 Z" />
            </svg>
            <span
              className="relative z-10 font-black text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl pb-1"
              style={{
                WebkitTextStroke: '2px #111827',
                textShadow: '0 3px 6px rgba(0,0,0,0.5)',
              }}
            >
              Z
            </span>
          </div>

          {/* 6. 'A' - Purple Circle */}
          <div className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-[#8b5cf6] text-white flex items-center justify-center font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl shadow-2xl border-2 sm:border-3 border-[#18181b]/30 transform rotate-4 hover:rotate-0 hover:scale-105 transition-all duration-300 shrink-0">
            <span
              style={{
                WebkitTextStroke: '2px #111827',
                textShadow: '0 3px 6px rgba(0,0,0,0.5)',
              }}
            >
              A
            </span>
          </div>

          {/* 7. 'N' - Cyan Rounded Square */}
          <div className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-2xl sm:rounded-3xl bg-[#06b6d4] text-white flex items-center justify-center font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl shadow-2xl border-2 sm:border-3 border-[#18181b]/30 transform -rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-300 shrink-0">
            <span
              style={{
                WebkitTextStroke: '2px #111827',
                textShadow: '0 3px 6px rgba(0,0,0,0.5)',
              }}
            >
              N
            </span>
          </div>

        </div>

        {/* 3-Column Directory matching LastPage.png */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 pt-8 pb-12 border-t border-theme-border text-xs sm:text-sm">
          
          {/* Column 1: WHAT I DO */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold tracking-widest text-theme-muted uppercase">
              WHAT I DO
            </h4>
            <ul className="space-y-2 font-medium text-theme-text">
              <li>C++ Systems Programming</li>
              <li>Backend & API Architecture</li>
              <li>Multi-Objective Optimization</li>
              <li>Algorithmic Engineering</li>
            </ul>

            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-theme-accentSoft border border-theme-accent/30 text-theme-accent text-xs font-mono font-semibold">
                <span className="w-2 h-2 rounded-full bg-theme-accent animate-pulse" />
                AVAILABLE FOR WORK
              </span>
            </div>
          </div>

          {/* Column 2: WORK / SOCIAL LINKS */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold tracking-widest text-theme-muted uppercase">
              WORK / SOCIAL LINKS
            </h4>
            <ul className="space-y-2 font-medium text-theme-text">
              <li>
                <a
                  href="https://www.linkedin.com/in/shehzankhan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-theme-accent transition-colors flex items-center gap-1.5"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#0077b5]" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3 text-theme-muted" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/ershehzan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-theme-accent transition-colors flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub (@ershehzan)</span>
                  <ArrowUpRight className="w-3 h-3 text-theme-muted" />
                </a>
              </li>
              <li>
                <a
                  href="https://codolio.com/profile/Shehzan_Khan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-theme-accent transition-colors flex items-center gap-1.5"
                >
                  <Award className="w-3.5 h-3.5 text-theme-accent" />
                  <span>Codolio (1,335+ Solved)</span>
                  <ArrowUpRight className="w-3 h-3 text-theme-muted" />
                </a>
              </li>
              <li>
                <button
                  onClick={onCopyEmail}
                  className="hover:text-theme-accent transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Copy Email</span>
                  <Copy className="w-3 h-3 text-theme-muted" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: GET IN TOUCH (Clean text, no green highlight) */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold tracking-widest text-theme-muted uppercase">
              GET IN TOUCH
            </h4>
            <p className="text-xs text-theme-muted leading-relaxed">
              Open for full-time Software Engineer, Backend, and C++ developer roles. Have a challenging problem or project?
            </p>

            <div className="pt-2">
              <a
                href="mailto:ershehzankhan@gmail.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-theme-text text-theme-bg font-semibold text-xs tracking-wide hover:bg-theme-accent hover:text-theme-accentContrast transition-colors shadow-md"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>ershehzankhan@gmail.com</span>
              </a>
            </div>

            <p className="text-[11px] font-mono text-theme-muted pt-1">
              Timezone: IST (UTC+05:30) · India
            </p>
          </div>

        </div>

        {/* Bottom Bar matching LastPage.png */}
        <div className="flex items-center justify-between text-xs font-mono text-theme-muted border-t border-theme-border pt-6">
          <span>© 2026 Shehzan Khan. All rights reserved.</span>
          <span className="tracking-widest uppercase font-semibold">PORTFOLIO</span>
        </div>

      </div>
    </footer>
  );
}
