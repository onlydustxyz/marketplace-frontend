import { SkeletonBaseProps } from "../Skeleton.type";
import { cn } from "src/utils/cn";
import { useBaseSkelletonStyle } from "../Skeleton.hook";

export default function SkeletonRectangular(props: SkeletonBaseProps) {
  const { baseClass, baseStyle } = useBaseSkelletonStyle(props);

  return <div className={cn(baseClass, props.className)} style={baseStyle} />;
}
