import { WorkItem } from "src/__generated/graphql";
import { Contributor as ContributorBase, Currency } from "src/types";

export type Contributor = ContributorBase & {
  unpaidCompletedContributions: number;
  unpaidMergedPullsCount?: number;
  unpaidCompletedIssuesCount?: number;
  unpaidCompletedCodeReviewsCount?: number;
};

export type Inputs = {
  workItems: WorkItem[];
  contributorHandle: string | null;
  contributor: Contributor;
  memo: string;
  remainingBudget: number;
  currency: Currency;
  amountToWire: number;
};
