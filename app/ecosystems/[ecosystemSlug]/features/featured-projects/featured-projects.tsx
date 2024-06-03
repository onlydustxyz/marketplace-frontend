import { ecosystemsApiClient } from "api-client/resources/ecosystems";

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
    <Slider>
      {projects.map(p => (
        <Slide key={p.id} project={p} />
      ))}
    </Slider>
  );
}
