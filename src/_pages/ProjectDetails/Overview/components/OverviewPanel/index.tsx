import Card from "src/components/Card";
import { UseGetProjectBySlugResponse } from "src/api/Project/queries";
import { ProjectOverviewLead } from "src/components/Project/Overview/OverviewLead";
import { ProjectOverviewContributor } from "src/components/Project/Overview/OverviewContributors";
import { ProjectOverviewSponsors } from "src/components/Project/Overview/OverviewSponsors";
import { ProjectOverviewMoreInfo } from "src/components/Project/Overview/OverviewMoreInfo";
import isDefined from "../../../../../utils/isDefined.ts";

interface Props {
  project: UseGetProjectBySlugResponse;
}

export default function OverviewPanel({ project }: Props) {
  const { contributorCount, topContributors, leaders, invitedLeaders, sponsors } = project;
  const ProjectLeads = leaders?.filter(lead => isDefined(lead?.login)) || [];
  const ProjectInvited = invitedLeaders?.filter(lead => isDefined(lead?.login)) || [];
  return (
    <Card fullWidth={false} className="flex h-fit flex-col divide-y divide-greyscale-50/8 p-0" padded={false}>
      <ProjectOverviewLead projectId={project?.id} projectLeads={ProjectLeads} projectInvited={ProjectInvited} />
      <ProjectOverviewContributor contributorCount={contributorCount} topContributors={topContributors} />
      <ProjectOverviewSponsors sponsors={sponsors} />
      <ProjectOverviewMoreInfo project={project} />
    </Card>
  );
}
