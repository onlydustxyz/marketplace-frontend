export type Contributor = {
  id: number;
  login: string;
  avatarUrl: string;
};

export type Inputs = {
  linkToIssue: string;
  contributorHandle: string;
  contributor: Contributor;
  memo: string;
  remainingBudget: number;
  seniority: number;
  workingDays: number;
  satisfaction: number;
  amountToWire: number;
};
