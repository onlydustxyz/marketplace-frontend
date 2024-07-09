import { UseGetProjectBySlugResponse } from "src/api/Project/queries";
import { IMAGES } from "src/assets/img";
import { ProjectOverviewCategories } from "src/components/Project/Overview/OverviewCategories";
import { ProjectOverviewContributor } from "src/components/Project/Overview/OverviewContributors";
import { ProjectOverviewEcosystem } from "src/components/Project/Overview/OverviewEcosystem";
import { ProjectOverviewLanguages } from "src/components/Project/Overview/OverviewLanguages";
import { ProjectOverviewLead } from "src/components/Project/Overview/OverviewLead";
import { ProjectOverviewMoreInfo } from "src/components/Project/Overview/OverviewMoreInfo";
import { ProjectOverviewSponsors } from "src/components/Project/Overview/OverviewSponsors";
import isDefined from "src/utils/isDefined";

import { Card } from "components/ds/card/card";
import { EmptyState } from "components/layout/placeholders/empty-state/empty-state";

// TODO clean/delete this file once the New All Project Page is live
export interface ProjectOverviewInformationsProps {
  project: UseGetProjectBySlugResponse;
}

export const ProjectOverviewInformations = ({ project }: ProjectOverviewInformationsProps) => {
  const {
    contributorCount,
    topContributors,
    leaders,
    invitedLeaders,
    moreInfos,
    ecosystems,
    sponsors,
    languages,
    categories,
  } = project;
  const projectLeads = leaders?.filter(lead => isDefined(lead?.login)) || [];
  const projectInvited = invitedLeaders?.filter(lead => isDefined(lead?.login)) || [];

  if (!projectLeads.length && !contributorCount && !sponsors?.length && !moreInfos?.length) {
    return (
      <Card>
        <EmptyState
          illustrationSrc={IMAGES.icons.compass}
          description={{ token: "project.details.overview.emptyStateDescription" }}
        />
      </Card>
    );
  }
  return (
    <div className="flex-col divide-y divide-greyscale-50/8 rounded-2xl border border-card-border-light bg-greyscale-900 shadow-medium">
      <ProjectOverviewLead projectId={project?.id} projectLeads={projectLeads} projectInvited={projectInvited} />
      <ProjectOverviewContributor contributorCount={contributorCount} topContributors={topContributors} />
      <ProjectOverviewEcosystem ecosystems={ecosystems} />
      <ProjectOverviewSponsors sponsors={sponsors} />
      <ProjectOverviewLanguages languages={languages} />
      <ProjectOverviewCategories categories={categories} />
      <ProjectOverviewMoreInfo moreInfos={moreInfos} />
    </div>
  );
};
