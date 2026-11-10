'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { Award, Calendar, Trophy, ArrowUpRight, Github, CheckCircle2, TrendingUp } from 'lucide-react';
import { motion, useInView } from 'motion/react';

// Restrained Animated Counter for Verified Engineering Statistics
function AnimatedNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1200; // 1.2s smooth duration
    const startTime = performance.now();

    const updateCounter = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easedProgress * value);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [isInView, value]);

  return <span ref={ref}>{displayValue.toLocaleString()}</span>;
}

export default function CodolioSection() {
  return (
    <section id="problem-solving" className="py-24 px-4 sm:px-6 md:px-12 lg:px-20 bg-theme-elevated border-t border-theme-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-12">
          <span className="text-xs font-mono text-theme-accent font-bold tracking-widest uppercase">05</span>
          <span className="h-4 w-[1px] bg-theme-border" />
          <h2 className="text-xs font-mono tracking-widest text-theme-muted uppercase font-semibold">
            PROBLEM SOLVING // ALGORITHMIC RIGOR & CONTINUOUS PRACTICE
          </h2>
        </div>

        {/* Big Number Summary Banner — Grounded Exclusively in Verified Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {/* 1. Questions Solved */}
          <div className="glass-panel p-6 rounded-2xl border border-theme-border">
            <div className="flex items-center justify-between text-theme-muted text-xs font-mono mb-2">
              <span>QUESTIONS SOLVED</span>
              <Award className="w-4 h-4 text-theme-accent" />
            </div>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-theme-text tracking-tight">
              <AnimatedNumber value={1335} />+
            </p>
            <p className="text-[11px] text-theme-muted font-mono mt-1">1,280 DSA · 55 Fundamentals</p>
          </div>

          {/* 2. Active Days */}
          <div className="glass-panel p-6 rounded-2xl border border-theme-border">
            <div className="flex items-center justify-between text-theme-muted text-xs font-mono mb-2">
              <span>ACTIVE DAYS</span>
              <Calendar className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-theme-text tracking-tight">
              <AnimatedNumber value={616} />
            </p>
            <p className="text-[11px] text-theme-muted font-mono mt-1">Consistent cross-platform practice</p>
          </div>

          {/* 3. LeetCode Contest Rating */}
          <div className="glass-panel p-6 rounded-2xl border border-theme-border">
            <div className="flex items-center justify-between text-theme-muted text-xs font-mono mb-2">
              <span>CONTEST RATING</span>
              <Trophy className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-theme-text tracking-tight">
              <AnimatedNumber value={1598} />
            </p>
            <p className="text-[11px] text-theme-muted font-mono mt-1">Peak: 1634 · LeetCode Contests</p>
          </div>

          {/* 4. Solved Hard & Optimization Problems */}
          <div className="glass-panel p-6 rounded-2xl border border-theme-border">
            <div className="flex items-center justify-between text-theme-muted text-xs font-mono mb-2">
              <span>HARD PROBLEMS</span>
              <TrendingUp className="w-4 h-4 text-rose-500" />
            </div>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-rose-500 tracking-tight">
              <AnimatedNumber value={207} />
            </p>
            <p className="text-[11px] text-theme-muted font-mono mt-1">16.2% of total DSA solved</p>
          </div>
        </div>

        {/* Split Card: Codolio Visual Snapshot & Rigor Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Real Profile Snapshot */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-theme-border bg-theme-surface shadow-xl relative group">
            <div className="aspect-[16/10] relative">
              <Image
                src="/assets/codolio-stats.jpg"
                alt="Codolio Verified Problem Solving Statistics for Shehzan Khan"
                fill
                className="object-cover object-top opacity-95 group-hover:scale-[1.01] transition-transform duration-500"
              />
            </div>
            <div className="p-4 bg-theme-surface border-t border-theme-border flex items-center justify-between text-xs font-mono">
              <span className="text-theme-muted">Verified Codolio Profile Snapshot</span>
              <a
                href="https://codolio.com/profile/Shehzan_Khan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-theme-accent hover:underline flex items-center gap-1 font-semibold"
              >
                <span>codolio.com/profile/Shehzan_Khan</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Detailed Rigor & Categorization */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-6 rounded-2xl border border-theme-border">
              <h3 className="text-base font-bold text-theme-text mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-theme-accent" />
                DSA Difficulty Distribution
              </h3>

              <div className="space-y-3.5 font-mono text-xs">
                {/* Easy */}
                <div>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-emerald-500 font-semibold">Easy (401 Solved)</span>
                    <span className="text-theme-muted">31.3%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-theme-surface overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '31.3%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full bg-emerald-500 rounded-full"
                    />
                  </div>
                </div>

                {/* Medium */}
                <div>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-amber-500 font-semibold">Medium (672 Solved)</span>
                    <span className="text-theme-muted">52.5%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-theme-surface overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '52.5%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full bg-amber-500 rounded-full"
                    />
                  </div>
                </div>

                {/* Hard */}
                <div>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-rose-500 font-semibold">Hard (207 Solved)</span>
                    <span className="text-theme-muted">16.2%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-theme-surface overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '16.2%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full bg-rose-500 rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Core Engineering Quote */}
            <div className="p-6 rounded-2xl bg-theme-surface border border-theme-border text-xs text-theme-muted leading-relaxed">
              <p className="font-semibold text-theme-text mb-2">Quote from Codolio Profile:</p>
              <p className="italic">
                "I prefer challenging problems, especially those involving optimization, state compression/encoding, and space-time tradeoffs. I also admire Competitive Programming and algorithmic thinking."
              </p>

              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-theme-border">
                <a
                  href="https://github.com/ershehzan/Data-Structure"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-theme-card hover:bg-theme-accent hover:text-theme-accentContrast text-theme-text text-xs font-semibold flex items-center gap-1.5 transition-colors border border-theme-border shadow-sm"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Inspect C++ Data-Structure Repo</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
