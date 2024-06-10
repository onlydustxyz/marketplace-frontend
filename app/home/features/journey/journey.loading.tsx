import styles from "app/home/styles/styles.module.css";

import { SkeletonEl } from "components/ds/skeleton/skeleton";
import { SectionLoading } from "components/layout/section/section.loading";

export function JourneyLoading() {
  return (
    <div className={styles.areaRewards}>
      <SectionLoading>
        <SkeletonEl width="100%" height="300px" variant="rounded" />
      </SectionLoading>
    </div>
  );
}
