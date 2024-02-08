import { components } from "src/__generated/api";

export namespace TRewardItem {
  export interface Props {
    id: string;
    contributors?: number[];
    currency: components["schemas"]["RewardAmountResponse"];
    projectId: string;
    rewardedOnProjectLogoUrl: string;
    rewardedOnProjectName: string;
    type: "exclude" | "include";
    onClick: (id: string) => void;
  }
}
