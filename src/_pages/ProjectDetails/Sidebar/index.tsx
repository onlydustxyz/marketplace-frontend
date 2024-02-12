import _ from "lodash";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";

import { ProjectRoutePaths } from "src/App";
import ProjectApi from "src/api/Project";
import Skeleton from "src/components/Skeleton";
import { viewportConfig } from "src/config";
import { useIntl } from "src/hooks/useIntl";
import {
  useLeadProjects,
  usePendingLeadProjects,
  usePendingProjectLeader,
  useProjectLeader,
} from "src/hooks/useProjectLeader/useProjectLeader";
import { cn } from "src/utils/cn";

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
      leadedProjects: _.chain(leadedProjects).sortBy("name").value(),
      pendingLeadedProjects: _.chain(pendingLeadedProjects).sortBy("name").value(),
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
    insights: {
      label: T("project.details.insights.title"),
      path: ProjectRoutePaths.Insights,
    },
  };

  const availableTabs = [
    AvailableTabs.overview,
    AvailableTabs.contributors,
    ...(isProjectLeader ? [AvailableTabs.contributions] : []),
    ...(isProjectLeader ? [AvailableTabs.rewards] : []),
    ...(process.env.NEXT_PUBLIC_FLAG_ALLOW_PROJECT_INSIGHTS === "true" && isProjectLeader
      ? [AvailableTabs.insights]
      : []),
  ];

  if (isLoading && isXl)
    return (
      <div
        className={cn(
          "relative z-[1] flex w-full shrink-0 flex-col gap-6 border-r-[16px] border-black p-6 font-walsheim xl:w-[328px] xl:rounded-l-2xl xl:border-r-[8px]",
          "before:absolute before:inset-0 before:-z-[2] before:bg-black",
          "after:absolute after:inset-0 after:-z-[1] after:bg-white/4 after:bg-noise-medium"
        )}
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
