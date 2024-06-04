"use client";

import { EcosystemProject } from "api-client/resources/ecosystems/types";
import { useMemo } from "react";

import { LanguagesTag } from "app/ecosystems/[ecosystemSlug]/components/languages-tag/languages-tag";

import { Avatar } from "components/ds/avatar/avatar";
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
      hasPadding={false}
      border={"heavy"}
      background={"medium"}
      className={"flex h-full cursor-pointer flex-col shadow-medium"}
    >
      <div className={"flex flex-1 flex-col justify-between gap-5 p-5"}>
        <div className={"flex items-start gap-4"}>
          <Avatar src={project.logoUrl} alt={project.name} size={"3xl"} shape={"square"} />
          <div className="flex flex-col gap-2">
            <Typography variant={"title-s"} className={"truncate"}>
              {project.name}
            </Typography>

            <Typography variant={"body-s"} className={"line-clamp-2 text-spaceBlue-200"}>
              {project.shortDescription}
            </Typography>

            <LanguagesTag languages={project.languages} />
          </div>
        </div>
        <footer>
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
