import { PropsWithChildren } from "react";

export namespace TBillingCreateStack {
  export interface Props extends PropsWithChildren {}

  export interface Params {
    test: string;
  }

  export enum Choice {
    Individual = "individual",
  }
}
