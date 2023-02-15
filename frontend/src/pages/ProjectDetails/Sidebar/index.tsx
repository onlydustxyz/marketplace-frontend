import { ProjectDetails } from "..";
import { HasuraUserRole } from "src/types";
import View from "./View";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { GetProjectsForSidebarQuery } from "src/__generated/graphql";
import { gql } from "@apollo/client";
import { useAuth } from "src/hooks/useAuth";
import onlyDustLogo from "assets/img/onlydust-logo.png";
import { sortBy } from "lodash";
import { ProjectRoutePaths } from "src/App";
import { useIntl } from "src/hooks/useIntl";

export type ProjectDetailsTab = {
  label: string;
  path: string;
};

interface Props {
  currentProject: ProjectDetails;
}

export default function ProjectsSidebar({ currentProject }: Props) {
  const { isLoggedIn, ledProjectIds, githubUserId } = useAuth();
  const { T } = useIntl();

  const isProjectMine = (project: ProjectDetails) => ledProjectIds.includes(project.id);

  const getProjectsForSidebarQuery = useHasuraQuery<GetProjectsForSidebarQuery>(
    GET_PROJECTS_FOR_SIDEBAR_QUERY,
    HasuraUserRole.RegisteredUser,
    {
      variables: { ledProjectIds, githubUserId },
      skip: !isLoggedIn,
    }
  );

  const projects = getProjectsForSidebarQuery?.data?.projects.map(project => projectFromQuery(project)) || [];
  const sortedProjects = sortBy([...projects], ["withInvitation", "name"]);

  const AvailableTabs: Record<string, ProjectDetailsTab> = {
    overview: {
      label: T("project.details.overview.title"),
      path: ProjectRoutePaths.Overview,
    },
    contributors: {
      label: T("project.details.contributors.title"),
      path: ProjectRoutePaths.Contributors,
    },
    payments: {
      label: T("project.details.payments.title"),
      path: ProjectRoutePaths.Payments,
    },
  };

  const availableTabs = isProjectMine(currentProject)
    ? [AvailableTabs.overview, AvailableTabs.contributors, AvailableTabs.payments]
    : [AvailableTabs.overview, AvailableTabs.contributors];
  return (
    <View
      availableTabs={availableTabs}
      currentProject={currentProject}
      allProjects={sortedProjects}
      projectLead={isProjectMine(currentProject)}
      expandable={isProjectMine(currentProject) && sortedProjects.length > 1}
    />
  );
}

const projectFromQuery = (project: any) => ({
  id: project.id,
  name: project.projectDetails?.name,
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
    ) {
      id
      projectDetails {
        projectId
        name
        logoUrl
      }
      pendingInvitations(where: { githubUserId: { _eq: $githubUserId } }) {
        id
      }
      githubRepo {
        id
        content {
          id
          contributors {
            login
          }
          logoUrl
        }
      }
    }
  }
`;
