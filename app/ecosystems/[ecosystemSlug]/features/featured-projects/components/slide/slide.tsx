"use client";

import { EcosystemProject } from "api-client/resources/ecosystems/types";
import { useMemo } from "react";

import { LanguagesTag } from "app/ecosystems/[ecosystemSlug]/components/languages-tag/languages-tag";

import { Card } from "components/ds/card/card";
import { ContributorsAvatars } from "components/features/contributors-avatars/contributors-avatars";
import { Typography } from "components/layout/typography/typography";

import { NEXT_ROUTER } from "constants/router";

const MAX_CONTRIBUTORS = 3;

export function Slide({ project }: { project: EcosystemProject }) {
  const nbContributors = useMemo(() => project.contributorsCount ?? 0, [project.contributorsCount]);
  const isMaxContributors = useMemo(() => nbContributors > MAX_CONTRIBUTORS, [nbContributors]);

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
          <LanguagesTag languages={project.languages} />
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
