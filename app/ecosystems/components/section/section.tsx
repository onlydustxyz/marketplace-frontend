import { ComponentProps, PropsWithChildren } from "react";

import { SectionHeader } from "app/ecosystems/components/section-header/section-header";

import { Container } from "components/layout/container/container";

export function Section({ children, ...restProps }: PropsWithChildren<ComponentProps<typeof SectionHeader>>) {
  return (
    <section>
      <Container>
        <div className={"grid gap-4"}>
          <SectionHeader {...restProps} />
          <div>{children}</div>
        </div>
      </Container>
    </section>
  );
}
