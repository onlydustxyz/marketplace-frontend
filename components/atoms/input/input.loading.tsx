import { SkeletonEl } from "components/ds/skeleton/skeleton";

export function InputLoading({ width, height }: { width?: string; height?: string }) {
  return <SkeletonEl width={width || "100%"} height={height || 42} className="rounded-md" />;
}
