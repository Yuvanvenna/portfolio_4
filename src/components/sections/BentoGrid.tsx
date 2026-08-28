'use client';

import React, { useState } from 'react';
import { Mail, Phone, ExternalLink, Cpu, BookOpen, Award, Sparkles, AlertTriangle, CheckCircle, Search } from 'lucide-react';
import confetti from 'canvas-confetti';
import BentoCard from '../ui/BentoCard';
import QuantumMesh from '../canvas/QuantumMesh';

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

interface BentoGridProps {
  onOpenProject: (projectId: string) => void;
}

export default function BentoGrid({ onOpenProject }: BentoGridProps) {
  // ML Title Validator State
  const [titleA, setTitleA] = useState('Hybrid Classical-Quantum Tumor Classifier');
  const [titleB, setTitleB] = useState('Quantum-Inspired Liver Lesion Detection CNN');
  const [similarityScore, setSimilarityScore] = useState<number | null>(null);
  const [validationMsg, setValidationMsg] = useState<{ text: string; type: 'success' | 'warning' | 'error' | null }>({ text: '', type: null });
  const [isValidating, setIsValidating] = useState(false);
  const [quantumHover, setQuantumHover] = useState(false);

  // DroneGuard Simulator State
  const [droneHover, setDroneHover] = useState(false);
  const [droneScanStatus, setDroneScanStatus] = useState<'idle' | 'scanning' | 'anomaly_found'>('idle');

  const triggerDroneScan = () => {
    if (droneScanStatus === 'idle') {
      setDroneScanStatus('scanning');
    } else if (droneScanStatus === 'scanning') {
      setDroneScanStatus('anomaly_found');
    } else {
      setDroneScanStatus('idle');
    }
  };

  // Pure JavaScript Cosine Similarity Implementation
  const checkSimilarity = () => {
    setIsValidating(true);
    setValidationMsg({ text: 'Analyzing semantic space...', type: null });

    setTimeout(() => {
      const getTokens = (str: string) => {
        return str
          .toLowerCase()
          .replace(/[^\w\s]/g, '')
          .split(/\s+/)
          .filter(Boolean);
      };

      const tokens1 = getTokens(titleA);
      const tokens2 = getTokens(titleB);

      if (tokens1.length === 0 || tokens2.length === 0) {
        setSimilarityScore(0);
        setValidationMsg({ text: 'Please enter valid titles to validate.', type: 'warning' });
        setIsValidating(false);
        return;
      }

      const getFreqMap = (tokens: string[]) => {
        const map: Record<string, number> = {};
        tokens.forEach((t) => {
          map[t] = (map[t] || 0) + 1;
        });
        return map;
      };

      const map1 = getFreqMap(tokens1);
      const map2 = getFreqMap(tokens2);

      const allTokens = new Set([...Object.keys(map1), ...Object.keys(map2)]);

      let dotProduct = 0;
      let magnitude1 = 0;
      let magnitude2 = 0;

      allTokens.forEach((token) => {
        const val1 = map1[token] || 0;
        const val2 = map2[token] || 0;

        dotProduct += val1 * val2;
        magnitude1 += val1 * val1;
        magnitude2 += val2 * val2;
      });

      const score = dotProduct / (Math.sqrt(magnitude1) * Math.sqrt(magnitude2));
      setSimilarityScore(score);

      if (score >= 0.7) {
        setValidationMsg({
          text: `❌ Flagged Duplicate (${(score * 100).toFixed(0)}% overlap with indexed database).`,
          type: 'error',
        });
      } else if (score >= 0.35) {
        setValidationMsg({
          text: `⚠️ High similarity (${(score * 100).toFixed(0)}% overlap). Modifications recommended.`,
          type: 'warning',
        });
      } else {
        setValidationMsg({
          text: `🟢 Unique Title (${(score * 100).toFixed(0)}% overlap). Validated successfully!`,
          type: 'success',
        });
        confetti({
          particleCount: 50,
          spread: 40,
          origin: { y: 0.8 },
          colors: ['#06B6D4', '#10B981'],
        });
      }
      setIsValidating(false);
    }, 600);
  };

  return (
    <div className="flex flex-col gap-6 select-text max-w-5xl mx-auto w-full">
      
      {/* 2. Hero Project: Quantum DL Card (Full-width split layout) */}
      <BentoCard
        glowColor="cyan"
        className="w-full p-6 sm:p-8 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-6 min-h-[260px]"
        onMouseEnter={() => setQuantumHover(true)}
        onMouseLeave={() => setQuantumHover(false)}
      >
        <div className="w-full md:w-3/5 flex flex-col justify-between h-full min-h-[190px]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[9px] font-mono font-bold tracking-wider text-cyan-400 uppercase bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-900/30">
                Featured Research
              </span>
              <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/20 border border-emerald-900/30 px-2 py-0.5 rounded">
                +15% Inference Speedup
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
              Quantum-Assisted Liver Tumor Detection
            </h2>
            <p className="text-xs sm:text-sm text-slate-350 mt-2 leading-relaxed">
              End-to-end PyTorch Convolutional Neural Network integrated with a custom Qiskit Variational Quantum Classifier (VQC) angle-encoding layer. Maps classical features into high-dimensional quantum states to enhance spatial tumor boundaries diagnostics.
            </p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {['PyTorch', 'Qiskit', 'OpenCV', 'VQC', 'Angle Encoding'].map((t) => (
                <span key={t} className="text-[10px] font-mono bg-slate-950 text-slate-400 px-2 py-0.5 rounded border border-slate-900">{t}</span>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <button
              onClick={() => onOpenProject('quantum-dl')}
              className="flex items-center gap-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200 px-4 py-2.5 rounded-xl transition-all cursor-pointer"
            >
              <span>Research Case Study</span>
              <ExternalLink size={12} className="text-cyan-400" />
            </button>
          </div>
        </div>

        {/* 3D Wireframe Preview Column (Large fixed height layout) */}
        <div className="w-full md:w-2/5 h-48 md:h-52 bg-slate-950/50 border border-slate-800 rounded-2xl flex items-center justify-center relative overflow-hidden shrink-0">
          <QuantumMesh isHovered={quantumHover} />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent pointer-events-none" />
        </div>
      </BentoCard>

      {/* 2.5. DroneGuard Project Card (Full-width split layout) */}
      <BentoCard
        glowColor="indigo"
        className="w-full p-6 sm:p-8 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-6 min-h-[260px]"
        onMouseEnter={() => setDroneHover(true)}
        onMouseLeave={() => setDroneHover(false)}
      >
        <div className="w-full md:w-3/5 flex flex-col justify-between h-full min-h-[190px]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[9px] font-mono font-bold tracking-wider text-indigo-400 uppercase bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-900/30">
                UAV Computer Vision
              </span>
              <span className="text-[10px] font-mono font-bold text-indigo-400 bg-indigo-950/20 border border-indigo-900/30 px-2 py-0.5 rounded">
                Spatiotemporal Anomaly Detection
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
              DroneGuard — Aerial Video Anomaly Detection
            </h2>
            <p className="text-xs sm:text-sm text-slate-350 mt-2 leading-relaxed">
              Spatiotemporal anomaly detection system tailored for drone surveillance video streams. Combines an EfficientX3D backbone with custom Grouped Query Attention (GQA) and Vector Quantization (VQ) codebooks, using future-frame prediction error mapping for high-recall anomaly identification.
            </p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {['PyTorch', 'EfficientX3D', 'GQA', 'Vector Quantization', 'OpenCV', 'Python'].map((t) => (
                <span key={t} className="text-[10px] font-mono bg-slate-950 text-slate-400 px-2 py-0.5 rounded border border-slate-900">{t}</span>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <button
              onClick={() => onOpenProject('drone-guard')}
              className="flex items-center gap-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200 px-4 py-2.5 rounded-xl transition-all cursor-pointer"
            >
              <span>Research Case Study</span>
              <ExternalLink size={12} className="text-indigo-400" />
            </button>
          </div>
        </div>

        {/* Drone Anomaly Sentinel Console (Right Column Panel) */}
        <div className="w-full md:w-2/5 bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 font-mono text-[11px] text-slate-400 flex flex-row items-center justify-between h-48 md:h-52 shrink-0 select-none gap-4">
          <div className="flex flex-col justify-between h-full w-1/2">
            <div className="flex items-center gap-1.5 border-b border-slate-900 pb-2 mb-1.5">
              <span className={`h-1.5 w-1.5 rounded-full ${
                droneScanStatus === 'scanning' ? 'bg-indigo-400 animate-pulse' :
                droneScanStatus === 'anomaly_found' ? 'bg-rose-500 animate-pulse' : 'bg-slate-600'
              }`} />
              <span className={`font-bold ${
                droneScanStatus === 'scanning' ? 'text-indigo-400' :
                droneScanStatus === 'anomaly_found' ? 'text-rose-500' : 'text-slate-500'
              }`}>
                drone-sentinel
              </span>
            </div>
            
            <div className="space-y-1 text-[10px] leading-relaxed">
              <div className="text-slate-550">$ drone-guard --feed="uav_08"</div>
              {droneScanStatus === 'idle' && (
                <div className="text-slate-600">» Feed offline. Click trigger to monitor.</div>
              )}
              {droneScanStatus !== 'idle' && (
                <>
                  <div className="text-cyan-500/85">» Loading EfficientX3D...</div>
                  <div className="text-indigo-400/85">» Attention active (GQA)...</div>
                  {droneScanStatus === 'scanning' && (
                    <div className="text-emerald-400 animate-pulse">» Monitoring feed...</div>
                  )}
                  {droneScanStatus === 'anomaly_found' && (
                    <div className="text-rose-500 font-bold animate-pulse">» ANOMALY ALERT! [PSNR &lt; 18dB]</div>
                  )}
                </>
              )}
            </div>

            <button
              onClick={triggerDroneScan}
              className="mt-2 flex items-center justify-center gap-1 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-[10px] font-semibold text-slate-300 hover:text-white px-2.5 py-1.5 rounded-xl transition-all cursor-pointer"
            >
              <span>
                {droneScanStatus === 'idle' ? 'Start Monitor' : 
                 droneScanStatus === 'scanning' ? 'Simulate Alert' : 'Reset Feed'}
              </span>
            </button>
          </div>

          <div className="w-1/2 flex items-center justify-center h-full relative">
            <div className="relative w-28 h-28 rounded-full border border-slate-800 flex items-center justify-center overflow-hidden bg-slate-950/40">
              {/* Radar sweep lines */}
              <div className={`absolute inset-0 bg-[conic-gradient(from_0deg,transparent_50%,rgba(99,102,241,0.15)_100%)] ${
                droneScanStatus !== 'idle' ? 'animate-spin-slow' : ''
              }`} />
              {/* Concentric grids */}
              <div className="absolute w-20 h-20 rounded-full border border-slate-800/40 border-dashed" />
              <div className="absolute w-12 h-12 rounded-full border border-slate-800/40 border-dashed" />
              {/* Radar axes */}
              <div className="absolute inset-x-0 top-1/2 h-[1px] bg-slate-850/60" />
              <div className="absolute inset-y-0 left-1/2 w-[1px] bg-slate-850/60" />
              
              {/* Pulsing Target Dot */}
              {droneScanStatus === 'scanning' && (
                <div className="absolute top-1/3 left-1/4 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)] animate-pulse" />
              )}
              {droneScanStatus === 'anomaly_found' && (
                <div className="absolute bottom-1/4 right-1/3 w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_12px_rgba(239,68,68,0.9)] animate-ping" />
              )}
            </div>
          </div>
        </div>
      </BentoCard>

      {/* 3. Full-Stack SaaS Card (Full-width split layout) */}
      <BentoCard glowColor="emerald" className="w-full p-6 sm:p-8 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-6 min-h-[260px]">
        <div className="w-full md:w-3/5 flex flex-col justify-between h-full min-h-[190px]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[9px] font-mono font-bold tracking-wider text-emerald-400 uppercase bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/30">
                SaaS Engineering
              </span>
              <span className="text-[10px] font-mono text-slate-400">RVEIYA Dynamics</span>
            </div>

            <h2 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
              WhatsApp Marketing & Automation Platform
            </h2>
            <p className="text-xs sm:text-sm text-slate-350 mt-2 leading-relaxed">
              High-performance message scheduler and campaign broadcaster using Supabase database triggers, real-time Meta webhooks, and secure contact verification grids. Integrates OpenAI Assistant loops to automate customer service interactions.
            </p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {['React', 'TypeScript', 'Supabase', 'Node.js', 'Meta Cloud API'].map((t) => (
                <span key={t} className="text-[10px] font-mono bg-slate-950 text-slate-400 px-2 py-0.5 rounded border border-slate-900">{t}</span>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <button
              onClick={() => onOpenProject('whatsapp-saas')}
              className="flex items-center gap-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200 px-4 py-2.5 rounded-xl transition-all cursor-pointer"
            >
              <span>System Specifications</span>
              <ExternalLink size={12} className="text-emerald-400" />
            </button>
          </div>
        </div>

        {/* WhatsApp Broadcast Simulator Console (Right Column Panel) */}
        <div className="w-full md:w-2/5 bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 font-mono text-[11px] text-slate-400 flex flex-col justify-between h-48 md:h-52 shrink-0 select-none">
          <div className="flex items-center justify-between border-b border-slate-900 pb-2 mb-1">
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-400 font-bold">meta-broadcast-agent</span>
            </div>
            <span className="text-slate-600 text-[10px]">v1.0.2</span>
          </div>
          <div className="space-y-1 py-1.5 leading-relaxed">
            <div className="text-slate-500">$ whatsapp-broadcast --campaign="launch_alerts"</div>
            <div className="text-cyan-400">» Loading CRM pipeline (14,240 contacts)...</div>
            <div className="text-slate-350">» Broadcast queue status: ACTIVE [size=100]</div>
            <div className="flex items-center gap-2 mt-1">
              <span>» Progress:</span>
              <span className="text-emerald-400 font-bold">[█████████████░] 94%</span>
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-slate-900 pt-2 text-[10px] text-slate-500 mt-1">
            <span>Sent: 13,385</span>
            <span>Errors: 0</span>
          </div>
        </div>
      </BentoCard>

      {/* 4. Interactive Sandbox Card (Full-width split layout) */}
      <BentoCard glowColor="indigo" className="w-full p-6 sm:p-8 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-6 min-h-[260px]">
        <div className="w-full md:w-1/2 flex flex-col justify-between h-full min-h-[190px]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={14} className="text-indigo-400 animate-pulse" />
              <span className="text-[9px] font-mono font-bold tracking-wider text-indigo-400 uppercase bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-900/30">
                Interactive ML Sandbox
              </span>
            </div>

            <h2 className="text-lg font-extrabold text-white mb-1.5">
              ML-Powered Title Validator
            </h2>
            <p className="text-xs text-slate-350 leading-relaxed mb-4">
              Simulate semantic duplicate detection. Type two titles and evaluate cosine-similarity (based on tokenized vector overlays) to validate uniqueness across 160k+ indexing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[9px] font-mono text-slate-500 uppercase">Title Input A</label>
              <input
                type="text"
                value={titleA}
                onChange={(e) => setTitleA(e.target.value)}
                className="bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:outline-none rounded-xl px-3 py-2 text-xs font-mono text-white placeholder-slate-700"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[9px] font-mono text-slate-500 uppercase">Title Input B</label>
              <input
                type="text"
                value={titleB}
                onChange={(e) => setTitleB(e.target.value)}
                className="bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:outline-none rounded-xl px-3 py-2 text-xs font-mono text-white placeholder-slate-700"
              />
            </div>
          </div>
        </div>

        {/* Similarity Metric Dashboard Panel (Right Column) */}
        <div className="w-full md:w-1/2 bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between h-48 md:h-52 shrink-0 select-none">
          <div className="flex items-center justify-between border-b border-slate-900 pb-2 mb-1 font-mono text-[11px]">
            <span className="text-indigo-400 font-bold">similarity-metric-engine</span>
            <span className="text-slate-600">cosine-vectorizer</span>
          </div>
          
          <div className="flex flex-col items-center justify-center py-2 h-full">
            {similarityScore !== null ? (
              <div className="text-center">
                <div className="text-4xl font-black text-white tracking-tight">
                  {(similarityScore * 100).toFixed(0)}%
                </div>
                <div className="text-[10px] font-mono text-slate-400 uppercase mt-1">
                  Vector Cosine Similarity
                </div>
              </div>
            ) : (
              <div className="text-center text-slate-500 py-1">
                <Search size={22} className="mx-auto text-slate-600 mb-1.5 animate-pulse" />
                <span className="text-[10px] font-mono">Awaiting comparison validation...</span>
              </div>
            )}
          </div>
          
          <div className="border-t border-slate-900 pt-2.5 flex items-center justify-between text-[10px] font-mono">
            <span className="text-slate-550">DB SIZE: 160k+ Entries</span>
            {validationMsg.text ? (
              <span className={`font-bold ${
                validationMsg.type === 'success' ? 'text-emerald-400' : validationMsg.type === 'error' ? 'text-rose-400' : 'text-amber-400'
              }`}>
                {validationMsg.type === 'success' ? 'UNIQUE' : validationMsg.type === 'error' ? 'DUPLICATE' : 'WARNING'}
              </span>
            ) : (
              <span className="text-slate-600">IDLE</span>
            )}
          </div>

          <div className="flex items-center justify-between gap-2 mt-3 pt-2.5 border-t border-slate-900/50">
            <button
              onClick={() => onOpenProject('ml-title-validator')}
              className="px-2.5 py-1.5 rounded-lg text-[10px] font-semibold text-slate-450 hover:text-white border border-transparent hover:border-slate-800 transition-all cursor-pointer"
            >
              Case Study
            </button>
            <button
              onClick={checkSimilarity}
              disabled={isValidating}
              className="flex items-center gap-1 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:brightness-110 active:scale-[0.98] disabled:opacity-50 text-slate-950 font-bold text-[10px] px-3.5 py-1.5 rounded-lg transition-all cursor-pointer"
            >
              <Search size={11} className="stroke-[3px]" />
              <span>{isValidating ? 'Comparing...' : 'Compare Titles'}</span>
            </button>
          </div>
        </div>
      </BentoCard>

      {/* 5. Research & Publications Card (Full-width split layout) */}
      <BentoCard glowColor="cyan" className="w-full p-6 sm:p-8 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-6 min-h-[260px]">
        <div className="w-full md:w-3/5 flex flex-col justify-between h-full min-h-[190px]">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen size={16} className="text-cyan-400" />
              <span className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
                Publications & Conferences
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-indigo-950/40 text-indigo-300 border border-indigo-900/30">
                    Research Paper
                  </span>
                  <span className="text-[9px] font-mono text-slate-500 font-semibold">Under Peer Review</span>
                </div>
                <h3 className="text-sm font-bold text-white hover:text-cyan-300 transition-colors">
                  Liver Tumor Detection using Quantum-Assisted Deep Learning (Angle-encoded VQC CNN model)
                </h3>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-950/40 text-emerald-300 border border-emerald-900/30">
                    Journal Publication
                  </span>
                  <span className="text-[9px] font-mono text-emerald-400 font-bold">Accepted</span>
                </div>
                <h3 className="text-sm font-bold text-white hover:text-cyan-300 transition-colors">
                  Intrusion Detection System Using Self-Supervised Deep Learning (IDS models validation)
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Google Scholar Indexing Stats Panel */}
        <div className="w-full md:w-2/5 bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 font-mono text-[11px] text-slate-400 flex flex-col justify-between h-48 md:h-52 shrink-0 select-none">
          <div className="flex items-center justify-between border-b border-slate-900 pb-2 mb-1">
            <span className="text-cyan-400 font-bold">indexing-index</span>
            <span className="text-slate-650">online</span>
          </div>
          <div className="space-y-2 py-2">
            <div className="flex justify-between">
              <span>INDEXED:</span>
              <span className="text-slate-200">GOOGLE SCHOLAR</span>
            </div>
            <div className="flex justify-between">
              <span>PEER-REVIEW:</span>
              <span className="text-emerald-400 font-bold">COMPLETED</span>
            </div>
            <div className="flex justify-between">
              <span>SPECIALIZATION:</span>
              <span className="text-cyan-400 font-bold">QUANTUM DEEP LEARNING</span>
            </div>
          </div>
          <div className="border-t border-slate-900 pt-2 text-[10px] text-slate-500">
            <span>Publications count: 2 Papers</span>
          </div>
        </div>
      </BentoCard>

      {/* 6. Leadership & Impact Card (Full-width split layout) */}
      <BentoCard glowColor="indigo" className="w-full p-6 sm:p-8 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-6 min-h-[260px]">
        <div className="w-full md:w-3/5 flex flex-col justify-between h-full min-h-[190px]">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Award size={16} className="text-indigo-400" />
              <span className="text-xs font-mono font-bold tracking-wider text-indigo-400 uppercase">
                Leadership & Team Impact
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-extrabold text-white mb-2">
              Community-Based Participatory Research Lead
            </h3>
            <p className="text-xs sm:text-sm text-slate-350 leading-relaxed">
              Directed a 40-member research team validating regional demographic data and census indices. Coordinate survey iterations, data filtering modules, statistical census block check models, and local administrative align grids.
            </p>
          </div>
        </div>

        {/* CBPR Team Node Infographic Cluster */}
        <div className="w-full md:w-2/5 bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 font-mono text-[11px] text-slate-400 flex flex-col justify-between h-48 md:h-52 shrink-0 select-none">
          <div className="flex items-center justify-between border-b border-slate-900 pb-2 mb-1">
            <span className="text-indigo-400 font-bold">cbpr-team-cluster</span>
            <span className="text-slate-650">node-active</span>
          </div>
          
          <div className="flex justify-center items-center py-2 h-full">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-indigo-950 border border-indigo-500/80 flex items-center justify-center font-black text-white text-xs shadow-[0_0_10px_rgba(99,102,241,0.2)]">
                Lead
              </div>
              <span className="text-slate-850">───</span>
              <div className="flex flex-col gap-1">
                <div className="flex gap-1.5">
                  <div className="h-4.5 w-4.5 rounded-full bg-slate-900 border border-slate-800" />
                  <div className="h-4.5 w-4.5 rounded-full bg-slate-900 border border-slate-800" />
                  <div className="h-4.5 w-4.5 rounded-full bg-slate-900 border border-slate-800" />
                </div>
                <span className="text-[9px] text-slate-500 text-center font-bold font-mono tracking-tight">+40 Researchers</span>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-900 pt-2 text-[9px] text-slate-550 flex justify-between">
            <span>CENSUS DATASET</span>
            <span>100% VALIDATED</span>
          </div>
        </div>
      </BentoCard>
      
    </div>
  );
}
