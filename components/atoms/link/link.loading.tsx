import { SkeletonEl } from "components/ds/skeleton/skeleton";

export function LinkLoading({ width, height }: { width?: string; height?: string }) {
  return <SkeletonEl variant="rounded" width={width || "100%"} height={height || 17} />;
}
