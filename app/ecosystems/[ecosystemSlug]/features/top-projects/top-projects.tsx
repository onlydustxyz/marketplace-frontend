import { ecosystemsApiClient } from "api-client/resources/ecosystems";

import { Slide } from "app/ecosystems/[ecosystemSlug]/features/top-projects/components/slide/slide";
import { Slider } from "app/ecosystems/[ecosystemSlug]/features/top-projects/components/slider/slider";
import { Section } from "app/ecosystems/components/section/section";

export async function TopProjects({ ecosystemSlug }: { ecosystemSlug: string }) {
  const { projects } = await ecosystemsApiClient.fetch
    .getEcosystemProjectBySlug(
      {
        ecosystemSlug,
      },
      {
        pageIndex: 0,
        pageSize: 10,
        // TODO @hayden uncomment to test
        // topProjects: true,
      }
    )
    .request();

  if (!projects.length) return null;

  return (
    <Section
      iconProps={{ remixName: "ri-trophy-line" }}
      titleProps={{ translate: { token: "v2.pages.ecosystems.detail.topProjects.title" } }}
    >
      <Slider>
        {projects.map((p, i) => (
          <Slide key={p.id} project={p} rank={i + 1} />
        ))}
      </Slider>
    </Section>
  );
}
