'use client';

import React, { useState } from 'react';
import { Mail, Phone, GraduationCap, ArrowUp, Send, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Fire confetti for satisfying visual feedback
      confetti({
        particleCount: 65,
        spread: 50,
        origin: { y: 0.85 },
        colors: ['#6366F1', '#06B6D4', '#10B981'],
      });
      
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 1200);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="contact" className="py-16 sm:py-24 select-text max-w-5xl mx-auto px-4 border-t border-slate-900">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left: Academic Stats & Quick Link Details */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
              Education & Contacts
            </h2>
            <p className="text-sm text-slate-400">
              Get in touch or review my academic background. Let's work together to build something outstanding.
            </p>
          </div>

          {/* Education Card */}
          <div className="group relative rounded-3xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-md p-6 hover:border-slate-700 transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="bg-indigo-950/50 p-2.5 rounded-xl border border-indigo-900/30 text-indigo-400 shrink-0">
                <GraduationCap size={22} />
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono font-bold tracking-wider text-indigo-400 uppercase">
                  Academic Credentials
                </span>
                <h3 className="text-base font-extrabold text-white">
                  SRM University, Andhra Pradesh
                </h3>
                <p className="text-xs text-slate-350">
                  B.Tech in Computer Science and Engineering
                </p>
                <p className="text-xs text-slate-400">
                  Specialization in Artificial Intelligence & Machine Learning
                </p>
                
                <div className="flex flex-wrap items-center gap-4 mt-3 pt-3 border-t border-slate-800/60 text-xs font-mono">
                  <span className="text-slate-400">CGPA: <strong className="text-white">8.28</strong></span>
                  <span className="text-slate-500">|</span>
                  <span className="text-slate-400">Graduating <strong className="text-white">June 2026</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-3 font-mono text-xs">
            <div className="flex items-center gap-3.5 bg-slate-900/30 border border-slate-900 rounded-xl p-3.5 hover:border-slate-800 transition-colors">
              <Mail className="text-indigo-400 shrink-0" size={16} />
              <div>
                <p className="text-[10px] text-slate-500 uppercase mb-0.5">Email Address</p>
                <a href="mailto:yuvanvenna4@gmail.com" className="text-slate-300 hover:text-white transition-colors">
                  yuvanvenna4@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3.5 bg-slate-900/30 border border-slate-900 rounded-xl p-3.5 hover:border-slate-800 transition-colors">
              <Phone className="text-cyan-400 shrink-0" size={16} />
              <div>
                <p className="text-[10px] text-slate-500 uppercase mb-0.5">Phone Number</p>
                <a href="tel:+919704388551" className="text-slate-300 hover:text-white transition-colors">
                  +91-9704388551
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Interactive Message Form */}
        <div className="relative rounded-3xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-md p-6 sm:p-8 hover:border-slate-700/80 transition-all duration-300">
          <span className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase block mb-2">
            Send a Message
          </span>
          <h3 className="text-lg font-extrabold text-white mb-6">
            Inquire or Start a Project
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Your Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:outline-none rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-600"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:outline-none rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-650"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Message</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:outline-none rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-650 resize-none animate-none"
                placeholder="Tell me about your project or role opportunities..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:brightness-110 active:scale-[0.98] disabled:opacity-50 text-slate-950 font-bold text-xs py-3 rounded-xl transition-all cursor-pointer"
            >
              {isSubmitted ? (
                <>
                  <Check size={14} className="stroke-[3px]" />
                  <span>Message Sent!</span>
                </>
              ) : (
                <>
                  <Send size={13} className="stroke-[2.5px]" />
                  <span>{isSubmitting ? 'Sending...' : 'Send Inquiry'}</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Footer layout */}
      <footer className="border-t border-slate-900 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col gap-1 items-center sm:items-start text-xs text-slate-500 font-mono text-center sm:text-left">
          <span>&copy; {new Date().getFullYear()} Venna Venkata Yuvan. All rights reserved.</span>
          <span>Designed and engineered with Next.js, Tailwind v4, and Three.js.</span>
        </div>

        <div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-400 hover:text-cyan-400 bg-slate-900/60 border border-slate-850 hover:border-slate-800 px-4 py-2.5 rounded-full transition-colors cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp size={12} />
          </button>
        </div>
      </footer>
    </section>
  );
}
