import { ecosystemsApiClient } from "api-client/resources/ecosystems";
import { GetEcosystemPageResponse } from "api-client/resources/ecosystems/types";

import { Slide } from "app/ecosystems/features/featured-ecosystems/components/slide/slide";
import { Slider } from "app/ecosystems/features/featured-ecosystems/components/slider/slider";
import mock from "app/ecosystems/mock/get-all-ecosystem.json";

export async function FeaturedEcosystems() {
  await ecosystemsApiClient.fetch.getAllEcosystems({ featured: true }).request();
  const ecosystems = mock as GetEcosystemPageResponse;

  return (
    <Slider>
      {ecosystems.ecosystems.map(ecosystem => (
        <Slide
          key={ecosystem.id}
          imageUrl={ecosystem.banners.xl.url}
          slug={ecosystem.slug}
          color={ecosystem.banners.xl.fontColor}
          description={ecosystem.description}
          title={ecosystem.name}
        />
      ))}
    </Slider>
  );
}
