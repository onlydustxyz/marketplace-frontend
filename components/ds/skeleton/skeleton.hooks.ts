import { CSSProperties } from "react";

import { cn } from "src/utils/cn";

import { TSkeleton } from "./skeleton.types";

export function useBaseSkelletonStyle({ width, height, color, radius }: TSkeleton.BaseProps) {
  const className = cn("w-full animate-pulse", {
    "bg-greyscale-800": color === "grey",
    "bg-spaceBlue-800": color === "blue",
    "bg-spaceBlue-700": color === "blue-700",
    "bg-spaceBlue-600": color === "blue-600",
  });

  const style: CSSProperties = {
    minWidth: width || "100%",
    minHeight: height || "1rem",
    maxWidth: "100%",
    maxHeight: "100%",
    width: width || "100%",
    height: height || "1rem",
    ...(radius ? { borderRadius: radius } : {}),
  };

  return { baseClass: className, baseStyle: style };
}
