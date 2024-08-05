import styles from "app/(v1)/(home)/styles/styles.module.css";

import { SkeletonEl } from "components/ds/skeleton/skeleton";
import { SectionLoading } from "components/layout/section/section.loading";

export function RewardsLoading() {
  return (
    <div className={styles.areaRewards}>
      <SectionLoading>
        <SkeletonEl width="100%" height="188px" variant="rounded" />
      </SectionLoading>
    </div>
  );
}
