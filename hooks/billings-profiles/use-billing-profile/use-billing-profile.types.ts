import { UseGetBillingProfileById } from "src/api/BillingProfiles/queries";

import { TIcon } from "components/layout/icon/icon.types";

export namespace TUseBillingProfile {
  export interface Props {
    id?: string;
  }
  export interface Return {
    data: UseGetBillingProfileById | undefined;
    profile:
      | {
          data: UseGetBillingProfileById;
          icon: TIcon.Props;
        }
      | undefined;
    isLoading: boolean;
  }
}
