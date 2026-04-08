'use client';

import type { TechSummary } from '@/lib/types';

const CATEGORY_LABELS: Record<keyof TechSummary, { label: string; icon: string }> = {
  languages: { label: 'Languages', icon: '</>' },
  frameworks: { label: 'Frameworks', icon: '◈' },
  databases: { label: 'Databases', icon: '◉' },
  cloud: { label: 'Cloud & DevOps', icon: '☁' },
  tools: { label: 'Tools', icon: '⚙' },
  other: { label: 'Other', icon: '✦' },
};

export default function TechSection({ summary, projectCount }: { summary: TechSummary; projectCount: number }) {
  const categories = (Object.keys(summary) as (keyof TechSummary)[]).filter((k) => summary[k].length > 0);

  return (
    <div id="tech" className="scroll-target">
      <h2 className="section-heading">Tech Stack</h2>
      {categories.length > 0 ? (
        <>
          <p className="text-[12px] text-[var(--color-text-muted)] mb-5">Auto-aggregated from {projectCount} projects</p>
          <div className="space-y-4">
            {categories.map((cat) => (
              <div key={cat}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] text-[var(--color-text-muted)]">{CATEGORY_LABELS[cat].icon}</span>
                  <span className="text-[11px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider">{CATEGORY_LABELS[cat].label}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {summary[cat].map((item) => (
                    <span key={item.name} className="tech-badge" title={`Used in: ${item.projects.join(', ')}`}>
                      {item.name}{item.count > 1 && <span className="ml-1 text-[10px] opacity-50">×{item.count}</span>}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-[13px] text-[var(--color-text-muted)] py-6 text-center">Tech stack auto-generates from your portfolio</p>
      )}
    </div>
  );
}
