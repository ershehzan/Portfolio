'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface SplitTextProps {
  lines: string[];
  className?: string;
  delay?: number;
  stagger?: number;
}

export default function SplitText({
  lines,
  className = '',
  delay = 0.1,
  stagger = 0.12,
}: SplitTextProps) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : stagger,
        delayChildren: delay,
      },
    },
  };

  const lineVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { y: '105%', opacity: 0 },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.2 : 0.7,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <motion.h1
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      aria-label={lines.join(' ')}
    >
      {lines.map((line, index) => (
        <span
          key={`line-${index}`}
          className="block overflow-hidden pb-1 -mb-1"
          style={{ display: 'block' }}
        >
          <motion.span
            variants={lineVariants}
            className="block will-change-transform"
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
}
