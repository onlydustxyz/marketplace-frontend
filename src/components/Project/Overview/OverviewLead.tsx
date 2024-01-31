import { UseGetProjectBySlugResponse } from "src/api/Project/queries";
import MeApi from "src/api/me";
import Contributor from "src/components/Contributor";
import { Flex } from "src/components/New/Layout/Flex";
import { useIntl } from "src/hooks/useIntl";
import { useProjectLeader } from "src/hooks/useProjectLeader/useProjectLeader";

import Section, { SectionIcon } from "./OverviewSection";

export interface ProjectOverviewLeadProps {
  projectId: string;
  projectLeads: UseGetProjectBySlugResponse["leaders"];
  projectInvited: UseGetProjectBySlugResponse["invitedLeaders"];
}

export const ProjectOverviewLead = ({ projectId, projectLeads, projectInvited }: ProjectOverviewLeadProps) => {
  const { T } = useIntl();
  const { data: userInfo } = MeApi.queries.useGetMe({});
  const isProjectLeader = useProjectLeader({ id: projectId });

  const showInvited = isProjectLeader || userInfo?.isAdmin;

  return projectLeads.length ? (
    <Section
      testId="project-leads"
      icon={SectionIcon.Star}
      title={T("project.details.overview.projectLeader", { count: projectLeads.length })}
    >
      <div className="flex flex-row flex-wrap gap-3">
        {projectLeads?.map(lead => (
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

        {showInvited &&
          (projectInvited || []).map(lead => (
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
