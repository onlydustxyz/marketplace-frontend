export enum ProfileCover {
  Blue = "BLUE",
  Cyan = "CYAN",
  Magenta = "MAGENTA",
  Yellow = "YELLOW",
}

export interface Props {
  cover?: `${ProfileCover}`;
  avatarUrl: string;
  name: string;
  isRegistered?: boolean;
  actionLabel?: string;
  onAction?: () => void;
  bio?: string;
  location?: string;
  sinceDate?: Date;
  children?: React.ReactNode;
}
