import { NEXT_ROUTER } from "constants/router";

import { useSettingsError } from "hooks/users/use-settings-error/use-settings-error";
import { TUseSettingsError } from "hooks/users/use-settings-error/use-settings-error.types";

import { TUseMenu } from "./use-menu.types";

export const useMenu = (): TUseMenu.Return => {
  const { error, isBillingError, isBillingWarning } = useSettingsError();

  switch (error) {
    case TUseSettingsError.ERRORS.BILLING_ERROR:
      return {
        labelToken: "v2.features.menu.profile.verificationError",
        redirection: NEXT_ROUTER.settings.billing,
        errorColor: TUseMenu.ERROR_COLORS.ERROR,
        error,
        isBillingError,
        isBillingWarning,
      };
    case TUseSettingsError.ERRORS.BILLING_WARNING:
      return {
        labelToken: "v2.features.menu.profile.pendingVerification",
        redirection: NEXT_ROUTER.settings.billing,
        errorColor: TUseMenu.ERROR_COLORS.WARNING,
        error,
        isBillingError,
        isBillingWarning,
      };
    case TUseSettingsError.ERRORS.PAYOUT:
      return {
        labelToken: "v2.features.menu.profile.missingPaymentMethods",
        redirection: NEXT_ROUTER.settings.payout,
        errorColor: TUseMenu.ERROR_COLORS.WARNING,
        error,
        isBillingError,
        isBillingWarning,
      };

    default:
      return {
        labelToken: "v2.features.menu.profile.manage",
        redirection: NEXT_ROUTER.settings.profile,
        errorColor: TUseMenu.ERROR_COLORS.DEFAULT,
        error,
        isBillingError,
        isBillingWarning,
      };
  }
};
