"use client";

import { bannerApiClient } from "api-client/resources/banner";
import { ComponentProps } from "react";

import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";
import { PageBanner as PageBannerOrganism } from "components/organisms/page-banner/page-banner";

export function PageBanner() {
  const { data } = bannerApiClient.queries.useGetBanner();

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
    alert(data.id);
  }

  if (!data.text) return null;

  return <PageBannerOrganism message={data.text} cta={getCta()} onClose={handleClose} />;
}
