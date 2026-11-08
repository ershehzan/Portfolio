'use client';

import React, { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import ThemeTransitionPortal from './ThemeTransitionPortal';
import { useTheme } from './ThemeProvider';

interface NavbarProps {
  onCopyEmail?: () => void;
}

export default function Navbar({ onCopyEmail }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isTransitioning, transitionDirection, currentPhase } = useTheme();

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

        {/* Center Pill: Desktop Navigation Links */}
        <nav className="hidden md:flex glass-pill px-6 py-2 rounded-full items-center gap-6 text-xs sm:text-sm text-theme-muted font-medium shadow-sm">
          <a href="#work" className="hover:text-theme-text transition-colors">
            Work
          </a>
          <a href="#about" className="hover:text-theme-text transition-colors">
            About
          </a>
          <a href="#stack" className="hover:text-theme-text transition-colors">
            Stack
          </a>
          <a href="#problem-solving" className="hover:text-theme-text transition-colors">
            Problem Solving
          </a>
          <a href="#contact" className="hover:text-theme-text transition-colors">
            Contact
          </a>
        </nav>

        {/* Right Group: Theme Toggle & CTA & Mobile Toggle */}
        <div className="flex items-center gap-2">
          {/* Animated Sun/Moon Theme Toggle with Floating Portal Popover */}
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
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 max-w-sm mx-auto glass-panel rounded-2xl p-4 shadow-xl flex flex-col gap-2 font-medium text-xs sm:text-sm animate-in fade-in slide-in-from-top-2 duration-200">
          <a
            href="#work"
            onClick={() => setMobileMenuOpen(false)}
            className="px-4 py-2.5 rounded-xl hover:bg-theme-hover text-theme-text transition-colors"
          >
            03 // Selected Work
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="px-4 py-2.5 rounded-xl hover:bg-theme-hover text-theme-text transition-colors"
          >
            02 // About & Identity
          </a>
          <a
            href="#stack"
            onClick={() => setMobileMenuOpen(false)}
            className="px-4 py-2.5 rounded-xl hover:bg-theme-hover text-theme-text transition-colors"
          >
            04 // Core Systems & Tools
          </a>
          <a
            href="#problem-solving"
            onClick={() => setMobileMenuOpen(false)}
            className="px-4 py-2.5 rounded-xl hover:bg-theme-hover text-theme-text transition-colors"
          >
            05 // Problem Solving (1,335+ Solved)
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="px-4 py-2.5 rounded-xl hover:bg-theme-hover text-theme-text transition-colors"
          >
            06 // Get in Touch
          </a>
        </div>
      )}
    </header>
  );
}
