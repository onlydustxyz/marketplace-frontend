import { PropsWithChildren } from "react";

import { UseBillingProfileIndividualResponse } from "src/api/me/billing/queries";

export namespace TProfileIndividual {
  export interface Props extends PropsWithChildren {
    profile: UseBillingProfileIndividualResponse;
  }
}
