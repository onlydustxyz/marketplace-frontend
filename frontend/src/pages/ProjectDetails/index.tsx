import { gql } from "@apollo/client";
import { useEffect, useState } from "react";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import QueryWrapper from "src/components/QueryWrapper";
import { useAuth } from "src/hooks/useAuth";
import { useHasuraMutation, useHasuraQuery } from "src/hooks/useHasuraQuery";
import { Contributor, HasuraUserRole, LanguageMap } from "src/types";
import { decodeBase64ToString } from "src/utils/stringUtils";
import { GetProjectQuery } from "src/__generated/graphql";
import onlyDustLogo from "assets/img/onlydust-logo.png";
import { RoutePaths } from "src/App";
import { useSession } from "src/hooks/useSession";
import View from "./View";
import { PROJECT_CARD_FRAGMENT } from "src/components/ProjectCard";

type ProjectDetailsParams = {
  projectId: string;
};

export enum ProjectDetailsTab {
  Overview = "Overview",
  Payments = "Payments",
  Contributors = "Contributors",
}

export interface ProjectDetails {
  id: string;
  name?: string;
  logoUrl: string;
  telegramLink?: string | null;
  leads: { id: string; displayName: string; avatarUrl: string }[];
  invitationId?: string;
  totalSpentAmountInUsd?: number;
  githubRepoInfo?: {
    decodedReadme?: string;
    owner?: string;
    name?: string;
    contributors?: Contributor[];
    languages: LanguageMap;
  };
}

export default function ProjectDetails() {
  const { projectId } = useParams<ProjectDetailsParams>();
  const { ledProjectIds, githubUserId } = useAuth();
  const { lastVisitedProjectId, setLastVisitedProjectId } = useSession();
  const navigate = useNavigate();

  const [acceptInvitation, acceptInvitationResponse] = useHasuraMutation(
    ACCEPT_PROJECT_LEADER_INVITATION_MUTATION,
    HasuraUserRole.RegisteredUser
  );

  const [selectedTab, setSelectedTab] = useState(ProjectDetailsTab.Overview);
  const [selectedProjectId, setSelectedProjectId] = useState(projectId);

  const getProjectQuery = useHasuraQuery<GetProjectQuery>(GET_PROJECT_QUERY, HasuraUserRole.Public, {
    variables: { id: projectId, githubUserId },
    skip: !projectId,
  });

  const project = getProjectQuery.data?.projectsByPk;

  useEffect(() => {
    if (selectedProjectId && selectedProjectId !== projectId) {
      setSelectedTab(ProjectDetailsTab.Overview);
      navigate(generatePath(RoutePaths.MyProjectDetails, { projectId: selectedProjectId }));
    }
  }, [selectedProjectId]);

  useEffect(() => {
    if (
      (project && project.id !== lastVisitedProjectId() && ledProjectIds.includes(project.id)) ||
      !!project?.pendingInvitations.length
    ) {
      setLastVisitedProjectId(project.id);
    }
  }, [project, ledProjectIds]);

  useEffect(() => {
    if (acceptInvitationResponse.data) {
      window.location.reload();
    }
  }, [acceptInvitationResponse.data]);

  const availableTabs =
    projectId && ledProjectIds && ledProjectIds.includes(projectId)
      ? [ProjectDetailsTab.Overview, ProjectDetailsTab.Contributors, ProjectDetailsTab.Payments]
      : [ProjectDetailsTab.Overview, ProjectDetailsTab.Contributors];

  return (
    <QueryWrapper query={getProjectQuery}>
      {project && (
        <View
          currentProject={projectFromQuery(project)}
          availableTabs={availableTabs}
          onTabSelected={setSelectedTab}
          selectedTab={selectedTab}
          onInvitationAccepted={(invitationId: string) => {
            acceptInvitation({
              variables: {
                invitationId,
              },
            });
          }}
          onProjectSelected={(projectId: string) => setSelectedProjectId(projectId)}
        />
      )}
    </QueryWrapper>
  );
}

const projectFromQuery = (project: GetProjectQuery["projectsByPk"]) => ({
  id: project?.id,
  name: project?.name,
  logoUrl: project?.projectDetails?.logoUrl || project?.githubRepo?.content?.logoUrl || onlyDustLogo,
  leads: project?.projectLeads?.map((lead: any) => ({ id: lead.userId, ...lead.user })) || [],
  invitationId: project?.pendingInvitations.at(0)?.id,
  totalSpentAmountInUsd: project?.totalSpentAmountInUsd,
  telegramLink: project?.projectDetails?.telegramLink,
  githubRepoInfo: {
    name: project?.githubRepo?.name,
    owner: project?.githubRepo?.owner,
    contributors: project?.githubRepo?.content?.contributors,
    languages: project?.githubRepo?.languages,
    decodedReadme:
      project?.githubRepo?.content?.readme?.content && decodeBase64ToString(project?.githubRepo.content.readme.content),
  },
});

export const GET_PROJECT_QUERY = gql`
  ${PROJECT_CARD_FRAGMENT}
  query GetProject($id: uuid!, $githubUserId: bigint = 0) {
    projectsByPk(id: $id) {
      ...ProjectCardFields
      githubRepo {
        content {
          readme {
            content
          }
        }
      }
    }
  }
`;

const ACCEPT_PROJECT_LEADER_INVITATION_MUTATION = gql`
  mutation acceptProjectLeaderInvitation($invitationId: Uuid!) {
    acceptProjectLeaderInvitation(invitationId: $invitationId)
  }
`;
