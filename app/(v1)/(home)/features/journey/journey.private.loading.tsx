import styles from "app/(v1)/(home)/styles/styles.module.css";

import { SkeletonEl } from "components/ds/skeleton/skeleton";
import { SectionLoading } from "components/layout/section/section.loading";

export function JourneyPrivateLoading() {
  return (
    <div className={styles.areaJourney}>
      <SectionLoading>
        <SkeletonEl width="100%" height="300px" variant="rounded" />
      </SectionLoading>
    </div>
  );
}
