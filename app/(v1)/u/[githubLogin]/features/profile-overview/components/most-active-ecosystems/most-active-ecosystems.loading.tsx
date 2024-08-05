import { SkeletonEl } from "components/ds/skeleton/skeleton";

export function MostActiveEcosystemsLoading() {
  return (
    <div className="flex w-full md:w-1/3">
      <div className="flex w-full flex-col gap-2">
        <SkeletonEl width="40%" height="16px" variant="text" />
        <div className="grid w-full gap-3 md:grid-cols-1 xl:grid-cols-2">
          <SkeletonEl width="100%" height="100px" variant="rounded" />
          <SkeletonEl width="100%" height="100px" variant="rounded" />
        </div>
      </div>
    </div>
  );
}
