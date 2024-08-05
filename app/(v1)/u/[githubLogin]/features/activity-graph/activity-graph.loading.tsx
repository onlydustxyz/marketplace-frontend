import { SkeletonEl } from "components/ds/skeleton/skeleton";

export function ActivityGraphLoading() {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full flex-row items-center justify-between gap-1">
        <SkeletonEl width="50%" variant="rounded" height={32} />
        <SkeletonEl width="30%" variant="rounded" height={32} />
      </div>
      <SkeletonEl width="100%" variant="rounded" height={253} />
    </div>
  );
}
