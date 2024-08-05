import { ecosystemsApiClient } from "api-client/resources/ecosystems";

import { Slide } from "app/(v1)/ecosystems/features/featured-ecosystems/components/slide/slide";
import { Slider } from "app/(v1)/ecosystems/features/featured-ecosystems/components/slider/slider";

export async function FeaturedEcosystems() {
  const ecosystems = await ecosystemsApiClient.fetch
    .getAllEcosystems({ featured: true })
    .request()
    .then(res => res.ecosystems);

  return (
    <Slider>
      {ecosystems.map(ecosystem => (
        <Slide
          key={ecosystem.id}
          imageUrl={ecosystem.banners.xl.url}
          smImageUrl={ecosystem.banners.md.url}
          slug={ecosystem.slug}
          color={ecosystem.banners.xl.fontColor}
          description={ecosystem.description}
          title={ecosystem.name}
        />
      ))}
    </Slider>
  );
}
