import { PropsWithChildren } from "react";

export namespace TNavigationStateContext {
  export interface Props extends PropsWithChildren {}
  export type state = [boolean, (shouldBlock: boolean) => void];
  export type confirmation = [boolean, (shouldShow: boolean, url: string) => void];
  export type Return = {
    block: {
      confirm: () => void;
      cancel: () => void;
      state: state;
      confirmation: confirmation;
    };
  };
}
