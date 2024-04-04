import { components } from "src/__generated/api";
import { UseGetBillingProfiles } from "src/api/BillingProfiles/queries";

import { TIcon } from "components/layout/icon/icon.types";

export namespace TUseBillingProfiles {
  export interface Return {
    data: UseGetBillingProfiles | undefined;
    profiles: {
      data: components["schemas"]["ShortBillingProfileResponse"];
      icon: TIcon.Props;
    }[];
    isLoading: boolean;
    hasIndividualProfile: boolean;
  }
}
