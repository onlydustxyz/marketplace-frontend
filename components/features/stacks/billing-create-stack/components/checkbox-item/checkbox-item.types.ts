import { PropsWithChildren, ReactNode } from "react";

import { TIcon } from "components/layout/icon/icon.types";

export namespace TCheckboxItem {
  export interface Props extends PropsWithChildren {
    selected: boolean;
    disabled: boolean;
    icon: TIcon.Props;
    title: ReactNode;
    list: ReactNode[];
  }
}
