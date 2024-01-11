import { UseGetProjectBySlugResponse } from "src/api/Project/queries";
import { ProjectOverviewContributor } from "src/components/Project/Overview/OverviewContributors";
import { ProjectOverviewLead } from "src/components/Project/Overview/OverviewLead";
import { ProjectOverviewMoreInfo } from "src/components/Project/Overview/OverviewMoreInfo";
import { ProjectOverviewSponsors } from "src/components/Project/Overview/OverviewSponsors";

export interface ProjectOverviewInformationsProps {
  project: UseGetProjectBySlugResponse;
}

export const ProjectOverviewInformations = ({ project }: ProjectOverviewInformationsProps) => {
  return (
    <div className="flex-col divide-y divide-greyscale-50/8 rounded-2xl border border-card-border-light bg-greyscale-900 shadow-medium">
      <ProjectOverviewLead project={project} />
      <ProjectOverviewContributor project={project} />
      <ProjectOverviewSponsors project={project} />
      <ProjectOverviewMoreInfo project={project} />
    </div>
  );
};
