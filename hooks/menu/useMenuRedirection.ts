import { NEXT_ROUTER } from "constants/router";

import { useSettingsError } from "hooks/users/useSettingsError";

export interface UseMenuRedirectionReturn {
  redirection: string;
}

export const useMenuRedirection = (): UseMenuRedirectionReturn => {
  const { error } = useSettingsError();

  const getRedirection = (): UseMenuRedirectionReturn["redirection"] => {
    if (error === "BILLING_ERROR" || error === "BILLING_WARNING") {
      return NEXT_ROUTER.settings.billing;
    }

    if (error === "PAYOUT") {
      return NEXT_ROUTER.settings.payout;
    }

    return NEXT_ROUTER.settings.profile;
  };

  const redirection = getRedirection();

  return {
    redirection,
  };
};
