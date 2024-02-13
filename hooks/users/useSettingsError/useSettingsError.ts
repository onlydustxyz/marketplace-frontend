import MeApi from "src/api/me";

import { useBillingProfiles } from "../useBillingProfile/useBillingProfile";
import { useBillingStatus } from "../useBillingStatus/useBillingStatus";
import { TUseSettingsError } from "./useSettingsError.types";

export const useSettingsError = (): TUseSettingsError.Return => {
  const { data } = MeApi.queries.useGetMe({});

  const { validBillingProfile, billingProfile } = useBillingProfiles();
  const { isWarning: isBillingWarning, isError: isBillingError } = useBillingStatus({
    hasValidBillingProfile: validBillingProfile,
    status: billingProfile?.status,
  });

  const getError = (): TUseSettingsError.Return["error"] => {
    if (isBillingError) {
      return TUseSettingsError.ERRORS.BILLING_ERROR;
    }

    if (isBillingWarning) {
      return TUseSettingsError.ERRORS.BILLING_WARNING;
    }

    if (!data?.hasValidPayoutInfos) {
      return TUseSettingsError.ERRORS.PAYOUT;
    }

    return undefined;
  };

  const error = getError();

  return {
    error,
  };
};
