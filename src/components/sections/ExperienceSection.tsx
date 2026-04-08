'use client';

import type { ExperienceItem } from '@/lib/types';

interface Props {
  experiences: ExperienceItem[];
  education: { school: string; degree: string; period: string; description: string; techStack: string[] }[];
  achievements: string[];
}

export default function ExperienceSection({ experiences, education, achievements }: Props) {
  return (
    <div id="experience" className="scroll-target">
      <h2 className="section-heading">Experience</h2>

      <div className="space-y-6 mb-8">
        {experiences.map((exp, i) => (
          <div key={i} className="relative">
            {i < experiences.length - 1 && (
              <div className="absolute left-[11px] top-[28px] bottom-[-24px] w-px bg-[var(--divider)]" />
            )}
            <div className="flex gap-4">
              <div className="w-[23px] flex-shrink-0 pt-1.5">
                <div className="w-[6px] h-[6px] rounded-full bg-[var(--color-accent)] mx-auto" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div>
                    <h3 className="text-[15px] font-medium">{exp.role}</h3>
                    <p className="text-[13px] text-[var(--color-text-muted)]">{exp.company}</p>
                  </div>
                  <span className="text-[11px] text-[var(--color-text-muted)] whitespace-nowrap font-mono tracking-tight">{exp.period}</span>
                </div>
                <p className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed mt-2 mb-3">{exp.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {exp.techStack.map((t) => <span key={t} className="tech-badge">{t}</span>)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-5 border-t border-[var(--divider)]">
        <h3 className="text-[11px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-4">Education</h3>
        <div className="space-y-5">
          {education.map((edu, i) => (
            <div key={i}>
              <div className="flex items-start justify-between gap-2 mb-1">
                <div>
                  <p className="text-[14px] font-medium">{edu.degree}</p>
                  <p className="text-[12px] text-[var(--color-text-muted)]">{edu.school}</p>
                </div>
                <span className="text-[11px] text-[var(--color-text-muted)] whitespace-nowrap font-mono">{edu.period}</span>
              </div>
              {edu.description && <p className="text-[12px] text-[var(--color-text-secondary)] mt-1.5 leading-relaxed">{edu.description}</p>}
              {edu.techStack.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {edu.techStack.map((t) => <span key={t} className="tech-badge">{t}</span>)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {achievements.length > 0 && (
        <div className="pt-5 mt-5 border-t border-[var(--divider)]">
          <h3 className="text-[11px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-3">Achievements</h3>
          <ul className="space-y-1.5">
            {achievements.map((a, i) => (
              <li key={i} className="flex items-start gap-2 text-[13px] text-[var(--color-text-secondary)]">
                <span className="text-[var(--color-accent)] mt-0.5 text-[11px]">▸</span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
