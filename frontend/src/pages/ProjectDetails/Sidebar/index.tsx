import { ProjectDetails } from "..";
import { HasuraUserRole } from "src/types";
import View from "./View";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { GetProjectsForSidebarQuery } from "src/__generated/graphql";
import { gql } from "@apollo/client";
import { useAuth } from "src/hooks/useAuth";
import onlyDustLogo from "assets/img/onlydust-logo.png";
import { useContext } from "react";
import { ProjectDetailsContext, ProjectDetailsDispatchContext, ProjectDetailsTab } from "../ProjectDetailsContext";
import { sortBy } from "lodash";

interface Props {
  currentProject: ProjectDetails;
  onProjectSelected: (projectId: string) => void;
  availableTabs__deprecated: ProjectDetailsTab[];
}

export default function ProjectsSidebar({ currentProject, onProjectSelected, availableTabs__deprecated }: Props) {
  const { isLoggedIn, ledProjectIds, githubUserId } = useAuth();
  const state = useContext(ProjectDetailsContext);
  const dispatch = useContext(ProjectDetailsDispatchContext);

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

  return (
    <View
      {...{
        currentProject,
        onProjectSelected,
        availableTabs__deprecated,
        selectedTab: state.tab,
        dispatch,
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
