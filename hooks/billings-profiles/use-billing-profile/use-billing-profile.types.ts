import { UseGetBillingProfileById } from "src/api/BillingProfiles/queries";
import { BillingProfilesTypes } from "src/api/BillingProfiles/type";

import { TIcon } from "components/layout/icon/icon.types";

export namespace TUseBillingProfile {
  export interface Props {
    id?: string;
    enabledPooling?: boolean;
  }
  export interface Return {
    data: UseGetBillingProfileById | undefined;
    profile:
      | {
          data: UseGetBillingProfileById;
          icon: TIcon.Props;
          status: BillingProfilesTypes.status;
          externalId: string | undefined;
        }
      | undefined;
    isLoading: boolean;
    refetch: () => void;
  }
}
