'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Play, ArrowUpRight, Github, Terminal, Shield, Crosshair, Globe } from 'lucide-react';
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

  return (
    <section id="work" className="py-24 px-4 sm:px-6 md:px-12 lg:px-20 bg-theme-surface/50 text-theme-text transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Section Header & Filter Bar matching Work.png */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          {/* Section Indicator */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono text-theme-accent font-bold tracking-wider">03</span>
            <span className="h-4 w-[1.5px] bg-theme-border" />
            <h2 className="text-xl md:text-2xl font-black tracking-tight text-theme-text uppercase">
              WORK
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {(['All', 'Systems & C++', 'Optimization & Backend', 'AI & Security', 'Computer Vision'] as FilterCategory[]).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                  activeFilter === filter
                    ? 'bg-theme-text text-theme-bg shadow-md'
                    : 'bg-theme-card text-theme-muted hover:text-theme-text border border-theme-border'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* 2x2 Grid of Distinct Shelf Display Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-3xl p-6 sm:p-8 bg-theme-card border border-theme-border shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300"
            >
              <div>
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

                {/* Card Visual Content */}
                {project.type === 'flowforge' && project.imageSrc && (
                  <div className="relative rounded-2xl overflow-hidden border border-theme-border bg-[#0d0f0e] mb-6 group">
                    <div className="aspect-[16/9] relative">
                      <Image
                        src={project.imageSrc}
                        alt="FlowForge AI Production Gantt Chart"
                        fill
                        className="object-cover object-top opacity-90 group-hover:scale-102 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    </div>

                    {project.videoSrc && (
                      <button
                        onClick={() => openVideo(project.videoSrc!, project.videoTitle!)}
                        className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-theme-accent text-theme-accentContrast flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer group/btn"
                        title="Watch FlowForge AI Video Walkthrough (Muted Autoplay)"
                      >
                        <Play className="w-6 h-6 fill-current ml-0.5" />
                      </button>
                    )}

                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-white/90">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-theme-accent animate-pulse" />
                        Interactive Production Gantt Dashboard
                      </span>
                      <span className="text-[#C5F36A] font-semibold flex items-center gap-1">
                        <Play className="w-3 h-3 fill-current" /> 21MB DEMO
                      </span>
                    </div>
                  </div>
                )}

                {project.type === 'codeguard' && (
                  <div className="relative rounded-2xl overflow-hidden border border-theme-border bg-slate-900 mb-6 group">
                    <div className="aspect-[16/9] relative flex flex-col justify-between p-6 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white font-mono">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-emerald-400" />
                          <span>CODEGUARD_AGENT_PIPELINE.py</span>
                        </span>
                        <span className="text-emerald-400">STATUS: PROTOTYPE READY</span>
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
                        onClick={() => openVideo(project.videoSrc!, project.videoTitle!)}
                        className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer group/btn"
                        title="Watch CodeGuard Video Walkthrough (Muted Autoplay)"
                      >
                        <Play className="w-6 h-6 fill-current ml-0.5" />
                      </button>
                    )}
                  </div>
                )}

                {project.type === 'websocket' && (
                  <div className="rounded-2xl overflow-hidden border border-theme-border bg-[#0B0E0C] p-5 text-xs font-mono text-[#F4F5EF] mb-6">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3 text-[11px] text-[#A5B49F]">
                      <span className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-theme-accent" />
                        ws_client.cpp // RFC 6455 Engine
                      </span>
                      <span className="text-theme-accent">C++17 // Winsock2</span>
                    </div>

                    <div className="space-y-1 text-[11px]">
                      <p className="text-[#A5B49F]">// 1. Handshake & Key Derivation</p>
                      <p className="text-emerald-400">GET /chat HTTP/1.1</p>
                      <p className="text-white/80">Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==</p>
                      <p className="text-[#A5B49F] mt-2">// 2. Client-Side Bitwise Masking (RFC 6455 Sec 5.3)</p>
                      <p className="text-yellow-300">
                        uint8_t mask_key[4]; // 4-byte random key
                        <br />
                        payload[i] ^= mask_key[i % 4];
                      </p>
                      <p className="text-[#A5B49F] mt-2">// 3. Secure Transport Layer</p>
                      <p className="text-cyan-300">SSL_connect(ssl) // OpenSSL TLS 1.3 handshake OK</p>
                    </div>
                  </div>
                )}

                {project.type === 'visionedge' && (
                  <div className="rounded-2xl overflow-hidden border border-theme-border bg-[#0B0E0C] p-5 text-xs font-mono text-[#F4F5EF] mb-6">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3 text-[11px] text-[#A5B49F]">
                      <span className="flex items-center gap-2">
                        <Crosshair className="w-4 h-4 text-cyan-400" />
                        uav_tracking_pipeline.py
                      </span>
                      <span className="text-cyan-400">EDGE PIPELINE</span>
                    </div>

                    <div className="space-y-2 py-1 text-[11px]">
                      <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
                        <span className="text-slate-300">1. Spatial Inference (YOLO)</span>
                        <span className="text-cyan-300">Bounding Boxes [x, y, w, h]</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
                        <span className="text-slate-300">2. Feature Embedding (DeepSORT)</span>
                        <span className="text-emerald-300">Appearance Vectors</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
                        <span className="text-slate-300">3. Trajectory Filter</span>
                        <span className="text-yellow-300">Kalman State [u, v, s, r]</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-white/10">
                      <span>Hungarian Data Association</span>
                      <span className="text-theme-accent">UAV Stream Ready</span>
                    </div>
                  </div>
                )}

                {/* 4 Feature Spec Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                  {project.specs.map((spec, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-theme-surface border border-theme-border text-center">
                      <span className="text-[10px] font-mono text-theme-muted block">{spec.label}</span>
                      <span className="text-xs font-bold text-theme-text truncate block">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Wooden Shelf Ledge & Links matching Work.png */}
              <div>
                <div className="wood-shelf mb-5 mt-2" />
                <div className="flex items-center justify-between text-xs font-semibold pt-1 flex-wrap gap-2">
                  <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                    {/* Live Demo Link (if available) */}
                    {project.liveDemoUrl && (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-theme-accent text-theme-accentContrast hover:opacity-90 transition-opacity font-bold shadow-sm"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    )}

                    {/* GitHub Link */}
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-theme-text hover:text-theme-accent transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span className="truncate max-w-[150px] sm:max-w-none">{project.repoLabel}</span>
                      <ArrowUpRight className="w-3 h-3 text-theme-muted" />
                    </a>

                    {/* Sub Link */}
                    {project.subLink && (
                      <>
                        <span className="text-theme-muted/40">/</span>
                        <a
                          href={project.subLink.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-theme-text hover:text-theme-accent transition-colors"
                        >
                          <span>{project.subLink.label}</span>
                          <ArrowUpRight className="w-3 h-3 text-theme-muted" />
                        </a>
                      </>
                    )}
                  </div>

                  {/* Watch Demo CTA */}
                  {project.videoSrc && (
                    <button
                      onClick={() => openVideo(project.videoSrc!, project.videoTitle!)}
                      className="px-3.5 py-1.5 rounded-full bg-theme-text text-theme-bg hover:bg-theme-accent hover:text-theme-accentContrast transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer shadow-sm"
                    >
                      <span>Watch Demo</span>
                      <Play className="w-3 h-3 fill-current" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal Player (Autoplay Muted, Custom Controls) */}
      <VideoModal
        isOpen={videoModal.isOpen}
        videoSrc={videoModal.videoSrc}
        title={videoModal.title}
        onClose={closeVideo}
      />
    </section>
  );
}
