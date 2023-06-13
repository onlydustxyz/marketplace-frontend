import { WorkItem } from "src/__generated/graphql";
import { Contributor as ContributorBase } from "src/types";

export type Contributor = ContributorBase & {
  unpaidMergedPullsCount: number;
};

export type Inputs = {
  workItems: WorkItem[];
  contributorHandle: string | null;
  contributor: Contributor;
  memo: string;
  remainingBudget: number;
  hoursWorked: number;
  amountToWire: number;
};
