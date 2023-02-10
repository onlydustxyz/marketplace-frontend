import { GithubContributorFragment } from "src/__generated/graphql";

export type Inputs = {
  linkToIssue: string;
  contributorHandle: string | null;
  contributor: GithubContributorFragment;
  memo: string;
  remainingBudget: number;
  seniority: number;
  workingDays: number;
  satisfaction: number;
  amountToWire: number;
};
