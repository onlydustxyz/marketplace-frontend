import { PropsWithChildren } from "react";

export namespace TToggle {
  export interface Props extends PropsWithChildren {
    ariaLabel: string;
    onChange: (value: boolean) => void;
    name?: string;
    value: boolean;
    disabled?: boolean;
  }
}
