"use client";

import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

import { useStackBillingCreate } from "src/App/Stacks/Stacks";
import MeApi from "src/api/me";

import { Banner } from "components/ds/banner/banner";
import { Button } from "components/ds/button/button";
import { Translate } from "components/layout/translate/translate";

import { NEXT_ROUTER } from "constants/router";

import { useBillingProfiles } from "hooks/billings-profiles/use-billing-profiles/use-billing-profiles";

export function LimitReachedHeader() {
  const router = useRouter();
  const { profiles } = useBillingProfiles();
  const [openBillingCreate] = useStackBillingCreate();

  const pathname = usePathname();
  const { data: payoutPreferences } = MeApi.queries.useGetPayoutPreferences({});

  function handleCreateBillingProfile() {
    openBillingCreate({ redirectToProfile: true });
  }
  function handleRedirectToPayoutPreferences() {
    router.push(NEXT_ROUTER.settings.payoutPreferences);
  }

  const hasPayoutPreferencesLimitReached = payoutPreferences?.some(p => p?.billingProfile?.individualLimitReached);
  const hasOnlyIndividualProfile = profiles.length === 1 && profiles[0].data.type === "INDIVIDUAL";
  const hasIndividualLimitReached = hasOnlyIndividualProfile && profiles[0].data.individualLimitReached;

  const renderEndElement = useMemo(() => {
    if (pathname.includes("payout-preferences")) {
      return null;
    }

    if (hasIndividualLimitReached) {
      return (
        <Button size={"s"} onClick={handleCreateBillingProfile}>
          <Translate token={"v2.features.banners.limitReached.addBillingProfileButtonLabel"} />
        </Button>
      );
    }
    if (hasPayoutPreferencesLimitReached) {
      return (
        <Button size={"s"} onClick={handleRedirectToPayoutPreferences}>
          <Translate token={"v2.features.banners.limitReached.updatePayoutPreferencesButtonLabel"} />
        </Button>
      );
    }
  }, [profiles]);

  return useMemo(() => {
    if (hasPayoutPreferencesLimitReached || hasIndividualLimitReached) {
      return (
        <Banner
          title={<Translate token={"v2.features.banners.limitReached.title"} />}
          description={<Translate token={"v2.features.banners.limitReached.description"} />}
          variant={"red"}
          hasBorder={false}
          size={"m"}
          endElement={renderEndElement}
        />
      );
    }
    return null;
  }, [hasPayoutPreferencesLimitReached, hasIndividualLimitReached, profiles]);
}
