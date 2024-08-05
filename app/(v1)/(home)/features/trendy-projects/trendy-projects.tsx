import { projectsApiClient } from "api-client/resources/projects";

import styles from "app/(v1)/(home)/styles/styles.module.css";

import { cn } from "src/utils/cn";

import { Button } from "components/ds/button/button";
import { Card } from "components/ds/card/card";
import { ProjectListItem } from "components/ds/project-list-item/project-list-item";
import { BaseLink } from "components/layout/base-link/base-link";
import { Icon } from "components/layout/icon/icon";
import { Section } from "components/layout/section/section";
import { Typography } from "components/layout/typography/typography";

import { NEXT_ROUTER } from "constants/router";

import { TTrendyProjects } from "./trendy-projects.types";

export async function TrendyProjects(_: TTrendyProjects.Props) {
  const { projects, hasMore } = await projectsApiClient.fetch
    .getAllProjects({ pagination: { pageIndex: 0, pageSize: 9 }, queryParams: { sort: "RANK" } })
    .request();

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
        rightContent={
          hasMore ? (
            <>
              <BaseLink
                href={NEXT_ROUTER.projects.allWithParams({ sort: "RANK" })}
                className="hidden items-center gap-1 text-spacePurple-500 sm:flex"
              >
                <Typography variant="body-s-bold" translate={{ token: "v2.pages.home.trendyProjects.seeAll" }} />
                <Icon remixName={"ri-arrow-right-s-line"} />
              </BaseLink>
              <BaseLink href={NEXT_ROUTER.projects.allWithParams({ sort: "RANK" })} className={"block sm:hidden"}>
                <Button variant={"secondary"} size={"s"} iconOnly>
                  <Icon remixName={"ri-folder-3-line"} />
                </Button>
              </BaseLink>
            </>
          ) : null
        }
      >
        <Card background={"base"} hasPadding={false} className={"overflow-hidden"}>
          <div className={"grid gap-x-4 sm:grid-cols-2 lg:grid-cols-3"}>
            {projects.map((project, i) => (
              <ProjectListItem
                key={project.id}
                project={project}
                className={cn("border-t border-card-border-light", {
                  "border-none": i === 0,
                  "sm:border-none": i < 2,
                  "lg:border-none": i < 3,
                })}
              />
            ))}
          </div>
        </Card>
      </Section>
    </div>
  );
}
