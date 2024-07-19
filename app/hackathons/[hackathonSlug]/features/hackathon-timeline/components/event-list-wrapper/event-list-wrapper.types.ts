import { PropsWithChildren, ReactNode } from "react";

export namespace TEventListWrapper {
  export interface Props extends PropsWithChildren {
    title: ReactNode;
  }
}
