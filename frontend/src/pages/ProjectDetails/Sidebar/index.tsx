import { ProjectDetails } from "..";
import View, { SidebarProjectDetails } from "./View";
import { SidebarProjectDetailsFragment, useGetProjectsForSidebarQuery } from "src/__generated/graphql";
import { useAuth } from "src/hooks/useAuth";
import onlyDustLogo from "assets/img/onlydust-logo-space.jpg";
import { sortBy } from "lodash";
import { ProjectRoutePaths } from "src/App";
import { useIntl } from "src/hooks/useIntl";
import isDefined from "src/utils/isDefined";
import { isProjectVisible } from "src/utils/project";

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

  const getProjectsForSidebarQuery = useGetProjectsForSidebarQuery({
    variables: { ledProjectIds, githubUserId },
    skip: !isLoggedIn,
  });

  const projects =
    getProjectsForSidebarQuery?.data?.projects
      .filter(isProjectVisible(githubUserId))
      .map(project => projectFromQuery(project, githubUserId)) || [];
  const sortedProjects = sortBy(projects, ["withInvitation", "name"]);

  const AvailableTabs: Record<string, ProjectDetailsTab> = {
    overview: {
      label: T("project.details.sidebar.overview"),
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
      expandable={
        (isProjectMine(currentProject) || isDefined(currentProject.invitationId)) && sortedProjects.length > 1
      }
    />
  );
}

const projectFromQuery = (project: SidebarProjectDetailsFragment, githubUserId?: number): SidebarProjectDetails => ({
  ...project,
  name: project.projectDetails?.name || "",
  logoUrl: project.projectDetails?.logoUrl || onlyDustLogo,
  withInvitation:
    githubUserId !== undefined &&
    project.pendingInvitations?.map(pendingInvitation => pendingInvitation.githubUserId).includes(githubUserId),
  contributorsCount: project.contributorsAggregate.aggregate?.count || 0,
});
