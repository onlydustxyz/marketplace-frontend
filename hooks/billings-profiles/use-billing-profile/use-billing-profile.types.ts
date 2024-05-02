import { VariantProps } from "tailwind-variants";

import { UseGetBillingProfileById } from "src/api/BillingProfiles/queries";
import { BillingProfilesTypes } from "src/api/BillingProfiles/type";

import { tagVariants } from "components/ds/tag/tag.variants";
import { TIcon } from "components/layout/icon/icon.types";

export namespace TUseBillingProfile {
  export interface Props {
    id?: string;
    enabledPooling?: boolean;
  }

  interface Overrides {
    icon: TIcon.Props;
    iconColor: BillingProfilesTypes.iconColor;
    tagColor: VariantProps<typeof tagVariants>["borderColor"];
  }
  export interface Return {
    data: UseGetBillingProfileById | undefined;
    profile:
      | {
          data: UseGetBillingProfileById;
          icon: TIcon.Props;
          overrides: Overrides;
          status: BillingProfilesTypes.status;
          externalId: string | undefined;
        }
      | undefined;
    isLoading: boolean;
    refetch: () => void;
  }
}
