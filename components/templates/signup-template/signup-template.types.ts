import { PropsWithChildren, ReactNode } from "react";

export namespace TSignupTemplate {
  export interface Props extends PropsWithChildren {
    header?: ReactNode;
    footer?: ReactNode;
    aside?: ReactNode;
  }
}
