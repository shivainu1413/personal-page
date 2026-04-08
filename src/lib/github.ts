import type { PortfolioProject, ProjectMeta, TechSummary, TechItem } from './types';

const GITHUB_USERNAME = 'shivainu1413';
const PORTFOLIO_TOPIC = 'portfolio';
const GITHUB_API = 'https://api.github.com';

const TECH_CATEGORIES: Record<string, keyof TechSummary> = {
  // languages
  typescript: 'languages', javascript: 'languages', python: 'languages',
  rust: 'languages', go: 'languages', java: 'languages', 'c++': 'languages',
  c: 'languages', swift: 'languages', kotlin: 'languages', ruby: 'languages',
  php: 'languages', dart: 'languages', scala: 'languages',
  // frameworks
  react: 'frameworks', nextjs: 'frameworks', vue: 'frameworks', angular: 'frameworks',
  svelte: 'frameworks', express: 'frameworks', nestjs: 'frameworks', fastapi: 'frameworks',
  django: 'frameworks', flask: 'frameworks', spring: 'frameworks', tailwindcss: 'frameworks',
  'react-native': 'frameworks', flutter: 'frameworks', electron: 'frameworks',
  // databases
  postgresql: 'databases', mysql: 'databases', mongodb: 'databases', redis: 'databases',
  sqlite: 'databases', prisma: 'databases', supabase: 'databases', firebase: 'databases',
  // cloud / devops
  aws: 'cloud', gcp: 'cloud', azure: 'cloud', docker: 'cloud', kubernetes: 'cloud',
  vercel: 'cloud', netlify: 'cloud', 'github-actions': 'cloud', terraform: 'cloud',
  // tools
  graphql: 'tools', 'rest-api': 'tools', websocket: 'tools', grpc: 'tools',
  jest: 'tools', cypress: 'tools', storybook: 'tools', figma: 'tools',
};

interface GitHubRepo {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  created_at: string;
  default_branch: string;
}

export async function fetchPortfolioRepos(): Promise<GitHubRepo[]> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'personal-portfolio',
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const res = await fetch(
      `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
      { headers, next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      console.error(`GitHub API error: ${res.status} ${res.statusText}`);
      return [];
    }

    const repos: GitHubRepo[] = await res.json();
    return repos.filter((repo) => repo.topics.includes(PORTFOLIO_TOPIC));
  } catch (error) {
    console.error('Failed to fetch GitHub repos:', error);
    return [];
  }
}

export async function fetchPortfolioJson(
  repoFullName: string,
  defaultBranch: string = 'main'
): Promise<ProjectMeta | null> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3.raw',
    'User-Agent': 'personal-portfolio',
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const res = await fetch(
      `${GITHUB_API}/repos/${repoFullName}/contents/portfolio.json`,
      { headers, next: { revalidate: 3600 } }
    );

    if (res.ok) {
      const content = await res.json();
      const decoded = Buffer.from(content.content, 'base64').toString('utf-8');
      return JSON.parse(decoded) as ProjectMeta;
    }

    return null;
  } catch (error) {
    console.error(`Failed to fetch portfolio.json for ${repoFullName}:`, error);
    return null;
  }
}

export async function buildPortfolioProject(
  repo: GitHubRepo
): Promise<PortfolioProject> {
  const meta = await fetchPortfolioJson(repo.full_name, repo.default_branch);

  const defaultMeta: ProjectMeta = {
    title: repo.name
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase()),
    subtitle: repo.description || '',
    cover: `https://raw.githubusercontent.com/${repo.full_name}/${repo.default_branch}/cover.png`,
    techStack: [
      ...(repo.language ? [repo.language.toLowerCase()] : []),
      ...repo.topics.filter((t) => t !== PORTFOLIO_TOPIC),
    ],
    category: 'Project',
    status: 'completed',
    featured: false,
    order: 99,
    demoUrl: repo.homepage || undefined,
    highlights: [],
  };

  return {
    name: repo.name,
    fullName: repo.full_name,
    description: repo.description || '',
    url: repo.html_url,
    homepage: repo.homepage,
    stars: repo.stargazers_count,
    language: repo.language,
    topics: repo.topics,
    updatedAt: repo.updated_at,
    createdAt: repo.created_at,
    meta: meta || defaultMeta,
  };
}

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  const repos = await fetchPortfolioRepos();
  const projects = await Promise.all(repos.map(buildPortfolioProject));

  return projects.sort((a, b) => {
    if (a.meta.featured !== b.meta.featured) return a.meta.featured ? -1 : 1;
    if (a.meta.order !== b.meta.order) return a.meta.order - b.meta.order;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
}

export function aggregateTechSummary(projects: PortfolioProject[]): TechSummary {
  const summary: TechSummary = {
    languages: [],
    frameworks: [],
    tools: [],
    databases: [],
    cloud: [],
    other: [],
  };

  const techMap = new Map<string, { count: number; projects: string[] }>();

  for (const project of projects) {
    for (const tech of project.meta.techStack) {
      const normalized = tech.toLowerCase().trim();
      if (!techMap.has(normalized)) {
        techMap.set(normalized, { count: 0, projects: [] });
      }
      const entry = techMap.get(normalized)!;
      entry.count++;
      entry.projects.push(project.meta.title);
    }
  }

  for (const [name, data] of techMap) {
    const category = TECH_CATEGORIES[name] || 'other';
    const item: TechItem = { name, ...data };
    summary[category].push(item);
  }

  for (const key of Object.keys(summary) as (keyof TechSummary)[]) {
    summary[key].sort((a, b) => b.count - a.count);
  }

  return summary;
}

// lighter client-side version for SWR (skips portfolio.json parsing to save API calls)
export async function clientFetchPortfolio(): Promise<PortfolioProject[]> {
  const res = await fetch(
    `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
    {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'personal-portfolio',
      },
    }
  );

  if (!res.ok) throw new Error('Failed to fetch repos');

  const repos: GitHubRepo[] = await res.json();
  const portfolioRepos = repos.filter((r) => r.topics.includes(PORTFOLIO_TOPIC));

  return portfolioRepos.map((repo) => ({
    name: repo.name,
    fullName: repo.full_name,
    description: repo.description || '',
    url: repo.html_url,
    homepage: repo.homepage,
    stars: repo.stargazers_count,
    language: repo.language,
    topics: repo.topics,
    updatedAt: repo.updated_at,
    createdAt: repo.created_at,
    meta: {
      title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      subtitle: repo.description || '',
      cover: `https://raw.githubusercontent.com/${repo.full_name}/${repo.default_branch || 'main'}/cover.png`,
      techStack: [
        ...(repo.language ? [repo.language.toLowerCase()] : []),
        ...repo.topics.filter((t) => t !== PORTFOLIO_TOPIC),
      ],
      category: 'Project',
      status: 'completed' as const,
      featured: false,
      order: 99,
      demoUrl: repo.homepage || undefined,
      highlights: [],
    },
  }));
}
