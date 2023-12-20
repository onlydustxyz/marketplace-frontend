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
import { useParams } from "react-router-dom";
import Skeleton from "src/components/Skeleton";
import { parseFlag } from "src/utils/parseFlag";
import { useMediaQuery } from "usehooks-ts";
import View from "./View";
import ViewMobile from "./ViewMobile";

export type ProjectDetailsTab = {
  label: string;
  path: string;
};

export default function ProjectsSidebar() {
  const { projectKey = "" } = useParams<{ projectKey: string }>();
  const { T } = useIntl();
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);

  const { data: currentProject, isLoading } = ProjectApi.queries.useGetProjectBySlug({ params: { slug: projectKey } });

  const isProjectLeader = useProjectLeader({ id: currentProject?.id });
  const isPendingProjectLeader = usePendingProjectLeader({ id: currentProject?.id });
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

  if (isLoading && isXl)
    return (
      <div
        className={
          "flex w-full shrink-0 flex-col gap-6 bg-white/4 bg-noise-medium p-6 font-walsheim xl:w-80 xl:rounded-l-2xl"
        }
      >
        <Skeleton variant="projectSidebar" />
      </div>
    );

  if (!currentProject) return <div />;

  const props = {
    availableTabs,
    currentProject,
    projects: sortedProject.leadedProjects,
    pendingProjects: sortedProject.pendingLeadedProjects,
    expandable: canExpand,
    isLoading,
  };

  return isXl ? <View {...props} /> : <ViewMobile {...props} />;
}
