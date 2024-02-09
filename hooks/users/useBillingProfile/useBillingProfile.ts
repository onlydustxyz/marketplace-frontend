import { useMemo } from "react";

import MeApi from "src/api/me";
import { MeTypes } from "src/api/me/types";

import { useCurrentUser } from "../useCurrentUser/useCurrentUser";
import { TUseBillingProfile } from "./useBillingProfile.types";

export const useBillingProfiles = (): TUseBillingProfile.Return => {
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
