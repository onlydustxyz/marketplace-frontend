import { ecosystemsApiClient } from "api-client/resources/ecosystems";
import { EcosystemProject } from "api-client/resources/ecosystems/types";

import { SectionHeader } from "app/ecosystems/components/section-header/section-header";

import { Avatar } from "components/ds/avatar/avatar";
import { Card } from "components/ds/card/card";
import { Container } from "components/layout/container/container";
import { Typography } from "components/layout/typography/typography";

function Project({ project, rank }: { project: EcosystemProject; rank: number }) {
  return (
    <article className={"relative flex w-[386px] snap-start justify-end"}>
      <span
        className={
          "text-shadow-spacePurple-500 absolute -top-6 left-0 font-belwe text-[180px] leading-none text-card-background-base"
        }
      >
        {rank}
      </span>
      <Card as={"div"} background={"base"} hasPadding={false} className={"relative z-10 w-[327px]"}>
        <div className="p-5">
          <div className={"flex items-start gap-4"}>
            <Avatar src={project.logoUrl} alt={project.name} size={"4xl"} shape={"square"} />

            <div className={"grid gap-1"}>
              <Typography variant={"title-s"} className={"truncate"}>
                {project.name}
              </Typography>

              <Typography variant={"body-s"} className={"line-clamp-4 text-spaceBlue-100"}>
                {project.shortDescription}
              </Typography>
            </div>
          </div>
        </div>
      </Card>
    </article>
  );
}
export async function TopProjects({ ecosystemSlug }: { ecosystemSlug: string }) {
  const data = await ecosystemsApiClient.fetch
    .getEcosystemProjectBySlug({ ecosystemSlug }, { pageIndex: 0, pageSize: 10 })
    .request();

  if (!data) return null;

  return (
    <section className={"overflow-visible"}>
      <div className={"grid gap-4"}>
        <Container>
          <SectionHeader
            iconProps={{ remixName: "ri-trophy-line" }}
            titleProps={{ translate: { token: "v2.pages.ecosystems.detail.topProjects.title" } }}
          />

          <div className={"flex snap-x gap-4 overflow-x-scroll scroll-smooth whitespace-nowrap"}>
            {data.projects.map((p, i) => (
              <Project key={p.id} project={p} rank={i + 1} />
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
