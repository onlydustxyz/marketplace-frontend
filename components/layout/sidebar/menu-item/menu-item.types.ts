import { ReactNode } from "react";

import { TBaseLink } from "components/layout/base-link/base-link.types";

export namespace TMenuItem {
  export interface Props {
    href: string;
    label: ReactNode;
    onClick?: () => void;
    endIcon?: ReactNode;
    startIcon?: ReactNode;
    matchPathOptions?: TBaseLink.Props["matchPathOptions"];
  }
}
