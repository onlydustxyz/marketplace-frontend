import { SectionLoading } from "app/ecosystems/components/section/section.loading";

import { SkeletonEl } from "components/ds/skeleton/skeleton";

export function MoreProjectLoading() {
  return (
    <SectionLoading>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <SkeletonEl width="100%" height="400px" variant="rounded" />
        <SkeletonEl width="100%" height="400px" variant="rounded" />
        <SkeletonEl width="100%" height="400px" variant="rounded" />
      </div>
    </SectionLoading>
  );
}
