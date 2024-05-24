import { SkeletonEl } from "components/ds/skeleton/skeleton";

export function CommitteeLoadingPage() {
  return (
    <div className={"m-auto w-full max-w-3xl"}>
      <SkeletonEl width={"100%"} height={318} variant={"rounded"} />
    </div>
  );
}
