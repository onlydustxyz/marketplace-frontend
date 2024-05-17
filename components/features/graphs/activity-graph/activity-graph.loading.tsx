import { SkeletonEl } from "components/ds/skeleton/skeleton";

export function ActivityGraphLoading() {
  return (
    <div className="flex w-full flex-col items-start justify-start gap-1.5">
      {Array.from({ length: 7 }, (_, indexRow) => (
        <div key={`row-${indexRow}`} className="flex w-full flex-row items-center justify-between gap-4">
          <div className="flex w-full flex-row items-center justify-start gap-1.5">
            {Array.from({ length: 8 }, (_, indexWeek) => (
              <SkeletonEl key={`week-${indexRow}-${indexWeek}`} width={24} height={24} className="rounded-[2px]" />
            ))}
          </div>
          {indexRow % 2 !== 1 ? <SkeletonEl variant="rounded" width="30%" height={16} /> : <div />}
        </div>
      ))}
    </div>
  );
}
