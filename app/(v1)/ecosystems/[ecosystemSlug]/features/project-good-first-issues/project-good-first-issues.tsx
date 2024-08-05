import { ecosystemsApiClient } from "api-client/resources/ecosystems";

import { Slide } from "app/(v1)/ecosystems/[ecosystemSlug]/features/project-good-first-issues/components/slide/slide";
import { Slider } from "app/(v1)/ecosystems/[ecosystemSlug]/features/project-good-first-issues/components/slider/slider";

export async function ProjectGoodFirstIssues({ ecosystemSlug }: { ecosystemSlug: string }) {
  const { projects, hasMore } = await ecosystemsApiClient.fetch
    .getEcosystemProjectBySlug(
      {
        ecosystemSlug,
      },
      {
        hasGoodFirstIssues: true,
      },
      { pageIndex: 0, pageSize: 10 }
    )
    .request();

  if (!projects.length) return null;

  return (
    <Slider ecosystemSlug={ecosystemSlug} hasMore={hasMore}>
      {projects.map(p => (
        <Slide key={p.id} project={p} />
      ))}
    </Slider>
  );
}
