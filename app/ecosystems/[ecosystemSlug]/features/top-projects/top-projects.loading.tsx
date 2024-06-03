import { SectionLoading } from "app/ecosystems/components/section/section.loading";

import { SkeletonEl } from "components/ds/skeleton/skeleton";

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
