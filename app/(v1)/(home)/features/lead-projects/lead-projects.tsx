"use client";

import { projectsApiClient } from "api-client/resources/projects";
import { useMemo } from "react";

import { ProjectCard } from "app/(v1)/(home)/features/lead-projects/components/project-card/project-card";
import styles from "app/(v1)/(home)/styles/styles.module.css";

import { cn } from "src/utils/cn";

import { Section } from "components/layout/section/section";

import { TLeadProjects } from "./lead-projects.types";

export function LeadProjects(_: TLeadProjects.Props) {
  const { data, error, isFetching } = projectsApiClient.queries.useInfiniteGetAllProject({
    queryParams: { mine: true },
    pagination: { pageSize: 20 },
  });

  if (error && !isFetching) {
    throw error;
  }

  const projects = useMemo(() => data.pages.flatMap(page => page.projects), [data]);

  if (!projects?.length) return null;

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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {projects.map(p => (
            <ProjectCard key={p.id} data={p} />
          ))}
        </div>
      </Section>
    </div>
  );
}
