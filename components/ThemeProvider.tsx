'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import ThemeTransitionPortal from './ThemeTransitionPortal';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
  isTransitioning: boolean;
  transitionDirection: 'dark-to-light' | 'light-to-dark';
  currentPhase: 'entering' | 'swapped';
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
  isDark: true,
  isTransitioning: false,
  transitionDirection: 'dark-to-light',
  currentPhase: 'entering',
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<'dark-to-light' | 'light-to-dark'>('dark-to-light');
  const [currentPhase, setCurrentPhase] = useState<'entering' | 'swapped'>('entering');

  useEffect(() => {
    // Determine initial theme on mount
    const params = new URLSearchParams(window.location.search);
    const queryTheme = params.get('theme') as Theme | null;
    const stored = localStorage.getItem('theme') as Theme | null;
    
    let initial: Theme = 'dark';
    if (queryTheme === 'light' || queryTheme === 'dark') {
      initial = queryTheme;
    } else if (stored === 'light' || stored === 'dark') {
      initial = stored;
    } else {
      initial = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    setTheme(initial);
    if (initial === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    setMounted(true);

    // Listen to OS theme changes if user hasn't manually overridden
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        const newTheme: Theme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
        if (newTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    if (isTransitioning) return; // Prevent repeated clicks while animating

    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    const direction = theme === 'dark' ? 'dark-to-light' : 'light-to-dark';

    // Respect prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTheme(nextTheme);
      localStorage.setItem('theme', nextTheme);
      if (nextTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return;
    }

    // Begin interactive portal animation
    setTransitionDirection(direction);
    setCurrentPhase('entering');
    setIsTransitioning(true);

    // Swap theme at midpoint when character dives into the portal hole
    setTimeout(() => {
      if (nextTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      setTheme(nextTheme);
      localStorage.setItem('theme', nextTheme);
      setCurrentPhase('swapped');
    }, 650);

    // Finish transition after character emerges and runs off-screen
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1400);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        isDark: theme === 'dark',
        isTransitioning,
        transitionDirection,
        currentPhase,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

