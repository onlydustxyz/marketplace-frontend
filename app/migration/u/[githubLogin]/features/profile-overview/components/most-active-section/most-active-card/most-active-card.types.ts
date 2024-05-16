import { TDotsStatus } from "app/migration/u/[githubLogin]/components/dots-status/dots-status.types";

export namespace TMostActiveCard {
  export interface Props {
    logoUrl: string;
    name: string;
    contributionCount: number;
    rewardCount: number;
    totalUsdEquivalent: number;
    status: TDotsStatus.Props["status"];
  }
}
