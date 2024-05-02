import { components } from "src/__generated/api";
import { UseGetBillingProfiles } from "src/api/BillingProfiles/queries";

import { TIcon } from "components/layout/icon/icon.types";

export namespace TUseBillingProfiles {
  interface Overrides {
    icon: TIcon.Props | null;
    iconColor: "red" | "orange" | "currentColor";
    tagColor: "red" | "orange" | "grey";
  }
  export interface Return {
    data: UseGetBillingProfiles | undefined;
    profiles: {
      data: components["schemas"]["ShortBillingProfileResponse"];
      icon: TIcon.Props;
      overrides?: Overrides | null;
    }[];
    isLoading: boolean;
    hasIndividualProfile: boolean;
  }
}
