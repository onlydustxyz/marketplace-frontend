import { projectsApiClient } from "api-client/resources/projects";

import styles from "app/home/styles/styles.module.css";

import { cn } from "src/utils/cn";

import { Card } from "components/ds/card/card";
import { ProjectListItem } from "components/ds/project-list-item/project-list-item";
import { Section } from "components/layout/section/section";

import { TTrendyProjects } from "./trendy-projects.types";

export async function TrendyProjects(_: TTrendyProjects.Props) {
  const { projects } = await projectsApiClient.fetch.getAllProjects({}, { pageIndex: 0, pageSize: 10 }).request();

  if (!projects.length) return null;

  return (
    <div className={cn("w-full", styles.areaTrendyProjects)}>
      <Section
        iconProps={{ remixName: "ri-fire-line" }}
        titleProps={{
          translate: {
            token: "v2.pages.home.trendyProjects.title",
          },
        }}
      >
        <Card background={"base"}>
          {projects.map(project => (
            <ProjectListItem key={project.id} project={project} />
          ))}
        </Card>
      </Section>
    </div>
  );
}
