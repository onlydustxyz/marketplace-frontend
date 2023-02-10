import { gql } from "@apollo/client";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import QueryWrapper from "src/components/QueryWrapper";
import { useAuth } from "src/hooks/useAuth";
import { useHasuraMutation, useHasuraQuery } from "src/hooks/useHasuraQuery";
import { Contributor, HasuraUserRole, LanguageMap } from "src/types";
import { decodeBase64ToString } from "src/utils/stringUtils";
import { GetProjectQuery } from "src/__generated/graphql";
import onlyDustLogo from "assets/img/onlydust-logo.png";
import { SessionMethod, useSessionDispatch, useSession } from "src/hooks/useSession";
import View from "./View";
import View__deprecated from "./View__deprecated";
import { PROJECT_CARD_FRAGMENT } from "src/components/ProjectCard";
import {
  ProjectDetailsProvider__deprectaed,
  ProjectDetailsContext__deprecated,
  ProjectDetailsTab__deprecated,
} from "./ProjectDetailsContext";
import { FeatureFlags, isFeatureEnabled } from "src/utils/featureFlags";

type ProjectDetailsParams = {
  projectId: string;
};

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

function ProjectDetailsComponent() {
  const { projectId } = useParams<ProjectDetailsParams>();
  const { ledProjectIds, githubUserId } = useAuth();
  const { lastVisitedProjectId } = useSession();
  const dispatchSession = useSessionDispatch();

  const [acceptInvitation, acceptInvitationResponse] = useHasuraMutation(
    ACCEPT_PROJECT_LEADER_INVITATION_MUTATION,
    HasuraUserRole.RegisteredUser
  );

  const state__deprecated = useContext(ProjectDetailsContext__deprecated);

  const getProjectQuery = useHasuraQuery<GetProjectQuery>(GET_PROJECT_QUERY, HasuraUserRole.Public, {
    variables: { id: projectId, githubUserId },
    skip: !projectId,
  });

  const project = getProjectQuery.data?.projectsByPk;

  useEffect(() => {
    if (
      (project && project.id !== lastVisitedProjectId && ledProjectIds.includes(project.id)) ||
      !!project?.pendingInvitations.length
    ) {
      dispatchSession({ method: SessionMethod.SetLastVisitedProjectId, value: project.id });
    }
  }, [project, ledProjectIds]);

  useEffect(() => {
    if (acceptInvitationResponse.data) {
      window.location.reload();
    }
  }, [acceptInvitationResponse.data]);

  const availableTabs__deprecated =
    projectId && ledProjectIds && ledProjectIds.includes(projectId)
      ? [
          ProjectDetailsTab__deprecated.Overview,
          ProjectDetailsTab__deprecated.Contributors,
          ProjectDetailsTab__deprecated.Payments,
        ]
      : [ProjectDetailsTab__deprecated.Overview, ProjectDetailsTab__deprecated.Contributors];

  const sidebarUrlsEnabled = isFeatureEnabled(FeatureFlags.PROJECT_SIDEBAR_URLS);

  return (
    <QueryWrapper query={getProjectQuery}>
      {project &&
        (sidebarUrlsEnabled ? (
          <View
            currentProject={projectFromQuery(project)}
            availableTabs__deprecated={availableTabs__deprecated}
            selectedTab={state__deprecated.tab}
            onInvitationAccepted={(invitationId: string) => {
              acceptInvitation({
                variables: {
                  invitationId,
                },
              });
            }}
          />
        ) : (
          <View__deprecated
            currentProject={projectFromQuery(project)}
            availableTabs__deprecated={availableTabs__deprecated}
            selectedTab={state__deprecated.tab}
            onInvitationAccepted={(invitationId: string) => {
              acceptInvitation({
                variables: {
                  invitationId,
                },
              });
            }}
          />
        ))}
    </QueryWrapper>
  );
}

const projectFromQuery = (project: GetProjectQuery["projectsByPk"]) => ({
  id: project?.id,
  name: project?.name,
  logoUrl: project?.projectDetails?.logoUrl || project?.githubRepo?.content?.logoUrl || onlyDustLogo,
  leads: project?.projectLeads?.map((lead: any) => ({ id: lead.userId, ...lead.user })) || [],
  invitationId: project?.pendingInvitations.at(0)?.id,
  totalSpentAmountInUsd: project?.budgetsAggregate.aggregate?.sum?.spentAmount,
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
        id
        content {
          id
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

export default function ProjectDetails() {
  return (
    <ProjectDetailsProvider__deprectaed>
      <ProjectDetailsComponent />
    </ProjectDetailsProvider__deprectaed>
  );
}
