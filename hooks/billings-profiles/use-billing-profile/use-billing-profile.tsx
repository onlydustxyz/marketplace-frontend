import { useMemo } from "react";

import BillingProfilesApi from "src/api/BillingProfiles";
import { BillingProfileConstant } from "src/api/BillingProfiles/constant";

import { TUseBillingProfile } from "./use-billing-profile.types";

export const useBillingProfileById = ({ id }: TUseBillingProfile.Props): TUseBillingProfile.Return => {
  const { data, isLoading } = BillingProfilesApi.queries.useGetBillingProfileById({
    params: {
      id,
    },
  });

  const profile = useMemo(() => {
    if (!data) {
      return undefined;
    }

    return {
      data: data,
      icon: BillingProfileConstant.profileTypeMapping[data.type].icon,
    };
  }, [data]);

  return { data, isLoading, profile };
};
