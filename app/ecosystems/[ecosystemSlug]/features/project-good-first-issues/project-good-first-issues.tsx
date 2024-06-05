import { ecosystemsApiClient } from "api-client/resources/ecosystems";

import { Slide } from "app/ecosystems/[ecosystemSlug]/features/project-good-first-issues/components/slide/slide";
import { Slider } from "app/ecosystems/[ecosystemSlug]/features/project-good-first-issues/components/slider/slider";

export async function ProjectGoodFirstIssues({ ecosystemSlug }: { ecosystemSlug: string }) {
  const { projects } = await ecosystemsApiClient.fetch
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
    <Slider>
      {projects.map(p => (
        <Slide key={p.id} project={p} />
      ))}
    </Slider>
  );
}
