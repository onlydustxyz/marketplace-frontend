"use client";

import { projectsApiClient } from "api-client/resources/projects";

import { ProjectCard } from "app/home/features/lead-projects/components/project-card/project-card";
import styles from "app/home/styles/styles.module.css";

import { cn } from "src/utils/cn";

import { Section } from "components/layout/section/section";

import { TLeadProjects } from "./lead-projects.types";

export function LeadProjects(_: TLeadProjects.Props) {
  const { data, error, isFetching } = projectsApiClient.queries.useGetAllProjects({
    queryParams: { mine: true },
    pagination: { pageIndex: 0, pageSize: 20 },
  });

  if (error && !isFetching) {
    throw error;
  }

  if (!data.projects?.length) return null;

  return (
    <div className={cn("w-full", styles.areaLeadProjects)}>
      <Section
        iconProps={{ remixName: "ri-star-line" }}
        titleProps={{
          translate: {
            token: "v2.pages.home.leadProjects.title",
          },
        }}
      >
        <div className="flex flex-row flex-wrap gap-4">
          {data?.projects.map(p => (
            <ProjectCard key={p.id} data={p} />
          ))}
        </div>
      </Section>
    </div>
  );
}
