import { PropsWithChildren } from "react";

export namespace THackathonContext {
  export interface Props extends PropsWithChildren {}

  export interface Return {
    panelSize: {
      container: string;
      panel: string;
    };
    issues: {
      isOpen: boolean;
      open: () => void;
      close: () => void;
    };
  }
}
