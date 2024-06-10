import styles from "app/home/styles/styles.module.css";

import { cn } from "src/utils/cn";

import { SkeletonEl } from "components/ds/skeleton/skeleton";
import { SectionLoading } from "components/layout/section/section.loading";

export function LeadProjectsLoading() {
  return (
    <div className={cn("w-full", styles.areaLeadProjects)}>
      <SectionLoading>
        <div className="flex flex-row flex-wrap gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="w-full sm:w-[calc(50%_-_16px)] md:w-[calc(33%_-_16px)] lg:w-[calc(25%_-_16px)] xl:lg:w-[calc(20%_-_16px)]"
            >
              <SkeletonEl width="100%" height="218px" variant="rounded" />
            </div>
          ))}
        </div>
      </SectionLoading>
    </div>
  );
}
