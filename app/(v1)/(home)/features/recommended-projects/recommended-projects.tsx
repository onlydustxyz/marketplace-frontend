"use client";

import { meApiClient } from "api-client/resources/me";
import { useMemo } from "react";

import styles from "app/(v1)/(home)/styles/styles.module.css";

import { cn } from "src/utils/cn";

import { Card } from "components/ds/card/card";
import { ProjectListItem } from "components/ds/project-list-item/project-list-item";
import { Section } from "components/layout/section/section";

import { TRecommendedProjects } from "./recommended-projects.types";

export function RecommendedProjects(_: TRecommendedProjects.Props) {
  const { data, error, isFetching } = meApiClient.queries.useGetMyRecommendedProjects({
    pagination: { pageSize: 10 },
  });

  if (error && !isFetching) {
    throw error;
  }

  const projects = useMemo(() => data.pages.flatMap(page => page.projects), [data]);

  if (!projects.length) return null;

  return (
    <div className={cn("w-full", styles.areaRecommendedProjects)}>
      <Section
        iconProps={{ remixName: "ri-folder-3-line" }}
        titleProps={{
          translate: { token: "v2.pages.home.recommendedProjects.title" },
        }}
      >
        <Card background={"base"} hasPadding={false} className={"overflow-hidden"}>
          <div className={"grid gap-x-4 sm:grid-cols-2"}>
            {projects.map((project, i) => (
              <ProjectListItem
                key={project.id}
                project={project}
                className={cn("border-t border-card-border-light", {
                  "border-none": i === 0,
                  "sm:border-none": i < 2,
                })}
              />
            ))}
          </div>
        </Card>
      </Section>
    </div>
  );
}
