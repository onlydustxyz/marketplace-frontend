import { BillingProfilesTypes } from "src/api/BillingProfiles/type";

interface IGetSpecialIconColor {
  hasWarning?: boolean;
  hasError?: boolean;
}
export function getSpecialIconColor({ hasWarning, hasError }: IGetSpecialIconColor): BillingProfilesTypes.iconColor {
  if (hasError) {
    return "red";
  }
  if (hasWarning) {
    return "orange";
  }
  return "currentColor";
}
