import { UseGetProjectBySlugResponse } from "src/api/Project/queries";
import { ProjectOverviewHeader } from "src/components/Project/Overview/OverviewHeader";

export interface ProjectOverviewHeaderProps {
  project: UseGetProjectBySlugResponse;
}

export const ProjectOverviewHeadersCard = ({ project }: ProjectOverviewHeaderProps) => {
  return (
    <div className="flex flex-col bg-greyscale-900 pb-6">
      <ProjectOverviewHeader project={project} description={false} isSidepanel />
    </div>
  );
};
