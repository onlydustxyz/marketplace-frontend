import { GithubContributorFragment, WorkItem } from "src/__generated/graphql";

export type Inputs = {
  workItems: WorkItem[];
  contributorHandle: string | null;
  contributor: GithubContributorFragment;
  memo: string;
  remainingBudget: number;
  hoursWorked: number;
  amountToWire: number;
};
