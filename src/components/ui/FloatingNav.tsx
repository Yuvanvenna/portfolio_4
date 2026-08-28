'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';

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

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Research', href: '#research' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

export default function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('#about');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Simple active section detection
      const sections = navItems.map(item => document.querySelector(item.href));
      const scrollPosition = window.scrollY + 200;

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i] as HTMLElement;
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(navItems[i].href);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleResumeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Fire confetti for premium feedback
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#6366F1', '#06B6D4', '#10B981'],
    });

    // Simulate opening resume
    window.open('https://drive.google.com/file/d/1X5XwZ1n9-5WJ_GjUvBvYk-gG63R-H_hE/view?usp=sharing', '_blank');
  };

  const scrollToSection = (href: string) => {
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'pt-4' : 'pt-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          className={`mx-auto transition-all duration-300 max-w-5xl rounded-full border ${
            scrolled
              ? 'bg-slate-950/70 border-slate-800/80 backdrop-blur-md px-6 py-3 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]'
              : 'bg-transparent border-transparent px-4 py-3'
          } flex items-center justify-between`}
        >
          {/* Logo & Pulsing dot */}
          <div className="flex items-center gap-2">
            <span className="font-sans font-bold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 select-none">
              Venna Yuvan
            </span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`text-sm font-medium transition-colors hover:text-cyan-400 ${
                  activeSection === item.href ? 'text-cyan-400 font-semibold' : 'text-slate-400'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Actions (Socials + Resume) */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://github.com/yuvanvenna"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
              className="text-slate-400 hover:text-gray-100 transition-colors"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href="http://www.linkedin.com/in/yuvan-venna-167b2a24b"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile"
              className="text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <LinkedinIcon size={18} />
            </a>
            <button
              onClick={handleResumeClick}
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-semibold rounded-full group bg-gradient-to-br from-indigo-500 to-cyan-400 hover:text-white dark:text-white focus:outline-none"
            >
              <span className="relative px-3 py-1.5 transition-all ease-in duration-75 bg-slate-950 rounded-full group-hover:bg-opacity-0 flex items-center gap-1.5">
                <FileText size={12} />
                <span>Resume</span>
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={handleResumeClick}
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-semibold rounded-full group bg-gradient-to-br from-indigo-500 to-cyan-400 hover:text-white focus:outline-none"
            >
              <span className="relative px-3 py-1 bg-slate-950 rounded-full group-hover:bg-opacity-0 flex items-center gap-1">
                <FileText size={10} />
                <span>Resume</span>
              </span>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-400 hover:text-gray-100 p-1"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden mt-2 mx-auto max-w-sm rounded-2xl border border-slate-800 bg-slate-950/95 backdrop-blur-lg px-4 py-4 shadow-xl flex flex-col gap-3">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`text-left py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === item.href
                    ? 'bg-slate-900 text-cyan-400'
                    : 'text-slate-400 hover:bg-slate-900/50 hover:text-gray-100'
                }`}
              >
                {item.name}
              </button>
            ))}
            <div className="border-t border-slate-800 pt-3 flex items-center justify-between px-3">
              <span className="text-xs text-slate-500">Find me on</span>
              <div className="flex gap-4">
                <a
                  href="https://github.com/yuvanvenna"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-400 hover:text-white"
                >
                  <GithubIcon size={18} />
                </a>
                <a
                  href="http://www.linkedin.com/in/yuvan-venna-167b2a24b"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-400 hover:text-cyan-400"
                >
                  <LinkedinIcon size={18} />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
