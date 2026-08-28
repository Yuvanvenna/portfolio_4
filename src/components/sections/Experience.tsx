'use client';

import React from 'react';
import { Briefcase } from 'lucide-react';
import Timeline from '../ui/Timeline';

export default function Experience() {
  return (
    <section id="experience" className="py-16 sm:py-24 select-text max-w-5xl mx-auto px-4">
      <div className="flex items-center gap-2.5 mb-10">
        <div className="bg-cyan-950/45 p-2 rounded-xl border border-cyan-800/40">
          <Briefcase className="text-cyan-400" size={24} />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Professional Experience
        </h2>
      </div>
      <Timeline />
    </section>
  );
}
