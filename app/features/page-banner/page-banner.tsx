"use client";

import { bannerApiClient } from "api-client/resources/banner";
import { meApiClient } from "api-client/resources/me";
import { ComponentProps, useState } from "react";

import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";
import { PageBanner as PageBannerOrganism } from "components/organisms/page-banner/page-banner";

export function PageBanner() {
  const [showBanner, setShowBanner] = useState(true);

  const { data } = bannerApiClient.queries.useGetBanner();
  const { mutate } = meApiClient.mutations.useDeleteBannerById({ bannerId: data.id });

  function getCta(): ComponentProps<typeof PageBannerOrganism>["cta"] {
    if (!data.buttonText || !data.buttonLinkUrl) return undefined;

    const cta: NonNullable<ComponentProps<typeof PageBannerOrganism>["cta"]> = {
      text: data.buttonText,
      href: data.buttonLinkUrl,
    };

    if (data.buttonIconSlug) {
      cta.icon = data.buttonIconSlug as RemixIconsName;
    }

    return cta;
  }

  function handleClose() {
    setShowBanner(false);
    // TODO test
    // mutate({});
  }

  if (!data.text || !showBanner) return null;

  return (
    <section className={"bg-black"}>
      <PageBannerOrganism message={data.text} cta={getCta()} onClose={handleClose} />
    </section>
  );
}
