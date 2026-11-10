'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ThemeToggle from './ThemeToggle';
import ThemeTransitionPortal from './ThemeTransitionPortal';
import { useTheme } from './ThemeProvider';

interface NavbarProps {
  onCopyEmail?: () => void;
}

const NAV_ITEMS = [
  { id: 'about', label: 'About', href: '#about', mobilePrefix: '02 // About & Identity' },
  { id: 'work', label: 'Work', href: '#work', mobilePrefix: '03 // Selected Work' },
  { id: 'stack', label: 'Stack', href: '#stack', mobilePrefix: '04 // Core Systems & Tools' },
  { id: 'problem-solving', label: 'Problem Solving', href: '#problem-solving', mobilePrefix: '05 // Problem Solving' },
  { id: 'contact', label: 'Contact', href: '#contact', mobilePrefix: '06 // Get in Touch' },
];

export default function Navbar({ onCopyEmail }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('about');
  const { isTransitioning, transitionDirection, currentPhase } = useTheme();

  // Active section spy with hysteresis
  useEffect(() => {
    const sectionIds = ['home', 'about', 'work', 'stack', 'problem-solving', 'contact'];
    const handleScroll = () => {
      const scrollY = window.scrollY + 160;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollY >= top) {
            setActiveSection(sectionIds[i] === 'home' ? 'about' : sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-3.5 sm:py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left Pill: Name / Brand */}
        <a
          href="#home"
          className="glass-pill px-4 sm:px-5 py-2 rounded-full flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wide text-theme-text hover:text-theme-accent transition-colors shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-theme-accent animate-pulse" />
          <span>Shehzan K.</span>
        </a>

        {/* Center Pill: Desktop Navigation Links with Smooth Active Sliding Pill */}
        <nav className="hidden md:flex glass-pill p-1 rounded-full items-center gap-1 text-xs sm:text-sm text-theme-muted font-medium shadow-sm relative">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`relative px-4 py-1.5 rounded-full transition-colors duration-200 z-10 ${
                  isActive ? 'text-theme-text font-semibold' : 'hover:text-theme-text text-theme-muted'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="navbarActiveIndicator"
                    className="absolute inset-0 rounded-full bg-theme-surface/90 border border-theme-border shadow-sm -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right Group: Theme Toggle & CTA & Mobile Toggle */}
        <div className="flex items-center gap-2">
          {/* Animated Sun/Moon Theme Toggle with Floating Portal Capsule */}
          <div className="relative">
            <ThemeToggle />

            {/* Small Floating Portal Panel Anchored Directly to Toggle */}
            <ThemeTransitionPortal
              isTransitioning={isTransitioning}
              direction={transitionDirection}
              currentPhase={currentPhase}
            />
          </div>

          {/* Let's Talk CTA */}
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=ershehzankhan@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-pill px-4 sm:px-5 py-2 rounded-full flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-theme-text hover:bg-theme-accent hover:text-theme-accentContrast transition-all duration-200 shadow-sm group cursor-pointer"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden glass-pill p-2 rounded-full text-theme-text hover:text-theme-accent transition-colors cursor-pointer"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Panel with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden mt-3 max-w-sm mx-auto glass-panel rounded-2xl p-3 shadow-2xl flex flex-col gap-1.5 font-medium text-xs sm:text-sm border border-theme-border"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl transition-colors ${
                  activeSection === item.id
                    ? 'bg-theme-surface text-theme-accent font-semibold border border-theme-border'
                    : 'hover:bg-theme-hover text-theme-text'
                }`}
              >
                {item.mobilePrefix}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
