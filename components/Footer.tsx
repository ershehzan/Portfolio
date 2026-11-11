'use client';

import React from 'react';
import { ArrowUpRight, Mail, Phone, Github, Linkedin, Award } from 'lucide-react';
import { motion } from 'motion/react';

interface FooterProps {
  onCopyEmail?: () => void;
  copied?: boolean;
}

export default function Footer({ onCopyEmail, copied }: FooterProps) {
  return (
    <footer id="contact" className="relative bg-theme-bg text-theme-text overflow-hidden pt-12 border-t border-theme-border transition-colors duration-300">
      {/* Mountain Ridge Horizon Silhouette Cutout */}
      <div className="w-full overflow-hidden leading-none select-none">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-14 sm:h-20 md:h-24 text-theme-border opacity-70"
        >
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
        
        {/* Playful Floating Chunky Name Badge Lettering with Spring Physics */}
        {/* All letters are strictly UPPERCASE, bold with dark outline */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 md:gap-3.5 my-8 sm:my-16 select-none flex-nowrap py-2">
          
          {/* 1. 'S' - Blue Rounded Square */}
          <motion.div
            whileHover={{ y: -10, scale: 1.12, rotate: -4 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="w-11 h-11 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-xl sm:rounded-2xl md:rounded-3xl bg-[#2563eb] text-white flex items-center justify-center font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl shadow-2xl border-2 sm:border-3 border-[#18181b]/30 transform -rotate-3 cursor-pointer shrink-0"
          >
            <span
              style={{
                WebkitTextStroke: '2px #111827',
                textShadow: '0 3px 6px rgba(0,0,0,0.5)',
              }}
            >
              S
            </span>
          </motion.div>

          {/* 2. 'H' - Red Circle */}
          <motion.div
            whileHover={{ y: -10, scale: 1.12, rotate: 4 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="w-11 h-11 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-[#ef4444] text-white flex items-center justify-center font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl shadow-2xl border-2 sm:border-3 border-[#18181b]/30 transform rotate-2 cursor-pointer shrink-0"
          >
            <span
              style={{
                WebkitTextStroke: '2px #111827',
                textShadow: '0 3px 6px rgba(0,0,0,0.5)',
              }}
            >
              H
            </span>
          </motion.div>

          {/* 3. 'E' - Pink Hexagon */}
          <motion.div
            whileHover={{ y: -10, scale: 1.12, rotate: -4 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="w-11 h-11 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-[#ec4899] text-white flex items-center justify-center font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl shadow-2xl transform -rotate-4 cursor-pointer shrink-0"
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
          </motion.div>

          {/* 4. 'H' - Orange Rounded Square */}
          <motion.div
            whileHover={{ y: -10, scale: 1.12, rotate: 4 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="w-11 h-11 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-xl sm:rounded-2xl md:rounded-3xl bg-[#f59e0b] text-white flex items-center justify-center font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl shadow-2xl border-2 sm:border-3 border-[#18181b]/30 transform rotate-3 cursor-pointer shrink-0"
          >
            <span
              style={{
                WebkitTextStroke: '2px #111827',
                textShadow: '0 3px 6px rgba(0,0,0,0.5)',
              }}
            >
              H
            </span>
          </motion.div>

          {/* 5. 'Z' - Green Heart Shape */}
          <motion.div
            whileHover={{ y: -10, scale: 1.12, rotate: -4 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="relative w-11 h-11 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 flex items-center justify-center transform -rotate-3 cursor-pointer shrink-0"
          >
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full text-[#10b981] drop-shadow-xl"
              fill="currentColor"
            >
              <path d="M50,90 C25,72 5,54 5,32 C5,15 18,4 34,4 C43,4 50,9 50,9 C50,9 57,4 66,4 C82,4 95,15 95,32 C95,54 75,72 50,90 Z" />
            </svg>
            <span
              className="relative z-10 font-black text-white text-2xl sm:text-4xl md:text-5xl lg:text-6xl pb-1"
              style={{
                WebkitTextStroke: '2px #111827',
                textShadow: '0 3px 6px rgba(0,0,0,0.5)',
              }}
            >
              Z
            </span>
          </motion.div>

          {/* 6. 'A' - Purple Circle */}
          <motion.div
            whileHover={{ y: -10, scale: 1.12, rotate: 4 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="w-11 h-11 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-[#8b5cf6] text-white flex items-center justify-center font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl shadow-2xl border-2 sm:border-3 border-[#18181b]/30 transform rotate-4 cursor-pointer shrink-0"
          >
            <span
              style={{
                WebkitTextStroke: '2px #111827',
                textShadow: '0 3px 6px rgba(0,0,0,0.5)',
              }}
            >
              A
            </span>
          </motion.div>

          {/* 7. 'N' - Cyan Rounded Square */}
          <motion.div
            whileHover={{ y: -10, scale: 1.12, rotate: -4 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="w-11 h-11 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-xl sm:rounded-2xl md:rounded-3xl bg-[#06b6d4] text-white flex items-center justify-center font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl shadow-2xl border-2 sm:border-3 border-[#18181b]/30 transform -rotate-2 cursor-pointer shrink-0"
          >
            <span
              style={{
                WebkitTextStroke: '2px #111827',
                textShadow: '0 3px 6px rgba(0,0,0,0.5)',
              }}
            >
              N
            </span>
          </motion.div>

        </div>

        {/* 3-Column Directory */}
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
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=ershehzankhan@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-theme-accent transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email (Gmail)</span>
                  <ArrowUpRight className="w-3 h-3 text-theme-muted" />
                </a>
              </li>
              <li>
                <a
                  href="tel:+918085116703"
                  className="hover:text-theme-accent transition-colors flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-theme-accent" />
                  <span>+91 8085116703</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: GET IN TOUCH */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold tracking-widest text-theme-muted uppercase">
              GET IN TOUCH
            </h4>
            <p className="text-xs text-theme-muted leading-relaxed">
              Open for full-time Software Engineer, Backend, and C++ developer roles. Have a challenging problem or project?
            </p>

            <div className="pt-2 flex flex-col sm:flex-row flex-wrap gap-2.5">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=ershehzankhan@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-theme-text text-theme-bg font-semibold text-xs tracking-wide hover:bg-theme-accent hover:text-theme-accentContrast transition-all shadow-md group cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email Me</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href="tel:+918085116703"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-theme-border bg-theme-surface hover:border-theme-accent hover:text-theme-accent font-semibold text-xs tracking-wide transition-all shadow-sm cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-theme-accent" />
                <span>+91 8085116703</span>
              </a>
            </div>

            <p className="text-[11px] font-mono text-theme-muted pt-1">
              Timezone: IST (UTC+05:30) · India
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex items-center justify-between text-xs font-mono text-theme-muted border-t border-theme-border pt-6">
          <span>© 2026 Shehzan Khan. All rights reserved.</span>
          <span className="tracking-widest uppercase font-semibold">ENGINEERING PORTFOLIO</span>
        </div>

      </div>
    </footer>
  );
}
