import { UseGetProjectBySlugResponse } from "src/api/Project/queries";
import { ProjectOverviewHeader } from "src/components/Project/Overview/OverviewHeader";

export interface ProjectOverviewHeaderProps {
  project: UseGetProjectBySlugResponse;
}

export const ProjectOverviewHeadersCard = ({ project }: ProjectOverviewHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-card-border-light bg-greyscale-900 px-6 py-4 shadow-medium">
      <ProjectOverviewHeader project={project} />
    </div>
  );
};
