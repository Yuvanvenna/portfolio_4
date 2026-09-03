'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle2 } from 'lucide-react';

interface TimelineItem {
  role: string;
  company: string;
  period: string;
  bullets: string[];
  tech: string[];
}

const experiences: TimelineItem[] = [
  {
    role: 'SaaS Intern',
    company: 'RVEIYA Dynamics',
    period: 'July 2026 – Present',
    bullets: [
      'Engineered a complete WhatsApp marketing automation SaaS platform featuring message campaign broadcasts and dynamic template editors.',
      'Integrated AI conversation agents to automate customer replies and qualify pipeline leads dynamically.',
      'Developed real-time dashboards and robust databases using React, TypeScript, and Supabase.',
    ],
    tech: ['React', 'TypeScript', 'Supabase', 'Node.js', 'PostgreSQL', 'REST APIs'],
  },
  {
    role: 'App Modernizer',
    company: 'Celebal Technologies',
    period: 'May 2025 – July 2025',
    bullets: [
      'Refactored legacy codebases to eliminate technical debt, reducing client load times by modernizing standard UI libraries.',
      'Designed and deployed responsive and accessible components such as data grids, charts, and custom carousels.',
      'Collaborated closely with backend engineers to streamline API responses and state syncing.',
    ],
    tech: ['React', 'JavaScript', 'Tailwind CSS', 'Redux Toolkit', 'REST APIs'],
  },
  {
    role: 'Web Development Intern',
    company: 'Edunet Foundation',
    period: 'May 2024 – July 2024',
    bullets: [
      'Designed and built an interactive portfolio creator app that dramatically streamlined administrative workflows.',
      'Implemented front-end validation, HTML/CSS layout templates, and client-side data export mechanisms.',
      'Created cross-browser responsive interfaces adhering to web accessibility specifications.',
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Git'],
  },
];

export default function Timeline() {
  return (
    <div className="relative border-l-2 border-slate-800 ml-4 md:ml-8 space-y-12 py-4">
      {experiences.map((exp, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: idx * 0.15 }}
          className="relative pl-8 sm:pl-12"
        >
          {/* Timeline Node dot */}
          <div className="absolute -left-[11px] top-1.5 flex items-center justify-center bg-slate-950 rounded-full border-2 border-cyan-500 w-5 h-5 z-10 shadow-[0_0_10px_rgba(6,182,212,0.6)]">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          </div>

          {/* Experience Card */}
          <div className="group relative rounded-3xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-md p-6 sm:p-8 hover:border-slate-700 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.1)] hover:-translate-y-1 select-text">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {exp.role}
                </h4>
                <span className="text-sm font-semibold text-indigo-400">
                  {exp.company}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-800/60 rounded-full px-3.5 py-1.5 border border-slate-700 font-mono w-max">
                <Calendar size={12} className="text-cyan-400" />
                <span>{exp.period}</span>
              </div>
            </div>

            {/* Bullets */}
            <ul className="space-y-2.5 mb-6 text-sm text-slate-350">
              {exp.bullets.map((bullet, index) => (
                <li key={index} className="flex items-start gap-2.5 leading-relaxed">
                  <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-1" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Tech Pills */}
            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800/65">
              {exp.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs font-mono font-medium bg-slate-950 text-slate-300 border border-slate-850 px-2.5 py-1 rounded-md"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
