import { useBillingProfiles } from "../useBillingProfile/useBillingProfile";
import { useBillingStatus } from "../useBillingStatus/useBillingStatus";
import { TUseSettingsError } from "./useSettingsError.types";

export const useSettingsError = (): TUseSettingsError.Return => {
  const { validBillingProfile, billingProfile, user } = useBillingProfiles();
  const { isWarning: isBillingWarning, isError: isBillingError } = useBillingStatus({
    hasValidBillingProfile: validBillingProfile,
    status: billingProfile?.status,
  });

  const getError = (): TUseSettingsError.Return["error"] => {
    // Need to wait for billing profile to be fetched before we can determine if there's an error
    if (!billingProfile) {
      return undefined;
    }

    if (isBillingError) {
      return TUseSettingsError.ERRORS.BILLING_ERROR;
    }

    if (isBillingWarning) {
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
