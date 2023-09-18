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
  Open = "open",
  Closed = "closed",
  Merged = "merged",
  Draft = "draft",
}

export enum ContributionBadgeType {
  PR = "pr",
  Issue = "issue",
  CodeReview = "codeReview",
}

const variants = {
  status: {
    open: "text-github-green-light border-github-green",
    closed: "text-github-red-light border-github-red",
    merged: "text-github-purple-light border-github-purple",
    draft: "text-github-grey-light border-github-grey",
  },
};

const icons = {
  pr: {
    open: <PrOpen />,
    closed: <PrClosed />,
    merged: <PrMerged />,
    draft: <PrDraft />,
  },
  issue: {
    open: <IssueOpen />,
    closed: <IssueCancelled />,
    merged: <IssueMerged />,
    draft: <IssueDraft />,
  },
  codeReview: {
    open: <CodeReviewOpen />,
    closed: null,
    merged: <CodeReviewMerged />,
    draft: null,
  },
};

export function ContributionBadge({
  id,
  type,
  status,
  external = false,
}: {
  id: string;
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
        <span className="text-sm leading-none">{id}</span>
        {external ? <ExternalArrow className="mt-[3px]" /> : null}
      </div>
    </div>
  );
}
