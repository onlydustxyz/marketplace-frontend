import { useBillingProfiles } from "../useBillingProfile/useBillingProfile";
import { useBillingStatus } from "../useBillingStatus/useBillingStatus";
import { TUseSettingsError } from "./useSettingsError.types";

export const useSettingsError = (): TUseSettingsError.Return => {
  const { validBillingProfile, billingProfile, user, isLoading } = useBillingProfiles();
  const { isWarning: isBillingWarning, isError: isBillingError } = useBillingStatus({
    hasValidBillingProfile: validBillingProfile,
    status: billingProfile?.status,
  });

  const getError = (): TUseSettingsError.Return["error"] => {
    if (isBillingError && !isLoading) {
      return TUseSettingsError.ERRORS.BILLING_ERROR;
    }

    if (isBillingWarning && !isLoading) {
      return TUseSettingsError.ERRORS.BILLING_WARNING;
    }

    if (!user?.hasValidPayoutInfos) {
      return TUseSettingsError.ERRORS.PAYOUT;
    }

    return undefined;
  };

  const error = getError();

  return {
    error,
  };
};
