'use client';

import type { ProfileData } from '@/lib/types';

export default function AboutSection({ profile }: { profile: ProfileData }) {
  return (
    <div id="about" className="scroll-target">
      <div className="flex items-center gap-5 mb-6">
        <div className="w-[68px] h-[68px] rounded-[16px] bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center overflow-hidden flex-shrink-0">
          {profile.avatar && profile.avatar !== '/avatar.png' ? (
            <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-2xl font-semibold bg-gradient-to-br from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {profile.name.charAt(0)}
            </span>
          )}
        </div>
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight leading-tight">{profile.name}</h1>
          <p className="text-[15px] text-blue-400 font-medium mt-0.5">{profile.title}</p>
        </div>
      </div>

      <p className="text-[14px] text-[var(--color-text-secondary)] leading-[1.7] mb-5">{profile.bio}</p>

      <div className="space-y-2.5">
        {profile.location && (
          <div className="flex items-center gap-3 text-[13px] text-[var(--color-text-muted)]">
            <svg className="w-4 h-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0 1 15 0Z" />
            </svg>
            {profile.location}
          </div>
        )}
        <div className="flex items-center gap-3 text-[13px] text-[var(--color-text-muted)]">
          <svg className="w-4 h-4 opacity-50" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          <a href={`https://github.com/${profile.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent)] transition-colors">
            github.com/{profile.github}
          </a>
        </div>
      </div>
    </div>
  );
}
