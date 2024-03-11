import { BillingProfilesTypes } from "src/api/BillingProfiles/type";

import { TRequestPaymentsStacks } from "components/features/stacks/payments-flow/request-payments-stacks/request-payments-stacks.types";

export namespace TSelectBillingProfile {
  export interface Props {
    goTo: (props: TRequestPaymentsStacks.onNextViewProps) => void;
    billingProfiles?: BillingProfilesTypes.BillingProfile[];
    isLoading: boolean;
    onSelectBillingProfile: (id: string) => void;
    selectedBillingProfileId: string;
  }
}
