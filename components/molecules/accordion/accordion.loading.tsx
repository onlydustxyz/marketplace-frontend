import { SkeletonEl } from "components/ds/skeleton/skeleton";

export function AccordionLoading({ width, height }: { width?: string; height?: string }) {
  return (
    <div
      className="flex flex-col gap-4"
      style={{
        width: width || "100%",
      }}
    >
      <SkeletonEl width="100%" height={40} className="rounded-lg" />

      <div className="flex flex-col gap-2">
        <SkeletonEl width="100%" height={height || 44} />
        <SkeletonEl width="100%" height={height || 44} />
        <SkeletonEl width="100%" height={height || 44} />
      </div>
    </div>
  );
}
