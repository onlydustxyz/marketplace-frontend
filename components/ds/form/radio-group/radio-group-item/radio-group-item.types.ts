import { ReactNode } from "react";

export namespace TRadioGroupItem {
  export interface ChidrenProps<V extends string> {
    isSelected: boolean;
    isActive: boolean;
    isDisabled: boolean;
    value: V;
  }
  export interface Props {
    value: string;
    disabled?: boolean;
    containerClassName?: string;
    children: (props: ChidrenProps<string>) => ReactNode;
  }
}
