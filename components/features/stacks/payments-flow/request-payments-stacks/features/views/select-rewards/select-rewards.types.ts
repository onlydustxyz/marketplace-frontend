import { components } from "src/__generated/api";

import { TSelectBillingProfile } from "components/features/stacks/payments-flow/request-payments-stacks/features/views/select-billing-profile/select-billing-profile.types";
import { TRequestPaymentsStacks } from "components/features/stacks/payments-flow/request-payments-stacks/request-payments-stacks.types";

export namespace TSelectRewards {
  export enum Tabs {
    Included = "included",
    Excluded = "excluded",
  }

  export interface Props {
    excludedRewards: components["schemas"]["MyRewardPageItemResponse"][];
    includedRewards: components["schemas"]["MyRewardPageItemResponse"][];
    onExclude(id: string): void;
    goTo(props?: TRequestPaymentsStacks.onNextViewProps): void;
    onInclude(id: string): void;
    isMandateAccepted: boolean;
    selectedBillingProfile: TSelectBillingProfile.BillingProfile | undefined;
  }
}
