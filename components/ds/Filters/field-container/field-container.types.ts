import { PropsWithChildren } from "react";

export namespace TFilterFieldContainer {
  export interface Props extends PropsWithChildren {
    label: string;
    hideLabel?: boolean;
  }
}
