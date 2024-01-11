import { CSSProperties } from "react";

import { cn } from "src/utils/cn";

import { SkeletonBaseProps } from "./Skeleton.type";

export const useBaseSkelletonStyle = ({ width, height, color, radius }: SkeletonBaseProps) => {
  const className = cn("w-full animate-pulse", {
    "bg-greyscale-800": color === "grey",
    "bg-spaceBlue-800": color === "blue",
  });
  const style: CSSProperties = {
    minWidth: width || "100%",
    minHeight: height || 16,
    maxWidth: "100%",
    maxHeight: "100%",
    width: width || "100%",
    height: height || 16,
    ...(radius ? { borderRadius: radius } : {}),
  };

  return { baseClass: className, baseStyle: style };
};
