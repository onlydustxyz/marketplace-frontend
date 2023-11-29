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
import { cn } from "src/utils/cn";

import EyeOffLine from "src/icons/EyeOffLine";
import {
  ContributionStatus,
  GithubCodeReviewStatus,
  GithubContributionType,
  GithubPullRequestStatus,
  GithubStatus,
  GithubTypeStatusDict,
} from "src/types";

export enum Sizes {
  xs = "w-3 h-3 text-xs leading-none",
  sm = "w-3.5 h-3.5 text-sm leading-none",
  md = "w-4 h-4 text-base leading-none",
}

export const variants: {
  status: GithubTypeStatusDict<string>;
  contributionStatus: Record<ContributionStatus, string>;
} = {
  status: {
    [GithubContributionType.PullRequest]: {
      [GithubPullRequestStatus.Open]: "text-github-green-light border-github-green",
      [GithubPullRequestStatus.Closed]: "text-github-red-light border-github-red",
      [GithubPullRequestStatus.Merged]: "text-github-purple-light border-github-purple",
      [GithubPullRequestStatus.Draft]: "text-github-grey-light border-github-grey",
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
      [GithubCodeReviewStatus.Dismissed]: "text-github-grey-light border-github-grey",
      [GithubCodeReviewStatus.Pending]: "text-github-green-light border-github-green",
    },
  },
  contributionStatus: {
    [ContributionStatus.InProgress]: "text-github-green-light border-github-green",
    [ContributionStatus.Completed]: "text-github-purple-light border-github-purple",
    [ContributionStatus.Cancelled]: "text-github-red-light border-github-red",
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
  contributionStatus,
}: {
  type: GithubContributionType;
  status: GithubStatus;
  size?: Sizes;
  contributionStatus?: `${ContributionStatus}`;
}) {
  const icons: GithubTypeStatusDict<JSX.Element> = {
    [GithubContributionType.PullRequest]: {
      [GithubPullRequestStatus.Open]: <GitPullRequestLine className={size} />,
      [GithubPullRequestStatus.Closed]: <PrClosed className={size} />,
      [GithubPullRequestStatus.Merged]: <GitMergeLine className={size} />,
      [GithubPullRequestStatus.Draft]: <PrDraft className={size} />,
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
      [GithubCodeReviewStatus.Dismissed]: <EyeOffLine className={size} />,
      [GithubCodeReviewStatus.Pending]: <EyeLine className={size} />,
    },
  };

  const contributionStatusIcons = {
    [ContributionStatus.InProgress]: icons,
    [ContributionStatus.Completed]: icons,
    [ContributionStatus.Cancelled]: {
      ...icons,
      // If a contribution has been cancelled we want to force the code review icon, ignoring it's Github status.
      [GithubContributionType.CodeReview]: Object.fromEntries(
        Object.entries(icons[GithubContributionType.CodeReview]).map(([key]) => {
          return [key, <EyeOffLine key={key} className={size} />];
        })
      ),
    },
  };

  const statusClassnames =
    contributionStatus && status !== GithubPullRequestStatus.Draft
      ? variants.contributionStatus[contributionStatus]
      : variants.status[type][status as keyof typeof variants.status[GithubContributionType]];

  // Even though a type and status should always be defined, in development sometimes they aren't and makes the component crash.
  return type && status ? (
    <div className={cn("leading-none", statusClassnames)}>
      {contributionStatus
        ? contributionStatusIcons[contributionStatus][type][status as keyof typeof icons[GithubContributionType]]
        : icons[type][status as keyof typeof icons[GithubContributionType]]}
    </div>
  ) : null;
}
