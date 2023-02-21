import { gql } from "@apollo/client";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import QueryWrapper from "src/components/QueryWrapper";
import { useAuth } from "src/hooks/useAuth";
import { useHasuraMutation, useHasuraQuery } from "src/hooks/useHasuraQuery";
import { Contributor, HasuraUserRole, LanguageMap } from "src/types";
import { decodeBase64ToString } from "src/utils/stringUtils";
import { GetProjectQuery, ProjectLeadFragment, SponsorFragment } from "src/__generated/graphql";
import onlyDustLogo from "assets/img/onlydust-logo.png";
import { SessionMethod, useSessionDispatch, useSession } from "src/hooks/useSession";
import View from "./View";
import { PROJECT_CARD_FRAGMENT } from "src/components/ProjectCard";

type ProjectDetailsParams = {
  projectId: string;
};

export interface ProjectDetails {
  id: string;
  name?: string;
  logoUrl: string;
  telegramLink?: string | null;
  leads: ({ id: string } & ProjectLeadFragment)[];
  invitationId?: string;
  totalSpentAmountInUsd?: number;
  githubRepoInfo?: {
    decodedReadme?: string;
    owner?: string;
    name?: string;
    contributors?: Contributor[];
    languages: LanguageMap;
  };
  sponsors: SponsorFragment[];
}

const ProjectDetails: React.FC = () => {
  const { projectId } = useParams<ProjectDetailsParams>();
  const { ledProjectIds, githubUserId } = useAuth();
  const { lastVisitedProjectId } = useSession();
  const dispatchSession = useSessionDispatch();

  const [acceptInvitation, acceptInvitationResponse] = useHasuraMutation(
    ACCEPT_PROJECT_LEADER_INVITATION_MUTATION,
    HasuraUserRole.RegisteredUser
  );

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

  return (
    <QueryWrapper query={getProjectQuery}>
      {project && (
        <View
          currentProject={projectFromQuery(project)}
          onInvitationAccepted={(invitationId: string) => {
            acceptInvitation({
              variables: {
                invitationId,
              },
            });
          }}
        />
      )}
    </QueryWrapper>
  );
};

const projectFromQuery = (project: GetProjectQuery["projectsByPk"]): ProjectDetails => ({
  id: project?.id,
  name: project?.projectDetails?.name,
  logoUrl: project?.projectDetails?.logoUrl || project?.githubRepo?.content?.logoUrl || onlyDustLogo,
  leads: project?.projectLeads?.map((lead: any) => ({ id: lead.userId, ...lead.user })) || [],
  invitationId: project?.pendingInvitations.at(0)?.id,
  totalSpentAmountInUsd: project?.budgetsAggregate.aggregate?.sum?.spentAmount,
  telegramLink: project?.projectDetails?.telegramLink,
  githubRepoInfo: {
    name: project?.githubRepo?.name || undefined,
    owner: project?.githubRepo?.owner || undefined,
    contributors: project?.githubRepo?.content?.contributors,
    languages: project?.githubRepo?.languages,
    decodedReadme:
      project?.githubRepo?.content?.readme?.content && decodeBase64ToString(project?.githubRepo.content.readme.content),
  },
  sponsors: project?.projectSponsors?.map(projectSponsor => projectSponsor.sponsor) || [],
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

export default ProjectDetails;
