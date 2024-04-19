import { TAvatar } from "components/ds/avatar/avatar.types";

export namespace TContributorsAvatars {
  export interface ContributorProps {
    avatarUrl: string;
    githubUserId: number;
    login: string;
  }

  export interface Props {
    contributors: ContributorProps[];
    avatarProps: TAvatar.Variants;
    enableTooltip?: boolean;
  }
}
