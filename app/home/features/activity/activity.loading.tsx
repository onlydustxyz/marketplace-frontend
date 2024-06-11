import { cn } from "src/utils/cn";

import { SkeletonEl } from "components/ds/skeleton/skeleton";
import { SectionLoading } from "components/layout/section/section.loading";

import styles from "../../styles/styles.module.css";

export function ActivityLoading() {
  return (
    <div className={cn("w-full", styles.areaActivity)}>
      <SectionLoading>
        <SkeletonEl width="100%" height="404px" variant="rounded" />
      </SectionLoading>
    </div>
  );
}
