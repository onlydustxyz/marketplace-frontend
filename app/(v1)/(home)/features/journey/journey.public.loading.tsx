import styles from "app/(v1)/(home)/styles/styles.module.css";

import { cn } from "src/utils/cn";

import { SkeletonEl } from "components/ds/skeleton/skeleton";
import { SectionLoading } from "components/layout/section/section.loading";

export function JourneyPublicLoading() {
  return (
    <div className={cn("flex w-full flex-col gap-8", styles.areaJourney)}>
      <SectionLoading>
        <SkeletonEl width="100%" height="80px" variant="rounded" />
      </SectionLoading>
      <SectionLoading>
        <SkeletonEl width="100%" height="250px" variant="rounded" />
      </SectionLoading>
    </div>
  );
}
