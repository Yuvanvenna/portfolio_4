'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FolderGit2, 
  ExternalLink, 
  Star, 
  GitFork, 
  Sparkles, 
  RefreshCw, 
  Tag, 
  ArrowUpRight,
  Code2
} from 'lucide-react';
import { FALLBACK_FEATURED_REPOS, GitHubRepo } from '@/data/githubFeaturedFallback';

const languageColors: Record<string, string> = {
  Python: '#3572A5',
  TypeScript: '#3178C6',
  JavaScript: '#F1E05A',
  HTML: '#E34C26',
  CSS: '#563D7C',
  Shell: '#89E051',
  C: '#555555',
  'C++': '#F34B7D',
  Jupyter: '#DA5B0B',
  'Jupyter Notebook': '#DA5B0B',
};

const GithubIcon = ({ className, size = 16 }: { className?: string; size?: number }) => (
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

export default function GithubFeatured() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchFeaturedRepos = async () => {
    try {
      setIsRefreshing(true);
      // Fetch public repos from GitHub API
      const res = await fetch('https://api.github.com/users/yuvanvenna/repos?sort=updated&per_page=100');
      
      if (!res.ok) {
        throw new Error(`GitHub API returned ${res.status}`);
      }
      
      const allRepos: GitHubRepo[] = await res.json();
      
      // Filter: Only include repositories that have the topic 'featured'
      const featured = allRepos.filter(
        (repo) => Array.isArray(repo.topics) && repo.topics.includes('featured')
      );

      if (featured.length > 0) {
        setRepos(featured);
        setIsLive(true);
      } else {
        // If user hasn't tagged any repos yet on GitHub, show fallback showcase
        setRepos(FALLBACK_FEATURED_REPOS);
        setIsLive(false);
      }
    } catch (err) {
      console.warn('Could not fetch live GitHub repos, using fallback showcase:', err);
      setRepos(FALLBACK_FEATURED_REPOS);
      setIsLive(false);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchFeaturedRepos();
  }, []);

  return (
    <div className="w-full mt-14 mb-8">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-3 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase bg-cyan-950/40 border border-cyan-800/40 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
              <Tag size={11} />
              GitHub Sync Enabled
            </span>
            {isLive ? (
              <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-950/30 border border-emerald-800/40 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live from @yuvanvenna
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-[11px] font-mono text-indigo-300 bg-indigo-950/30 border border-indigo-800/40 px-2 py-0.5 rounded-full">
                <Sparkles size={11} className="text-indigo-400" />
                Tag &apos;featured&apos; on GitHub to sync
              </span>
            )}
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-2">
            Featured GitHub Repositories
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Automatically filtered to show projects with the <code className="text-cyan-300 font-mono bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">featured</code> topic tag.
          </p>
        </div>

        {/* Sync Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={fetchFeaturedRepos}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/60 px-3 py-1.5 rounded-lg cursor-pointer transition-all active:scale-95 disabled:opacity-50"
            title="Refresh from GitHub"
          >
            <RefreshCw size={13} className={isRefreshing ? 'animate-spin text-cyan-400' : ''} />
            <span>{isRefreshing ? 'Syncing...' : 'Sync GitHub'}</span>
          </button>
          
          <a
            href="https://github.com/yuvanvenna?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 bg-cyan-950/30 hover:bg-cyan-900/40 border border-cyan-800/50 px-3 py-1.5 rounded-lg transition-colors"
          >
            <GithubIcon size={13} />
            <span>All Repos</span>
            <ArrowUpRight size={12} />
          </a>
        </div>
      </div>

      {/* Grid of Featured Repositories */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-48 rounded-2xl bg-slate-900/40 border border-slate-800/60 animate-pulse p-5 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="w-1/2 h-5 bg-slate-800/60 rounded" />
                <div className="w-full h-12 bg-slate-800/30 rounded" />
              </div>
              <div className="w-1/3 h-4 bg-slate-800/40 rounded" />
            </div>
          ))}
        </div>
      ) : repos.length === 0 ? (
        <div className="text-center p-10 rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-400">
          <FolderGit2 className="mx-auto mb-3 text-slate-500" size={32} />
          <p className="font-semibold text-white">No repositories with topic &apos;featured&apos; found yet.</p>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            Head over to any repo at github.com/yuvanvenna, click the ⚙️ next to &apos;About&apos;, and add the topic <code className="text-cyan-400">featured</code>!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5">
          {repos.map((repo, index) => {
            const langColor = (repo.language && languageColors[repo.language]) || '#94A3B8';

            return (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="group relative bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800/80 hover:border-cyan-500/40 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.12)] backdrop-blur-md"
              >
                <div>
                  {/* Top Bar: Icon, Stars, Forks */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/50 text-cyan-400 group-hover:text-cyan-300 group-hover:scale-105 transition-all">
                      <Code2 size={16} />
                    </div>
                    
                    <div className="flex items-center gap-2.5 text-xs font-mono text-slate-400">
                      {repo.stargazers_count > 0 && (
                        <span className="flex items-center gap-1 hover:text-amber-300 transition-colors">
                          <Star size={13} className="text-amber-400 fill-amber-400/30" />
                          {repo.stargazers_count}
                        </span>
                      )}
                      {repo.forks_count > 0 && (
                        <span className="flex items-center gap-1 hover:text-indigo-300 transition-colors">
                          <GitFork size={13} className="text-indigo-400" />
                          {repo.forks_count}
                        </span>
                      )}
                      <span className="text-[9px] font-mono font-semibold uppercase tracking-wider text-cyan-400/90 bg-cyan-950/40 border border-cyan-800/40 px-1.5 py-0.5 rounded">
                        featured
                      </span>
                    </div>
                  </div>

                  {/* Repo Name */}
                  <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                    <span className="truncate">{repo.name.replace(/[-_]/g, ' ')}</span>
                  </h4>

                  {/* Repo Description */}
                  <p className="text-xs text-slate-400 line-clamp-3 mt-2 leading-relaxed">
                    {repo.description || 'No description provided on GitHub.'}
                  </p>

                  {/* Topics Pills */}
                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {repo.topics
                        .filter((t) => t !== 'featured')
                        .slice(0, 3)
                        .map((topic) => (
                          <span
                            key={topic}
                            className="text-[10px] font-mono text-slate-400 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800/80"
                          >
                            #{topic}
                          </span>
                        ))}
                    </div>
                  )}
                </div>

                {/* Footer: Language & Direct Links */}
                <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center justify-between text-xs">
                  {/* Language Indicator */}
                  {repo.language ? (
                    <div className="flex items-center gap-1.5 font-mono text-slate-300 text-[11px]">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: langColor }}
                      />
                      <span>{repo.language}</span>
                    </div>
                  ) : (
                    <span className="text-[11px] font-mono text-slate-500">Repository</span>
                  )}

                  {/* Action links */}
                  <div className="flex items-center gap-2">
                    {repo.homepage && (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-cyan-950/80 text-slate-300 hover:text-cyan-300 border border-slate-700/50 transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink size={13} />
                      </a>
                    )}
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 hover:text-white border border-slate-700/50 text-[11px] font-mono transition-colors"
                    >
                      <GithubIcon size={12} />
                      <span>Code</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
