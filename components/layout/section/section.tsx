import { ComponentProps, PropsWithChildren } from "react";

import { SectionHeader } from "components/layout/section/components/section-header/section-header";

export function Section({ children, ...restProps }: PropsWithChildren<ComponentProps<typeof SectionHeader>>) {
  return (
    <section className="flex flex-col gap-4">
      <SectionHeader {...restProps} />
      <div className="relative">{children}</div>
    </section>
  );
}
