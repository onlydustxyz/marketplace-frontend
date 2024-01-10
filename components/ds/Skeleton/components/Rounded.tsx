import { TSkeleton } from "../skeleton.types";
import { cn } from "src/utils/cn";
import { useBaseSkelletonStyle } from "../skeleton.hooks";

export function SkeletonRounded(props: TSkeleton.BaseProps) {
  const { baseClass, baseStyle } = useBaseSkelletonStyle(props);

  return <div className={cn(baseClass, "rounded-2xl", props.className)} style={baseStyle} />;
}
