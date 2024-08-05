import { SkeletonEl } from "components/ds/skeleton/skeleton";

export function MostActiveLanguagesLoading() {
  return (
    <div className="flex w-full flex-1">
      <div className="flex w-full flex-col gap-2">
        <SkeletonEl width="40%" height="16px" variant="text" />
        <div className="grid w-full grid-cols-2 gap-3 xl:grid-cols-4">
          <SkeletonEl width="100%" height="100px" variant="rounded" />
          <SkeletonEl width="100%" height="100px" variant="rounded" />
          <SkeletonEl width="100%" height="100px" variant="rounded" />
          <SkeletonEl width="100%" height="100px" variant="rounded" />
        </div>
      </div>
    </div>
  );
}
