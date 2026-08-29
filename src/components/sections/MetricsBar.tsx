'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Cpu, Database, Zap, Sparkles } from 'lucide-react';

interface MetricItem {
  icon: React.ElementType;
  value: string;
  label: string;
  subtext: string;
  glow: string;
}

const metrics: MetricItem[] = [
  {
    icon: Cpu,
    value: '96.4%',
    label: 'Quantum CT Accuracy',
    subtext: 'Variational Quantum Classifier',
    glow: 'from-indigo-500/20 to-purple-500/5',
  },
  {
    icon: Zap,
    value: '10,000+',
    label: 'Broadcasts / Min',
    subtext: 'Meta Cloud API High-Throughput Queue',
    glow: 'from-emerald-500/20 to-teal-500/5',
  },
  {
    icon: Database,
    value: '160k+',
    label: 'Indexed Research Papers',
    subtext: 'TF-IDF & Cosine Deduplication',
    glow: 'from-cyan-500/20 to-blue-500/5',
  },
  {
    icon: Activity,
    value: '<50ms',
    label: 'Real-Time Sync Latency',
    subtext: 'Full-Duplex WebSocket Engine',
    glow: 'from-rose-500/20 to-amber-500/5',
  },
];

export default function MetricsBar() {
  return (
    <div className="w-full mt-10">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles size={16} className="text-cyan-400" />
        <span className="text-xs font-mono font-semibold tracking-wider text-slate-400 uppercase">
          Key Engineering Benchmarks
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {metrics.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              whileHover={{ y: -3 }}
              className="relative group rounded-2xl p-4 sm:p-5 border border-slate-800/80 bg-slate-950/40 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-slate-700"
            >
              {/* Radial gradient glow on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 group-hover:text-cyan-400 group-hover:border-slate-700 transition-all">
                    <Icon size={16} />
                  </div>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>

                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all">
                  {item.value}
                </div>

                <div className="text-xs font-semibold text-slate-300 mt-1">
                  {item.label}
                </div>

                <div className="text-[11px] text-slate-500 font-mono mt-0.5 line-clamp-1">
                  {item.subtext}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
