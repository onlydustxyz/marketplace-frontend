import { gql } from "@apollo/client";
import { useEffect, useState } from "react";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import QueryWrapper from "src/components/QueryWrapper";
import { useAuth } from "src/hooks/useAuth";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { Contributor, HasuraUserRole, LanguageMap, User } from "src/types";
import { decodeBase64ToString } from "src/utils/stringUtils";
import { GetProjectQuery } from "src/__generated/graphql";
import onlyDustLogo from "assets/img/onlydust-logo.png";
import { RoutePaths } from "src/App";
import { useSession } from "src/hooks/useSession";
import { useProjectLeadInvitations } from "src/hooks/useProjectLeadInvitations";
import View from "./View";

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
  name: string;
  logoUrl: string;
  telegramLink?: string;
  leads: User[];
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
  const { ledProjectIds } = useAuth();
  const { lastVisitedProjectId, setLastVisitedProjectId } = useSession();
  const { getInvitationForProject, amIInvitedForProject, allInvitations, acceptInvitation, acceptInvitationResponse } =
    useProjectLeadInvitations();
  const navigate = useNavigate();

  const [selectedTab, setSelectedTab] = useState(ProjectDetailsTab.Overview);
  const [selectedProjectId, setSelectedProjectId] = useState(projectId);

  const getProjectQuery = useHasuraQuery<GetProjectQuery>(GET_PROJECT_QUERY, HasuraUserRole.Public, {
    variables: { id: projectId },
    skip: !projectId,
  });

  useEffect(() => {
    if (selectedProjectId && selectedProjectId !== projectId) {
      setSelectedTab(ProjectDetailsTab.Overview);
      navigate(generatePath(RoutePaths.MyProjectDetails, { projectId: selectedProjectId }));
    }
  }, [selectedProjectId]);

  useEffect(() => {
    if (projectId && projectId !== lastVisitedProjectId() && isProjectMine(projectId)) {
      setLastVisitedProjectId(projectId);
    }
  }, [projectId, ledProjectIds, allInvitations]);

  useEffect(() => {
    if (acceptInvitationResponse.data) {
      window.location.reload();
    }
  }, [acceptInvitationResponse.data]);

  const isProjectMine = (projectId: string) => ledProjectIds.includes(projectId) || !!amIInvitedForProject(projectId);

  const availableTabs =
    projectId && ledProjectIds && ledProjectIds.includes(projectId)
      ? [ProjectDetailsTab.Overview, ProjectDetailsTab.Contributors, ProjectDetailsTab.Payments]
      : [ProjectDetailsTab.Overview, ProjectDetailsTab.Contributors];

  const project = getProjectQuery?.data?.projectsByPk;

  const projectFromQuery = projectId &&
    project && {
      id: projectId,
      name: project.name,
      logoUrl: project.projectDetails?.logoUrl || project.githubRepo?.content?.logoUrl || onlyDustLogo,
      leads: project.projectLeads?.map((lead: any) => ({ id: lead.userId, ...lead.user })) || [],
      // TODO: Have all projects in one single query
      invitationId: getInvitationForProject(projectId)?.id,
      totalSpentAmountInUsd: project.totalSpentAmountInUsd,
      githubRepoInfo: {
        name: project.githubRepo?.name,
        owner: project.githubRepo?.owner,
        contributors: project.githubRepo?.content?.contributors,
        languages: project.githubRepo?.languages,
        decodedReadme:
          project.githubRepo?.content?.readme?.content &&
          decodeBase64ToString(project.githubRepo.content.readme.content),
      },
    };

  return (
    projectFromQuery && (
      <QueryWrapper query={getProjectQuery}>
        <View
          currentProject={projectFromQuery}
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
      </QueryWrapper>
    )
  );
}

export const GET_PROJECT_QUERY = gql`
  query GetProject($id: uuid!) {
    projectsByPk(id: $id) {
      name
      totalSpentAmountInUsd
      projectDetails {
        description
        telegramLink
        logoUrl
      }
      projectLeads {
        userId
        user {
          displayName
          avatarUrl
        }
      }
      githubRepo {
        name
        owner
        content {
          readme {
            content
          }
          contributors {
            login
            avatarUrl
          }
          logoUrl
        }
        languages
      }
    }
  }
`;
