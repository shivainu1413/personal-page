'use client';

import { useEffect, useState, useCallback } from 'react';

const Icons = {
  about: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" /><path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
    </svg>
  ),
  experience: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    </svg>
  ),
  portfolio: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  tech: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /><line x1="14.5" y1="4" x2="9.5" y2="20" />
    </svg>
  ),
  contact: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22 6 12 13 2 6" />
    </svg>
  ),
};

const DOCK_ITEMS: { id: string; icon: keyof typeof Icons; label: string }[] = [
  { id: 'about', icon: 'about', label: 'About' },
  { id: 'experience', icon: 'experience', label: 'Experience' },
  { id: 'portfolio', icon: 'portfolio', label: 'Portfolio' },
  { id: 'tech', icon: 'tech', label: 'Tech Stack' },
  { id: 'contact', icon: 'contact', label: 'Contact' },
];

export default function Dock() {
  const [activeId, setActiveId] = useState('about');

  const scrollToSection = useCallback((id: string) => {
    const container = document.getElementById('window-scroll');
    const target = document.getElementById(id);
    if (!container || !target) return;

    if (id === DOCK_ITEMS[0].id) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === DOCK_ITEMS[DOCK_ITEMS.length - 1].id) {
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    } else {
      const containerRect = container.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const offset = targetRect.top - containerRect.top + container.scrollTop - 8;
      container.scrollTo({ top: offset, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const container = document.getElementById('window-scroll');
    if (!container) return;

    const handleScroll = () => {
      if (container.scrollTop < 10) {
        setActiveId('about');
        return;
      }

      const atBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 10;
      if (atBottom) {
        setActiveId('contact');
        return;
      }

      const containerTop = container.getBoundingClientRect().top;
      let closestId = 'about';
      let closestDist = Infinity;

      DOCK_ITEMS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return;
        const dist = Math.abs(el.getBoundingClientRect().top - containerTop);
        if (dist < closestDist) {
          closestDist = dist;
          closestId = id;
        }
      });

      setActiveId(closestId);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="dock-wrapper">
      <div className="dock">
        {DOCK_ITEMS.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button key={item.id} className="dock-item" onClick={() => scrollToSection(item.id)} aria-label={item.label}>
              <div className="dock-tooltip">{item.label}</div>
              <div className={`dock-icon ${isActive ? 'active' : ''}`}>{Icons[item.icon]}</div>
              <div className={`dock-dot ${isActive ? 'visible' : ''}`} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
