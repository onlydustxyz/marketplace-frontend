import { SkeletonEl } from "components/ds/skeleton/skeleton";

export function ApplyIssueDrawerLoading() {
  return (
    <div className={"grid gap-4"}>
      <SkeletonEl width={"50%"} height={32} variant={"rounded"} />

      <div className={"grid grid-cols-6 gap-4"}>
        <SkeletonEl width={"auto"} height={84} className={"col-span-3"} variant={"rounded"} />
        <SkeletonEl width={"auto"} height={84} className={"col-span-3"} variant={"rounded"} />

        <SkeletonEl width={"auto"} height={84} className={"col-span-2"} variant={"rounded"} />

        <SkeletonEl width={"auto"} height={300} className={"col-span-full"} variant={"rounded"} />
      </div>
    </div>
  );
}
