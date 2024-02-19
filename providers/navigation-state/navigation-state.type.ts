import { PropsWithChildren } from "react";

export namespace TNavigationStateContext {
  export interface Props extends PropsWithChildren {}

  export type Return = {
    block: {
      should: boolean;
      confirm: () => void;
      cancel: () => void;
      state: {
        set: () => void;
        unSet: () => void;
      };
      confirmation: {
        show: boolean;
        set: (showConfirmation: boolean, url: string) => void;
      };
    };
  };
}
