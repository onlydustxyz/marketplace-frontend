import { ReactNode } from "react";

export namespace TMenuItem {
  export interface Props {
    href: string;
    label: ReactNode;
    onClick?: () => void;
    endIcon?: ReactNode;
  }
}
