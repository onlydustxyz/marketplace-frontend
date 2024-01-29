import React from "react";

import { cn } from "src/utils/cn";

import { useBaseSkelletonStyle } from "../Skeleton.hook";
import { SkeletonBaseProps } from "../Skeleton.type";

export default function SkeletonRounded(props: SkeletonBaseProps) {
  const { baseClass, baseStyle } = useBaseSkelletonStyle(props);

  return <div className={cn(baseClass, "rounded-2xl", props.className)} style={baseStyle} />;
}
