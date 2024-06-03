import { ecosystemsApiClient } from "api-client/resources/ecosystems";

import { Banner } from "app/ecosystems/components/banner/banner";

import { viewportConfig } from "src/config";

import { AspectRatio } from "components/layout/aspect-ratio/aspect-ratio";

import { TOverview } from "./overview.types";

export async function Overview({ ecosystemSlug }: TOverview.Props) {
  const ecosystem = await ecosystemsApiClient.fetch.getEcosystemBySlug({ slug: ecosystemSlug }).request({
    next: { revalidate: 120 },
  });

  return (
    <AspectRatio
      ratio="3.41/1"
      breakpoints={[{ width: viewportConfig.breakpoints.sm, ratio: "2.16/1" }]}
      initialHeight="20vw"
    >
      <div className="relative z-[1] flex h-full w-full flex-col items-start justify-end overflow-hidden rounded-[16px] bg-card-background-base bg-cover bg-center outline outline-[6px] outline-card-border-medium sm:px-8 sm:py-8 md:px-16 md:py-12">
        <Banner
          imageUrl={ecosystem.banners.xl.url}
          smImageUrl={ecosystem.banners.md.url}
          color={ecosystem.banners.xl.fontColor}
          title={ecosystem.name}
          description={ecosystem.description}
        />
      </div>
    </AspectRatio>
  );
}
