import classNames from "classnames";

import CodeReviewMerged from "src/assets/icons/CodeReviewMerged";
import CodeReviewOpen from "src/assets/icons/CodeReviewOpen";
import ExternalArrow from "src/assets/icons/ExternalArrow";
import IssueCancelled from "src/assets/icons/IssueCancelled";
import IssueDraft from "src/assets/icons/IssueDraft";
import IssueMerged from "src/assets/icons/IssueMerged";
import IssueOpen from "src/assets/icons/IssueOpen";
import PrClosed from "src/assets/icons/PrClosed";
import PrDraft from "src/assets/icons/PrDraft";
import PrMerged from "src/assets/icons/PrMerged";
import PrOpen from "src/assets/icons/PrOpen";

export enum ContributionBadgeStatus {
  Open = "OPEN",
  Closed = "COMPLETED",
  Merged = "MERGED",
  Draft = "DRAFT",
}

export enum ContributionBadgeType {
  PullRequest = "PULL_REQUEST",
  Issue = "ISSUE",
  CodeReview = "CODE_REVIEW",
}

const variants = {
  status: {
    [ContributionBadgeStatus.Open]: "text-github-green-light border-github-green",
    [ContributionBadgeStatus.Closed]: "text-github-red-light border-github-red",
    [ContributionBadgeStatus.Merged]: "text-github-purple-light border-github-purple",
    [ContributionBadgeStatus.Draft]: "text-github-grey-light border-github-grey",
  },
};

const icons = {
  [ContributionBadgeType.PullRequest]: {
    [ContributionBadgeStatus.Open]: <PrOpen />,
    [ContributionBadgeStatus.Closed]: <PrClosed />,
    [ContributionBadgeStatus.Merged]: <PrMerged />,
    [ContributionBadgeStatus.Draft]: <PrDraft />,
  },
  [ContributionBadgeType.Issue]: {
    [ContributionBadgeStatus.Open]: <IssueOpen />,
    [ContributionBadgeStatus.Closed]: <IssueCancelled />,
    [ContributionBadgeStatus.Merged]: <IssueMerged />,
    [ContributionBadgeStatus.Draft]: <IssueDraft />,
  },
  [ContributionBadgeType.CodeReview]: {
    [ContributionBadgeStatus.Open]: <CodeReviewOpen />,
    [ContributionBadgeStatus.Closed]: null,
    [ContributionBadgeStatus.Merged]: <CodeReviewMerged />,
    [ContributionBadgeStatus.Draft]: null,
  },
};

export function ContributionBadge({
  number,
  type,
  status,
  external = false,
}: {
  number: number;
  type: ContributionBadgeType;
  status: ContributionBadgeStatus;
  external?: boolean;
}) {
  return (
    <div
      className={classNames(
        "inline-flex w-auto items-center gap-1 rounded-full px-1 py-0.5 font-walsheim",
        {
          "border border-dashed": external,
          "border-0.5 border-solid": !external,
        },
        variants.status[status]
      )}
    >
      {icons[type][status]}
      <div className="flex">
        <span className="text-sm leading-none">{number}</span>
        {external ? <ExternalArrow className="mt-[3px]" /> : null}
      </div>
    </div>
  );
}
