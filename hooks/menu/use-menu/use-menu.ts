import { useMemo } from "react";

import { NEXT_ROUTER } from "constants/router";

import { useCurrentUser } from "hooks/users/use-current-user/use-current-user";

import { TUseMenu } from "./use-menu.types";

export const useMenu = (): TUseMenu.Return => {
  const { user } = useCurrentUser();

  const getWarningOrError = () => {
    const findWarning = (user?.billingProfiles || [])?.find(
      profile => profile.missingPayoutInfo || profile.missingVerification
    );
    const findError = (user?.billingProfiles || [])?.find(profile => profile.verificationBlocked);

    return {
      warning: !!findWarning || user?.missingPayoutPreference,
      error: !!findError,
    };
  };

  return useMemo(() => {
    const { warning, error } = getWarningOrError();

    if (error) {
      return {
        labelToken: "v2.features.menu.profile.contactUs",
        redirection: NEXT_ROUTER.settings.profile,
        errorColor: TUseMenu.ERROR_COLORS.ERROR,
        isBillingError: true,
      };
    }

    if (warning) {
      return {
        labelToken: "v2.features.menu.profile.actionRequired",
        redirection: NEXT_ROUTER.settings.profile,
        errorColor: TUseMenu.ERROR_COLORS.WARNING,
        isBillingError: true,
      };
    }

    return {
      labelToken: "v2.features.menu.profile.manage",
      redirection: NEXT_ROUTER.settings.profile,
      errorColor: TUseMenu.ERROR_COLORS.DEFAULT,
    };
  }, [user]);
};
