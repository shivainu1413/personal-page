'use client';

import { useState } from 'react';
import type { PortfolioProject } from '@/lib/types';

const STATUS_MAP = {
  active: { label: 'Active', className: 'status-active' },
  completed: { label: 'Completed', className: 'status-completed' },
  wip: { label: 'In Progress', className: 'status-wip' },
  archived: { label: 'Archived', className: 'status-archived' },
};

function ProjectCard({ project }: { project: PortfolioProject }) {
  const [imgError, setImgError] = useState(false);
  const status = STATUS_MAP[project.meta.status] || STATUS_MAP.completed;

  return (
    <div className="p-4 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)] hover:bg-[var(--card-hover)] transition-all">
      <div className="relative mb-3 rounded-md overflow-hidden">
        {!imgError ? (
          <img src={project.meta.cover} alt={project.meta.title} className="cover-image" onError={() => setImgError(true)} />
        ) : (
          <div className="cover-image flex items-center justify-center bg-gradient-to-br from-blue-500/5 to-purple-500/5">
            <div className="text-2xl font-bold text-white/10">{project.meta.title.charAt(0)}</div>
          </div>
        )}
        <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2 py-1 bg-black/50 backdrop-blur-md rounded-md">
          <span className={`status-dot ${status.className}`} />
          <span className="text-[11px] text-white/80">{status.label}</span>
        </div>
      </div>
      <h4 className="text-[15px] font-medium mb-1">{project.meta.title}</h4>
      <p className="text-[12px] text-[var(--color-text-secondary)] leading-relaxed mb-2">{project.meta.subtitle || project.description}</p>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {project.meta.techStack.map((t) => <span key={t} className="tech-badge">{t}</span>)}
      </div>
      <div className="flex items-center gap-2 pt-2 border-t border-[var(--divider)]">
        <a href={project.url} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] text-[var(--color-text-secondary)] hover:text-white bg-[var(--badge-bg)] hover:bg-[var(--card-hover)] rounded-md transition-all">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          Source
        </a>
        {(project.meta.demoUrl || project.homepage) && (
          <a href={project.meta.demoUrl || project.homepage || '#'} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] text-white bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] rounded-md transition-colors">
            Demo
          </a>
        )}
      </div>
    </div>
  );
}

export default function PortfolioSection({ projects }: { projects: PortfolioProject[] }) {
  return (
    <div id="portfolio" className="scroll-target">
      <h2 className="section-heading">Portfolio</h2>
      {projects.length > 0 ? (
        <div className="space-y-4">
          {projects.map((p) => <ProjectCard key={p.name} project={p} />)}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-[13px] text-[var(--color-text-muted)] mb-1">No portfolio projects yet</p>
          <p className="text-[12px] text-[var(--color-text-muted)] opacity-60">
            Add the <code className="tech-badge mx-1">portfolio</code> topic to your GitHub repos
          </p>
        </div>
      )}
    </div>
  );
}
