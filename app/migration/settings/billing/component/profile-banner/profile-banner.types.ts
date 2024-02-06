import { PropsWithChildren } from "react";

import { UseBillingProfileResponse } from "src/api/me/billing/queries";
import { MeTypes } from "src/api/me/types";

export namespace TProfileBanner {
  export interface Props extends PropsWithChildren {
    status?: UseBillingProfileResponse["status"];
    hasValidBillingProfile: boolean;
    type?: MeTypes.billingProfileUnion;
    id?: string;
  }
}
