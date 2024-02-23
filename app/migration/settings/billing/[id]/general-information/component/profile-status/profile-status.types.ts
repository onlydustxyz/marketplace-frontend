import { BillingProfilesTypes } from "src/api/BillingProfiles/type";

export namespace TProfileStatus {
  export interface Props {
    status?: BillingProfilesTypes.status;
    hasValidBillingProfile: boolean;
  }
}
