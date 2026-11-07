'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import WorkSection from '@/components/WorkSection';
import StackSection from '@/components/StackSection';
import CodolioSection from '@/components/CodolioSection';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';

export default function HomePage() {
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleCopyEmail = () => {
    const email = 'ershehzankhan@gmail.com';
    navigator.clipboard.writeText(email);
    setToastMessage(`Copied: ${email} to clipboard!`);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-theme-bg text-theme-text relative selection:bg-theme-accent selection:text-theme-accentContrast transition-colors duration-300">
      {/* Top Floating Pill Navigation with Animated Sun/Moon Theme Toggle */}
      <Navbar onCopyEmail={handleCopyEmail} />

      {/* Hero Section matching Dashboard.png */}
      <Hero onCopyEmail={handleCopyEmail} />

      {/* About Section featuring Authentic Portrait */}
      <About />

      {/* Work Section with 2x2 Wooden Shelf matching Work.png */}
      <WorkSection />

      {/* Interactive Radial Mindmap Stack matching Stack.png */}
      <StackSection />

      {/* Verified Problem Solving & Codolio Proof */}
      <CodolioSection />

      {/* Footer & Name Badges matching LastPage.png */}
      <Footer onCopyEmail={handleCopyEmail} copied={copied} />

      {/* One-Click Feedback Toast */}
      <Toast message={toastMessage} isVisible={copied} />
    </main>
  );
}
