'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Server, Database, GitBranch, Shield, Activity, Layers, Terminal } from 'lucide-react';

interface ToolNode {
  id: string;
  name: string;
  badge: string;
  tier: 'SYSTEMS' | 'BACKEND' | 'CORE';
  tierLabel: string;
  logo: string;
  description: string;
  architectureRole: string;
  concreteApplication: string;
  connections: string[]; // Connected tool IDs
}

const SYSTEMS_NODES: ToolNode[] = [
  {
    id: 'cpp',
    name: 'C++17',
    badge: 'ISO C++17',
    tier: 'SYSTEMS',
    tierLabel: '01 // SYSTEMS & NETWORKING',
    logo: '/assets/logos/cpp.png',
    description: 'Direct memory management, bitwise protocol encoding, STL algorithms, and zero-cost abstractions.',
    architectureRole: 'Core systems language for native networking and high-performance algorithms.',
    concreteApplication: 'SecureWebSocketClient-Cpp and low-level Data-Structure library implementations.',
    connections: ['winsock', 'dsa'],
  },
  {
    id: 'winsock',
    name: 'Winsock & OpenSSL',
    badge: 'RFC 6455',
    tier: 'SYSTEMS',
    tierLabel: '01 // SYSTEMS & NETWORKING',
    logo: '/assets/logos/winsock.png',
    description: 'Asynchronous Windows socket API (ws2_32) and TLS encrypted stream termination.',
    architectureRole: 'Socket layer providing raw TCP/IP handshakes, byte streaming, and TLS cryptography.',
    concreteApplication: 'Handcrafted WebSocket client with 4-byte bitwise frame XOR masking.',
    connections: ['cpp'],
  },
  {
    id: 'docker',
    name: 'Docker',
    badge: 'Containerization',
    tier: 'SYSTEMS',
    tierLabel: '01 // SYSTEMS & NETWORKING',
    logo: '/assets/logos/docker.png',
    description: 'Ephemeral zero-trust container environments, reproducible builds, and isolated process sandboxing.',
    architectureRole: 'Runtime isolation layer preventing arbitrary execution during security audits.',
    concreteApplication: 'Ephemeral zero-execution sandbox hosting Semgrep and Bandit scanners inside CodeGuard.',
    connections: ['python', 'fastapi'],
  },
  {
    id: 'python',
    name: 'Python 3.10+',
    badge: 'High-Throughput',
    tier: 'BACKEND',
    tierLabel: '02 // BACKEND ENGINES & DATA',
    logo: '/assets/logos/python.png',
    description: 'Asynchronous task loops, multi-objective optimization algorithms, and LLM copilot orchestration.',
    architectureRole: 'High-level engine powering mathematical optimization and multi-agent systems.',
    concreteApplication: 'FlowForge AI Genetic Algorithms and CodeGuard three-agent pipeline.',
    connections: ['fastapi', 'sql', 'docker'],
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    badge: 'v0.121',
    tier: 'BACKEND',
    tierLabel: '02 // BACKEND ENGINES & DATA',
    logo: '/assets/logos/fastapi.png',
    description: 'High-throughput async ASGI web framework with Pydantic validation and automatic OpenAPI schemas.',
    architectureRole: 'RESTful API gateway orchestrating background scheduling jobs and verification endpoints.',
    concreteApplication: 'Production backend for FlowForge AI Gantt service and CodeGuard analysis API.',
    connections: ['python', 'sql'],
  },
  {
    id: 'sql',
    name: 'SQL & Relational DBs',
    badge: 'ACID Integrity',
    tier: 'BACKEND',
    tierLabel: '02 // BACKEND ENGINES & DATA',
    logo: '/assets/logos/sql.png',
    description: 'Relational data modeling, schema indexing, multi-table transactions, and query performance tuning.',
    architectureRole: 'Persistent operational storage guaranteeing transactional data consistency.',
    concreteApplication: 'Persistent scheduling schedules, user state, and security audit logs.',
    connections: ['fastapi', 'python'],
  },
  {
    id: 'dsa',
    name: 'Algorithms & DSA',
    badge: '1,335+ Solved',
    tier: 'CORE',
    tierLabel: '03 // ALGORITHMIC RIGOR & WORKFLOW',
    logo: '/assets/logos/codolio.png',
    description: 'Graph theory, combinatorial state compression, dynamic programming, and complexity minimization.',
    architectureRole: 'Foundational algorithmic problem solving applied to real-world constraint systems.',
    concreteApplication: '1,335+ verified problems solved across 616 active days on LeetCode, GFG & HackerRank.',
    connections: ['cpp', 'git'],
  },
  {
    id: 'git',
    name: 'Git & GitHub',
    badge: 'Atomic Commits',
    tier: 'CORE',
    tierLabel: '03 // ALGORITHMIC RIGOR & WORKFLOW',
    logo: '/assets/logos/git-github.png',
    description: 'Branching workflows, atomic commit history, GitHub Actions CI pipelines, and repository management.',
    architectureRole: 'Version control backbone enabling automated unit testing and regression verification.',
    concreteApplication: '73 automated passing unit tests in FlowForge AI and multi-contributor pull requests.',
    connections: ['dsa', 'docker'],
  },
];

export default function StackSection() {
  const [selectedNode, setSelectedNode] = useState<ToolNode>(SYSTEMS_NODES[0]);
  const [activeTier, setActiveTier] = useState<'ALL' | 'SYSTEMS' | 'BACKEND' | 'CORE'>('ALL');

  const filteredNodes = activeTier === 'ALL' 
    ? SYSTEMS_NODES 
    : SYSTEMS_NODES.filter(n => n.tier === activeTier);

  return (
    <section id="stack" className="py-24 px-4 sm:px-6 md:px-12 lg:px-20 bg-theme-bg border-t border-theme-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-theme-accent font-bold tracking-widest uppercase">04</span>
            <span className="h-4 w-[1px] bg-theme-border" />
            <h2 className="text-xs font-mono tracking-widest text-theme-muted uppercase font-semibold">
              SYSTEMS ARCHITECTURE // CORE TECHNICAL STACK
            </h2>
          </div>

          {/* Tier Filter Selector */}
          <div className="flex items-center gap-1 p-1 rounded-full bg-theme-card border border-theme-border shadow-sm text-xs font-mono">
            {(['ALL', 'SYSTEMS', 'BACKEND', 'CORE'] as const).map((tier) => (
              <button
                key={tier}
                onClick={() => setActiveTier(tier)}
                className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
                  activeTier === tier
                    ? 'bg-theme-accent text-theme-accentContrast font-bold shadow-sm'
                    : 'text-theme-muted hover:text-theme-text'
                }`}
              >
                {tier}
              </button>
            ))}
          </div>
        </div>

        {/* Technical Systems Map Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Grid: Systems Architecture Nodes */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {filteredNodes.map((node) => {
              const isSelected = selectedNode.id === node.id;
              const isConnected = selectedNode.connections.includes(node.id);

              return (
                <motion.div
                  key={node.id}
                  layout
                  onClick={() => setSelectedNode(node)}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start gap-3.5 ${
                    isSelected
                      ? 'bg-theme-card border-theme-accent ring-2 ring-theme-accent/30 shadow-lg'
                      : isConnected
                      ? 'bg-theme-card/90 border-theme-accent/50 shadow-sm'
                      : 'bg-theme-card border-theme-border hover:border-theme-borderStrong shadow-sm'
                  }`}
                >
                  {/* Tech Logo */}
                  <div className="w-10 h-10 rounded-xl bg-theme-surface p-2 border border-theme-border flex items-center justify-center shrink-0">
                    <Image
                      src={node.logo}
                      alt={node.name}
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </div>

                  {/* Node Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <h3 className="text-sm font-bold text-theme-text truncate">
                        {node.name}
                      </h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-theme-surface border border-theme-border text-theme-muted shrink-0">
                        {node.badge}
                      </span>
                    </div>

                    <p className="text-xs text-theme-muted line-clamp-2 leading-relaxed">
                      {node.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Panel: Selected System Deep-Dive Inspector */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 glass-panel rounded-3xl p-6 sm:p-7 border border-theme-border shadow-xl space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-theme-border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-theme-surface p-2.5 border border-theme-border flex items-center justify-center">
                    <Image
                      src={selectedNode.logo}
                      alt={selectedNode.name}
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold tracking-wider text-theme-accent uppercase">
                      {selectedNode.tierLabel}
                    </span>
                    <h3 className="text-xl font-black text-theme-text tracking-tight">
                      {selectedNode.name}
                    </h3>
                  </div>
                </div>

                <span className="text-xs font-mono px-3 py-1 rounded-full bg-theme-accentSoft border border-theme-accent/30 text-theme-accent font-bold">
                  {selectedNode.badge}
                </span>
              </div>

              {/* Architectural Role */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-theme-muted font-bold block">
                  SYSTEM ROLE & ARCHITECTURE
                </span>
                <p className="text-xs sm:text-sm text-theme-text leading-relaxed">
                  {selectedNode.architectureRole}
                </p>
              </div>

              {/* Concrete Application */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-theme-muted font-bold block">
                  PORTFOLIO IMPLEMENTATION
                </span>
                <div className="p-3.5 rounded-xl bg-theme-surface border border-theme-border font-mono text-xs text-theme-text leading-relaxed">
                  {selectedNode.concreteApplication}
                </div>
              </div>

              {/* Connected Systems in Graph */}
              <div className="space-y-2 pt-2 border-t border-theme-border">
                <span className="text-[11px] font-mono uppercase tracking-wider text-theme-muted font-bold block">
                  DEPENDENCIES & DATA FLOW
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {selectedNode.connections.map((connId) => {
                    const connNode = SYSTEMS_NODES.find(n => n.id === connId);
                    if (!connNode) return null;
                    return (
                      <button
                        key={connId}
                        onClick={() => setSelectedNode(connNode)}
                        className="px-2.5 py-1 rounded-lg bg-theme-surface hover:bg-theme-surfaceHover border border-theme-border text-xs font-mono text-theme-muted hover:text-theme-text transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-theme-accent" />
                        <span>{connNode.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
