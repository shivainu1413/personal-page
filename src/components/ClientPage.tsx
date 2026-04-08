'use client';

import { useEffect, useState } from 'react';
import MenuBar from './MenuBar';
import Dock from './Dock';
import AboutSection from './sections/AboutSection';
import ExperienceSection from './sections/ExperienceSection';
import PortfolioSection from './sections/PortfolioSection';
import TechSection from './sections/TechSection';
import ContactSection from './sections/ContactSection';
import { clientFetchPortfolio, aggregateTechSummary } from '@/lib/github';
import type { PortfolioProject, TechSummary, ProfileData, ExperienceItem } from '@/lib/types';

interface ClientPageProps {
  profile: ProfileData;
  experiences: ExperienceItem[];
  education: { school: string; degree: string; period: string; description: string; techStack: string[] }[];
  achievements: string[];
  initialProjects: PortfolioProject[];
  initialTechSummary: TechSummary;
}

export default function ClientPage({
  profile,
  experiences,
  education,
  achievements,
  initialProjects,
  initialTechSummary,
}: ClientPageProps) {
  const [projects, setProjects] = useState(initialProjects);
  const [techSummary, setTechSummary] = useState(initialTechSummary);

  // refresh portfolio data client-side after initial load
  useEffect(() => {
    const refresh = async () => {
      try {
        const fresh = await clientFetchPortfolio();
        if (fresh.length > 0) {
          setProjects(fresh);
          setTechSummary(aggregateTechSummary(fresh));
        }
      } catch {
        console.log('Using build-time portfolio data');
      }
    };
    const timer = setTimeout(refresh, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="desktop" />
      <MenuBar />

      <div className="window-shell">
        <div className="macos-window">
          <div className="window-titlebar">
            <div className="traffic-lights">
              <div className="traffic-light tl-close" />
              <div className="traffic-light tl-minimize" />
              <div className="traffic-light tl-maximize" />
            </div>
            <span className="window-title">Shiv Cheng — Portfolio</span>
          </div>

          <div className="window-content" id="window-scroll">
            <AboutSection profile={profile} />
            <div className="section-divider" />
            <ExperienceSection experiences={experiences} education={education} achievements={achievements} />
            <div className="section-divider" />
            <PortfolioSection projects={projects} />
            <div className="section-divider" />
            <TechSection summary={techSummary} projectCount={projects.length} />
            <div className="section-divider" />
            <ContactSection profile={profile} />
            <div className="h-[50vh]" />
          </div>
        </div>
      </div>

      <Dock />
    </>
  );
}
