import { ProjectDetails } from "..";
import { HasuraUserRole } from "src/types";
import View from "./View";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { GetProjectsForSidebarQuery } from "src/__generated/graphql";
import { gql } from "@apollo/client";
import { useAuth } from "src/hooks/useAuth";
import onlyDustLogo from "assets/img/onlydust-logo.png";
import { useContext } from "react";
import {
  ProjectDetailsContext__deprecated,
  ProjectDetailsDispatchContext__deprecated,
  ProjectDetailsTab__deprecated,
} from "../ProjectDetailsContext";
import { sortBy } from "lodash";
import { ProjectRoutePaths } from "src/App";
import { useIntl } from "src/hooks/useIntl";

export type ProjectDetailsTab = {
  label: string;
  path: string;
};

interface Props {
  currentProject: ProjectDetails;
  onProjectSelected: (projectId: string) => void;
  availableTabs__deprecated: ProjectDetailsTab__deprecated[];
}

export default function ProjectsSidebar({ currentProject, onProjectSelected, availableTabs__deprecated }: Props) {
  const { isLoggedIn, ledProjectIds, githubUserId } = useAuth();
  const { T } = useIntl();
  const state__deprecated = useContext(ProjectDetailsContext__deprecated);
  const dispatch__deprecated = useContext(ProjectDetailsDispatchContext__deprecated);

  const isProjectMine = (project: ProjectDetails) => ledProjectIds.includes(project.id) || !!project.invitationId;

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
      {...{
        currentProject,
        onProjectSelected,
        availableTabs,
        availableTabs__deprecated,
        selectedTab: state__deprecated.tab,
        dispatch: dispatch__deprecated,
      }}
      allProjects={sortedProjects}
      expandable={isProjectMine(currentProject) && sortedProjects.length > 1}
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
    ) {
      id
      name
      projectDetails {
        projectId
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
