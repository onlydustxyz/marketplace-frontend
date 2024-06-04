import { ecosystemsApiClient } from "api-client/resources/ecosystems";

import { Section } from "app/ecosystems/components/section/section";

import { Slide } from "./components/slide/slide";
import { Slider } from "./components/slider/slider";

export async function FeaturedProjects({ ecosystemSlug }: { ecosystemSlug: string }) {
  const { projects } = await ecosystemsApiClient.fetch
    .getEcosystemProjectBySlug(
      {
        ecosystemSlug,
      },
      {
        pageIndex: 0,
        pageSize: 5,
        // TODO @hayden uncomment to test
        // featuredOnly: true,
      }
    )
    .request();

  if (!projects.length) return null;

  return (
    <Section
      iconProps={{ remixName: "ri-fire-line" }}
      titleProps={{ translate: { token: "v2.pages.ecosystems.detail.featuredProjects.title" } }}
    >
      <Slider>
        {projects.map(p => (
          <Slide key={p.id} project={p} />
        ))}
      </Slider>
    </Section>
  );
}
