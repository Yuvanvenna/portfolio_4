export interface GitHubRepo {
  id: number | string;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
}

export const FALLBACK_FEATURED_REPOS: GitHubRepo[] = [
  {
    id: 1,
    name: 'drone_gaurd',
    full_name: 'Yuvanvenna/drone_gaurd',
    description: 'Spatiotemporal anomaly detection for UAV aerial video feeds using EfficientX3D, Grouped Query Attention (GQA), and Vector Quantization.',
    html_url: 'https://github.com/Yuvanvenna/drone_gaurd',
    homepage: '',
    topics: ['featured', 'deep-learning', 'pytorch', 'computer-vision'],
    stargazers_count: 5,
    forks_count: 1,
    language: 'Python',
    updated_at: '2026-08-20T12:00:00Z',
  },
  {
    id: 2,
    name: 'quantum-liver-detection',
    full_name: 'yuvanvenna/quantum-liver-detection',
    description: 'Hybrid classical-quantum CNN architecture in PyTorch using Qiskit for liver tumor detection and angle-encoding VQC.',
    html_url: 'https://github.com/yuvanvenna/quantum-liver-detection',
    homepage: '',
    topics: ['featured', 'quantum-computing', 'qiskit', 'pytorch'],
    stargazers_count: 4,
    forks_count: 0,
    language: 'Python',
    updated_at: '2026-08-15T10:30:00Z',
  },
  {
    id: 3,
    name: 'whatsapp-marketing-saas',
    full_name: 'yuvanvenna/whatsapp-marketing-saas',
    description: 'High-throughput campaign broadcasting, AI agent automation, Supabase pipelines, and real-time webhook sync.',
    html_url: 'https://github.com/yuvanvenna/whatsapp-marketing-saas',
    homepage: '',
    topics: ['featured', 'typescript', 'react', 'supabase', 'openai'],
    stargazers_count: 3,
    forks_count: 0,
    language: 'TypeScript',
    updated_at: '2026-07-28T09:15:00Z',
  },
  {
    id: 4,
    name: 'tasker-realtime',
    full_name: 'yuvanvenna/tasker-realtime',
    description: 'Real-time collaborative task manager with WebSocket synchronization, optimistic UI updates, and JWT security.',
    html_url: 'https://github.com/yuvanvenna/tasker-realtime',
    homepage: '',
    topics: ['featured', 'react', 'websocket', 'mongodb', 'nodejs'],
    stargazers_count: 2,
    forks_count: 0,
    language: 'JavaScript',
    updated_at: '2026-06-14T14:40:00Z',
  },
  {
    id: 5,
    name: 'ml-title-validator',
    full_name: 'yuvanvenna/ml-title-validator',
    description: 'High-throughput duplicate research title detection engine using TF-IDF representations and cosine similarity in scikit-learn.',
    html_url: 'https://github.com/yuvanvenna/ml-title-validator',
    homepage: '',
    topics: ['featured', 'machine-learning', 'python', 'scikit-learn'],
    stargazers_count: 2,
    forks_count: 0,
    language: 'Python',
    updated_at: '2026-05-10T16:20:00Z',
  },
];
