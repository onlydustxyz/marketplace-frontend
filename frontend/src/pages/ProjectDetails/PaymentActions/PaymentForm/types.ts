import { GithubContributorFragment } from "src/__generated/graphql";

export type Inputs = {
  linkToIssue: string;
  contributorHandle: string;
  contributor: GithubContributorFragment;
  memo: string;
  remainingBudget: number;
  seniority: number;
  workingDays: number;
  satisfaction: number;
  amountToWire: number;
};
