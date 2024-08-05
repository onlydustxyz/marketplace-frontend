import { SkeletonEl } from "components/ds/skeleton/skeleton";
import { SectionLoading } from "components/layout/section/section.loading";

import styles from "../../styles/styles.module.css";

export function ProfileLoading() {
  return (
    <div className={styles.areaProfile}>
      <SectionLoading>
        <SkeletonEl width="100%" height="188px" variant="rounded" />
      </SectionLoading>
    </div>
  );
}
