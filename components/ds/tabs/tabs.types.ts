import { PropsWithChildren } from "react";

import { TTab } from "components/ds/tabs/tab/tab.types";

export namespace TTabs {
  export interface Props extends PropsWithChildren {
    tabs: TTab.Props[];
  }
}
