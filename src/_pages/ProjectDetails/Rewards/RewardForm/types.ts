import { components } from "src/__generated/api";
import { WorkItemType } from "src/types";
import { BudgetCurrencyType } from "src/utils/money";

export interface WorkItem {
  id: string;
  number: number;
  repoId: number;
  type: WorkItemType;
}

export type Contributor = components["schemas"]["ContributorResponse"] & {
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
