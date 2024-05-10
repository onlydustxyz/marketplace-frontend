import { useMemo } from "react";

import { UseGetProjectBySlugResponse } from "src/api/Project/queries";
import MeApi from "src/api/me";
import { Flex } from "src/components/New/Layout/Flex";
import { useProjectLeader } from "src/hooks/useProjectLeader/useProjectLeader";

import { Contributor } from "components/features/contributor/contributor";

import { useIntl } from "hooks/translate/use-translate";

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

  const sortedByLogin = useMemo(() => {
    return [...projectLeads].sort((a, b) => a.login.localeCompare(b.login));
  }, [projectLeads]);

  return sortedByLogin.length ? (
    <Section
      testId="project-leads"
      icon={SectionIcon.Star}
      title={T("project.details.overview.projectLeader", { count: sortedByLogin.length })}
    >
      <div className="flex flex-row flex-wrap gap-3">
        {sortedByLogin?.map(lead => (
          <Contributor
            key={lead.id}
            githubUserId={lead.githubUserId}
            login={lead.login}
            avatarUrl={lead.avatarUrl}
            isRegistered={false}
            clickable
          />
        ))}

        {showInvited &&
          (projectInvited || []).map(lead => (
            <Flex key={lead.login} className="gap-1">
              <Contributor
                githubUserId={lead.githubUserId}
                login={lead.login}
                avatarUrl={lead.avatarUrl}
                isRegistered={false}
                clickable
              />
              <span className="text-sm text-spaceBlue-200">({T("common.pendingInvite")})</span>
            </Flex>
          ))}
      </div>
    </Section>
  ) : null;
};
