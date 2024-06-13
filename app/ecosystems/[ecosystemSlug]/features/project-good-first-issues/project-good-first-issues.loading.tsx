import { SkeletonEl } from "components/ds/skeleton/skeleton";
import { SectionLoading } from "components/layout/section/section.loading";

export function ProjectGoodFirstIssuesLoading() {
  return (
    <SectionLoading>
      <SkeletonEl width="100%" height="224px" variant="rounded" />
    </SectionLoading>
  );
}
