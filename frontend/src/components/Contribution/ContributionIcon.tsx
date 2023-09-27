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
import { GithubContributionIconStatus, GithubContributionIconStatusType, GithubContributionType } from "src/types";

export const variants = {
  status: {
    // Pull request
    [GithubContributionIconStatus.Closed]: "text-github-red-light border-github-red",
    [GithubContributionIconStatus.Merged]: "text-github-purple-light border-github-purple",
    [GithubContributionIconStatus.Draft]: "text-github-grey-light border-github-grey",

    // Pull request & Issue
    [GithubContributionIconStatus.Open]: "text-github-green-light border-github-green",

    // Issue
    [GithubContributionIconStatus.Cancelled]: "text-github-grey-light border-github-grey",

    // Issue & Code review
    [GithubContributionIconStatus.Completed]: "text-github-purple-light border-github-purple",

    // Code review
    [GithubContributionIconStatus.Pending]: "text-github-green-light border-github-green",
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
  [GithubContributionType.PullRequest]: {
    [GithubContributionIconStatus.Open]: <PrOpen />,
    [GithubContributionIconStatus.Pending]: <PrOpen />,
    [GithubContributionIconStatus.Closed]: <PrClosed />,
    [GithubContributionIconStatus.Cancelled]: <PrClosed />,
    [GithubContributionIconStatus.Merged]: <PrMerged />,
    [GithubContributionIconStatus.Completed]: <PrMerged />,
    [GithubContributionIconStatus.Draft]: <PrDraft />,
  },
  [GithubContributionType.Issue]: {
    [GithubContributionIconStatus.Open]: <IssueOpenIcon />,
    [GithubContributionIconStatus.Pending]: <IssueOpenIcon />,
    [GithubContributionIconStatus.Closed]: <IssueCancelled />,
    [GithubContributionIconStatus.Cancelled]: <IssueCancelled />,
    [GithubContributionIconStatus.Merged]: <IssueMerged />,
    [GithubContributionIconStatus.Completed]: <IssueMerged />,
    [GithubContributionIconStatus.Draft]: <IssueDraft />,
  },
  [GithubContributionType.CodeReview]: {
    [GithubContributionIconStatus.Open]: <CodeReviewOpen />,
    [GithubContributionIconStatus.Pending]: <CodeReviewOpen />,
    [GithubContributionIconStatus.Closed]: null,
    [GithubContributionIconStatus.Cancelled]: null,
    [GithubContributionIconStatus.Merged]: <CodeReviewMerged />,
    [GithubContributionIconStatus.Completed]: <CodeReviewMerged />,
    [GithubContributionIconStatus.Draft]: null,
  },
};

export function ContributionIcon({
  type,
  status,
}: {
  type: GithubContributionType;
  status: GithubContributionIconStatusType;
}) {
  return <div className={variants.status[status]}>{icons[type][status]}</div>;
}
