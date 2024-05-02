import { VariantProps } from "tailwind-variants";

import { components } from "src/__generated/api";
import { UseGetBillingProfiles } from "src/api/BillingProfiles/queries";
import { BillingProfilesTypes } from "src/api/BillingProfiles/type";

import { tagVariants } from "components/ds/tag/tag.variants";
import { TIcon } from "components/layout/icon/icon.types";

export namespace TUseBillingProfiles {
  interface Overrides {
    icon: TIcon.Props;
    iconColor: BillingProfilesTypes.iconColor;
    tagColor: VariantProps<typeof tagVariants>["borderColor"];
  }
  export interface Return {
    data: UseGetBillingProfiles | undefined;
    profiles: {
      data: components["schemas"]["ShortBillingProfileResponse"];
      icon: TIcon.Props;
      overrides: Overrides;
    }[];
    isLoading: boolean;
    hasIndividualProfile: boolean;
  }
}
