import { ecosystemsApiClient } from "api-client/resources/ecosystems";

import { Banner } from "app/ecosystems/components/banner/banner";

import { Button } from "components/ds/button/button";
import { PosthogOnMount } from "components/features/posthog/components/posthog-on-mount/posthog-on-mount";
import { BaseLink } from "components/layout/base-link/base-link";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";

import { NEXT_ROUTER } from "constants/router";

import { TOverview } from "./overview.types";

export async function Overview({ ecosystemSlug }: TOverview.Props) {
  const ecosystem = await ecosystemsApiClient.fetch.getEcosystemBySlug({ slug: ecosystemSlug }).request({
    next: { revalidate: 120 },
  });

  return (
    <div className={"flex flex-col items-start gap-4"}>
      <BaseLink href={NEXT_ROUTER.ecosystems.root}>
        <Button as={"div"} variant={"secondary"} size={"s"}>
          <Icon remixName={"ri-arrow-left-s-line"} size={16} />
          <Translate token={"v2.commons.navigation.back"} />
        </Button>
      </BaseLink>

      <div className="relative z-[1] flex w-full flex-col items-start justify-center overflow-hidden rounded-[16px] bg-card-background-base bg-cover bg-center outline outline-[6px] outline-card-border-medium aspect-2.16/1 sm:px-8 md:px-16 md:aspect-3.41/1 lg:aspect-302/59">
        <PosthogOnMount
          eventName={"ecosystem_viewed"}
          params={{
            ecosystem_id: ecosystem.id,
            ecosystem_name: ecosystem.name,
          }}
          paramsReady={Boolean(ecosystem)}
        />
        <Banner
          imageUrl={ecosystem.banners.xl.url}
          smImageUrl={ecosystem.banners.md.url}
          color={ecosystem.banners.xl.fontColor}
          title={ecosystem.name}
          description={ecosystem.description}
        />
      </div>
    </div>
  );
}
