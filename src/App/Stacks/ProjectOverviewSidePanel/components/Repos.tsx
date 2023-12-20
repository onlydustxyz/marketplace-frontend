import { UseGetProjectBySlugResponse } from "src/api/Project/queries";
import { ProjectOverviewRepos } from "src/components/Project/Overview/OverviewRepos/OverviewRepos";

export interface ProjectOverviewReposCardProps {
  project: UseGetProjectBySlugResponse;
}

export const ProjectOverviewReposCard = ({ project }: ProjectOverviewReposCardProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-card-border-light bg-greyscale-900 px-6 py-4 shadow-medium">
      <ProjectOverviewRepos project={project} reposCol={1} withRepoBg={false} />
    </div>
  );
};
