import { PropsWithChildren } from "react";

import { TIcon } from "components/layout/icon/icon.types";

export namespace TBillingProfilesSelector {
  export interface Data {
    name: string;
    icon: TIcon.Props;
    id: string;
  }
  export interface Props extends PropsWithChildren {
    data?: Data[];
    projectId?: string;
    onSelect?: (id: string) => void;
  }
}
