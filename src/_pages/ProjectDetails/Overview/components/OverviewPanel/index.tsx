import { UseGetProjectBySlugResponse } from "src/api/Project/queries";
import { IMAGES } from "src/assets/img";
import { ProjectOverviewContributor } from "src/components/Project/Overview/OverviewContributors";
import { ProjectOverviewEcosystem } from "src/components/Project/Overview/OverviewEcosystem";
import { ProjectOverviewLead } from "src/components/Project/Overview/OverviewLead";
import { ProjectOverviewMoreInfo } from "src/components/Project/Overview/OverviewMoreInfo";
import { ProjectOverviewSponsors } from "src/components/Project/Overview/OverviewSponsors";
import { ProjectOverviewTechnologies } from "src/components/Project/Overview/OverviewTechnologies";
import isDefined from "src/utils/isDefined";

import { Card } from "components/ds/card/card";
import { EmptyState } from "components/layout/placeholders/empty-state/empty-state";

// TODO clean/delete this file once the New All Project Page is live
interface Props {
  project: UseGetProjectBySlugResponse;
}

export default function OverviewPanel({ project }: Props) {
  const { contributorCount, topContributors, leaders, invitedLeaders, moreInfos, technologies, ecosystems, sponsors } =
    project;
  const projectLeads = leaders?.filter(lead => isDefined(lead?.login)) || [];
  const projectInvited = invitedLeaders?.filter(lead => isDefined(lead?.login)) || [];

  if (!projectLeads.length && !contributorCount) {
    return (
      <Card background="base">
        <EmptyState
          illustrationSrc={IMAGES.icons.compass}
          description={{ token: "project.details.overview.emptyStateDescription" }}
        />
      </Card>
    );
  }

  return (
    <Card background="base" className="flex h-fit flex-col divide-y divide-greyscale-50/8 p-0 lg:p-0">
      <ProjectOverviewLead projectId={project?.id} projectLeads={projectLeads} projectInvited={projectInvited} />
      <ProjectOverviewContributor contributorCount={contributorCount} topContributors={topContributors} />
      <ProjectOverviewEcosystem ecosystems={ecosystems} />
      <ProjectOverviewSponsors sponsors={sponsors} />
      <ProjectOverviewTechnologies technologies={technologies} />
      <ProjectOverviewMoreInfo moreInfos={moreInfos} />
    </Card>
  );
}
