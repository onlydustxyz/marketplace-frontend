import { EcosystemProject } from "api-client/resources/ecosystems/types";

import { Contributors } from "app/ecosystems/[ecosystemSlug]/components/contributors/contributors";
import { LanguagesTag } from "app/ecosystems/[ecosystemSlug]/components/languages-tag/languages-tag";

import { Card } from "components/ds/card/card";
import { Typography } from "components/layout/typography/typography";

import { NEXT_ROUTER } from "constants/router";

export function Slide({ project }: { project: EcosystemProject }) {
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
          <Contributors topContributors={project.topContributors} contributorsCount={project.contributorsCount} />
        </footer>
      </div>
    </Card>
  );
}
