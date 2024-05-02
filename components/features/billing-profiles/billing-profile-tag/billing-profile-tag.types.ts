import { VariantProps } from "tailwind-variants";

import { BillingProfilesTypes } from "src/api/BillingProfiles/type";

import { tagVariants } from "components/ds/tag/tag.variants";
import { TIcon } from "components/layout/icon/icon.types";

export namespace TBillingProfileTag {
  export interface Props {
    fallback?: string;
    profile?: {
      name: string;
      icon: TIcon.Props;
      iconColor: BillingProfilesTypes.iconColor;
      tagColor: VariantProps<typeof tagVariants>["borderColor"];
      id: string;
    };
  }
}
