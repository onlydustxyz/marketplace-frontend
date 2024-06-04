import { SkeletonEl } from "components/ds/skeleton/skeleton";

export function LeaderBoardTitleLoading() {
  return (
    <header className={"flex w-full items-center justify-between gap-4"}>
      <div className={"flex w-full items-center gap-2 text-greyscale-50"}>
        <SkeletonEl width="24px" height="24px" variant="rounded" />
        <SkeletonEl width="30%" height="16px" variant="rounded" />
      </div>
    </header>
  );
}
