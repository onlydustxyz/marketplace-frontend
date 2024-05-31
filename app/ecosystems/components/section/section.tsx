import { ComponentProps, PropsWithChildren } from "react";

import { SectionHeader } from "app/ecosystems/components/section-header/section-header";

import { Container } from "components/layout/container/container";

export function Section({ children, ...restProps }: PropsWithChildren<ComponentProps<typeof SectionHeader>>) {
  return (
    <section className="overflow-hidden">
      <Container>
        <div className={"flex flex-col gap-4"}>
          <SectionHeader {...restProps} />
          <div className="relative">{children}</div>
        </div>
      </Container>
    </section>
  );
}
