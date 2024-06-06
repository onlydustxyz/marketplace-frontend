import { ComponentProps, PropsWithChildren } from "react";

import { Container } from "components/layout/container/container";
import { SectionHeader } from "components/layout/section/components/section-header/section-header";

export function Section({
  children,
  hasPadding = true,
  ...restProps
}: PropsWithChildren<ComponentProps<typeof SectionHeader>> & { hasPadding?: boolean }) {
  return (
    <section className="overflow-hidden">
      <Container hasPadding={hasPadding}>
        <div className={"flex flex-col gap-4"}>
          <SectionHeader {...restProps} />
          <div className="relative">{children}</div>
        </div>
      </Container>
    </section>
  );
}
