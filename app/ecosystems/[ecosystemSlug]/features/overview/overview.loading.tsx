import SkeletonEl from "src/components/New/Skeleton/Skeleton";

export async function OverviewLoading() {
  return (
    <SkeletonEl
      width="100%"
      height="100%"
      variant="rounded"
      className="aspect-[2.16/1] md:aspect-[3.41/1] lg:aspect-[302/59]"
    />
  );
}
