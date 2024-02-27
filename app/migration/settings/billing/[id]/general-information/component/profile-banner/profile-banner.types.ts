import { PropsWithChildren } from "react";

import { BillingProfilesTypes } from "src/api/BillingProfiles/type";

export namespace TProfileBanner {
  export interface Props extends PropsWithChildren {
    status?: BillingProfilesTypes.status;
    hasValidBillingProfile: boolean;
    type?: BillingProfilesTypes.typeUnion;
    id?: string;
  }
}
