import View, { SidebarProjectDetails } from "./View";
import {
  Maybe,
  SidebarProjectDetailsFragment,
  useGetCurrentProjectForSidebarQuery,
  useGetProjectsForSidebarQuery,
} from "src/__generated/graphql";
import { useAuth } from "src/hooks/useAuth";
import onlyDustLogo from "assets/img/onlydust-logo-space.jpg";
import { chain } from "lodash";
import { ProjectRoutePaths } from "src/App";
import { useIntl } from "src/hooks/useIntl";
import { isProjectVisibleToUser } from "src/hooks/useProjectVisibility";
import { contextWithCacheHeaders } from "src/utils/headers";
import ViewMobile from "./ViewMobile";
import { viewportConfig } from "src/config";
import { useMediaQuery } from "usehooks-ts";

export type ProjectDetailsTab = {
  label: string;
  path: string;
};

interface Props {
  projectId: string;
}

export default function ProjectsSidebar({ projectId }: Props) {
  const { ledProjectIds, githubUserId, user } = useAuth();
  const { T } = useIntl();
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);
  //   console.log('ledProjectIds',)
  //   const isProjectLeader = useProjectLeader();
  const isProjectMine = (project?: Maybe<SidebarProjectDetails>) =>
    (project && ledProjectIds.includes(project?.id)) || project?.withInvitation;

  const getCurrentProjectsForSidebarQuery = useGetCurrentProjectForSidebarQuery({
    variables: { projectId },
    ...contextWithCacheHeaders,
  });

  // TODO je pense que le current project c'est project + is leader
  const currentProject =
    getCurrentProjectsForSidebarQuery.data?.projects[0] &&
    projectFromQuery(getCurrentProjectsForSidebarQuery.data?.projects[0], githubUserId);

  const getProjectsForSidebarQuery = useGetProjectsForSidebarQuery({
    variables: { ledProjectIds, githubUserId },
    skip: !isProjectMine(currentProject),
  });

  // lead projet + invite project
  const projects =
    getProjectsForSidebarQuery?.data?.projects
      .filter(project => isProjectVisibleToUser({ project, user: { githubUserId, userId: user?.id } }))
      .map(project => projectFromQuery(project, githubUserId)) || [];

  const sortedProjects = chain(projects)
    .sortBy("name")
    .sortBy(p => !p.withInvitation)
    .value();

  const AvailableTabs: Record<string, ProjectDetailsTab> = {
    overview: {
      label: T("project.details.sidebar.overview"),
      path: ProjectRoutePaths.Overview,
    },
    contributors: {
      label: T("project.details.contributors.title"),
      path: ProjectRoutePaths.Contributors,
    },
    rewards: {
      label: T("project.details.rewards.title"),
      path: ProjectRoutePaths.Rewards,
    },
  };

  // TODO si leader alors afficher la tabs reward
  const availableTabs =
    currentProject && ledProjectIds.includes(currentProject?.id)
      ? [AvailableTabs.overview, AvailableTabs.contributors, AvailableTabs.rewards]
      : [AvailableTabs.overview, AvailableTabs.contributors];

  if (!currentProject) return <div />;

  const props = {
    availableTabs,
    currentProject,
    allProjects: sortedProjects,
    expandable: isProjectMine(currentProject) ? sortedProjects.length > 1 : false, // TODO : boolean
  };

  return isXl ? <View {...props} /> : <ViewMobile {...props} />;
}

const projectFromQuery = (project: SidebarProjectDetailsFragment, githubUserId?: number): SidebarProjectDetails => ({
  ...project,
  name: project.name || "",
  key: project.key || "",
  logoUrl: project.logoUrl || onlyDustLogo,
  withInvitation: project.pendingInvitations?.some(i => i.githubUserId === githubUserId),
  contributorsCount: project.contributorsAggregate.aggregate?.count || 0,
});
