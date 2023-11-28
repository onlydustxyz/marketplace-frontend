import { components } from "src/__generated/api";
import { WorkItem } from "src/__generated/graphql";
import { BudgetCurrencyType } from "src/utils/money";

export type Contributor = components["schemas"]["ContributorSearchItemResponse"] & {
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
