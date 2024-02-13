import { PropsWithChildren, ReactNode } from "react";

export namespace TBottomSheet {
  export interface Props extends PropsWithChildren {
    open?: boolean;
    hasCloseButton?: boolean;
    onOpen?: () => void;
    onClose: () => void;
    title?: ReactNode;
    background?: "blue" | "grey";
    fullScreen?: boolean;
  }
}
