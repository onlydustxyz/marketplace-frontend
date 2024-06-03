import { SectionLoading } from "app/ecosystems/components/section/section.loading";

import SkeletonEl from "src/components/New/Skeleton/Skeleton";

export async function FeaturedEcosystemsLoading() {
  return (
    <SectionLoading>
      <SkeletonEl width="100%" height="auto" className="aspect-[3.41/1]" variant="rounded" />
    </SectionLoading>
  );
}
