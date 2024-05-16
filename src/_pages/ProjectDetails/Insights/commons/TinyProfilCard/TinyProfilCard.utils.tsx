import { ReactElement } from "react";

import { ProfileCover } from "./TinyProfilCard.type";

const COVER_VALUES = Object.values(ProfileCover);
const MAX_COVER_INDEX = COVER_VALUES.length - 1;

const coverClasses: Record<ProfileCover, string> = {
  [ProfileCover.Blue]: "bg-profile-blue",
  [ProfileCover.Cyan]: "bg-profile-cyan",
  [ProfileCover.Magenta]: "bg-profile-magenta",
  [ProfileCover.Yellow]: "bg-profile-yellow",
};

function getCoverClass(cover: `${ProfileCover}`, username: string): string {
  // Random float between 0 and 1 based on username length
  const randomFloat = Math.abs(Math.sin(username.length));
  const randomIndex = Math.round(randomFloat * MAX_COVER_INDEX);
  const randomCover = COVER_VALUES[randomIndex];

  return coverClasses[cover] || coverClasses[randomCover];
}

function OptionalSection({
  condition,
  children,
  fallback,
  className,
}: {
  condition: boolean;
  children: ReactElement;
  fallback?: ReactElement;
  className?: string;
}) {
  if (condition) {
    return <div className={className}>{children}</div>;
  } else if (fallback) {
    return <div className={className}>{fallback}</div>;
  }
  return null;
}

export { getCoverClass, OptionalSection };
