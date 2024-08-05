import { ecosystemsApiClient } from "api-client/resources/ecosystems";

import { Slide } from "app/(v1)/ecosystems/[ecosystemSlug]/features/top-projects/components/slide/slide";
import { Slider } from "app/(v1)/ecosystems/[ecosystemSlug]/features/top-projects/components/slider/slider";

export async function TopProjects({ ecosystemSlug }: { ecosystemSlug: string }) {
  const { projects } = await ecosystemsApiClient.fetch
    .getEcosystemProjectBySlug(
      {
        ecosystemSlug,
      },
      {
        sortBy: "RANK",
      },
      {
        pageIndex: 0,
        pageSize: 10,
      }
    )
    .request();

  if (projects.length < 5) return null;

  return (
    <Slider>
      {projects.map((p, i) => (
        <Slide key={p.id} project={p} rank={i + 1} />
      ))}
    </Slider>
  );
}
