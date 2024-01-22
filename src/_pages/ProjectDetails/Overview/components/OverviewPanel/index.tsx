import { UseGetProjectBySlugResponse } from "src/api/Project/queries";
import { ProjectOverviewLead } from "src/components/Project/Overview/OverviewLead";
import { ProjectOverviewContributor } from "src/components/Project/Overview/OverviewContributors";
import { ProjectOverviewSponsors } from "src/components/Project/Overview/OverviewSponsors";
import { ProjectOverviewMoreInfo } from "src/components/Project/Overview/OverviewMoreInfo";
import { EmptyState } from "components/layout/placeholders/empty-state.tsx";
import { IMAGES } from "src/assets/img";
import { Card } from "components/ds/card/card.tsx";
import isDefined from "src/utils/isDefined.ts";

interface Props {
  project: UseGetProjectBySlugResponse;
}

export default function OverviewPanel({ project }: Props) {
  const { contributorCount, topContributors, leaders, invitedLeaders, sponsors, moreInfos } = project;
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
    <Card className="flex h-fit flex-col divide-y divide-greyscale-50/8 p-0 lg:p-0">
      <ProjectOverviewLead projectId={project?.id} projectLeads={projectLeads} projectInvited={projectInvited} />
      <ProjectOverviewContributor contributorCount={contributorCount} topContributors={topContributors} />
      <ProjectOverviewSponsors sponsors={sponsors} />
      <ProjectOverviewMoreInfo moreInfos={moreInfos} />
    </Card>
  );
}
