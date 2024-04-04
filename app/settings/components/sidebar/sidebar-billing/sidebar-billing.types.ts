import { components } from "src/__generated/api";

import { TIcon } from "components/layout/icon/icon.types";

export namespace TSidebarBilling {
  export interface profile {
    data: components["schemas"]["ShortBillingProfileResponse"];
    icon: TIcon.Props;
  }
  export interface Props {
    closePanel?: () => void;
  }
}
