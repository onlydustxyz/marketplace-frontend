import classNames from "classnames";

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

export enum ContributionBadgeStatus {
  Open = "open",
  Closed = "closed",
  Merged = "merged",
  Draft = "draft",
}

export enum ContributionBadgeType {
  PR = "pr",
  Issue = "issue",
  CodeReview = "code-review",
}

const variants = {
  status: {
    open: "text-github-green-light border-github-green",
    closed: "text-github-red-light border-github-red",
    merged: "text-github-purple-light border-github-purple",
    draft: "text-github-grey-light border-github-grey",
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
  function renderIcon() {
    switch (type) {
      case ContributionBadgeType.PR:
        switch (status) {
          case ContributionBadgeStatus.Open:
            return <PrOpen />;
          case ContributionBadgeStatus.Closed:
            return <PrClosed />;
          case ContributionBadgeStatus.Merged:
            return <PrMerged />;
          case ContributionBadgeStatus.Draft:
            return <PrDraft />;
          default:
            return null;
        }
      case ContributionBadgeType.Issue:
        switch (status) {
          case ContributionBadgeStatus.Open:
            return <IssueOpen />;
          case ContributionBadgeStatus.Closed:
            return <IssueCancelled />;
          case ContributionBadgeStatus.Merged:
            return <IssueMerged />;
          case ContributionBadgeStatus.Draft:
            return <IssueDraft />;
          default:
            return null;
        }
      case ContributionBadgeType.CodeReview:
        switch (status) {
          case ContributionBadgeStatus.Open:
            return <CodeReviewOpen />;
          case ContributionBadgeStatus.Merged:
            return <CodeReviewMerged />;
          default:
            return null;
        }
      default:
        return null;
    }
  }

  return (
    <div
      className={classNames(
        "inline-flex items-center gap-1 rounded-full border px-1 py-0.5 font-walsheim",
        {
          "border-dashed": external,
          "border-solid": !external,
        },
        variants.status[status]
      )}
    >
      {renderIcon()}
      <span className="text-sm">{id}</span>
    </div>
  );
}
