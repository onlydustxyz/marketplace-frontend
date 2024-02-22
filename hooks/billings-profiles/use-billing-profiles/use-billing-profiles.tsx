import { useMemo } from "react";

import BillingProfilesApi from "src/api/BillingProfiles";
import { BillingProfileConstant } from "src/api/BillingProfiles/constant";

import { TUseBillingProfiles } from "./use-billing-profiles.types";

export const useBillingProfiles = (): TUseBillingProfiles.Return => {
  const { data, isLoading } = BillingProfilesApi.queries.useBillingProfiles({});

  const profiles = useMemo(() => {
    if (!data?.billingProfiles?.length) {
      return [];
    }

    return data.billingProfiles.map(profile => ({
      data: profile,
      icon: BillingProfileConstant.profileTypeMapping[profile.type].icon,
    }));
  }, [data]);

  return { data, isLoading, profiles };
};
