import { SectionLoading } from "app/ecosystems/components/section/section.loading";

import SkeletonEl from "src/components/New/Skeleton/Skeleton";

import { Container } from "components/layout/container/container";

export default async function EcosystemsListLoading() {
  return (
    <div className="flex flex-col gap-10 py-8">
      <Container>
        <SkeletonEl width="30%" height="24px" variant="rounded" />
      </Container>
      <SectionLoading>
        <SkeletonEl width="100%" height="auto" className="aspect-[3.41/1]" variant="rounded" />
      </SectionLoading>
      <SectionLoading>
        <div className="grid grid-cols-2 gap-3 py-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <SkeletonEl width="100%" height="auto" className="aspect-[0.89/1]" variant="rounded" />
          <SkeletonEl width="100%" height="auto" className="aspect-[0.89/1]" variant="rounded" />
          <SkeletonEl width="100%" height="auto" className="aspect-[0.89/1]" variant="rounded" />
          <SkeletonEl width="100%" height="auto" className="aspect-[0.89/1]" variant="rounded" />
        </div>
      </SectionLoading>
    </div>
  );
}
