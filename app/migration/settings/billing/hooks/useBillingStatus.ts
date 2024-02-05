import { MeBillingConstants } from "src/api/me/billing/constant";
import { UseBillingProfileResponse } from "src/api/me/billing/queries";

export const useBillingStatus = (status?: UseBillingProfileResponse["status"]) => {
  if (!status) {
    return {
      statusMapping: undefined,
      isWarning: false,
      isError: false,
      isSuccess: false,
    };
  }

  const statusMapping = MeBillingConstants.statusMapping[status];
  const isWarning = statusMapping.type === "warning";
  const isError = statusMapping.type === "error";
  const isSuccess = statusMapping.type === "success";

  return {
    statusMapping,
    isWarning,
    isError,
    isSuccess,
  };
};
