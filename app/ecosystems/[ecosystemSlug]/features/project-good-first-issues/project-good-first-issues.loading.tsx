import { SectionLoading } from "app/ecosystems/components/section/section.loading";

import { SkeletonEl } from "components/ds/skeleton/skeleton";

export function ProjectGoodFirstIssuesLoading() {
  return (
    <SectionLoading>
      <SkeletonEl width="100%" height="224px" variant="rounded" />
    </SectionLoading>
  );
}
