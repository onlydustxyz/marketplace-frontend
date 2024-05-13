import { BillingProfileConstant } from "src/api/BillingProfiles/constant";
import { BillingProfilesTypes } from "src/api/BillingProfiles/type";

import { TIcon } from "components/layout/icon/icon.types";

interface IGetSpecialIconName {
  hasWarning?: boolean;
  hasError?: boolean;
  role?: string;
  enabled?: boolean;
  type: BillingProfilesTypes.typeUnion;
}

export function getSpecialIconName({
  hasWarning,
  hasError,
  role,
  enabled = true,
  type,
}: IGetSpecialIconName): TIcon.Props {
  if (!enabled) {
    return { remixName: "ri-forbid-2-line" };
  }
  if (hasWarning || hasError) {
    return { remixName: "ri-error-warning-line" };
  }
  if (role === "MEMBER") {
    return { remixName: "ri-team-line" };
  }
  return BillingProfileConstant.profileTypeMapping[type].icon;
}
