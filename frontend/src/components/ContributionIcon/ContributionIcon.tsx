import { GithubIssueStatus, GithubPullRequestStatus } from "src/__generated/graphql";
import CodeReviewMerged from "src/assets/icons/CodeReviewMerged";
import CodeReviewOpen from "src/assets/icons/CodeReviewOpen";
import IssueCancelled from "src/assets/icons/IssueCancelled";
import IssueDraft from "src/assets/icons/IssueDraft";
import IssueMerged from "src/assets/icons/IssueMerged";
import IssueOpen from "src/assets/icons/IssueOpen";
import PrClosed from "src/assets/icons/PrClosed";
import PrDraft from "src/assets/icons/PrDraft";
import PrMerged from "src/assets/icons/PrMerged";
import PrOpen from "src/assets/icons/PrOpen";
import { GithubCodeReviewStatus } from "src/components/GithubCard/GithubCodeReview/GithubCodeReview";

export enum ContributionIconType {
  PullRequest = "PULL_REQUEST",
  Issue = "ISSUE",
  CodeReview = "CODE_REVIEW",
}

export const ContributionIconStatus = {
  ...GithubPullRequestStatus,
  ...GithubIssueStatus,
  ...GithubCodeReviewStatus,
  Draft: "DRAFT",
} as const;

export type ContributionIconStatusType = typeof ContributionIconStatus[keyof typeof ContributionIconStatus];

export const variants = {
  status: {
    [ContributionIconStatus.Open]: "text-github-green-light border-github-green",
    [ContributionIconStatus.Pending]: "text-github-green-light border-github-green",
    [ContributionIconStatus.Closed]: "text-github-red-light border-github-red",
    [ContributionIconStatus.Cancelled]: "text-github-red-light border-github-red",
    [ContributionIconStatus.Merged]: "text-github-purple-light border-github-purple",
    [ContributionIconStatus.Completed]: "text-github-purple-light border-github-purple",
    [ContributionIconStatus.Draft]: "text-github-grey-light border-github-grey",
  },
};

function IssueOpenIcon() {
  return (
    <div className="flex h-4 w-4 items-center justify-center">
      <IssueOpen className="h-3.5 w-3.5" />
    </div>
  );
}

const icons = {
  [ContributionIconType.PullRequest]: {
    [ContributionIconStatus.Open]: <PrOpen />,
    [ContributionIconStatus.Pending]: <PrOpen />,
    [ContributionIconStatus.Closed]: <PrClosed />,
    [ContributionIconStatus.Cancelled]: <PrClosed />,
    [ContributionIconStatus.Merged]: <PrMerged />,
    [ContributionIconStatus.Completed]: <PrMerged />,
    [ContributionIconStatus.Draft]: <PrDraft />,
  },
  [ContributionIconType.Issue]: {
    [ContributionIconStatus.Open]: <IssueOpenIcon />,
    [ContributionIconStatus.Pending]: <IssueOpenIcon />,
    [ContributionIconStatus.Closed]: <IssueCancelled />,
    [ContributionIconStatus.Cancelled]: <IssueCancelled />,
    [ContributionIconStatus.Merged]: <IssueMerged />,
    [ContributionIconStatus.Completed]: <IssueMerged />,
    [ContributionIconStatus.Draft]: <IssueDraft />,
  },
  [ContributionIconType.CodeReview]: {
    [ContributionIconStatus.Open]: <CodeReviewOpen />,
    [ContributionIconStatus.Pending]: <CodeReviewOpen />,
    [ContributionIconStatus.Closed]: null,
    [ContributionIconStatus.Cancelled]: null,
    [ContributionIconStatus.Merged]: <CodeReviewMerged />,
    [ContributionIconStatus.Completed]: <CodeReviewMerged />,
    [ContributionIconStatus.Draft]: null,
  },
};

export function ContributionIcon({ type, status }: { type: ContributionIconType; status: ContributionIconStatusType }) {
  return <div className={variants.status[status]}>{icons[type][status]}</div>;
}
