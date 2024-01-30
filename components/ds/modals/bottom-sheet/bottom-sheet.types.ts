import { PropsWithChildren, ReactNode } from "react";

export namespace TBottomSheet {
  export interface Props extends PropsWithChildren {
    open?: boolean;
    onOpen: () => void;
    title?: ReactNode;
  }
}
