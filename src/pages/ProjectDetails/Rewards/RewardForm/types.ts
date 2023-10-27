import { WorkItem } from "src/__generated/graphql";
import { Contributor as ContributorBase } from "src/types";
import { BudgetCurrencyType } from "src/utils/money";

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
  currency: BudgetCurrencyType;
  amountToWire: number;
};
