import { cn } from "src/utils/cn";
import { GithubIssueStatus } from "src/__generated/graphql";
import CodeReviewCheckIcon from "src/assets/icons/CodeReviewCheckIcon";
import IssueCancelled from "src/assets/icons/IssueCancelled";
import IssueOpen from "src/assets/icons/IssueOpen";
import PrClosed from "src/assets/icons/PrClosed";
import PrDraft from "src/assets/icons/PrDraft";
import CheckboxCircleLine from "src/icons/CheckboxCircleLine";
import EyeLine from "src/icons/EyeLine";
import GitMergeLine from "src/icons/GitMergeLine";
import GitPullRequestLine from "src/icons/GitPullRequestLine";

import {
  GithubCodeReviewStatus,
  GithubContributionType,
  GithubPullRequestDraft,
  GithubPullRequestStatus,
  GithubStatus,
  GithubTypeStatusDict,
} from "src/types";

export enum Sizes {
  xs = "w-3 h-3 text-xs leading-none",
  sm = "w-3.5 h-3.5 text-sm leading-none",
  md = "w-4 h-4 text-base leading-none",
}

export const variants: { status: GithubTypeStatusDict<string> } = {
  status: {
    [GithubContributionType.PullRequest]: {
      [GithubPullRequestStatus.Open]: "text-github-green-light border-github-green",
      [GithubPullRequestStatus.Closed]: "text-github-red-light border-github-red",
      [GithubPullRequestStatus.Merged]: "text-github-purple-light border-github-purple",
      [GithubPullRequestDraft.Draft]: "text-github-grey-light border-github-grey",
    },
    [GithubContributionType.Issue]: {
      [GithubIssueStatus.Open]: "text-github-green-light border-github-green",
      [GithubIssueStatus.Completed]: "text-github-purple-light border-github-purple",
      [GithubIssueStatus.Cancelled]: "text-github-grey-light border-github-grey",
    },
    [GithubContributionType.CodeReview]: {
      [GithubCodeReviewStatus.Approved]: "text-github-purple-light border-github-purple",
      [GithubCodeReviewStatus.ChangeRequested]: "text-github-purple-light border-github-purple",
      [GithubCodeReviewStatus.Commented]: "text-github-green-light border-github-green",
      [GithubCodeReviewStatus.Completed]: "text-github-purple-light border-github-purple",
      [GithubCodeReviewStatus.Dismissed]: "text-github-grey-light border-github-grey",
      [GithubCodeReviewStatus.Pending]: "text-github-green-light border-github-green",
    },
  },
};

function IssueOpenIcon({ size }: { size: Sizes }) {
  return (
    <div className={cn("flex items-center justify-center", size)}>
      <IssueOpen className={size === Sizes.md ? Sizes.sm : size} />
    </div>
  );
}

function IssueClosedIcon({ size }: { size: Sizes }) {
  return (
    <div className={cn("flex items-center justify-center", size)}>
      <CheckboxCircleLine className={size === Sizes.xs ? Sizes.sm : size} />
    </div>
  );
}

export function ContributionIcon({
  type,
  status,
  size = Sizes.md,
}: {
  type: GithubContributionType;
  status: GithubStatus;
  size?: Sizes;
}) {
  const icons: GithubTypeStatusDict<JSX.Element> = {
    [GithubContributionType.PullRequest]: {
      [GithubPullRequestStatus.Open]: <GitPullRequestLine className={size} />,
      [GithubPullRequestStatus.Closed]: <PrClosed className={size} />,
      [GithubPullRequestStatus.Merged]: <GitMergeLine className={size} />,
      [GithubPullRequestDraft.Draft]: <PrDraft className={size} />,
    },
    [GithubContributionType.Issue]: {
      [GithubIssueStatus.Open]: <IssueOpenIcon size={size} />,
      [GithubIssueStatus.Completed]: <IssueClosedIcon size={size} />,
      [GithubIssueStatus.Cancelled]: <IssueCancelled className={size} />,
    },
    [GithubContributionType.CodeReview]: {
      [GithubCodeReviewStatus.Approved]: <CodeReviewCheckIcon className={size} />,
      [GithubCodeReviewStatus.ChangeRequested]: <CodeReviewCheckIcon className={size} />,
      [GithubCodeReviewStatus.Commented]: <EyeLine className={size} />,
      [GithubCodeReviewStatus.Completed]: <CodeReviewCheckIcon className={size} />,
      [GithubCodeReviewStatus.Dismissed]: <CodeReviewCheckIcon className={size} />,
      [GithubCodeReviewStatus.Pending]: <EyeLine className={size} />,
    },
  };

  // Even though a type and status should always be defined, in development sometimes they aren't and makes the component crash.
  return (
    <div
      className={cn(
        "leading-none",
        type && status
          ? variants.status[type][status as keyof typeof variants.status[GithubContributionType]]
          : undefined
      )}
    >
      {type && status ? icons[type][status as keyof typeof icons[GithubContributionType]] : null}
    </div>
  );
}
