import SkeletonEl from "src/components/New/Skeleton/Skeleton";

import { SectionLoading } from "components/layout/section/section.loading";

export async function FeaturedEcosystemsLoading() {
  return (
    <SectionLoading>
      <SkeletonEl width="100%" height="auto" className="aspect-2.16/1 sm:aspect-3.41/1" variant="rounded" />
    </SectionLoading>
  );
}
