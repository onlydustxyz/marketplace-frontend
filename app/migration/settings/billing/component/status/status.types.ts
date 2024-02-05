import { UseBillingProfileResponse } from "src/api/me/billing/queries";

export namespace TStatus {
  export interface Props {
    status?: UseBillingProfileResponse["status"];
  }
}
