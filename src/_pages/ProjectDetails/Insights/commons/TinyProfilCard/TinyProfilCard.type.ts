import { ReactElement } from "react-markdown/lib/react-markdown";

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
  bio?: ReactElement;
  location?: string;
  sinceDate?: Date;
  children?: ReactElement;
}
