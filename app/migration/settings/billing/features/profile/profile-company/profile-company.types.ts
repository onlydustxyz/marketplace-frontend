import { PropsWithChildren } from "react";

import { UseBillingProfileCompanyResponse } from "src/api/me/billing/queries";

export namespace TProfileCompany {
  export interface Props extends PropsWithChildren {
    profile: UseBillingProfileCompanyResponse;
  }
}
