import { PropsWithChildren } from "react";

export namespace TAspectRatio {
  export type ratio = `${number}/${number}`;
  export interface Props extends PropsWithChildren {
    ratio: ratio;
    breakpoints?: {
      width: number;
      ratio: ratio;
    }[];
  }
}
