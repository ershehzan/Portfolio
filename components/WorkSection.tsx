'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Play, ArrowUpRight, Github, Terminal, Shield, Crosshair, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import VideoModal from './VideoModal';

type FilterCategory = 'All' | 'Systems & C++' | 'Optimization & Backend' | 'AI & Security' | 'Computer Vision';

interface Project {
  id: string;
  categoryTag: string;
  title: string;
  badge: string;
  categories: FilterCategory[];
  summary: string;
  specs: { label: string; value: string }[];
  repoUrl: string;
  repoLabel: string;
  liveDemoUrl?: string;
  subLink?: { url: string; label: string };
  videoSrc?: string;
  videoTitle?: string;
  imageSrc?: string;
  type: 'flowforge' | 'codeguard' | 'websocket' | 'visionedge';
}

const PROJECTS: Project[] = [
  {
    id: 'flowforge',
    categoryTag: 'FLAGSHIP // AUTONOMOUS PRODUCTION RESILIENCE',
    title: 'FlowForge AI',
    badge: '73 Tests Passing · Python 3.10+',
    categories: ['All', 'Optimization & Backend', 'AI & Security'],
    summary: 'Autonomous production scheduling and resilience system built to solve complex Job Shop problems. Combines multi-objective Genetic Algorithms, real-time machine failure recovery, and Claude 3.5 Sonnet Copilot (evolved from the foundational PyShop engine).',
    specs: [
      { label: 'OPTIMIZER', value: 'Multi-Obj GA' },
      { label: 'BACKEND', value: 'FastAPI v0.121' },
      { label: 'COPILOT', value: 'Claude 3.5 Sonnet' },
      { label: 'UNIT TESTS', value: '73 Passing' },
    ],
    repoUrl: 'https://github.com/ershehzan/FlowForge-AI',
    repoLabel: 'ershehzan/FlowForge-AI',
    liveDemoUrl: 'https://flowforge-ai-uh0x.onrender.com/',
    subLink: {
      url: 'https://github.com/ershehzan/ShopFloorScheduler',
      label: 'Foundational Engine (16★)',
    },
    videoSrc: '/videos/FlowForge-AI.mp4',
    videoTitle: 'FlowForge AI — Autonomous Production Scheduling & Dynamic Gantt Demo',
    imageSrc: '/assets/flowforge-gantt.png',
    type: 'flowforge',
  },
  {
    id: 'codeguard',
    categoryTag: 'CODENEETI HACKATHON // LEAD CONTRIBUTOR',
    title: 'CodeGuard — AI Security Assistant',
    badge: '19 Commits · Multi-Agent Gemini',
    categories: ['All', 'AI & Security', 'Optimization & Backend'],
    summary: 'Agentic code review platform coupling deterministic static scanners (Semgrep & Bandit) with a three-agent Google Gemini pipeline (Detector, Fixer, Verifier) inside an ephemeral zero-execution sandbox.',
    specs: [
      { label: 'AGENT 01', value: 'Vulnerability Detector' },
      { label: 'AGENT 02', value: 'Safe Patch Fixer' },
      { label: 'AGENT 03', value: 'Regression Verifier' },
      { label: 'SCANNERS', value: 'Semgrep & Bandit' },
    ],
    repoUrl: 'https://github.com/shoryaagrawal553/codeneeti',
    repoLabel: 'shoryaagrawal553/codeneeti',
    liveDemoUrl: 'https://codeguard-frontend-kb89.onrender.com/',
    videoSrc: '/videos/CodeGuard.mp4',
    videoTitle: 'CodeGuard — AI Code Review & Security Assistant Walkthrough',
    type: 'codeguard',
  },
  {
    id: 'websocket',
    categoryTag: 'C++17 SYSTEMS & LOW-LEVEL NETWORKING',
    title: 'SecureWebSocketClient-Cpp',
    badge: '158 Commits · RFC 6455',
    categories: ['All', 'Systems & C++'],
    summary: 'Asynchronous WebSocket client crafted natively from scratch using C++17, Winsock2, and OpenSSL. Implements RFC 6455 handshake protocol, 4-byte bitwise frame masking (XOR), and encrypted WSS with zero external framework dependencies.',
    specs: [
      { label: 'STANDARD', value: 'RFC 6455' },
      { label: 'SOCKETS', value: 'Winsock2 (ws2_32)' },
      { label: 'SECURITY', value: 'OpenSSL libssl' },
      { label: 'IO MODEL', value: 'Asynchronous Polling' },
    ],
    repoUrl: 'https://github.com/ershehzan/SecureWebSocketClient-Cpp',
    repoLabel: 'ershehzan/SecureWebSocketClient-Cpp',
    type: 'websocket',
  },
  {
    id: 'visionedge',
    categoryTag: 'EDGE COMPUTING & COMPUTER VISION',
    title: 'VisionEdge / Drone Tracking',
    badge: 'YOLO + DeepSORT Pipeline',
    categories: ['All', 'Computer Vision', 'Systems & C++'],
    summary: 'Real-time aerial object detection and multi-target tracking pipeline designed for UAV feeds. Integrates YOLO convolutional inference with DeepSORT appearance embeddings, Kalman filtering for trajectory estimation, and Hungarian data association.',
    specs: [
      { label: 'DETECTION', value: 'YOLO Edge Model' },
      { label: 'TRACKING', value: 'DeepSORT Tracker' },
      { label: 'FILTERING', value: 'Kalman State Est.' },
      { label: 'LATENCY', value: 'Real-Time Stream' },
    ],
    repoUrl: 'https://github.com/ershehzan',
    repoLabel: 'Repository / Pending URL Confirmation',
    type: 'visionedge',
  },
];

// Interactive Spotlight Project Card Component
function ProjectCard({
  project,
  onOpenVideo,
}: {
  project: Project;
  onOpenVideo: (src: string, title: string) => void;
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative rounded-3xl p-6 sm:p-8 bg-theme-card border border-theme-border shadow-sm flex flex-col justify-between hover:shadow-xl hover:border-theme-borderStrong transition-all duration-300 overflow-hidden group"
    >
      {/* Subtle cursor-following spotlight glow */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-3xl"
          style={{
            background: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, rgba(197, 243, 106, 0.08), transparent 70%)`,
          }}
        />
      )}

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[11px] font-mono font-bold tracking-wider text-theme-muted uppercase">
              {project.categoryTag}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-theme-text tracking-tight mt-0.5">
              {project.title}
            </h3>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-theme-surface text-theme-text border border-theme-border font-semibold">
            {project.badge}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-theme-muted leading-relaxed mb-6">
          {project.summary}
        </p>

        {/* Card Visual Media */}
        {project.type === 'flowforge' && project.imageSrc && (
          <div className="relative rounded-2xl overflow-hidden border border-theme-border bg-[#0d0f0e] mb-6 group/media">
            <div className="aspect-[16/9] relative">
              <Image
                src={project.imageSrc}
                alt="FlowForge AI Production Gantt Chart"
                fill
                className="object-cover object-top opacity-90 group-hover/media:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>

            {project.videoSrc && (
              <button
                onClick={() => onOpenVideo(project.videoSrc!, project.videoTitle!)}
                className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-theme-accent text-theme-accentContrast flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer group/btn"
                title="Watch FlowForge AI Video Walkthrough (Muted Autoplay)"
              >
                <Play className="w-6 h-6 fill-current ml-0.5" />
              </button>
            )}

            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-white/90">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-theme-accent animate-pulse" />
                Production Gantt Dashboard
              </span>
              <span className="text-[#C5F36A] font-semibold flex items-center gap-1">
                <Play className="w-3 h-3 fill-current" /> DEMO
              </span>
            </div>
          </div>
        )}

        {project.type === 'codeguard' && (
          <div className="relative rounded-2xl overflow-hidden border border-theme-border bg-slate-900 mb-6 group/media">
            <div className="aspect-[16/9] relative flex flex-col justify-between p-6 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white font-mono">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span>CODEGUARD_AGENT_PIPELINE.py</span>
                </span>
                <span className="text-emerald-400">STATUS: VERIFIED</span>
              </div>

              <div className="text-xs sm:text-sm text-slate-300 space-y-1.5 py-2">
                <p className="text-slate-400">// 1. Deterministic Scanners (Semgrep & Bandit)</p>
                <p className="text-indigo-300">→ SHA-256 fingerprinting & deduplication</p>
                <p className="text-slate-400">// 2. Google Gemini Agent Pipeline</p>
                <p className="text-emerald-300">→ [Detector] → [Fixer Agent] → [Verifier Agent]</p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                <span>Zero-Execution Sandbox</span>
                <span>FastAPI + Next.js</span>
              </div>
            </div>

            {project.videoSrc && (
              <button
                onClick={() => onOpenVideo(project.videoSrc!, project.videoTitle!)}
                className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer group/btn"
                title="Watch CodeGuard Video Walkthrough (Muted Autoplay)"
              >
                <Play className="w-6 h-6 fill-current ml-0.5" />
              </button>
            )}
          </div>
        )}

        {project.type === 'websocket' && (
          <div className="rounded-2xl p-5 bg-[#0B0E0C] text-[#C5F36A] font-mono text-xs mb-6 border border-theme-border">
            <div className="flex items-center justify-between text-neutral-400 mb-3 border-b border-neutral-800 pb-2">
              <span className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-theme-accent" />
                <span>rfc6455_client.cpp</span>
              </span>
              <span className="text-neutral-500">C++17 Winsock2</span>
            </div>
            <pre className="text-neutral-300 overflow-x-auto text-[11px] leading-relaxed">
{`// Handcrafted 4-byte XOR frame masking
uint8_t masking_key[4];
for (size_t i = 0; i < payload_len; ++i) {
    frame[header_len + i] = payload[i] ^ masking_key[i % 4];
}`}
            </pre>
          </div>
        )}

        {project.type === 'visionedge' && (
          <div className="rounded-2xl p-5 bg-[#0B0E0C] text-[#38bdf8] font-mono text-xs mb-6 border border-theme-border">
            <div className="flex items-center justify-between text-neutral-400 mb-3 border-b border-neutral-800 pb-2">
              <span className="flex items-center gap-2">
                <Crosshair className="w-3.5 h-3.5 text-sky-400" />
                <span>aerial_tracker.py</span>
              </span>
              <span className="text-neutral-500">Edge Pipeline</span>
            </div>
            <pre className="text-neutral-300 overflow-x-auto text-[11px] leading-relaxed">
{`# Multi-target Kalman state association
detections = yolo_detector.infer(frame)
tracks = deepsort.update_tracks(detections, frame=frame)
# Real-time state estimation across frames`}
            </pre>
          </div>
        )}

        {/* Technical Specs Pill Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
          {project.specs.map((spec) => (
            <div
              key={spec.label}
              className="p-2.5 rounded-xl bg-theme-surface border border-theme-border font-mono text-[11px]"
            >
              <span className="block text-theme-muted text-[10px] uppercase font-bold">{spec.label}</span>
              <span className="font-semibold text-theme-text mt-0.5 block truncate">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Links */}
      <div className="relative z-10 pt-4 border-t border-theme-border flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-3">
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-theme-text hover:text-theme-accent transition-colors font-semibold"
          >
            <Github className="w-4 h-4" />
            <span className="truncate max-w-[200px] sm:max-w-xs">{project.repoLabel}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-theme-muted" />
          </a>

          {project.subLink && (
            <a
              href={project.subLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-theme-muted hover:text-theme-text underline underline-offset-2 transition-colors hidden sm:inline"
            >
              {project.subLink.label}
            </a>
          )}
        </div>

        {project.liveDemoUrl && (
          <a
            href={project.liveDemoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-full bg-theme-surface hover:bg-theme-accent hover:text-theme-accentContrast text-theme-text font-semibold flex items-center gap-1.5 transition-all border border-theme-border shadow-sm"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>LIVE DEMO</span>
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function WorkSection() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');
  const [videoModal, setVideoModal] = useState<{ isOpen: boolean; videoSrc: string; title: string }>({
    isOpen: false,
    videoSrc: '',
    title: '',
  });

  const openVideo = (videoSrc: string, title: string) => {
    setVideoModal({ isOpen: true, videoSrc, title });
  };

  const closeVideo = () => {
    setVideoModal({ isOpen: false, videoSrc: '', title: '' });
  };

  const filteredProjects = PROJECTS.filter((p) => p.categories.includes(activeFilter));

  const FILTER_OPTIONS: FilterCategory[] = [
    'All',
    'Systems & C++',
    'Optimization & Backend',
    'AI & Security',
    'Computer Vision',
  ];

  return (
    <section id="work" className="py-24 px-4 sm:px-6 md:px-12 lg:px-20 bg-theme-surface/50 text-theme-text transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Section Header & Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          {/* Section Indicator */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-theme-accent font-bold tracking-widest uppercase">03</span>
            <span className="h-4 w-[1px] bg-theme-border" />
            <h2 className="text-xs font-mono tracking-widest text-theme-muted uppercase font-semibold">
              WORK // SELECTED SYSTEMS & PROJECTS
            </h2>
          </div>

          {/* Filter Pills with Motion layoutId */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-full bg-theme-card border border-theme-border shadow-sm">
            {FILTER_OPTIONS.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-colors duration-200 cursor-pointer ${
                    isActive ? 'text-theme-bg font-bold' : 'text-theme-muted hover:text-theme-text'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="workFilterActivePill"
                      className="absolute inset-0 rounded-full bg-theme-text shadow-sm -z-0"
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10">{filter}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2x2 Grid of Fluid AnimatePresence Project Cards */}
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenVideo={openVideo}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Video Player Modal */}
        <VideoModal
          isOpen={videoModal.isOpen}
          videoSrc={videoModal.videoSrc}
          title={videoModal.title}
          onClose={closeVideo}
        />
      </div>
    </section>
  );
}
