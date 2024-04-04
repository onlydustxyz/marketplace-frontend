import { ReactNode } from "react";

export namespace TRadioGroupCustom {
  export interface Item<V extends string> {
    value: V;
    onChange: (value: V) => void;
  }
  export interface Props<V extends string> {
    value: V;
    onChange: (value: V) => void;
    children: (props: Item<V>) => ReactNode[];
  }
}
