"use client";

import { EcosystemProject } from "api-client/resources/ecosystems/types";
import { useMemo } from "react";

import { viewportConfig } from "src/config";

import { Card } from "components/ds/card/card";
import { Tag } from "components/ds/tag/tag";
import { Tooltip } from "components/ds/tooltip/tooltip";
import { ContributorsAvatars } from "components/features/contributors-avatars/contributors-avatars";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

import { NEXT_ROUTER } from "constants/router";

import { useClientMediaQuery } from "hooks/layout/useClientMediaQuery/use-client-media-query";

const MAX_CONTRIBUTORS = 3;

export function Slide({ project }: { project: EcosystemProject }) {
  const isSm = useClientMediaQuery(`(min-width: ${viewportConfig.breakpoints.sm}px)`);

  const maxLanguages = isSm ? 3 : 2;

  const nbLanguages = useMemo(() => project.languages?.length ?? 0, [project.languages]);
  const isMaxLanguages = useMemo(() => nbLanguages > maxLanguages, [nbLanguages, maxLanguages]);

  const nbContributors = useMemo(() => project.contributorsCount ?? 0, [project.contributorsCount]);
  const isMaxContributors = useMemo(() => nbContributors > MAX_CONTRIBUTORS, [nbContributors]);
  function renderLanguages() {
    if (!project.languages || project.languages.length === 0) return null;

    const firstLanguages = project.languages.slice(0, maxLanguages);

    return (
      <Tooltip
        content={
          <ul className={"flex flex-col gap-2 text-left"}>
            {project.languages.map(l => (
              <li key={l.id}>
                <Typography variant={"body-s"}>{l.name}</Typography>
              </li>
            ))}
          </ul>
        }
        enabled={isMaxLanguages && isSm}
      >
        <Tag>
          <Icon remixName={"ri-code-s-slash-line"} size={12} />
          <Typography variant={"body-xs"}>
            {firstLanguages?.map(l => l.name).join(", ")}
            {isMaxLanguages ? ` +${nbLanguages - maxLanguages}` : ""}
          </Typography>
        </Tag>
      </Tooltip>
    );
  }

  return (
    <Card
      as={"a"}
      href={NEXT_ROUTER.projects.details.root(project.slug)}
      background={"base"}
      border={"light"}
      hasPadding={false}
      className={"block h-full"}
    >
      <div className="flex h-full flex-col gap-3 p-5">
        <img
          src={project.logoUrl ?? ""}
          alt={project.name}
          width={192}
          height={120}
          className="flex w-full rounded-xl border border-card-border-light  object-cover object-center aspect-[8/5]"
          loading={"lazy"}
        />

        <div className="grid gap-2">
          <Typography variant={"title-s"} className={"truncate"}>
            {project.name}
          </Typography>

          <Typography variant={"body-s"} className={"line-clamp-2 text-spaceBlue-100"}>
            {project.shortDescription}
          </Typography>
        </div>

        <footer className={"flex flex-1 flex-wrap items-end gap-3"}>
          {renderLanguages()}{" "}
          {project.topContributors?.length ? (
            <div className={"flex items-center"}>
              <ContributorsAvatars
                contributors={project.topContributors}
                avatarProps={{ size: "xs" }}
                enableTooltip={false}
              />
              {isMaxContributors ? (
                <Typography
                  variant={"body-s"}
                  className={"ml-1 text-spaceBlue-100"}
                  translate={{
                    token: "v2.pages.ecosystems.detail.projectGoodFirstIssues.contributors",
                    params: { count: nbContributors - MAX_CONTRIBUTORS },
                  }}
                />
              ) : null}
            </div>
          ) : null}
        </footer>
      </div>
    </Card>
  );
}
