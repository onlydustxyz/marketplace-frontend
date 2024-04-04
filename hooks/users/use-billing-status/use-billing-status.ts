import { BillingProfileConstant } from "src/api/BillingProfiles/constant";

import { TUseBillingStatus } from "./use-billing-status.types";

export const useBillingStatus = ({
  hasValidBillingProfile,
  status,
}: TUseBillingStatus.Props): TUseBillingStatus.Return => {
  if (!status) {
    return {
      statusMapping: undefined,
      isWarning: false,
      isError: false,
      isSuccess: false,
      isRainbow: false,
    };
  }

  const statusMapping = BillingProfileConstant.statusMapping[status];
  const isWarning = statusMapping.type === "warning" && !hasValidBillingProfile;
  const isRainbow = statusMapping.type === "warning" && hasValidBillingProfile;
  const isError = statusMapping.type === "error";
  const isSuccess = statusMapping.type === "success";

  return {
    statusMapping,
    isRainbow,
    isWarning,
    isError,
    isSuccess,
  };
};
