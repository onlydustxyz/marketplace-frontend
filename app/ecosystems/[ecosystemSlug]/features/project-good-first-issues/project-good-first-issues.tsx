"use client";

import { ecosystemsApiClient } from "api-client/resources/ecosystems";
import { EcosystemProject } from "api-client/resources/ecosystems/types";
import { useParams } from "next/navigation";
import { useMemo } from "react";

import { CarouselStepper } from "app/ecosystems/components/carousel-stepper/carousel-stepper";
import { Section } from "app/ecosystems/components/section/section";

import { Avatar } from "components/ds/avatar/avatar";
import { Card } from "components/ds/card/card";
import { Tag } from "components/ds/tag/tag";
import { Tooltip } from "components/ds/tooltip/tooltip";
import { ContributorsAvatars } from "components/features/contributors-avatars/contributors-avatars";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

import { NEXT_ROUTER } from "constants/router";

const MAX_LANGUAGES = 3;
const MAX_CONTRIBUTORS = 3;

function Project({ project }: { project: EcosystemProject }) {
  const nbLanguages = useMemo(() => project.languages?.length ?? 0, [project.languages]);
  const nbContributors = useMemo(() => project.contributorsCount ?? 0, [project.contributorsCount]);

  function renderLanguages() {
    if (!project.languages || project.languages.length === 0) return null;

    const firstLanguages = project.languages.slice(0, MAX_LANGUAGES);

    return (
      <Tooltip
        content={
          <ul className={"grid gap-2 text-left"}>
            {project.languages.map(l => (
              <li key={l.id}>
                <Typography variant={"body-s"}>{l.name}</Typography>
              </li>
            ))}
          </ul>
        }
        enabled={nbLanguages > MAX_LANGUAGES}
      >
        <Tag>
          <Icon remixName={"ri-code-s-slash-line"} size={12} />
          <Typography variant={"body-xs"}>
            {firstLanguages?.map(l => l.name).join(", ")}
            {nbLanguages > MAX_LANGUAGES ? ` +${nbLanguages - MAX_LANGUAGES}` : ""}
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
      className={"cursor-pointer shadow-medium"}
    >
      <div className={"grid gap-5 p-5"}>
        <div className={"flex items-start gap-4"}>
          <Avatar src={project.logoUrl} alt={project.name} size={"xl"} shape={"square"} />

          <div className="grid gap-2">
            <div className={"grid gap-1"}>
              <Typography variant={"title-s"} className={"truncate"}>
                {project.name}
              </Typography>

              <Typography variant={"body-s"} className={"line-clamp-2 text-spaceBlue-200"}>
                {project.shortDescription}
              </Typography>
            </div>

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

              {nbContributors > MAX_CONTRIBUTORS ? (
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

export function ProjectGoodFirstIssues() {
  const { ecosystemSlug } = useParams();

  const { data } = ecosystemsApiClient.queries.useGetEcosystemProjectBySlug(
    {
      ecosystemSlug: typeof ecosystemSlug === "string" ? ecosystemSlug : "",
    },
    {
      // TODO @hayden uncomment to test
      // hasGoodFirstIssues: true,
    },
    {
      pageSize: "3",
    }
  );

  const flatProjects = useMemo(() => data?.pages.flatMap(page => page.projects), [data]);

  return (
    <Section
      iconProps={{ remixName: "ri-thumb-up-line" }}
      titleProps={{ translate: { token: "v2.pages.ecosystems.detail.projectGoodFirstIssues.title" } }}
      rightContent={<CarouselStepper prevProps={{}} nextProps={{}} />}
    >
      <Card border={"multiColor"} background={"multiColor"} className={"grid gap-3 lg:grid-cols-3"}>
        {/* TODO @hayden carousel */}
        {flatProjects?.length ? flatProjects.map(p => <Project key={p.id} project={p} />) : null}
      </Card>
    </Section>
  );
}
