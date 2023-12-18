import { SkeletonProps } from "./Skeleton.type";
import SkeletonCircular from "./components/Circular";
import SkeletonRectangular from "./components/Rectangular";
import SkeletonRounded from "./components/Rounded";

export default function SkeletonEl({ variant = "rectangular", color = "blue", ...props }: SkeletonProps) {
  switch (variant) {
    case "rectangular":
      return <SkeletonRectangular {...props} color={color} />;
    case "circular":
      return <SkeletonCircular {...props} color={color} />;
    case "rounded":
      return <SkeletonRounded {...props} color={color} />;
    default:
      return null;
  }
}
