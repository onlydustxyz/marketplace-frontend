import { SkeletonEl } from "components/ds/skeleton/skeleton";

export function AccordionLoading({ width, height }: { width?: string; height?: string }) {
  return <SkeletonEl width={width || "100%"} height={height || 32} className="rounded-lg" />;
}
