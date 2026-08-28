'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench } from 'lucide-react';

interface Skill {
  name: string;
  category: 'languages' | 'frameworks' | 'databases' | 'ai-ml' | 'tools';
}

const skills: Skill[] = [
  // Programming Languages
  { name: 'C', category: 'languages' },
  { name: 'C++', category: 'languages' },
  { name: 'Python', category: 'languages' },
  { name: 'JavaScript', category: 'languages' },
  { name: 'TypeScript', category: 'languages' },
  { name: 'SQL', category: 'languages' },
  { name: 'HTML', category: 'languages' },
  { name: 'CSS', category: 'languages' },

  // Frameworks & Libraries
  { name: 'React', category: 'frameworks' },
  { name: 'Node.js', category: 'frameworks' },
  { name: 'Express.js', category: 'frameworks' },
  { name: 'Flask', category: 'frameworks' },
  { name: 'TensorFlow', category: 'frameworks' },
  { name: 'PyTorch', category: 'frameworks' },
  { name: 'NumPy', category: 'frameworks' },
  { name: 'OpenCV', category: 'frameworks' },
  { name: 'Matplotlib', category: 'frameworks' },

  // Databases & Cloud
  { name: 'MongoDB', category: 'databases' },
  { name: 'PostgreSQL', category: 'databases' },
  { name: 'Supabase', category: 'databases' },
  { name: 'Firebase', category: 'databases' },
  { name: 'Elasticsearch', category: 'databases' },

  // AI / ML Specializations
  { name: 'Deep Learning', category: 'ai-ml' },
  { name: 'CNN', category: 'ai-ml' },
  { name: 'RNN', category: 'ai-ml' },
  { name: 'LSTM', category: 'ai-ml' },
  { name: 'LLM', category: 'ai-ml' },
  { name: 'RAG', category: 'ai-ml' },
  { name: 'Computer Vision', category: 'ai-ml' },
  { name: 'Quantum ML (Qiskit)', category: 'ai-ml' },

  // Tools & Core
  { name: 'Git', category: 'tools' },
  { name: 'GitHub', category: 'tools' },
  { name: 'WebSocket', category: 'tools' },
  { name: 'JWT', category: 'tools' },
  { name: 'REST APIs', category: 'tools' },
];

const categories = [
  { id: 'all', name: 'All Skills' },
  { id: 'languages', name: 'Languages' },
  { id: 'frameworks', name: 'Frameworks & Libs' },
  { id: 'databases', name: 'Databases & Cloud' },
  { id: 'ai-ml', name: 'AI / ML' },
  { id: 'tools', name: 'Tools & Core' },
];

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredSkills = selectedCategory === 'all'
    ? skills
    : skills.filter(s => s.category === selectedCategory);

  return (
    <section id="skills" className="py-16 sm:py-24 select-text max-w-5xl mx-auto px-4">
      <div className="flex items-center gap-2.5 mb-10">
        <div className="bg-indigo-950/45 p-2 rounded-xl border border-indigo-800/40">
          <Wrench className="text-indigo-400" size={24} />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Skills & Technical Matrix
        </h2>
      </div>

      {/* Categories Filters */}
      <div className="flex flex-wrap gap-2.5 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`text-xs font-semibold px-4.5 py-2.5 rounded-full border transition-all duration-300 cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-slate-950 border-transparent shadow-[0_0_15px_rgba(99,102,241,0.25)] font-bold'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Matrix Cards Grid */}
      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 bg-slate-950/30 border border-slate-900 rounded-3xl p-6 sm:p-8 backdrop-blur-sm"
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
              className="flex items-center justify-between bg-slate-900/40 border border-slate-800/60 rounded-xl p-3 hover:border-slate-700 hover:bg-slate-900/80 transition-all group select-none"
            >
              <span className="text-xs sm:text-sm font-mono font-medium text-slate-350 group-hover:text-white transition-colors">
                {skill.name}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
