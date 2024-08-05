import { ecosystemsApiClient } from "api-client/resources/ecosystems";

import { BaseLink } from "components/layout/base-link/base-link";
import { Section } from "components/layout/section/section";
import { Typography } from "components/layout/typography/typography";

import { NEXT_ROUTER } from "constants/router";

import { Slide } from "./components/slide/slide";
import { Slider } from "./components/slider/slider";

export async function FeaturedProjects({ ecosystemSlug }: { ecosystemSlug: string }) {
  const { projects, hasMore } = await ecosystemsApiClient.fetch
    .getEcosystemProjectBySlug(
      {
        ecosystemSlug,
      },
      {
        featuredOnly: true,
      },
      { pageIndex: 0, pageSize: 5 }
    )
    .request();

  if (!projects.length) return null;

  return (
    <Section
      iconProps={{ remixName: "ri-fire-line" }}
      titleProps={{ translate: { token: "v2.pages.ecosystems.detail.featuredProjects.title" } }}
      rightContent={
        hasMore ? (
          <BaseLink href={NEXT_ROUTER.projects.allWithParams({ ecosystems: ecosystemSlug })}>
            <Typography
              variant="body-s-bold"
              className="text-spacePurple-500"
              translate={{ token: "v2.pages.ecosystems.detail.featuredProjects.viewAll" }}
            />
          </BaseLink>
        ) : null
      }
    >
      <Slider>
        {projects.map(p => (
          <Slide key={p.id} project={p} />
        ))}
      </Slider>
    </Section>
  );
}
