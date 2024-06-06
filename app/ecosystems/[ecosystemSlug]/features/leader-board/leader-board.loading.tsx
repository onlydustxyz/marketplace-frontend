import { SkeletonEl } from "components/ds/skeleton/skeleton";
import { SectionLoading } from "components/layout/section/section.loading";

export function LeaderBoardLoading() {
  return (
    <SectionLoading>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <SkeletonEl width="100%" height="466px" variant="rounded" />
        <SkeletonEl width="100%" height="466px" variant="rounded" />
      </div>
    </SectionLoading>
  );
}
