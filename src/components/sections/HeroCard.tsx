'use client';

import React from 'react';
import { Mail, Phone } from 'lucide-react';
import BentoCard from '../ui/BentoCard';

const GithubIcon = ({ className, size = 18 }: { className?: string; size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className, size = 18 }: { className?: string; size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function HeroCard() {
  return (
    <BentoCard glowColor="indigo" className="w-full p-6 sm:p-8 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-6 min-h-[260px]">
      <div className="w-full md:w-3/5 flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold bg-emerald-950/40 text-emerald-400 border border-emerald-800/40 font-mono">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <span>Available for high-impact roles</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-1.5 leading-none">
            Venna Venkata Yuvan
          </h1>
          <p className="text-base sm:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 mb-3">
            Full-Stack Developer & AI/ML Researcher
          </p>
          <p className="text-slate-350 text-xs sm:text-sm leading-relaxed max-w-xl">
            Building high-performance SaaS applications and advancing hybrid Classical-Quantum deep learning architectures. Specializing in Next.js, PyTorch, and Qiskit.
          </p>
        </div>
      </div>

      {/* AI/ML Developer Console Component (Split Right Column) */}
      <div className="w-full md:w-2/5 bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4.5 font-mono text-[11px] text-slate-400 flex flex-col justify-between h-48 md:h-52 shrink-0 select-none">
        <div className="flex items-center justify-between border-b border-slate-900 pb-2">
          <span className="text-indigo-400 font-bold">yuvan-developer-shell</span>
          <span className="text-emerald-400 font-semibold animate-pulse">online</span>
        </div>
        <div className="space-y-1.5 py-2.5">
          <div className="flex justify-between">
            <span>DECISION_BOUNDARIES:</span>
            <span className="text-emerald-400 font-bold">OPTIMIZED</span>
          </div>
          <div className="flex justify-between">
            <span>CLASSICAL WEIGHTS:</span>
            <span className="text-cyan-400">-30% PARAM SPACE</span>
          </div>
          <div className="flex justify-between">
            <span>VQC INFERENCE FX:</span>
            <span className="text-emerald-400 font-bold">ACTIVE (+15%)</span>
          </div>
        </div>
        <div className="border-t border-slate-900 pt-2 flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <Mail size={12} className="text-indigo-400" />
            <a href="mailto:yuvanvenna4@gmail.com" className="text-[10px] text-slate-300 hover:text-white transition-colors">yuvanvenna4@gmail.com</a>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Phone size={12} className="text-cyan-400" />
              <a href="tel:+919704388551" className="text-[10px] text-slate-300 hover:text-white transition-colors">+91-9704388551</a>
            </div>
            <div className="flex gap-2.5">
              <a href="https://github.com/yuvanvenna" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="GitHub"><GithubIcon size={12} /></a>
              <a href="http://www.linkedin.com/in/yuvan-venna-167b2a24b" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors" aria-label="LinkedIn"><LinkedinIcon size={12} /></a>
            </div>
          </div>
        </div>
      </div>
    </BentoCard>
  );
}
