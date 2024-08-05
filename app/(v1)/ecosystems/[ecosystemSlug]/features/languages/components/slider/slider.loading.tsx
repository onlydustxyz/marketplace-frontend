import { SkeletonEl } from "components/ds/skeleton/skeleton";

export function SliderLoading() {
  return (
    <div className="flex w-full flex-row items-center justify-start gap-3 overflow-hidden">
      <SkeletonEl width="calc(25%_-_12px)" height="70px" variant={"rounded"} />
      <SkeletonEl width="calc(25%_-_12px)" height="70px" variant={"rounded"} />
      <SkeletonEl width="calc(25%_-_12px)" height="70px" variant={"rounded"} />
      <SkeletonEl width="calc(25%_-_12px)" height="70px" variant={"rounded"} />
    </div>
  );
}
