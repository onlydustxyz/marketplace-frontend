import styles from "app/(v1)/(home)/styles/styles.module.css";

import { cn } from "src/utils/cn";

import { SkeletonEl } from "components/ds/skeleton/skeleton";
import { SectionLoading } from "components/layout/section/section.loading";

export function LeadProjectsLoading() {
  return (
    <div className={cn("w-full", styles.areaLeadProjects)}>
      <SectionLoading>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-full">
              <SkeletonEl width="100%" height="218px" variant="rounded" />
            </div>
          ))}
        </div>
      </SectionLoading>
    </div>
  );
}
