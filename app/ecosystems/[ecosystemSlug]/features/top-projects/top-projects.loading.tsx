import { SkeletonEl } from "components/ds/skeleton/skeleton";
import { SectionLoading } from "components/layout/section/section.loading";

export function TopProjectsLoading() {
  return (
    <SectionLoading>
      <div className="grid h-[146px] grid-cols-3 gap-4">
        <SkeletonEl width="100%" height="100%" variant="rounded" />
        <SkeletonEl width="100%" height="100%" variant="rounded" />
        <SkeletonEl width="100%" height="100%" variant="rounded" />
      </div>
    </SectionLoading>
  );
}
