import { PropsWithChildren } from "react";

import { SkeletonEl } from "components/ds/skeleton/skeleton";
import { Container } from "components/layout/container/container";

export function SectionLoading({ children }: PropsWithChildren) {
  return (
    <section className="overflow-hidden">
      <Container>
        <div className={"flex w-full flex-col gap-4"}>
          <header className={"flex w-full items-center justify-between gap-4"}>
            <div className={"flex w-full items-center gap-2 text-greyscale-50"}>
              <SkeletonEl width="24px" height="24px" variant="rounded" />
              <SkeletonEl width="30%" height="16px" variant="rounded" />
            </div>
          </header>
          <div className="relative">{children}</div>
        </div>
      </Container>
    </section>
  );
}
