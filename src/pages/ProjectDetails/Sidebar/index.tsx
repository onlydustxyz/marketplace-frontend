import View from "./View";
import { chain } from "lodash";
import { ProjectRoutePaths } from "src/App";
import { useIntl } from "src/hooks/useIntl";
import ViewMobile from "./ViewMobile";
import { viewportConfig } from "src/config";
import { useMediaQuery } from "usehooks-ts";
import {
  useLeadProjects,
  usePendingLeadProjects,
  usePendingProjectLeader,
  useProjectLeader,
} from "src/hooks/useProjectLeader/useProjectLeader";
import { useMemo } from "react";
import ProjectApi from "src/api/Project";

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
  };

  const availableTabs = [
    AvailableTabs.overview,
    AvailableTabs.contributors,
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
