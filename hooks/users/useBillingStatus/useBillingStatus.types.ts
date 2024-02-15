import { MeBillingConstants } from "src/api/me/billing/constant";
import { UseBillingProfileResponse } from "src/api/me/billing/queries";

export namespace TUseBillingStatus {
  export interface Props {
    hasValidBillingProfile: boolean;
    status?: UseBillingProfileResponse["status"];
  }

  export interface Return {
    statusMapping?: typeof MeBillingConstants.statusMapping["CLOSED"];
    isWarning: boolean;
    isError: boolean;
    isSuccess: boolean;
    isRainbow: boolean;
  }
}
