import { PropsWithChildren, RefObject } from "react";

export namespace TScrollableHeader {
  export interface Props extends PropsWithChildren {
    scrollRef: RefObject<HTMLElement>;
  }
}
