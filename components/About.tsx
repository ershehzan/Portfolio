'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { 
  Award, 
  Cpu, 
  Layers, 
  Sparkles,
  Code2,
  Terminal,
  Activity,
  CheckCircle2
} from 'lucide-react';

interface SkillItem {
  id: string;
  name: string;
  category: 'Programming Languages' | 'Frontend Development' | 'Backend Development' | 'CS Fundamentals' | 'Developer Tools';
  description: string;
  colorClass: string;
  rotDeg: number;
}

const ROLE_ITEMS = [
  { role: 'Software Engineer', rot: '-3deg' },
  { role: 'Full-Stack Engineer', rot: '2deg' },
  { role: 'C++ Developer', rot: '-4deg' },
  { role: 'Backend Engineer', rot: '3deg' },
  { role: 'Problem Solver', rot: '-2deg' },
] as const;

type Role = typeof ROLE_ITEMS[number]['role'];

const ROLE_FOCUS: Record<Role, string> = {
  'Software Engineer': 'Designing reliable architectures, end-to-end features, and resilient production code.',
  'Full-Stack Engineer': 'Bridging high-performance backend microservices with responsive, type-safe Next.js frontends.',
  'C++ Developer': 'Low-level systems programming, direct Winsock socket networking, and RFC 6455 protocol implementations.',
  'Backend Engineer': 'FastAPI APIs, multi-objective optimization pipelines, database schemas, and async task orchestration.',
  'Problem Solver': 'Combinatorial algorithms, graph theory, state compression, and 1,335+ verified DSA solutions.',
};

const SKILLS: SkillItem[] = [
  // Programming Languages
  {
    id: 'cpp',
    name: 'C++',
    category: 'Programming Languages',
    description: 'Used for systems programming, algorithmic problem-solving and low-level networking (Winsock, RFC 6455).',
    colorClass: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 hover:border-blue-500/50',
    rotDeg: -3,
  },
  {
    id: 'python',
    name: 'Python',
    category: 'Programming Languages',
    description: 'Used for high-performance scripting, multi-objective genetic algorithms, and AI agent orchestration.',
    colorClass: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 hover:border-amber-500/50',
    rotDeg: 4,
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'Programming Languages',
    description: 'Used for interactive frontend interfaces, client-side state management, and modern web applications.',
    colorClass: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20 hover:border-yellow-500/50',
    rotDeg: -2,
  },

  // Frontend Development
  {
    id: 'html',
    name: 'HTML',
    category: 'Frontend Development',
    description: 'Semantic document structuring, accessibility (a11y), and web standard compliance.',
    colorClass: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20 hover:border-orange-500/50',
    rotDeg: 5,
  },
  {
    id: 'css',
    name: 'CSS',
    category: 'Frontend Development',
    description: 'Responsive styling, custom design systems, modern layouts (Flexbox, Grid), and fluid animations.',
    colorClass: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20 hover:border-cyan-500/50',
    rotDeg: -4,
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'Frontend Development',
    description: 'Full-stack React framework with server-side rendering, static generation, API routes, and Turbopack optimization.',
    colorClass: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20 hover:border-purple-500/50',
    rotDeg: 3,
  },

  // Backend Development
  {
    id: 'fastapi',
    name: 'FastAPI',
    category: 'Backend Development',
    description: 'Used for building high-throughput asynchronous backend APIs and model verification services.',
    colorClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 hover:border-emerald-500/50',
    rotDeg: -5,
  },
  {
    id: 'flask',
    name: 'Flask',
    category: 'Backend Development',
    description: 'Lightweight Python micro-framework for modular RESTful services and rapid API prototyping.',
    colorClass: 'bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20 hover:border-zinc-500/50',
    rotDeg: 3,
  },
  {
    id: 'sql',
    name: 'SQL',
    category: 'Backend Development',
    description: 'Database querying, schema design, relational data management, and transactional ACID integrity.',
    colorClass: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20 hover:border-sky-500/50',
    rotDeg: -3,
  },

  // Computer Science Fundamentals
  {
    id: 'dsa',
    name: 'Data Structures & Algorithms',
    category: 'CS Fundamentals',
    description: '1,335+ verified problems solved across LeetCode, GFG & HackerRank; graph theory, DP, and complexity optimization.',
    colorClass: 'bg-emerald-500/15 text-emerald-700 dark:text-[#C5F36A] border-emerald-500/30 hover:border-emerald-500/60 font-semibold',
    rotDeg: 5,
  },
  {
    id: 'oop',
    name: 'Object-Oriented Programming',
    category: 'CS Fundamentals',
    description: 'Clean software architecture, encapsulation, polymorphism, inheritance, and SOLID design principles in C++ and Python.',
    colorClass: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20 hover:border-indigo-500/50',
    rotDeg: -4,
  },
  {
    id: 'os',
    name: 'Operating Systems',
    category: 'CS Fundamentals',
    description: 'Process scheduling, virtual memory management, multithreading synchronization, system calls, and POSIX concurrency.',
    colorClass: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20 hover:border-rose-500/50',
    rotDeg: 3,
  },
  {
    id: 'cn',
    name: 'Computer Networks',
    category: 'CS Fundamentals',
    description: 'Direct socket programming, TCP/IP handshake, HTTP/HTTPS, and RFC 6455 frame masking implementation.',
    colorClass: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20 hover:border-teal-500/50',
    rotDeg: -5,
  },

  // Developer Tools
  {
    id: 'git',
    name: 'Git',
    category: 'Developer Tools',
    description: 'Distributed version control, atomic commits, branching strategies, rebase workflows, and repository hygiene.',
    colorClass: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20 hover:border-red-500/50',
    rotDeg: 4,
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'Developer Tools',
    description: 'Open-source collaboration, pull requests, issue triage, and automated GitHub Actions workflows.',
    colorClass: 'bg-zinc-600/10 text-zinc-700 dark:text-zinc-300 border-zinc-600/20 hover:border-zinc-600/50',
    rotDeg: -3,
  },
  {
    id: 'vscode',
    name: 'VS Code',
    category: 'Developer Tools',
    description: 'Primary development environment configured for C++, Python, TypeScript, and remote container debugging.',
    colorClass: 'bg-blue-600/10 text-blue-700 dark:text-blue-300 border-blue-600/20 hover:border-blue-600/50',
    rotDeg: 3,
  },
];

// Motion Variants for Coordinated Staggered Entrances
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export default function About() {
  const [activeRole, setActiveRole] = useState<Role>('Software Engineer');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem>(SKILLS[0]);
  const portraitCardRef = useRef<HTMLDivElement>(null);

  // Subtle 3D tilt tracking mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 250, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 250, damping: 25 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-4, 4]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!portraitCardRef.current) return;
    const rect = portraitCardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.section 
      id="about" 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.15, margin: "-40px 0px -40px 0px" }}
      variants={containerVariants}
      className="py-24 px-6 md:px-12 lg:px-20 border-t border-theme-border bg-theme-elevated transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Number Header */}
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-12 sm:mb-14">
          <span className="text-xs font-mono text-theme-accent font-bold tracking-widest uppercase">02</span>
          <span className="h-4 w-[1px] bg-theme-border" />
          <h2 className="text-xs font-mono tracking-widest text-theme-muted uppercase font-semibold">
            ABOUT // IDENTITY & PHILOSOPHY
          </h2>
        </motion.div>

        {/* Two-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column — Authentic Color Portrait with Subtle 3D Tilt */}
          <motion.div 
            variants={itemVariants} 
            className="lg:col-span-5 relative"
            ref={portraitCardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: 1000 }}
          >
            <motion.div 
              style={{ rotateX, rotateY }}
              className="relative rounded-3xl overflow-hidden border border-theme-border bg-theme-surface shadow-2xl transition-shadow duration-300 hover:shadow-theme-accent/5"
            >
              {/* Full Head & Shoulders Framing with 4:5 Aspect Ratio */}
              <div className="aspect-[4/5] sm:aspect-[4/5.2] relative overflow-hidden bg-theme-card">
                <Image
                  src="/assets/shehzan-portrait.jpg"
                  alt="Shehzan Khan — Software Engineer · Full-Stack Developer"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover object-top transition-transform duration-700 ease-out"
                  priority
                />
              </div>

              {/* Status & Availability Caption Pill at Bottom */}
              <div className="absolute bottom-4 left-4 right-4 glass-panel px-4 py-3.5 rounded-2xl flex items-center justify-between shadow-xl border border-theme-border/80">
                <div>
                  <p className="text-sm font-bold text-theme-text">Shehzan Khan</p>
                  <p className="text-xs text-theme-muted">Software Engineer · Full-Stack Developer</p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-theme-accent/15 border border-theme-accent/30 text-theme-accent text-[11px] font-mono font-bold">
                  <span className="w-2 h-2 rounded-full bg-theme-accent animate-ping" />
                  AVAILABLE
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column — Editorial Headline, Rigor Cards, Bio & Skills */}
          <div className="lg:col-span-7 space-y-9">
            
            {/* 1. Large Bold Headline & Direct Engineering Statement */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-editorial-title font-black text-theme-text tracking-tight">
                Engineering software that works reliably from bits to scale.
              </h3>
              <p className="text-sm sm:text-base text-theme-muted leading-relaxed">
                I design and build software systems with a focus on core correctness, performance predictability, and maintainable architecture. My work bridges low-level C++ socket networking with high-throughput backend APIs and multi-objective combinatorial optimization.
              </p>
              <p className="text-sm sm:text-base text-theme-muted leading-relaxed">
                Whether implementing RFC 6455 frame masking byte-by-byte or tuning genetic algorithms to minimize makespan and machine tardiness, I focus on building systems that hold up under real-world constraints.
              </p>
            </motion.div>

            {/* 2. Engineering Highlights — Three Compact Cards Integrated into Editorial Layout */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {/* Card 1: Low-Level Rigor */}
              <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-theme-border hover:border-theme-accent/40 transition-all duration-300 shadow-sm group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold text-theme-muted uppercase tracking-wider">01 // LOW-LEVEL RIGOR</span>
                  <Cpu className="w-4 h-4 text-theme-accent transition-transform group-hover:scale-110" />
                </div>
                <p className="text-base sm:text-lg font-bold text-theme-text tracking-tight">C++17 & Networking</p>
                <p className="text-xs text-theme-muted mt-1 leading-relaxed">
                  Direct Winsock sockets, RFC 6455 frame masking, bitwise operations, memory safety.
                </p>
              </div>

              {/* Card 2: Combinatorial Optimization */}
              <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-theme-border hover:border-theme-accent/40 transition-all duration-300 shadow-sm group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold text-theme-muted uppercase tracking-wider">02 // OPTIMIZATION</span>
                  <Layers className="w-4 h-4 text-theme-accent transition-transform group-hover:scale-110" />
                </div>
                <p className="text-base sm:text-lg font-bold text-theme-text tracking-tight">Multi-Objective GA</p>
                <p className="text-xs text-theme-muted mt-1 leading-relaxed">
                  Job shop scheduling heuristics, makespan & tardiness minimization, failure recovery.
                </p>
              </div>

              {/* Card 3: Algorithmic Consistency */}
              <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-theme-border hover:border-theme-accent/40 transition-all duration-300 shadow-sm group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold text-theme-muted uppercase tracking-wider">03 // ALGORITHMIC RIGOR</span>
                  <Award className="w-4 h-4 text-theme-accent transition-transform group-hover:scale-110" />
                </div>
                <p className="text-base sm:text-lg font-bold text-theme-text tracking-tight">1,335+ Verified Solved</p>
                <p className="text-xs text-theme-muted mt-1 leading-relaxed">
                  Graph theory, DP, state compression across LeetCode, GFG & HackerRank.
                </p>
              </div>
            </motion.div>

            {/* 3. Interactive Professional Role Focus */}
            <motion.div variants={itemVariants} className="space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-theme-accent uppercase">
                <Sparkles className="w-3.5 h-3.5 text-theme-accent" />
                <span>WHAT I DO // CORE DOMAINS</span>
              </div>

              {/* Animated Interactive Professional Role Selector */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {ROLE_ITEMS.map((item) => {
                  const isActive = activeRole === item.role;
                  return (
                    <button
                      key={item.role}
                      type="button"
                      onClick={() => setActiveRole(item.role)}
                      className={`text-xs sm:text-sm font-semibold px-3.5 py-1.5 rounded-full border transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-theme-accent text-theme-accentContrast border-theme-accent shadow-md scale-105'
                          : 'bg-theme-surface border-theme-border text-theme-muted hover:text-theme-text hover:border-theme-borderStrong'
                      }`}
                      aria-pressed={isActive}
                    >
                      {item.role}
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Role Focus Note */}
              <div className="text-xs sm:text-sm font-mono text-theme-accent bg-theme-accentSoft px-4 py-2.5 rounded-xl border border-theme-accent/25 transition-all duration-300">
                <span className="font-bold mr-1.5">Focus:</span>
                <span>{ROLE_FOCUS[activeRole]}</span>
              </div>
            </motion.div>

            {/* 4. Interactive Skills Cloud with Click-to-Inspect Detail */}
            <motion.div variants={itemVariants} className="space-y-3.5 pt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-theme-accent uppercase">
                  <Code2 className="w-3.5 h-3.5 text-theme-accent" />
                  <span>TECHNICAL SKILLS</span>
                </div>
                <span className="text-[11px] font-mono text-theme-muted">
                  Click any skill to inspect
                </span>
              </div>

              {/* Interactive Skill Chips Cloud */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 select-none">
                {SKILLS.map((skill) => {
                  const isSelected = selectedSkill.id === skill.id;
                  return (
                    <button
                      key={skill.id}
                      type="button"
                      onClick={() => setSelectedSkill(skill)}
                      style={{
                        transform: isSelected ? 'scale(1.06)' : `rotate(${skill.rotDeg}deg)`,
                      }}
                      className={`text-xs sm:text-sm px-3.5 py-1.5 rounded-xl border transition-all duration-200 cursor-pointer shadow-sm ${skill.colorClass} ${
                        isSelected
                          ? 'ring-2 ring-theme-accent border-theme-accent font-bold shadow-md'
                          : 'hover:scale-105 active:scale-95'
                      }`}
                      title={skill.name}
                      aria-label={`Inspect ${skill.name}`}
                    >
                      <span>{skill.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Interactive Selected Skill Detail Tooltip / Card */}
              {selectedSkill && (
                <div className="glass-panel p-4 rounded-2xl border border-theme-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-theme-accent shrink-0" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-bold text-theme-text">{selectedSkill.name}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-theme-surface border border-theme-border text-theme-muted">
                          {selectedSkill.category}
                        </span>
                      </div>
                      <p className="text-xs text-theme-muted mt-1 leading-relaxed">
                        {selectedSkill.description}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

          </div>
        </div>
      </div>
    </motion.section>
  );
}
