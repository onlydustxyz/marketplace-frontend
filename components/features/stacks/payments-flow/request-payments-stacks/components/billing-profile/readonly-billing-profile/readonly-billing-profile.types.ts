import { UseGetBillingProfileById } from "src/api/BillingProfiles/queries";

export namespace TReadonlyBillingProfile {
  export interface Props {
    billingProfile: UseGetBillingProfileById;
  }
}
