import type { ProfileData, ExperienceItem } from '@/lib/types';

export const profile: ProfileData = {
  name: 'Shiv Cheng',
  title: 'Data Engineer',
  bio: 'Building data pipelines and GenAI solutions.',
  avatar: 'https://github.com/shivainu1413.png',
  location: 'Tainan, Taiwan',
  email: 'shivainu1413@gmail.com',
  github: 'shivainu1413',
  linkedin: 'hsuching-cheng-475a9a267',
  website: '',
  resumeUrl: '',
};

export const experiences: ExperienceItem[] = [
  {
    company: 'ESGPedia',
    role: 'Software Engineer Intern — Data Engineering',
    period: '2025.11 — Present',
    description:
      'Designed Python automated data validation workflows, improving ESG ETL pipeline stability. Built data cleaning and transformation logic for ESG data engineering. Architected AWS automated test environment deployment, boosting team testing efficiency by 50%. Practiced TDD and authored technical documentation.',
    techStack: ['python', 'spark', 'etl', 'sql', 'aws', 'databricks'],
    logo: '',
  },
  {
    company: 'TSMC',
    role: 'Intelligent Manufacturing Engineer Intern',
    period: '2025.7 — 2025.8',
    description:
      'Developed CMP process anomaly detection system for Fab 22, automating root cause tracking for low efficiency events. Built Power BI dashboards reducing CMP status review time from 1 hour to 1 minute.',
    techStack: ['python', 'sql', 'powerbi', 'data-analysis'],
    logo: '',
  },
  {
    company: 'GLSoft',
    role: 'Software Engineer — Data Engineering / GenAI',
    period: '2023.2 — 2025.6',
    description:
      'Developed and maintained 30+ recommendation system features, increasing e-commerce customer retention by 400%. Built 10+ automated ETL/ELT data pipelines. Led LLM Agent projects serving international clients with adaptive product recommendations. Spearheaded GenAI tech evaluation and PoC, successfully shipping to production. Built LLM Agent backend with FastAPI and CI/CD.',
    techStack: ['python', 'spark', 'fastapi', 'docker', 'langchain', 'llm', 'rag', 'azure', 'databricks', 'sql', 'nosql'],
    logo: '',
  },
];

export const education = [
  {
    school: 'National Cheng Kung University',
    degree: 'M.S. — Institute of Manufacturing Information and Systems',
    period: '2024 — 2026',
    description:
      'Research: Multi-modal Multi-Agent digital tutor — combining A2A and MCP for adaptive knowledge teaching, assessment, and tutoring.',
    techStack: ['llm', 'rag', 'prompt-engineering', 'knowledge-graph', 'nlp'],
  },
  {
    school: 'National Kaohsiung Normal University',
    degree: 'B.S. — Software Engineering and Management',
    period: '2020 — 2024',
    description:
      'Capstone: IEEE Fuzzy Markup Language Web Builder — web implementation of IEEE 1855-2016 standard as a lab tool.',
    techStack: ['javascript', 'jquery', 'html', 'css', 'python', 'flask'],
  },
];

export const achievements = [
  'IEEE CIS Summer School WCCI AI-FML Competition — 1st Place',
  'Ministry of Education AR/VR Curriculum Project — Teaching Assistant',
  'NKNU Data Structures Course — Teaching Assistant',
];

export const socialLinks = [
  {
    name: 'GitHub',
    url: `https://github.com/${profile.github}`,
    icon: 'github',
  },
  {
    name: 'LinkedIn',
    url: profile.linkedin ? `https://linkedin.com/in/${profile.linkedin}` : '',
    icon: 'linkedin',
  },
  {
    name: 'Email',
    url: `mailto:${profile.email}`,
    icon: 'mail',
  },
];
