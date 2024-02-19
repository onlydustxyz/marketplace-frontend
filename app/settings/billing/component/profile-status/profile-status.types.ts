import { UseBillingProfileResponse } from "src/api/me/billing/queries";

export namespace TProfileStatus {
  export interface Props {
    status?: UseBillingProfileResponse["status"];
    hasValidBillingProfile: boolean;
  }
}
