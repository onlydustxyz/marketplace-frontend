import { GithubUserFragment, WorkItem } from "src/__generated/graphql";

export type Inputs = {
  workItems: WorkItem[];
  contributorHandle: string | null;
  contributor: GithubUserFragment;
  memo: string;
  remainingBudget: number;
  hoursWorked: number;
  amountToWire: number;
};
