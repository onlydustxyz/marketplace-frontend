import { BillingProfilesTypes } from "src/api/BillingProfiles/type";

export namespace TBillingCreateStack {
  export interface Props {
    projectId?: string;
    redirectToProfile?: boolean;
  }

  export type Choice = BillingProfilesTypes.TYPE | "employee" | "";
}
