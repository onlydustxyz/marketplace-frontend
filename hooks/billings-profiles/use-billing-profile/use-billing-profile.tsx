import { useEffect, useMemo } from "react";

import BillingProfilesApi from "src/api/BillingProfiles";
import { BillingProfileConstant } from "src/api/BillingProfiles/constant";
import { usePooling } from "src/hooks/usePooling/usePooling";

import { TUseBillingProfile } from "./use-billing-profile.types";

export const useBillingProfileById = ({ id, enabledPooling }: TUseBillingProfile.Props): TUseBillingProfile.Return => {
  const { refetchOnWindowFocus, refetchInterval, onRefetching, resetPooling } = usePooling({
    limites: 6,
    delays: 5000,
  });

  const { data, isLoading, isRefetching, refetch } = BillingProfilesApi.queries.useGetBillingProfileById({
    params: {
      id,
    },
    ...(enabledPooling ? { options: { refetchOnWindowFocus, refetchInterval } } : {}),
  });

  useEffect(() => {
    onRefetching(isRefetching);
  }, [isRefetching]);

  const externalId: string | undefined = useMemo(() => {
    if (data?.kyc?.id) {
      return data.kyc.id;
    }

    if (data?.kyb?.id) {
      return data.kyb.id;
    }

    return undefined;
  }, [data]);

  const profile = useMemo(() => {
    if (!data) {
      return undefined;
    }

    return {
      data,
      icon: BillingProfileConstant.profileTypeMapping[data.type].icon,
      status: data.status,
      externalId,
    };
  }, [data, externalId]);

  async function refetchBilling() {
    await refetch();
    resetPooling();
  }

  return { data, isLoading, profile, refetch: refetchBilling };
};
