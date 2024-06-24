"use client";

import _ from "lodash";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { useMediaQuery } from "usehooks-ts";

import ProjectApi from "src/api/Project";
import Skeleton from "src/components/Skeleton";
import { viewportConfig } from "src/config";
import {
  useLeadProjects,
  usePendingLeadProjects,
  usePendingProjectLeader,
  useProjectLeader,
} from "src/hooks/useProjectLeader/useProjectLeader";
import { cn } from "src/utils/cn";

import { withClientOnly } from "components/layout/client-only/client-only";

import { NEXT_ROUTER } from "constants/router";

import { useIntl } from "hooks/translate/use-translate";

import View from "./View";
import ViewMobile from "./ViewMobile";

export type ProjectDetailsTab = {
  label: string;
  path: string;
};

function ProjectsSidebar() {
  const { slug = "" } = useParams<{ slug: string }>();
  const { T } = useIntl();
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);

  const { data: currentProject, isLoading } = ProjectApi.queries.useGetProjectBySlug({ params: { slug } });

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
      path: NEXT_ROUTER.projects.details.root(slug),
    },
    contributions: {
      label: T("project.details.contributions.title"),
      path: NEXT_ROUTER.projects.details.contributions.root(slug),
    },
    applications: {
      label: T("project.details.applications.title"),
      path: NEXT_ROUTER.projects.details.applications.root(slug),
    },
    rewards: {
      label: T("project.details.rewards.title"),
      path: NEXT_ROUTER.projects.details.rewards.root(slug),
    },
    contributors: {
      label: T("project.details.contributors.title"),
      path: NEXT_ROUTER.projects.details.contributors(slug),
    },
    insights: {
      label: T("project.details.insights.title"),
      path: NEXT_ROUTER.projects.details.insights(slug),
    },
  };

  const availableTabs = [
    AvailableTabs.overview,
    ...(isProjectLeader ? [AvailableTabs.contributions] : []),
    ...(isProjectLeader ? [AvailableTabs.applications] : []),
    ...(isProjectLeader ? [AvailableTabs.rewards] : []),
    AvailableTabs.contributors,
    ...(isProjectLeader ? [AvailableTabs.insights] : []),
  ];

  if (isLoading && isXl)
    return (
      <div
        className={cn(
          "border-r-2xl xl:border-r-lg relative z-[1] flex w-full shrink-0 flex-col gap-6 border-black p-6 font-walsheim xl:w-[328px] xl:rounded-l-2xl",
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

export default withClientOnly(ProjectsSidebar);
