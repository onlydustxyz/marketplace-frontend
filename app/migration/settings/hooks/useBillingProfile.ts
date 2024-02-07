import { useCurrentUser } from "hooks/users/useCurrentUser";
import { useMemo } from "react";

import MeApi from "src/api/me";
import { UseBillingProfileResponse } from "src/api/me/billing/queries";
import { UseGetUserMeResponse } from "src/api/me/queries";
import { MeTypes } from "src/api/me/types";

export interface UseBillingStatus {
  billingProfile: UseBillingProfileResponse | undefined;
  user: UseGetUserMeResponse | undefined;
  profileType: MeTypes.billingProfileType;
  isIndividual: boolean;
  isCompany: boolean;
  validBillingProfile: boolean;
}
export const useBillingProfiles = (): UseBillingStatus => {
  const { user } = useCurrentUser();
  const { data } = MeApi.billing.queries.useBillingProfile({
    params: { profile: user?.billingProfileType },
  });

  const profileType = useMemo(() => {
    if (user?.billingProfileType) {
      return user?.billingProfileType as MeTypes.billingProfileType;
    }
    return MeTypes.billingProfileType.Individual;
  }, [user]);

  const isIndividual = useMemo(() => profileType === MeTypes.billingProfileType.Individual, [profileType]);
  const isCompany = useMemo(() => profileType === MeTypes.billingProfileType.Company, [profileType]);

  return {
    user,
    billingProfile: data,
    validBillingProfile: user?.hasValidBillingProfile || false,
    profileType,
    isIndividual,
    isCompany,
  };
};
