import classNames from "classnames";
import { GithubIssueStatus } from "src/__generated/graphql";
import CodeReviewMerged from "src/assets/icons/CodeReviewMerged";
import CodeReviewOpen from "src/assets/icons/CodeReviewOpen";
import IssueCancelled from "src/assets/icons/IssueCancelled";
import IssueMerged from "src/assets/icons/IssueMerged";
import IssueOpen from "src/assets/icons/IssueOpen";
import PrClosed from "src/assets/icons/PrClosed";
import PrDraft from "src/assets/icons/PrDraft";
import GitMergeLine from "src/icons/GitMergeLine";
import GitPullRequestLine from "src/icons/GitPullRequestLine";
import {
  GithubCodeReviewStatus,
  GithubContributionType,
  GithubItemStatus,
  GithubPullRequestDraft,
  GithubPullRequestStatus,
  GithubTypeStatusDict,
} from "src/types";

export const variants = {
  status: {
    // Pull request
    [GithubPullRequestStatus.Closed]: "text-github-red-light border-github-red",
    [GithubPullRequestStatus.Merged]: "text-github-purple-light border-github-purple",
    [GithubPullRequestDraft.Draft]: "text-github-grey-light border-github-grey",

    // Pull request & Issue
    [GithubPullRequestStatus.Open]: "text-github-green-light border-github-green",

    // Issue
    [GithubIssueStatus.Cancelled]: "text-github-grey-light border-github-grey",

    // Issue & Code review
    [GithubIssueStatus.Completed]: "text-github-purple-light border-github-purple",

    // Code review
    [GithubCodeReviewStatus.Pending]: "text-github-green-light border-github-green",
  },
};

function IssueOpenIcon() {
  return (
    <div className="flex h-4 w-4 items-center justify-center">
      <IssueOpen className="h-3.5 w-3.5" />
    </div>
  );
}

const icons: GithubTypeStatusDict<JSX.Element> = {
  [GithubContributionType.PullRequest]: {
    [GithubPullRequestStatus.Open]: <GitPullRequestLine className="flex h-4 items-center" />,
    [GithubPullRequestStatus.Closed]: <PrClosed />,
    [GithubPullRequestStatus.Merged]: <GitMergeLine className="flex h-4 items-center" />,
    [GithubPullRequestDraft.Draft]: <PrDraft />,
  },
  [GithubContributionType.Issue]: {
    [GithubIssueStatus.Open]: <IssueOpenIcon />,
    [GithubIssueStatus.Completed]: <IssueMerged />,
    [GithubIssueStatus.Cancelled]: <IssueCancelled />,
  },
  [GithubContributionType.CodeReview]: {
    [GithubCodeReviewStatus.Pending]: <CodeReviewOpen />,
    [GithubCodeReviewStatus.Completed]: <CodeReviewMerged />,
  },
};

export function ContributionIcon({ type, status }: { type: GithubContributionType; status: GithubItemStatus }) {
  return (
    <div className={classNames("leading-none", variants.status[status])}>
      {icons[type][status as keyof typeof icons[GithubContributionType]]}
    </div>
  );
}
