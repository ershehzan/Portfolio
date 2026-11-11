'use client';

import React from 'react';
import { useTheme } from './ThemeProvider';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { isDark, toggleTheme, isTransitioning } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      disabled={isTransitioning}
      type="button"
      className={`glass-pill relative p-2.5 rounded-full text-theme-text hover:text-theme-accent transition-all duration-300 flex items-center justify-center cursor-pointer group shadow-sm ${
        isTransitioning ? 'opacity-0 pointer-events-none' : ''
      } ${className}`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="relative w-4 h-4 overflow-hidden">
        {/* Sun Icon */}
        <div
          className={`absolute inset-0 transform transition-all duration-300 ease-out flex items-center justify-center ${
            isDark
              ? 'rotate-90 scale-0 opacity-0'
              : 'rotate-0 scale-100 opacity-100 text-amber-500'
          }`}
        >
          <Sun className="w-4 h-4" />
        </div>

        {/* Moon Icon */}
        <div
          className={`absolute inset-0 transform transition-all duration-300 ease-out flex items-center justify-center ${
            isDark
              ? 'rotate-0 scale-100 opacity-100 text-[#C5F36A]'
              : '-rotate-90 scale-0 opacity-0'
          }`}
        >
          <Moon className="w-4 h-4" />
        </div>
      </div>
    </button>
  );
}

