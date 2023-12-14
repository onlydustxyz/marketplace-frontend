import { UseGetProjectBySlugResponse } from "src/api/Project/queries";
import Contributor from "src/components/Contributor";
import { Flex } from "src/components/New/Layout/Flex";
import { useIntl } from "src/hooks/useIntl";
import { useProjectLeader } from "src/hooks/useProjectLeader/useProjectLeader";
import Section, { SectionIcon } from "src/pages/ProjectDetails/Overview/OverviewPanel/Section";
import isDefined from "src/utils/isDefined";

export interface ProjectOverviewLeadProps {
  project: UseGetProjectBySlugResponse;
}

export const ProjectOverviewLead = ({ project }: ProjectOverviewLeadProps) => {
  const { T } = useIntl();
  const isProjectLeader = useProjectLeader({ id: project.id });
  const filteredLeads = project.leaders?.filter(lead => isDefined(lead?.login)) || [];

  return filteredLeads.length > 0 ? (
    <Section
      testId="project-leads"
      icon={SectionIcon.Star}
      title={T("project.details.overview.projectLeader", { count: filteredLeads.length })}
    >
      <div className="flex flex-row flex-wrap gap-3">
        {filteredLeads.map(lead => (
          <Contributor
            key={lead.id}
            contributor={{
              login: lead.login || "",
              avatarUrl: lead.avatarUrl,
              githubUserId: lead.githubUserId,
            }}
            clickable={true}
          />
        ))}

        {isProjectLeader &&
          project.invitedLeaders.map(lead => (
            <Flex key={lead.login} className="gap-1">
              <Contributor
                contributor={{
                  login: lead.login || "",
                  avatarUrl: lead.avatarUrl,
                  githubUserId: lead.githubUserId,
                }}
                clickable={true}
              />
              <span className="text-sm text-spaceBlue-200">({T("common.pendingInvite")})</span>
            </Flex>
          ))}
      </div>
    </Section>
  ) : null;
};
