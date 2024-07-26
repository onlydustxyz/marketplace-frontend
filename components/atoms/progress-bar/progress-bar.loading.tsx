import { SkeletonEl } from "components/ds/skeleton/skeleton";

export function ProgressBarLoading({
  width = "100%",
  height = 8,
}: {
  width?: string | number;
  height?: string | number;
}) {
  return <SkeletonEl variant="rounded" width={width} height={height} />;
}
