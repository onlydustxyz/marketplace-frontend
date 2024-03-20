import { Money } from "utils/Money/Money";

import { components } from "src/__generated/api";
import { WorkItemType } from "src/types";

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
  currency: Money.Currency;
  amountToWire: number;
};
