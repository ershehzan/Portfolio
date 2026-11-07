'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
}

export default function Toast({ message, isVisible }: ToastProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl bg-theme-accent text-theme-accentContrast font-semibold text-xs tracking-wide shadow-2xl animate-bounce border border-theme-border">
      <div className="w-5 h-5 rounded-full bg-theme-accentContrast text-theme-accent flex items-center justify-center">
        <Check className="w-3.5 h-3.5" />
      </div>
      <span>{message}</span>
    </div>
  );
}
