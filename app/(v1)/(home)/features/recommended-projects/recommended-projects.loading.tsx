import styles from "app/(v1)/(home)/styles/styles.module.css";

import { SkeletonEl } from "components/ds/skeleton/skeleton";
import { SectionLoading } from "components/layout/section/section.loading";

export function RecommendedProjectsLoading() {
  return (
    <div className={styles.areaRecommendedProjects}>
      <SectionLoading>
        <SkeletonEl width="100%" height="484px" variant="rounded" />
      </SectionLoading>
    </div>
  );
}
