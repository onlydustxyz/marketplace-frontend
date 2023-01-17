import { ProjectDetailsTab, ProjectDetails } from "..";
import { HasuraUserRole } from "src/types";
import View from "./View";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { GetProjectsForSidebarQuery } from "src/__generated/graphql";
import { gql } from "@apollo/client";
import { useAuth } from "src/hooks/useAuth";
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
  const { isLoggedIn, ledProjectIds, githubUserId } = useAuth();

  const isProjectMine = (project: ProjectDetails) => ledProjectIds.includes(project.id) || !!project.invitationId;

  const getProjectsForSidebarQuery = useHasuraQuery<GetProjectsForSidebarQuery>(
    GET_PROJECTS_FOR_SIDEBAR_QUERY,
    HasuraUserRole.RegisteredUser,
    {
      variables: { ledProjectIds, githubUserId },
      skip: !isLoggedIn,
    }
  );

  const projects = getProjectsForSidebarQuery?.data?.projects || [];

  return (
    <View
      {...{
        currentProject,
        onProjectSelected,
        selectedTab,
        availableTabs,
        onTabSelected,
      }}
      allProjects={projects.map(project => projectFromQuery(project))}
      expandable={isProjectMine(currentProject)}
    />
  );
}

const projectFromQuery = (project: any) => ({
  id: project.id,
  name: project.name,
  logoUrl: project.projectDetails?.logoUrl || project.githubRepo?.content?.logoUrl || onlyDustLogo,
  nbContributors: project.githubRepo?.content?.contributors?.length || 0,
  withInvitation: project.pendingInvitations?.at(0)?.id,
});

export const GET_PROJECTS_FOR_SIDEBAR_QUERY = gql`
  query GetProjectsForSidebar($ledProjectIds: [uuid!], $githubUserId: bigint) {
    projects(
      where: {
        _or: [{ id: { _in: $ledProjectIds } }, { pendingInvitations: { githubUserId: { _eq: $githubUserId } } }]
      }
      orderBy: { pendingInvitationsAggregate: { count: DESC } }
    ) {
      id
      name
      projectDetails {
        logoUrl
      }
      pendingInvitations {
        id
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
