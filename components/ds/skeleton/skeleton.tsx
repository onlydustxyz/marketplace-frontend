import { TSkeleton } from "./skeleton.types";
import { SkeletonCircular } from "./components/circular";
import { SkeletonRectangular } from "./components/rectangular";
import { SkeletonRounded } from "./components/rounded";

export function SkeletonEl({ variant = "rectangular", color = "blue", ...props }: TSkeleton.Props) {
  let Component = SkeletonRectangular;

  if (variant === "circular") {
    Component = SkeletonCircular;
  }

  if (variant === "rounded") {
    Component = SkeletonRounded;
  }

  return <Component {...props} color={color} />;
}
