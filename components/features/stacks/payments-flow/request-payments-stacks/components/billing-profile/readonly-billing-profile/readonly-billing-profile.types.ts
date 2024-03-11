import { BillingProfilesTypes } from "src/api/BillingProfiles/type";

export namespace TReadonlyBillingProfile {
  export interface Props {
    billingProfile: BillingProfilesTypes.BillingProfile;
  }
}
