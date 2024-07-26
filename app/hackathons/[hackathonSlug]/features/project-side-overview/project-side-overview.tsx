"use client";

import { keepPreviousData } from "@tanstack/react-query";
import { ProjectReactQueryAdapter } from "core/application/react-query-adapter/project";
import { useContext, useEffect } from "react";

import { HackathonContext } from "app/hackathons/[hackathonSlug]/context/hackathon.context";
import { Header } from "app/hackathons/[hackathonSlug]/features/project-side-overview/components/header/header";
import { MainInfo } from "app/hackathons/[hackathonSlug]/features/project-side-overview/components/main-infos/main-info";
import { ProjectCategories } from "app/hackathons/[hackathonSlug]/features/project-side-overview/components/project-categories/project-categories";
import { ProjectInfos } from "app/hackathons/[hackathonSlug]/features/project-side-overview/components/project-infos/project-infos";
import { ProjectIssues } from "app/hackathons/[hackathonSlug]/features/project-side-overview/components/project-issues/project-issues";
import { ProjectLanguages } from "app/hackathons/[hackathonSlug]/features/project-side-overview/components/project-languages/project-languages";
import { TProjectSideOverview } from "app/hackathons/[hackathonSlug]/features/project-side-overview/project-side-overview.types";

import { usePosthog } from "src/hooks/usePosthog";

export function ProjectSideOverview({ isLive }: TProjectSideOverview.Props) {
  const { capture } = usePosthog();

  const {
    project: { projectId },
    hackathonId,
  } = useContext(HackathonContext);

  const { data: project } = ProjectReactQueryAdapter.client.useGetProjectById({
    pathParams: { projectId },
    options: {
      enabled: !!projectId,
      placeholderData: keepPreviousData,
    },
  });

  useEffect(() => {
    if (projectId) {
      capture("project_viewed", { id_project: projectId, type: "hackathon" });
    }
  }, [projectId]);

  if (!project) return null;

  return (
    <>
      <Header slug={project.slug} logoUrl={project.logoUrl} />

      <MainInfo project={project} />
      <ProjectInfos project={project} />
      <div className="grid grid-cols-2 gap-3">
        <ProjectLanguages languages={project.languages} />
        <ProjectCategories categories={project.categories} />
      </div>
      {isLive && <ProjectIssues hackathonId={hackathonId} projectId={projectId} />}
    </>
  );
}
