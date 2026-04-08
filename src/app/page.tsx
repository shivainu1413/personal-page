import { getPortfolioProjects, aggregateTechSummary } from '@/lib/github';
import { profile, experiences, education, achievements } from '@/data/profile';
import ClientPage from '@/components/ClientPage';

export default async function Home() {
  const projects = await getPortfolioProjects();
  const techSummary = aggregateTechSummary(projects);

  return (
    <ClientPage
      profile={profile}
      experiences={experiences}
      education={education}
      achievements={achievements}
      initialProjects={projects}
      initialTechSummary={techSummary}
    />
  );
}
