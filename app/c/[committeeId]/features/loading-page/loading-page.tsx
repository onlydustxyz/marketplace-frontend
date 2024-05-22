import { SkeletonEl } from "components/ds/skeleton/skeleton";

export function CommitteeLoadingPage() {
  return (
    <div className="m-auto flex items-center justify-center">
      <div className="px-6 py-12">
        <div className={"mx-auto w-screen max-w-3xl"}>
          <SkeletonEl width={"100%"} height={318} variant={"rounded"} />
        </div>
      </div>
    </div>
  );
}
