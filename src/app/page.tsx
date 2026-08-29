'use client';

import React, { useState } from 'react';
import FloatingNav from '@/components/ui/FloatingNav';
import HeroBackground from '@/components/canvas/HeroBackground';
import BentoGrid from '@/components/sections/BentoGrid';
import HeroCard from '@/components/sections/HeroCard';
import Experience from '@/components/sections/Experience';
import Skills from '@/components/sections/Skills';
import Contact from '@/components/sections/Contact';
import MetricsBar from '@/components/sections/MetricsBar';
import ProjectModal from '@/components/ui/ProjectModal';
import GlowCursor from '@/components/ui/GlowCursor';
import { FolderGit2 } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  metrics: string[];
  github?: string;
  demo?: string;
  architecture: string[];
}

const projectsData: Record<string, Project> = {
  'quantum-dl': {
    id: 'quantum-dl',
    title: 'Liver Tumor Detection (Quantum DL)',
    description: 'Hybrid classical-quantum CNN architecture in PyTorch using Qiskit.',
    longDescription: 'Developed a hybrid Deep Learning classifier for volumetric liver CT scans. By coupling an end-to-end PyTorch Convolutional Neural Network (CNN) feature extractor with a custom quantum-inspired angle-encoding layer into a Variational Quantum Classifier (VQC) in Qiskit, the model achieves state-of-the-art results with highly optimized parameter spaces.',
    tech: ['PyTorch', 'Qiskit', 'OpenCV', 'VQC', 'Angle Encoding', 'Python', 'NumPy'],
    metrics: [
      '+15% Diagnostic Inference Speed',
      '96.4% Classification Accuracy',
      '30% Reduction in Classical Weights'
    ],
    github: 'https://github.com/yuvanvenna/quantum-liver-detection',
    architecture: [
      'Input CT slices are preprocessed (normalized, resized) and features are extracted using classical convolutional layers.',
      'High-dimensional classical feature vectors are mapped into quantum states using custom Angle Encoding.',
      'Quantum states are processed by a parameterized Variational Quantum Classifier (VQC) circuit.',
      'Measurement outputs are obtained via Pauli-Z expectation values and mapped to class probabilities.'
    ]
  },
  'drone-guard': {
    id: 'drone-guard',
    title: 'DroneGuard — Aerial Video Anomaly Detection',
    description: 'Spatiotemporal anomaly detection system using EfficientX3D, Grouped Query Attention (GQA), and Vector Quantization.',
    longDescription: 'Engineered DroneGuard, a deep learning-based spatiotemporal anomaly detection model for UAV aerial video feeds. By integrating a 3D convolutional EfficientX3D backbone with a Grouped Query Attention (GQA) filter, the model isolates salient moving features. A discrete Vector Quantized (VQ) codebook encodes normal patterns, allowing a future-frame prediction decoder to spot anomalies based on reconstruction errors (MSE, MSSSIM, and gradient variance).',
    tech: ['PyTorch', 'EfficientX3D', 'Grouped Query Attention (GQA)', 'Vector Quantization (VQ)', 'OpenCV', 'Python'],
    metrics: [
      'Efficient 3D Convolutional Backbone',
      'Grouped Query Attention Focus',
      'VQ Codebook Discrete Latent Spaces',
      'Future-Frame Prediction Framework'
    ],
    github: 'https://github.com/Yuvanvenna/drone_gaurd',
    architecture: [
      'EfficientX3D backbone extracts multi-scale spatiotemporal feature maps from consecutive video frames.',
      'Grouped Query Attention (GQA) scales spatial queries to focus feature representation on moving targets.',
      'Vector Quantizer (VQ) maps features to a learned discrete codebook of representative patterns.',
      'Decoder network predicts the next future video frame based on the quantized codebook features.',
      'Anomaly detection is triggered when prediction errors (MSE, MSSSIM) cross dynamic thresholds.'
    ]
  },
  'whatsapp-saas': {
    id: 'whatsapp-saas',
    title: 'WhatsApp Marketing & Automation Platform',
    description: 'Campaign broadcasting, AI agent integration, CRM pipelines, and real-time workflows built at RVEIYA Dynamics.',
    longDescription: 'Designed and implemented a high-throughput WhatsApp marketing SaaS platform. It enables businesses to upload contact pipelines, run bulk campaign broadcasts via the Meta Cloud API, manage pre-approved template libraries in real-time, and route incoming customer replies to OpenAI Assistant-driven agents.',
    tech: ['React', 'TypeScript', 'Supabase', 'Node.js', 'Express.js', 'PostgreSQL', 'Meta APIs'],
    metrics: [
      '10,000+ Broadcasts Processed / Minute',
      'Real-Time Status Synchronization (Webhook-based)',
      'Automated AI Agent Response Qualified Pipeline'
    ],
    github: 'https://github.com/yuvanvenna/whatsapp-marketing-saas',
    architecture: [
      'Frontend client manages templates, campaigns, and contacts dashboard.',
      'Supabase Database tracks message statuses and triggers real-time UI state syncs.',
      'Express Node.js worker queues message broadcasting in chunks matching Meta rate-limits.',
      'Incoming webhooks route to OpenAI Assistants to execute automated client conversations.'
    ]
  },
  'tasker-app': {
    id: 'tasker-app',
    title: 'Tasker — Real-Time Task Management',
    description: 'Full-duplex real-time synchronization using WebSocket, JWT authentication, and MERN stack.',
    longDescription: 'Created a collaborative, real-time kanban task manager. Featuring instant board updates across users, full drag-and-drop support, comment sections, and optimistic UI updates, the project is powered by WebSockets and JWT security hashes.',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'WebSocket', 'JWT', 'Tailwind CSS'],
    metrics: [
      '<50ms Real-Time Action Latency',
      'Secure WebSocket Shakehand Protocol',
      'Optimistic Client UI state resolution'
    ],
    github: 'https://github.com/yuvanvenna/tasker-realtime',
    architecture: [
      'Express server establishes WebSocket channels and validates users via JWT headers.',
      'Client issues state updates (e.g. dragging a task card) which resolves instantly on the UI.',
      'WebSocket updates are dispatched in parallel to other concurrent board members.',
      'State shifts are finalized in MongoDB in the background, recovering if errors occur.'
    ]
  },
  'ml-title-validator': {
    id: 'ml-title-validator',
    title: 'ML-Powered Title Validator',
    description: 'Deduplication engine using scikit-learn similarity classification across 160k+ records.',
    longDescription: 'Engineered a highly scalable title duplicate analyzer. Built to filter research paper drafts, the backend leverages TF-IDF text representations and Cosine Similarity equations inside scikit-learn to compare inputs against a database of 160,000+ existing records.',
    tech: ['Flask', 'React', 'scikit-learn', 'Python', 'NumPy', 'Elasticsearch'],
    metrics: [
      'Indexed 160,000+ Historical Titles',
      '98.7% Duplicate Retrieval Recall Rate',
      '<100ms Query Inference Latency'
    ],
    github: 'https://github.com/yuvanvenna/ml-title-validator',
    architecture: [
      'Input strings are cleaned of punctuation and standard stop-words.',
      'A pre-trained TF-IDF vectorizer maps strings into weighted sparse vectors.',
      'Cosine similarity matrices are computed against historical indexing.',
      'Similarity thresholds exceeding 85% flag duplicate entries and block registration.'
    ]
  }
};

export default function Home() {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenProject = (id: string) => {
    if (projectsData[id]) {
      setActiveProjectId(id);
      setIsModalOpen(true);
    }
  };

  const selectedProject = activeProjectId ? projectsData[activeProjectId] : null;

  return (
    <div className="relative min-h-screen bg-bg-dark text-slate-100 overflow-x-hidden selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Subtle Ambient Glowing Cursor Follower */}
      <GlowCursor />

      {/* 3D Wave Particles Background */}
      <HeroBackground />

      {/* Floating Island Navigation */}
      <FloatingNav />

      {/* Hero & Bento Hub Section */}
      <section id="about" className="relative pt-32 pb-16 px-4 md:px-8 z-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 text-center md:text-left">
            <span className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase bg-indigo-950/40 border border-indigo-900/50 px-3 py-1.5 rounded-full">
              Engineering the Future of AI & Web
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mt-4 mb-3">
              Hello, Welcome to My Space.
            </h2>
            <p className="text-sm sm:text-base text-slate-350 max-w-2xl leading-relaxed">
              I&apos;m Venna Venkata Yuvan — a Full-Stack Engineer and AI/ML Researcher architecting scalable cloud platforms, deep learning computer vision systems, and hybrid quantum intelligence solutions.
            </p>
          </div>
          
          {/* Main profile intro card */}
          <HeroCard />

          {/* Key Engineering Impact Metrics Bar */}
          <MetricsBar />

          {/* New Projects Section Header */}
          <div id="projects" className="flex items-center gap-2.5 mt-20 mb-10 pt-4">
            <div className="bg-cyan-950/45 p-2 rounded-xl border border-cyan-800/40">
              <FolderGit2 className="text-cyan-400" size={24} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Featured Projects & ML Sandbox
            </h2>
          </div>

          {/* Bento Layout Grid */}
          <BentoGrid onOpenProject={handleOpenProject} />
        </div>
      </section>

      {/* Work Experience Section */}
      <Experience />

      {/* Filterable Skills Matrix Grid */}
      <Skills />

      {/* Education Info, Forms, & Footer */}
      <Contact />

      {/* Deep-Dive Case Study Modal Dialog */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject}
      />
    </div>
  );
}
