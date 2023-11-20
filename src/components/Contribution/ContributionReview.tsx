import { ReactElement } from "react";

import FileChange from "src/assets/icons/FileChange";
import Hourglass from "src/assets/icons/Hourglass";
import { ContributionAttribute } from "src/components/Contribution/ContributionAttribute";
import { useIntl } from "src/hooks/useIntl";
import CheckLine from "src/icons/CheckLine";
import { GithubPullRequestReviewState } from "src/types";

export const ReviewStateStatuses = {
  APPROVED: GithubPullRequestReviewState.Approved,
  CHANGES_REQUESTED: GithubPullRequestReviewState.ChangesRequested,
  PENDING_REVIEWER: GithubPullRequestReviewState.PendingReviewer,
  UNDER_REVIEW: GithubPullRequestReviewState.UnderReview,
};

export function ContributionReview({ status }: { status: GithubPullRequestReviewState }) {
  const { T } = useIntl();

  const dict: Record<GithubPullRequestReviewState, { icon: ReactElement; text: string }> = {
    [GithubPullRequestReviewState.PendingReviewer]: {
      icon: <Hourglass />,
      text: T("contribution.review.status.pendingReviewer"),
    },
    [GithubPullRequestReviewState.UnderReview]: {
      icon: <Hourglass />,
      text: T("contribution.review.status.underReview"),
    },
    [GithubPullRequestReviewState.Approved]: {
      icon: <CheckLine className="flex" />,
      text: T("contribution.review.status.approved"),
    },
    [GithubPullRequestReviewState.ChangesRequested]: {
      icon: <FileChange />,
      text: T("contribution.review.status.changesRequested"),
    },
  };

  return (
    <ContributionAttribute>
      <div className="flex items-center gap-1 font-walsheim text-spaceBlue-100">
        <span className="text-xs leading-none">{dict[status]?.icon}</span>
        <span className="whitespace-nowrap text-sm leading-none">{dict[status]?.text}</span>
      </div>
    </ContributionAttribute>
  );
}
