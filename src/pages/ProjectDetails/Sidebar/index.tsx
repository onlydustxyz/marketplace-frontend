import { chain } from "lodash";
import { useMemo } from "react";
import { ProjectRoutePaths } from "src/App";
import ProjectApi from "src/api/Project";
import { viewportConfig } from "src/config";
import { useIntl } from "src/hooks/useIntl";
import {
  useLeadProjects,
  usePendingLeadProjects,
  usePendingProjectLeader,
  useProjectLeader,
} from "src/hooks/useProjectLeader/useProjectLeader";
import { parseFlag } from "src/utils/parseFlag";
import { useMediaQuery } from "usehooks-ts";
import View from "./View";
import ViewMobile from "./ViewMobile";

export type ProjectDetailsTab = {
  label: string;
  path: string;
};

interface Props {
  projectId: string;
  projectSlug: string;
}

export default function ProjectsSidebar({ projectId, projectSlug }: Props) {
  const { data: currentProject } = ProjectApi.queries.useGetProjectBySlug({ params: { slug: projectSlug } });
  const { T } = useIntl();
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);
  const isProjectLeader = useProjectLeader({ id: projectId });
  const isPendingProjectLeader = usePendingProjectLeader({ id: projectId });
  const leadedProjects = useLeadProjects();
  const pendingLeadedProjects = usePendingLeadProjects();
  const sortedProject = useMemo(() => {
    return {
      leadedProjects: chain(leadedProjects).sortBy("name").value(),
      pendingLeadedProjects: chain(pendingLeadedProjects).sortBy("name").value(),
    };
  }, [leadedProjects, pendingLeadedProjects]);

  const canExpand = useMemo(() => {
    const projects = [...leadedProjects, ...pendingLeadedProjects];

    return (isPendingProjectLeader || isProjectLeader) && projects.length > 0;
  }, [leadedProjects, pendingLeadedProjects, isPendingProjectLeader, isProjectLeader]);

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
    contributions: {
      label: T("project.details.contributions.title"),
      path: ProjectRoutePaths.Contributions,
    },
  };

  const availableTabs = [
    AvailableTabs.overview,
    AvailableTabs.contributors,
    ...(parseFlag("VITE_FLAG_ALLOW_PROJECT_CONTRIBUTIONS") && isProjectLeader ? [AvailableTabs.contributions] : []),
    ...(isProjectLeader ? [AvailableTabs.rewards] : []),
  ];

  if (!currentProject) return <div />;

  const props = {
    availableTabs,
    currentProject,
    projects: sortedProject.leadedProjects,
    pendingProjects: sortedProject.pendingLeadedProjects,
    expandable: canExpand,
  };

  return isXl ? <View {...props} /> : <ViewMobile {...props} />;
}
