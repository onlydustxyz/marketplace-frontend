import { PropsWithChildren } from "react";

import { BillingProfilesTypes } from "src/api/BillingProfiles/type";

export namespace TAdminContentWrapper {
  export interface Props extends PropsWithChildren {
    role: BillingProfilesTypes.roleUnion;
  }
}
