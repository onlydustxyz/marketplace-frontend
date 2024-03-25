import { useMemo } from "react";

import { BillingProfileConstant } from "src/api/BillingProfiles/constant";
import { BillingProfilesTypes } from "src/api/BillingProfiles/type";
import BillingApi from "src/api/me/billing";

import { TUseBillingProfiles } from "./use-billing-profiles.types";

export const useBillingProfiles = (): TUseBillingProfiles.Return => {
  const { data, isLoading } = BillingApi.queries.useAllBillingProfiles({});

  const profiles = useMemo(() => {
    if (!data?.billingProfiles?.length) {
      return [];
    }

    return data.billingProfiles.map(profile => ({
      data: profile,
      icon: BillingProfileConstant.profileTypeMapping[profile.type].icon,
    }));
  }, [data]);

  const hasIndividualProfile = useMemo(() => {
    return profiles.some(profile => profile.data.type === BillingProfilesTypes.type.Individual);
  }, [profiles]);

  return { data, isLoading, profiles, hasIndividualProfile };
};
