import styles from "app/(v1)/(home)/styles/styles.module.css";

import { SkeletonEl } from "components/ds/skeleton/skeleton";
import { SectionLoading } from "components/layout/section/section.loading";

export function TrendyProjectsLoading() {
  return (
    <div className={styles.areaTrendyProjects}>
      <SectionLoading>
        <SkeletonEl width="100%" height="302px" variant="rounded" />
      </SectionLoading>
    </div>
  );
}
