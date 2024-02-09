import MeApi from "src/api/me";

import { useBillingProfiles } from "./useBillingProfile";
import { useBillingStatus } from "./useBillingStatus";

export interface UseSettingsErrorReturn {
  error?: "BILLING_ERROR" | "BILLING_WARNING" | "PAYOUT";
}

export const useSettingsError = (): UseSettingsErrorReturn => {
  const { data } = MeApi.queries.useGetMe({});

  const { validBillingProfile, billingProfile } = useBillingProfiles();
  const { isWarning: isBillingWarning, isError: isBillingError } = useBillingStatus(
    validBillingProfile,
    billingProfile?.status
  );

  const getError = (): UseSettingsErrorReturn["error"] => {
    if (isBillingError) {
      return "BILLING_ERROR";
    }

    if (isBillingWarning) {
      return "BILLING_WARNING";
    }

    if (!data?.hasValidPayoutInfos) {
      return "PAYOUT";
    }

    return undefined;
  };

  const error = getError();

  return {
    error,
  };
};
