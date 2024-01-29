import { cn } from "src/utils/cn";

import { useBaseSkelletonStyle } from "../skeleton.hooks";
import { TSkeleton } from "../skeleton.types";

export function SkeletonCircular(props: TSkeleton.BaseProps) {
  const { baseClass, baseStyle } = useBaseSkelletonStyle(props);

  return <div className={cn(baseClass, "rounded-full", props.className)} style={baseStyle} />;
}
