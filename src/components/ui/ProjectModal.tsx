'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Cpu, CheckCircle2 } from 'lucide-react';

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

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    id: string;
    title: string;
    description: string;
    longDescription?: string;
    tech: string[];
    metrics?: string[];
    github?: string;
    demo?: string;
    architecture?: string[];
  } | null;
}

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="relative w-full max-w-2xl overflow-y-auto max-h-[85vh] rounded-3xl border border-slate-800 bg-slate-900/90 backdrop-blur-md p-6 sm:p-8 shadow-2xl z-10 select-text"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 bg-slate-850 hover:bg-slate-800 rounded-full transition-colors"
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>

            {/* Heading */}
            <div className="mb-6">
              <span className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
                Technical Case Study
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                {project.title}
              </h3>
            </div>

            {/* Detail Layout */}
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-slate-400 mb-2 font-mono">Overview</h4>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {project.longDescription || project.description}
                </p>
              </div>

              {/* Metrics */}
              {project.metrics && project.metrics.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-slate-400 mb-2 font-mono">Impact & Performance</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.metrics.map((metric, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2.5 bg-indigo-950/20 border border-indigo-900/40 rounded-xl p-3.5"
                      >
                        <Cpu className="text-indigo-400 shrink-0" size={16} />
                        <span className="text-xs sm:text-sm font-mono font-semibold text-indigo-200">
                          {metric}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Architecture Steps */}
              {project.architecture && project.architecture.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-slate-400 mb-2 font-mono">System Architecture</h4>
                  <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 font-mono text-xs text-cyan-300">
                    <div className="flex flex-col gap-3">
                      {project.architecture.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <span className="text-indigo-400 font-bold shrink-0">{idx + 1}.</span>
                          <span className="leading-relaxed">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tech Stack */}
              <div>
                <h4 className="text-sm font-semibold text-slate-400 mb-2 font-mono">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-mono font-semibold bg-slate-800 text-slate-200 px-3 py-1 rounded-full border border-slate-700/50"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Foot Actions */}
            <div className="flex items-center justify-end gap-4 border-t border-slate-800 pt-6 mt-8">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-750 px-4 py-2 rounded-full border border-slate-700 transition-colors"
                >
                  <GithubIcon size={14} />
                  <span>View Repository</span>
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-900 bg-gradient-to-r from-indigo-400 to-cyan-400 hover:brightness-110 px-4 py-2 rounded-full transition-all"
                >
                  <ExternalLink size={14} />
                  <span>Launch Application</span>
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
