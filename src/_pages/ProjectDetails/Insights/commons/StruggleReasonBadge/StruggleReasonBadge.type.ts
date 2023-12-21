export type StruggleReasonBadgeProps = {
  date: string;
  githubStatus: string;
};

export enum ReasonStatuses {
  GreenStatus = 10,
  OrangeStatus = 20,
  RedStatus = 30,
}

export type ColorClassesType = {
  [key in ReasonStatuses]: string;
};
