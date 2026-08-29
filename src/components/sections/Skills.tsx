'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, Search, Code2, Sparkles } from 'lucide-react';

interface Skill {
  name: string;
  category: 'languages' | 'frameworks' | 'databases' | 'ai-ml' | 'tools';
  tag?: string;
}

const skills: Skill[] = [
  // Programming Languages
  { name: 'C', category: 'languages', tag: 'System' },
  { name: 'C++', category: 'languages', tag: 'System' },
  { name: 'Python', category: 'languages', tag: 'AI/Core' },
  { name: 'JavaScript', category: 'languages', tag: 'Web' },
  { name: 'TypeScript', category: 'languages', tag: 'Web/Type' },
  { name: 'SQL', category: 'languages', tag: 'Database' },
  { name: 'HTML5', category: 'languages', tag: 'Frontend' },
  { name: 'CSS3', category: 'languages', tag: 'Styling' },

  // Frameworks & Libraries
  { name: 'Next.js / React', category: 'frameworks', tag: 'Frontend' },
  { name: 'Node.js', category: 'frameworks', tag: 'Runtime' },
  { name: 'Express.js', category: 'frameworks', tag: 'Backend' },
  { name: 'Flask', category: 'frameworks', tag: 'Microservice' },
  { name: 'PyTorch', category: 'frameworks', tag: 'Deep Learning' },
  { name: 'TensorFlow', category: 'frameworks', tag: 'ML Engine' },
  { name: 'OpenCV', category: 'frameworks', tag: 'Vision' },
  { name: 'NumPy', category: 'frameworks', tag: 'Compute' },
  { name: 'Matplotlib', category: 'frameworks', tag: 'Analysis' },

  // Databases & Cloud
  { name: 'PostgreSQL', category: 'databases', tag: 'Relational' },
  { name: 'Supabase', category: 'databases', tag: 'Realtime' },
  { name: 'MongoDB', category: 'databases', tag: 'NoSQL' },
  { name: 'Firebase', category: 'databases', tag: 'Auth/Data' },
  { name: 'Elasticsearch', category: 'databases', tag: 'Search DB' },

  // AI / ML Specializations
  { name: 'Quantum ML (Qiskit)', category: 'ai-ml', tag: 'Quantum DL' },
  { name: 'Spatiotemporal Vision', category: 'ai-ml', tag: 'UAV/Video' },
  { name: 'Grouped Query Attention', category: 'ai-ml', tag: 'Attention' },
  { name: 'Vector Quantization', category: 'ai-ml', tag: 'Latent Space' },
  { name: 'Convolutional Nets (CNN)', category: 'ai-ml', tag: 'Vision' },
  { name: 'Recurrent Nets (RNN/LSTM)', category: 'ai-ml', tag: 'Sequential' },
  { name: 'Large Language Models (LLM)', category: 'ai-ml', tag: 'GenAI' },
  { name: 'Retrieval Augmented (RAG)', category: 'ai-ml', tag: 'AI Pipeline' },

  // Tools & Core
  { name: 'Git & GitHub', category: 'tools', tag: 'VCS' },
  { name: 'WebSocket Real-Time', category: 'tools', tag: 'Duplex Event' },
  { name: 'JWT Authentication', category: 'tools', tag: 'Security' },
  { name: 'REST APIs & Webhooks', category: 'tools', tag: 'Integration' },
  { name: 'Meta Cloud API', category: 'tools', tag: 'Broadcast' },
];

const categories = [
  { id: 'all', name: 'All Skills' },
  { id: 'languages', name: 'Languages' },
  { id: 'frameworks', name: 'Frameworks & Libs' },
  { id: 'databases', name: 'Databases & Cloud' },
  { id: 'ai-ml', name: 'AI / ML & Quantum' },
  { id: 'tools', name: 'Tools & Protocols' },
];

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSkills = skills.filter((s) => {
    const matchesCat = selectedCategory === 'all' || s.category === selectedCategory;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.tag && s.tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <section id="skills" className="py-16 sm:py-24 select-text max-w-5xl mx-auto px-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2.5">
          <div className="bg-indigo-950/45 p-2 rounded-xl border border-indigo-800/40">
            <Wrench className="text-indigo-400" size={24} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Skills & Technical Matrix
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Production-tested technologies across full-stack systems and machine learning.
            </p>
          </div>
        </div>

        {/* Live Search Input */}
        <div className="relative w-full sm:w-64">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search tech, tool, skill..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950/80 border border-slate-800 focus:border-indigo-500 rounded-xl pl-9 pr-3 py-2 text-xs font-mono text-white placeholder-slate-600 focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Categories Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => {
          const count = cat.id === 'all'
            ? skills.length
            : skills.filter((s) => s.category === cat.id).length;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`text-xs font-semibold px-3.5 py-2 rounded-full border transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-slate-950 border-transparent shadow-[0_0_15px_rgba(99,102,241,0.25)] font-bold'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              <span>{cat.name}</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                selectedCategory === cat.id ? 'bg-slate-950/20 text-slate-950 font-bold' : 'bg-slate-800/80 text-slate-500'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Matrix Cards Grid */}
      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 bg-slate-950/40 border border-slate-900/90 rounded-3xl p-5 sm:p-7 backdrop-blur-md"
      >
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              key={skill.name}
              className="flex items-center justify-between bg-slate-900/50 border border-slate-800/70 rounded-xl p-3 hover:border-indigo-500/50 hover:bg-slate-900/90 hover:shadow-[0_0_20px_rgba(99,102,241,0.12)] transition-all group select-none"
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-xs sm:text-sm font-mono font-medium text-slate-200 group-hover:text-white transition-colors">
                  {skill.name}
                </span>
                {skill.tag && (
                  <span className="text-[9px] font-mono text-slate-500 group-hover:text-cyan-400 transition-colors">
                    {skill.tag}
                  </span>
                )}
              </div>
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/80 group-hover:bg-cyan-300 group-hover:scale-125 transition-all shadow-[0_0_6px_rgba(6,182,212,0.6)]" />
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredSkills.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500 font-mono text-xs">
            No matching technologies found for &quot;{searchQuery}&quot;
          </div>
        )}
      </motion.div>
    </section>
  );
}
