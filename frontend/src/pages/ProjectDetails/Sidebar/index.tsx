import { ProjectDetailsTab, ProjectDetails } from "..";
import { HasuraUserRole } from "src/types";
import View from "./View";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { GetProjectsForSidebarQuery } from "src/__generated/graphql";
import QueryWrapper from "src/components/QueryWrapper";
import { gql } from "@apollo/client";
import { useAuth } from "src/hooks/useAuth";
import { useMemo } from "react";
import { sortBy } from "lodash";
import { useProjectLeadInvitations } from "src/hooks/useProjectLeadInvitations";
import onlyDustLogo from "assets/img/onlydust-logo.png";

interface Props {
  currentProject: ProjectDetails;
  onProjectSelected: (projectId: string) => void;
  selectedTab: ProjectDetailsTab;
  availableTabs: ProjectDetailsTab[];
  onTabSelected: (tab: ProjectDetailsTab) => void;
}

export default function ProjectsSidebar({
  currentProject,
  onProjectSelected,
  selectedTab,
  availableTabs,
  onTabSelected,
}: Props) {
  const { isLoggedIn, ledProjectIds } = useAuth();
  const { amIInvitedForProject, allInvitations } = useProjectLeadInvitations();

  const isProjectMine = (projectId: string) => ledProjectIds.includes(projectId) || !!amIInvitedForProject(projectId);

  const getProjectsForSidebarQuery = useHasuraQuery<GetProjectsForSidebarQuery>(
    GET_PROJECTS_FOR_SIDEBAR_QUERY,
    HasuraUserRole.Public,
    {
      skip: !isLoggedIn,
    }
  );

  const projects = useMemo(() => {
    const projects = getProjectsForSidebarQuery?.data?.projects.filter(({ id }) => isProjectMine(id));
    return sortBy(projects, project => !amIInvitedForProject(project.id));
  }, [getProjectsForSidebarQuery?.data?.projects, ledProjectIds, allInvitations]);

  const projectFromQuery = (project: any) => ({
    id: project.id,
    name: project.name,
    logoUrl: project.projectDetails?.logoUrl || project.githubRepo?.content?.logoUrl || onlyDustLogo,
    nbContributors: project.githubRepo?.content?.contributors?.length || 0,
    withInvitation: amIInvitedForProject(project.id),
  });

  return (
    <QueryWrapper query={getProjectsForSidebarQuery}>
      <View
        {...{
          currentProject,
          onProjectSelected,
          selectedTab,
          availableTabs,
          onTabSelected,
        }}
        allProjects={projects.map(project => projectFromQuery(project))}
        expandable={isProjectMine(currentProject.id)}
      />
    </QueryWrapper>
  );
}

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
