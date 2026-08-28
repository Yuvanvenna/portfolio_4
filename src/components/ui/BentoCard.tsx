'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'indigo' | 'cyan' | 'emerald';
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function BentoCard({
  children,
  className,
  glowColor = 'indigo',
  onMouseEnter,
  onMouseLeave,
}: BentoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for tilt degrees
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Setup spring values
  const config = { damping: 20, stiffness: 200 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), config);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), config);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Relative pointer coords
    const localX = event.clientX - rect.left;
    const localY = event.clientY - rect.top;
    setCoords({ x: localX, y: localY });

    // Normalize coordinates between -0.5 and 0.5
    const normX = (localX / width) - 0.5;
    const normY = (localY / height) - 0.5;

    x.set(normX);
    y.set(normY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (onMouseEnter) onMouseEnter();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    if (onMouseLeave) onMouseLeave();
  };

  const glowColors = {
    indigo: 'rgba(99, 102, 241, 0.15)',
    cyan: 'rgba(6, 182, 212, 0.15)',
    emerald: 'rgba(16, 185, 129, 0.15)',
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={cn(
        "relative rounded-3xl overflow-hidden border border-slate-800/80 bg-slate-900/60 backdrop-blur-md transition-all duration-300",
        isHovered ? "border-slate-700/80 shadow-[0_0_35px_-5px_rgba(99,102,241,0.15)]" : ""
      )}
    >
      {/* Dynamic Cursor Spotlight Overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, ${glowColors[glowColor]}, transparent 75%)`,
        }}
      />

      {/* Content wrapper */}
      <div 
        className={cn("relative z-10 w-full h-full", className)} 
        style={{ transform: 'translateZ(10px)' }}
      >
        {children}
      </div>
    </motion.div>
  );
}
