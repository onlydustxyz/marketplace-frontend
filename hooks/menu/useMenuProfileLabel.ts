import { Key } from "src/hooks/useIntl";

import { useSettingsError } from "hooks/users/useSettingsError";

export interface UseMenuProfileLabelReturn {
  labelToken: Key;
}

export const useMenuProfileLabel = (): UseMenuProfileLabelReturn => {
  const { error } = useSettingsError();

  const getLabelToken = (): UseMenuProfileLabelReturn["labelToken"] => {
    switch (error) {
      case "BILLING_ERROR":
        return "v2.features.menu.profile.verificationError";
      case "BILLING_WARNING":
        return "v2.features.menu.profile.pendingVerification";
      case "PAYOUT":
        return "v2.features.menu.profile.missingPaymentMethods";
      default:
        return "v2.features.menu.profile.manage";
    }
  };

  const labelToken = getLabelToken();

  return {
    labelToken,
  };
};
