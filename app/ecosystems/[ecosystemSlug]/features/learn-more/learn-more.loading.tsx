import { SkeletonEl } from "components/ds/skeleton/skeleton";
import { SectionLoading } from "components/layout/section/section.loading";

export async function LearnMoreLoading() {
  return (
    <SectionLoading>
      <div className="flex w-full flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
        <SkeletonEl width="50%" height="100%" variant="rounded" className="aspect-16/9" />
        <div className="flex w-1/2 flex-col items-start justify-between gap-4">
          <SkeletonEl width="75%" height="24px" variant="rounded" />
          <div className="flex w-full flex-col items-start gap-2">
            <SkeletonEl width="100%" height="12px" variant="rounded" />
            <SkeletonEl width="95%" height="12px" variant="rounded" />
            <SkeletonEl width="90%" height="12px" variant="rounded" />
          </div>
          <div className="mt-2">
            <SkeletonEl width="100px" height="36px" />
          </div>
        </div>
      </div>
    </SectionLoading>
  );
}
