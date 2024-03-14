export namespace TContributor {
  export interface Props {
    login: string;
    avatarUrl?: string | null;
    githubUserId: number;
    isRegistered: boolean;
    clickable?: boolean;
    className?: string;
    isYou?: boolean;
    hasPenhdingInvite?: boolean;
  }
}
