import { ReactElement } from "react";

import { ProfileCover } from "./TinyProfilCard.type";

function getCoverClass(cover: `${ProfileCover}`): string {
  const coverClasses: Record<ProfileCover, string> = {
    [ProfileCover.Blue]: "bg-profile-blue",
    [ProfileCover.Cyan]: "bg-profile-cyan",
    [ProfileCover.Magenta]: "bg-profile-magenta",
    [ProfileCover.Yellow]: "bg-profile-yellow",
  };
  return coverClasses[cover] || coverClasses[ProfileCover.Blue];
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
