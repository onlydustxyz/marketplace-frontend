import { components } from "src/__generated/api";

import { TRequestPaymentsStacks } from "components/features/stacks/payments-flow/request-payments-stacks/request-payments-stacks.types";

export namespace TSelectBillingProfile {
  export type BillingProfile = components["schemas"]["ShortBillingProfileResponse"];
  export interface Props {
    goTo: (props: TRequestPaymentsStacks.onNextViewProps) => void;
    billingProfiles?: BillingProfile[];
    isLoading: boolean;
    onSelectBillingProfile: (billingProfile: BillingProfile) => void;
  }
}
