import { SkeletonCircular } from "./components/circular";
import { SkeletonRectangular } from "./components/rectangular";
import { SkeletonRounded } from "./components/rounded";
import { TSkeleton } from "./skeleton.types";

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
