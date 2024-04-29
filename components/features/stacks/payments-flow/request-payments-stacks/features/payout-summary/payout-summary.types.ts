import { components } from "src/__generated/api";

export namespace TPayoutSummary {
  export interface Props {
    rewards: components["schemas"]["MyRewardPageItemResponse"][];
    billingProfileId: string;
  }

  export interface Use extends Props {}
}
