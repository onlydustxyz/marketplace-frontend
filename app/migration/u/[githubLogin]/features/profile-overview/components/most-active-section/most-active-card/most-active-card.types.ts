export namespace TMostActiveCard {
  export interface Props {
    logoUrl: string;
    name: string;
    contributionCount: number;
    rewardCount: number;
    totalUsdEquivalent: number;
    status: "RED" | "ORANGE" | "GREEN";
  }
}
