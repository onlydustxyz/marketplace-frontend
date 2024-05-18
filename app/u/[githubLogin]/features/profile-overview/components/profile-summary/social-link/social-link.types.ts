import { PropsWithChildren } from "react";

export namespace TSocialLink {
  export interface Props extends PropsWithChildren {
    link?: string;
    copyableValue?: string;
    copyableValueName?: string;
    testId?: string;
  }
}
