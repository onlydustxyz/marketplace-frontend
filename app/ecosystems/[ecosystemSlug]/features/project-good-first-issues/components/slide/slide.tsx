import { EcosystemProject } from "api-client/resources/ecosystems/types";
import { useMemo } from "react";
import { useMediaQuery } from "usehooks-ts";

import { viewportConfig } from "src/config";

import { Avatar } from "components/ds/avatar/avatar";
import { Card } from "components/ds/card/card";
import { Tag } from "components/ds/tag/tag";
import { Tooltip } from "components/ds/tooltip/tooltip";
import { ContributorsAvatars } from "components/features/contributors-avatars/contributors-avatars";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

import { NEXT_ROUTER } from "constants/router";

const MAX_CONTRIBUTORS = 3;

export function Slide({ project }: { project: EcosystemProject }) {
  const isSm = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.sm}px)`);

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
            {renderLanguages()}
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
