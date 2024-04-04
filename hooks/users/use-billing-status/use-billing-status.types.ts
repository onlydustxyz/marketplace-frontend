import { UseGetBillingProfileById } from "src/api/BillingProfiles/queries";
import { MeBillingConstants } from "src/api/me/billing/constant";

export namespace TUseBillingStatus {
  export interface Props {
    hasValidBillingProfile: boolean;
    status?: UseGetBillingProfileById["status"];
  }

  export interface Return {
    statusMapping?: typeof MeBillingConstants.statusMapping["CLOSED"];
    isWarning: boolean;
    isError: boolean;
    isSuccess: boolean;
    isRainbow: boolean;
  }
}
