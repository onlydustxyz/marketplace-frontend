import { SkeletonEl } from "components/ds/skeleton/skeleton";
import { SectionLoading } from "components/layout/section/section.loading";

export function FeaturedProjectsLoading() {
  return (
    <SectionLoading>
      <div className={"grid h-[284px] grid-cols-5 gap-3"}>
        <SkeletonEl width="100%" height="100%" variant="rounded" />
        <SkeletonEl width="100%" height="100%" variant="rounded" />
        <SkeletonEl width="100%" height="100%" variant="rounded" />
        <SkeletonEl width="100%" height="100%" variant="rounded" />
        <SkeletonEl width="100%" height="100%" variant="rounded" />
      </div>
    </SectionLoading>
  );
}
