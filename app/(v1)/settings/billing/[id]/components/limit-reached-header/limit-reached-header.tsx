"use client";

import {
  BillingProfileShort,
  BillingProfileShortInterface,
} from "core/domain/billing-profile/models/billing-profile-short-model";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

import { useStackBillingCreate } from "src/App/Stacks/Stacks";
import MeApi from "src/api/me";

import { Banner } from "components/ds/banner/banner";
import { Button } from "components/ds/button/button";
import { Translate } from "components/layout/translate/translate";

import { NEXT_ROUTER } from "constants/router";

import { useBillingProfiles } from "hooks/billings-profiles/use-billing-profiles/use-billing-profiles";

interface ProfileWithLimitReached {
  type: "payout-preferences" | "individual";
  instance: BillingProfileShortInterface;
}

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

  function findPayoutPreference(): ProfileWithLimitReached | undefined {
    const findInPayoutPreference = payoutPreferences
      ?.map(p => (p?.billingProfile ? new BillingProfileShort(p.billingProfile) : undefined))
      .find(p => p?.isIndividualLimitReached());

    if (findInPayoutPreference) {
      return {
        type: "payout-preferences",
        instance: findInPayoutPreference,
      };
    }
    return undefined;
  }

  function findIndividualProfile(): ProfileWithLimitReached | undefined {
    if (profiles.length === 1 && profiles[0].data.type === "INDIVIDUAL") {
      const individualProfile = new BillingProfileShort(profiles[0].data);
      if (individualProfile.isIndividualLimitReached()) {
        return {
          type: "individual",
          instance: individualProfile,
        };
      }
    }
    return undefined;
  }

  const profileWithLimitReached: ProfileWithLimitReached | undefined =
    findPayoutPreference() || findIndividualProfile();

  const additionalArgs = useMemo(() => {
    if (pathname.includes("payout-preferences")) {
      return {
        description: <Translate token={"v2.features.banners.limitReached.hasToUpdatePayoutPreferencesDescription"} />,
        endElement: null,
      };
    }
    if (profileWithLimitReached?.type === "individual") {
      return {
        description: <Translate token={"v2.features.banners.limitReached.hasIndividualLimitReachedDescription"} />,
        endElement: (
          <Button size={"s"} onClick={handleCreateBillingProfile}>
            <Translate token={"v2.features.banners.limitReached.addBillingProfileButtonLabel"} />
          </Button>
        ),
      };
    }
    if (profileWithLimitReached?.type === "payout-preferences") {
      return {
        description: <Translate token={"v2.features.banners.limitReached.hasToSwitchPayoutPreferencesDescription"} />,
        endElement: (
          <Button size={"s"} onClick={handleRedirectToPayoutPreferences}>
            <Translate token={"v2.features.banners.limitReached.updatePayoutPreferencesButtonLabel"} />
          </Button>
        ),
      };
    }
  }, [profiles, pathname, profileWithLimitReached]);

  return useMemo(() => {
    if (profileWithLimitReached) {
      const limit = profileWithLimitReached.instance.getLimitAmount() || 0;
      return (
        <Banner
          title={<Translate token={"v2.features.banners.limitReached.title"} params={{ count: limit }} />}
          variant={"red"}
          hasBorder={false}
          size={"m"}
          {...additionalArgs}
        />
      );
    }
    return null;
  }, [profileWithLimitReached, profiles]);
}
