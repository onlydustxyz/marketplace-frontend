import { TUseSettingsError } from "./use-settings-error.types";

export const useSettingsError = (): TUseSettingsError.Return => {
  // TODO this is temp mock until backend handle billing profile validity for each one
  const isBillingError = false;
  const isLoading = false;
  const isBillingWarning = false;
  const user = {
    hasValidPayoutInfos: true,
  };

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
