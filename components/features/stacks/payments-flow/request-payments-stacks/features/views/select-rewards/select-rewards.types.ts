import { components } from "src/__generated/api";

import { TRequestPaymentsStacks } from "components/features/stacks/payments-flow/request-payments-stacks/request-payments-stacks.types";

export namespace TSelectRewards {
  export interface Props {
    rewards: components["schemas"]["MyRewardPageItemResponse"][];
    excludedRewards: components["schemas"]["MyRewardPageItemResponse"][];
    includedRewards: components["schemas"]["MyRewardPageItemResponse"][];
    onExclude(id: string): void;
    goTo(props?: TRequestPaymentsStacks.onNextViewProps): void;
    onInclude(id: string): void;
    onExcludeAll: () => void;
    onIncludeAll: () => void;
    billingProfileId: string;
  }
}
