import { gql } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import { useT } from "talkr";
import QueryWrapper from "src/components/QueryWrapper";
import { useAuth } from "src/hooks/useAuth";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { Contributor, HasuraUserRole, LanguageMap, User } from "src/types";
import { decodeBase64ToString } from "src/utils/stringUtils";
import { GetPublicProjectQuery, GetUserProjectQuery, GetProjectsForSidebarQuery } from "src/__generated/graphql";
import onlyDustLogo from "assets/img/onlydust-logo.png";
import { RoutePaths } from "src/App";
import sortBy from "lodash/sortBy";
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
  budget?: {
    remainingAmount: number;
    initialAmount: number;
    id: string;
  };
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

  const [selectedTab, setSelectedTab] = useState<ProjectDetailsTab>(ProjectDetailsTab.Overview);
  const { isLoggedIn, ledProjectIds, user } = useAuth();
  const [selectedProjectId, setSelectedProjectId] = useState(projectId);
  const { lastVisitedProjectId, setLastVisitedProjectId } = useSession();
  const { getInvitationForProject, amIInvitedForProject, allInvitations, acceptInvitation, acceptInvitationResponse } =
    useProjectLeadInvitations();

  const navigate = useNavigate();
  const { T } = useT();

  const onChangeProjectFromDropdown = (project: any) => {
    setSelectedProjectId(project.id);
  };

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

  const getProjectPublicQuery = useHasuraQuery<GetPublicProjectQuery>(GET_PROJECT_PUBLIC_QUERY, HasuraUserRole.Public, {
    variables: { id: projectId },
    skip: isLoggedIn || !projectId,
  });

  const getProjectUserQuery = useHasuraQuery<GetUserProjectQuery>(
    GET_PROJECT_USER_QUERY,
    HasuraUserRole.RegisteredUser,
    {
      variables: { id: projectId },
      skip: !isLoggedIn || !projectId,
    }
  );

  const getProjectsForSidebarQuery = useHasuraQuery<GetProjectsForSidebarQuery>(
    GET_PROJECTS_FOR_SIDEBAR_QUERY,
    HasuraUserRole.Public
  );

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

  const project = getProjectUserQuery?.data?.projectsByPk || getProjectPublicQuery?.data?.projectsByPk;

  const projects = useMemo(() => {
    const projects = getProjectsForSidebarQuery?.data?.projects.filter(({ id }) => isProjectMine(id));
    return sortBy(projects, project => !amIInvitedForProject(project.id));
  }, [getProjectsForSidebarQuery?.data?.projects, ledProjectIds, allInvitations]);

  const projectFromQuery = (projectId: string, project: any): ProjectDetails => ({
    id: projectId,
    name: project.name,
    logoUrl: project.projectDetails?.logoUrl || project.githubRepo?.content?.logoUrl || onlyDustLogo,
    leads: project.projectLeads?.map((lead: any) => ({ id: lead.userId, ...lead.user })) || [],
    invitationId: getInvitationForProject(projectId)?.id,
    totalSpentAmountInUsd: project.totalSpentAmountInUsd,
    budget: project.budget,
    githubRepoInfo: {
      name: project.githubRepo?.name,
      owner: project.githubRepo?.owner,
      contributors: project.githubRepo?.content?.contributors,
      languages: project.githubRepo?.languages,
      decodedReadme:
        project.githubRepo?.content?.readme?.content && decodeBase64ToString(project.githubRepo.content.readme.content),
    },
  });

  const component = projectId && (
    <View
      user={user}
      currentProject={projectFromQuery(projectId, project)}
      allProjects={projects.map(p => projectFromQuery(p.id, p))}
      availableTabs={availableTabs}
      onTabClicked={setSelectedTab}
      selectedTab={selectedTab}
      onInvitationAccepted={(invitationId: string) => {
        acceptInvitation({
          variables: {
            invitationId,
          },
        });
      }}
      onChangeProjectFromDropdown={onChangeProjectFromDropdown}
    />
  );

  return isLoggedIn ? (
    <QueryWrapper query={getProjectUserQuery}>{component}</QueryWrapper>
  ) : (
    <QueryWrapper query={getProjectPublicQuery}>{component}</QueryWrapper>
  );
}

const GITHUB_REPO_FIELDS_FRAGMENT = gql`
  fragment ProjectDetailsGithubRepoFields on GithubRepoDetails {
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
`;

export const GET_PROJECT_PUBLIC_QUERY = gql`
  ${GITHUB_REPO_FIELDS_FRAGMENT}
  query GetPublicProject($id: uuid!) {
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
        ...ProjectDetailsGithubRepoFields
      }
    }
  }
`;

export const GET_PROJECT_USER_QUERY = gql`
  ${GITHUB_REPO_FIELDS_FRAGMENT}
  query GetUserProject($id: uuid!) {
    projectsByPk(id: $id) {
      name
      totalSpentAmountInUsd
      budgets {
        id
        initialAmount
        remainingAmount
      }
      projectDetails {
        description
        telegramLink
        logoUrl
      }
      projectLeads {
        user {
          displayName
          avatarUrl
        }
      }
      githubRepo {
        ...ProjectDetailsGithubRepoFields
      }
    }
  }
`;

export const GET_PROJECTS_FOR_SIDEBAR_QUERY = gql`
  query GetProjectsForSidebar {
    projects {
      id
      name
      projectDetails {
        logoUrl
      }
      githubRepo {
        content {
          contributors {
            login
          }
          logoUrl
        }
      }
    }
  }
`;
