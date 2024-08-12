"use client";

import { bannerApiClient } from "api-client/resources/banner";
import { meApiClient } from "api-client/resources/me";
import { ComponentProps, useState } from "react";

import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";
import { PageBanner as PageBannerOrganism } from "components/organisms/page-banner/page-banner";

import { useCurrentUser } from "hooks/users/use-current-user/use-current-user";

export function PageBanner() {
  const [showBanner, setShowBanner] = useState(true);
  const { user } = useCurrentUser();
  const { data } = bannerApiClient.queries.useGetBanner({
    queryParams: {
      hiddenIgnoredByMe: true,
    },
  });
  const { mutate } = meApiClient.mutations.useDeleteBannerById({ bannerId: data?.id ?? "" });

  function getCta(): ComponentProps<typeof PageBannerOrganism>["cta"] {
    if (!data?.buttonText || !data?.buttonLinkUrl) return undefined;

    return {
      text: data.buttonText,
      href: data.buttonLinkUrl,
      icon: (data.buttonIconSlug as RemixIconsName) || undefined,
    };
  }

  function handleClose() {
    setShowBanner(false);

    if (user) {
      mutate({});
    }
  }

  if (!data || !data.shortDescription || !showBanner) return null;

  return (
    <section className={"bg-black md:p-6"}>
      <PageBannerOrganism message={data.shortDescription} cta={getCta()} onClose={handleClose} />
    </section>
  );
}
