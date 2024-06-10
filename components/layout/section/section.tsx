import { cn } from "src/utils/cn";

import { SectionHeader } from "components/layout/section/components/section-header/section-header";
import { TSection } from "components/layout/section/section.types";

export function Section({ children, classNames, ...restProps }: TSection.Props) {
  return (
    <section className={cn("flex flex-col gap-4", classNames?.section)}>
      <SectionHeader {...restProps} />
      <div className={cn("relative h-full", classNames?.content)}>{children}</div>
    </section>
  );
}
