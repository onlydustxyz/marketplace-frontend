export type ContributorProps = {
  login: string;
  avatarUrl?: string | null;
  githubUserId: number;
  isRegistered: boolean;
  clickable?: boolean;
  className?: string;
};
