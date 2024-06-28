import SkeletonEl from "src/components/New/Skeleton/Skeleton";

import { SectionLoading } from "components/layout/section/section.loading";

export async function AllEcosystemsLoading() {
  return (
    <SectionLoading>
      <div className="grid grid-cols-2 gap-3 py-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <SkeletonEl width="100%" height="auto" className="aspect-0.89/1" variant="rounded" />
        <SkeletonEl width="100%" height="auto" className="aspect-0.89/1" variant="rounded" />
        <SkeletonEl width="100%" height="auto" className="aspect-0.89/1" variant="rounded" />
        <SkeletonEl width="100%" height="auto" className="aspect-0.89/1" variant="rounded" />
      </div>
    </SectionLoading>
  );
}
