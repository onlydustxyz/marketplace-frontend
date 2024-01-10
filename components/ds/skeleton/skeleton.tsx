import { TSkeleton } from "./skeleton.types";
import { SkeletonCircular } from "./components/circular";
import { SkeletonRectangular } from "./components/rectangular";
import { SkeletonRounded } from "./components/rounded";

export function SkeletonEl({ variant = "rectangular", color = "blue", ...props }: TSkeleton.Props) {
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
