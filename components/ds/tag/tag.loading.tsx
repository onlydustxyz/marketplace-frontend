import { cn } from "src/utils/cn";
import { TagLoadingProps } from "@/components/ds/tag/tag.type.ts";
import SkeletonEl from "@/components/ds/Skeleton/Skeleton.tsx";

export function TagLoading({ className, skeletonProps, ...props }: TagLoadingProps) {
  return (
    <SkeletonEl
      height={
        props.size === "small" ? "28px" : props.size === "medium" ? "34px" : props.size === "large" ? "36px" : "28px"
      }
      width={
        props.size === "small" ? "61px" : props.size === "medium" ? "78px" : props.size === "large" ? "94px" : "61px"
      }
      variant="rounded"
      {...skeletonProps}
      className={cn("border-0", className)}
    />
  );
}

export default TagLoading;
