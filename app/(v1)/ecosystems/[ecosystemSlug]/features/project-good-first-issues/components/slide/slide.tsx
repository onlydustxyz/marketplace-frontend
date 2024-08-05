import { EcosystemProject } from "api-client/resources/ecosystems/types";

import { Contributors } from "app/(v1)/ecosystems/[ecosystemSlug]/components/contributors/contributors";

import { Avatar } from "components/ds/avatar/avatar";
import { Card } from "components/ds/card/card";
import { LanguagesTag } from "components/features/languages-tag/languages-tag";
import { Typography } from "components/layout/typography/typography";

import { NEXT_ROUTER } from "constants/router";

export function Slide({ project }: { project: EcosystemProject }) {
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
          <Contributors topContributors={project.topContributors} contributorsCount={project.contributorsCount} />
        </footer>
      </div>
    </Card>
  );
}
