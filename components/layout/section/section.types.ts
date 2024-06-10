import { ComponentProps, PropsWithChildren } from "react";

import { SectionHeader } from "components/layout/section/components/section-header/section-header";

export namespace TSection {
  interface classNames {
    section: string;
    content: string;
  }

  export interface Props extends PropsWithChildren<ComponentProps<typeof SectionHeader>> {
    classNames?: classNames;
  }
}
