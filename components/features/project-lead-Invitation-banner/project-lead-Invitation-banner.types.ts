import { projectLeadInvitationBannerVariants } from "components/features/project-lead-Invitation-banner/project-lead-Invitation-banner.variants";
import { VariantProps } from "tailwind-variants";

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
