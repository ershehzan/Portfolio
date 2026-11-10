'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ToolNode {
  id: string;
  name: string;
  badge: string;
  category: 'CORE' | 'BACKEND' | 'SYSTEMS';
  logo: string;
  description: string;
  highlight: string;
  coords: { x: number; y: number };
}

const TOOLS: ToolNode[] = [
  {
    id: 'cpp',
    name: 'C++ — C++17',
    badge: 'C++17',
    category: 'CORE',
    logo: '/assets/logos/cpp.png',
    description: 'Modern C++ with Standard Template Library, memory management, zero-overhead abstractions, and bitwise protocols.',
    highlight: 'Used in SecureWebSocketClient-Cpp and Data-Structure implementations.',
    coords: { x: 18, y: 18 },
  },
  {
    id: 'python',
    name: 'Python',
    badge: '3.10+',
    category: 'CORE',
    logo: '/assets/logos/python.png',
    description: 'High-performance scripting, multi-objective optimization, and AI model orchestration.',
    highlight: 'Used in FlowForge AI Genetic Algorithms and CodeGuard backend.',
    coords: { x: 50, y: 12 },
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    badge: 'v0.121',
    category: 'BACKEND',
    logo: '/assets/logos/fastapi.png',
    description: 'Asynchronous Python web framework with type hinting, dependency injection, and high throughput.',
    highlight: 'Powers real-time production endpoints and sandbox verification APIs.',
    coords: { x: 82, y: 18 },
  },
  {
    id: 'openssl',
    name: 'Winsock & OpenSSL',
    badge: 'RFC 6455',
    category: 'SYSTEMS',
    logo: '/assets/logos/winsock.png',
    description: 'Direct Windows socket networking (WSA) and TLS cryptographic stream handling.',
    highlight: 'Handcrafted WebSocket handshake and frame masking without external libraries.',
    coords: { x: 86, y: 50 },
  },
  {
    id: 'sql',
    name: 'SQL',
    badge: 'Relational',
    category: 'BACKEND',
    logo: '/assets/logos/sql.png',
    description: 'Relational database schema design, indexing strategies, and transactional ACID data integrity.',
    highlight: 'Structured queries and persistent data modeling for backend applications.',
    coords: { x: 80, y: 82 },
  },
  {
    id: 'git',
    name: 'Git & GitHub',
    badge: '150+ Commits',
    category: 'CORE',
    logo: '/assets/logos/git-github.png',
    description: 'Version control, multi-contributor collaboration, branching workflows, and CI/CD automation.',
    highlight: 'Active open-source developer on FlowForge AI, SecureWebSocketClient, and CodeGuard.',
    coords: { x: 50, y: 88 },
  },
  {
    id: 'docker',
    name: 'Docker',
    badge: 'Container',
    category: 'SYSTEMS',
    logo: '/assets/logos/docker.png',
    description: 'Containerized ephemeral execution environments for zero-trust code analysis and reproducible builds.',
    highlight: 'Isolating Semgrep and Bandit scanners within CodeGuard.',
    coords: { x: 18, y: 82 },
  },
  {
    id: 'dsa',
    name: 'Codolio / DSA',
    badge: '1,335+',
    category: 'CORE',
    logo: '/assets/logos/codolio.png',
    description: 'Advanced data structures, graph theory, dynamic programming, and complexity tuning.',
    highlight: '1,335 verified solved questions with a 574-day continuous streak.',
    coords: { x: 14, y: 50 },
  },
];

export default function StackSection() {
  const [selectedTool, setSelectedTool] = useState<ToolNode>(TOOLS[0]);
  const [filter, setFilter] = useState<'ALL' | 'CORE' | 'BACKEND' | 'SYSTEMS'>('ALL');

  return (
    <section id="stack" className="py-24 px-4 sm:px-6 md:px-12 lg:px-20 bg-theme-bg border-t border-theme-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Section Header matching Stack.png */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono text-theme-accent font-bold tracking-wider">04</span>
            <span className="h-4 w-[1px] bg-theme-border" />
            <h2 className="text-xl md:text-2xl font-black tracking-tight text-theme-text uppercase">
              MY STACK
            </h2>
          </div>
          <span className="text-xs font-mono text-theme-muted px-3 py-1 rounded-full bg-theme-surface border border-theme-border font-semibold">
            8 core systems
          </span>
        </div>

        {/* Outer Mindmap Container matching Stack.png */}
        <div className="relative rounded-3xl bg-theme-card border border-theme-border p-4 sm:p-12 min-h-[540px] sm:min-h-[620px] md:min-h-[680px] overflow-hidden flex flex-col justify-center items-center shadow-xl">
          
          {/* SVG Dashed Vector Connecting Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            {TOOLS.map((tool) => (
              <line
                key={`line-${tool.id}`}
                x1="50%"
                y1="50%"
                x2={`${tool.coords.x}%`}
                y2={`${tool.coords.y}%`}
                stroke={selectedTool.id === tool.id ? 'var(--accent)' : 'var(--border-strong)'}
                strokeWidth={selectedTool.id === tool.id ? '2' : '1'}
                strokeDasharray="4 4"
                className="transition-all duration-300"
              />
            ))}
          </svg>

          {/* Center Hub */}
          <div className="relative z-10 text-center max-w-[260px] sm:max-w-xs glass-panel px-6 sm:px-8 py-5 sm:py-6 rounded-3xl border border-theme-border shadow-xl">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-theme-text tracking-tight leading-tight">
              Tools I<br />live in.
            </h3>
            
            {/* Tag Pills */}
            <div className="flex items-center justify-center gap-1.5 mt-3 sm:mt-4">
              {(['CORE', 'BACKEND', 'SYSTEMS'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(filter === cat ? 'ALL' : cat)}
                  className={`text-[9px] sm:text-[10px] font-mono px-2 sm:px-2.5 py-1 rounded-full border transition-colors cursor-pointer ${
                    filter === cat
                      ? 'bg-theme-accent text-theme-accentContrast border-theme-accent font-bold'
                      : 'bg-theme-surface border-theme-border text-theme-muted hover:text-theme-text'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Orbiting Tool App Tiles */}
          {TOOLS.map((tool) => {
            const isMatch = filter === 'ALL' || filter === tool.category;
            const isSelected = selectedTool.id === tool.id;

            return (
              <div
                key={tool.id}
                style={{
                  left: `${tool.coords.x}%`,
                  top: `${tool.coords.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                className={`absolute z-20 flex flex-col items-center transition-all duration-300 ${
                  isMatch ? 'opacity-100 scale-100' : 'opacity-25 scale-75'
                }`}
              >
                <button
                  onClick={() => setSelectedTool(tool)}
                  className={`relative w-12 h-12 sm:w-16 sm:h-16 md:w-[72px] md:h-[72px] rounded-2xl md:rounded-[22px] bg-white flex items-center justify-center border shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer group p-2 sm:p-2.5 ${
                    isSelected ? 'ring-3 ring-theme-accent border-theme-accent shadow-theme-accent/20' : 'border-black/10 dark:border-white/20'
                  }`}
                  title={tool.name}
                  aria-label={`Select tool ${tool.name}`}
                >
                  {/* Notification Count Badge */}
                  <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 rounded-full bg-rose-500 text-white text-[8px] sm:text-[9px] font-bold font-mono shadow-md z-10 border-2 border-theme-card">
                    {tool.badge}
                  </span>

                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={tool.logo}
                      alt={`${tool.name} logo`}
                      fill
                      sizes="(max-width: 640px) 48px, (max-width: 768px) 64px, 72px"
                      className="object-contain p-0.5"
                    />
                  </div>
                </button>

                {/* Tool Name Label */}
                <span className={`text-[9px] sm:text-[11px] font-mono font-medium mt-1.5 sm:mt-2 tracking-tight text-center max-w-[85px] sm:max-w-[100px] truncate transition-colors ${
                  isSelected ? 'text-theme-accent font-bold' : 'text-theme-muted'
                }`}>
                  {tool.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Selected Tool Details Bar */}
        <div className="mt-6 glass-panel rounded-2xl p-4 sm:p-5 border border-theme-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative w-12 h-12 rounded-2xl bg-white border border-theme-border flex items-center justify-center shrink-0 p-1.5 shadow-md">
              <Image
                src={selectedTool.logo}
                alt={`${selectedTool.name} logo`}
                fill
                sizes="48px"
                className="object-contain p-1"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-theme-text">{selectedTool.name}</h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-theme-accent/20 text-theme-accent font-bold">
                  {selectedTool.badge}
                </span>
              </div>
              <p className="text-xs text-theme-muted mt-0.5">{selectedTool.description}</p>
            </div>
          </div>
          <div className="text-xs font-mono text-theme-accent bg-theme-accentSoft px-3 py-2 rounded-xl border border-theme-accent/20 shrink-0 font-medium">
            {selectedTool.highlight}
          </div>
        </div>
      </div>
    </section>
  );
}
