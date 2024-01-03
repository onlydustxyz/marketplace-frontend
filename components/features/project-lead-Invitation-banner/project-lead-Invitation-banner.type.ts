import { ProjectLeadInvitationBannerVariants } from "@/components/features/project-lead-Invitation-banner/project-lead-Invitation-banner.variant.ts";

export interface ProjectLeadInvitationProps extends ProjectLeadInvitationBannerVariants {
  projectName: string;
  isLoading?: boolean;
  btnLabel?: string;
  onClick?: () => void;
  on?: "cards" | "page";
}
