import { useMemo } from "react";

import { NEXT_ROUTER } from "constants/router";

import { useBillingProfiles } from "hooks/billings-profiles/use-billing-profiles/use-billing-profiles";
import { useCurrentUser } from "hooks/users/use-current-user/use-current-user";

import { TUseMenu } from "./use-menu.types";

export const useMenu = (): TUseMenu.Return => {
  const { user } = useCurrentUser();
  const { profiles } = useBillingProfiles();

  const getWarningOrError = () => {
    const findWarning = (profiles || [])?.find(
      profile => profile.data?.missingPayoutInfo || profile.data?.missingVerification
    );
    const findError = (profiles || [])?.find(profile => profile.data?.verificationBlocked);

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
        error: true,
      };
    }

    if (warning) {
      return {
        labelToken: "v2.features.menu.profile.actionRequired",
        redirection: NEXT_ROUTER.settings.profile,
        errorColor: TUseMenu.ERROR_COLORS.WARNING,
        error: true,
      };
    }

    return {
      labelToken: "v2.features.menu.profile.manage",
      redirection: NEXT_ROUTER.settings.profile,
      errorColor: TUseMenu.ERROR_COLORS.DEFAULT,
    };
  }, [user, profiles]);
};
