import { useBillingProfiles } from "../use-billing-profile/use-billing-profile";
import { useBillingStatus } from "../use-billing-status/use-billing-status";
import { TUseSettingsError } from "./use-settings-error.types";

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
    isBillingWarning,
    isBillingError,
  };
};
