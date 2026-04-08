export interface PortfolioProject {
  name: string;
  fullName: string;
  description: string;
  url: string;
  homepage: string | null;
  stars: number;
  language: string | null;
  topics: string[];
  updatedAt: string;
  createdAt: string;
  meta: ProjectMeta;
}

export interface ProjectMeta {
  title: string;
  subtitle: string;
  cover: string;
  techStack: string[];
  category: string;
  status: 'active' | 'completed' | 'archived' | 'wip';
  featured: boolean;
  order: number;
  demoUrl?: string;
  highlights: string[];
}

export interface TechSummary {
  languages: TechItem[];
  frameworks: TechItem[];
  tools: TechItem[];
  databases: TechItem[];
  cloud: TechItem[];
  other: TechItem[];
}

export interface TechItem {
  name: string;
  count: number;
  projects: string[];
}

export interface ProfileData {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  location: string;
  email: string;
  github: string;
  linkedin?: string;
  website?: string;
  resumeUrl?: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
  techStack: string[];
  logo?: string;
}

export type SectionId = 'about' | 'experience' | 'portfolio' | 'tech' | 'contact';

export interface Section {
  id: SectionId;
  label: string;
  labelZh: string;
}

export const SECTIONS: Section[] = [
  { id: 'about', label: 'About', labelZh: '關於我' },
  { id: 'experience', label: 'Experience', labelZh: '經歷' },
  { id: 'portfolio', label: 'Portfolio', labelZh: '作品集' },
  { id: 'tech', label: 'Tech Stack', labelZh: '技術棧' },
  { id: 'contact', label: 'Contact', labelZh: '聯繫' },
];
