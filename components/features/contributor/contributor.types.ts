import { TAvatar } from "components/ds/avatar/avatar.types";
import { TTypography } from "components/layout/typography/typography.types";

export namespace TContributor {
  export interface Props {
    login: string;
    avatarUrl?: string | null;
    githubUserId: number;
    isRegistered: boolean;
    clickable?: boolean;
    className?: string;
    isYou?: boolean;
    hasPendingInvite?: boolean;
    typograhyVariant?: TTypography.Variants["variant"];
    avatarSize?: TAvatar.Variants["size"];
  }
}
