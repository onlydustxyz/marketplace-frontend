"use client";

import { EcosystemProject } from "api-client/resources/ecosystems/types";

import { viewportConfig } from "src/config";

import { Avatar } from "components/ds/avatar/avatar";
import { Card } from "components/ds/card/card";
import { Typography } from "components/layout/typography/typography";

import { NEXT_ROUTER } from "constants/router";

import { useClientMediaQuery } from "hooks/layout/useClientMediaQuery/use-client-media-query";

export function Slide({ project, rank }: { project: EcosystemProject; rank: number }) {
  const isMd = useClientMediaQuery(`(min-width: ${viewportConfig.breakpoints.md}px)`);

  return (
    <article className={"relative flex h-full justify-end"}>
      <span
        className={
          "text-shadow-spacePurple-500 absolute -top-6 left-0 font-belwe text-[180px] leading-none text-card-background-base"
        }
      >
        {rank}
      </span>
      <Card
        as={"a"}
        href={NEXT_ROUTER.projects.details.root(project.slug)}
        background={"base"}
        hasPadding={false}
        className={"relative z-10 h-full w-[75%] shadow-medium md:w-[85%]"}
      >
        <div className="px-4 py-5 lg:px-5">
          <div className={"flex flex-col items-center gap-4 md:flex-row md:items-start"}>
            <Avatar src={project.logoUrl} alt={project.name} size={isMd ? "4xl" : "2xl"} shape={"square"} />

            <div className={"grid gap-1"}>
              <Typography variant={"title-s"} className={"truncate"}>
                {project.name}
              </Typography>

              {isMd ? (
                <Typography variant={"body-s"} className={"line-clamp-4 text-spaceBlue-100"}>
                  {project.shortDescription}
                </Typography>
              ) : null}
            </div>
          </div>
        </div>
      </Card>
    </article>
  );
}
