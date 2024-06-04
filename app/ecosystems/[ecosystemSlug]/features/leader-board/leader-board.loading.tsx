import { SectionLoading } from "app/ecosystems/components/section/section.loading";

import { SkeletonEl } from "components/ds/skeleton/skeleton";

export function LeaderBoardLoading() {
  return (
    <SectionLoading>
      <div className="grid gap-4 lg:grid-cols-2">
        <SkeletonEl width="100%" height="466px" variant="rounded" />
        <SkeletonEl width="100%" height="466px" variant="rounded" />
      </div>
    </SectionLoading>
  );
}
