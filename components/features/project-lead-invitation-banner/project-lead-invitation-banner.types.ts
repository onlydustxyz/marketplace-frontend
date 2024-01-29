import { VariantProps } from "tailwind-variants";

import { projectLeadInvitationBannerVariants } from "components/features/project-lead-invitation-banner/project-lead-invitation-banner.variants";

export namespace TProjectLeadInvitationBanner {
  export type Variants = VariantProps<typeof projectLeadInvitationBannerVariants>;

  export interface Props extends Variants {
    projectName: string;
    isLoading?: boolean;
    btnLabelToken?: string;
    onClick?: () => void;
    on?: "cards" | "page";
  }
}
