import { ReactElement } from "react";

import FileChange from "src/assets/icons/FileChange";
import Hourglass from "src/assets/icons/Hourglass";
import { ContributionAttribute } from "src/components/Contribution/ContributionAttribute";
import { useIntl } from "src/hooks/useIntl";
import Chat4Line from "src/icons/Chat4Line";
import CheckLine from "src/icons/CheckLine";
import CloseLine from "src/icons/CloseLine";
import { GithubContributionReviewStatus } from "src/types";

export function ContributionReview({ status }: { status: GithubContributionReviewStatus }) {
  const { T } = useIntl();

  const dict: Record<GithubContributionReviewStatus, { icon: ReactElement; text: string }> = {
    [GithubContributionReviewStatus.PendingReviewer]: {
      icon: <Hourglass />,
      text: T("contribution.review.status.pendingReviewer"),
    },
    [GithubContributionReviewStatus.UnderReview]: {
      icon: <Hourglass />,
      text: T("contribution.review.status.underReview"),
    },
    [GithubContributionReviewStatus.Approved]: {
      icon: <CheckLine className="flex" />,
      text: T("contribution.review.status.approved"),
    },
    [GithubContributionReviewStatus.ChangesRequested]: {
      icon: <FileChange />,
      text: T("contribution.review.status.changesRequested"),
    },
    [GithubContributionReviewStatus.Dismissed]: {
      icon: <CloseLine />,
      text: T("contribution.review.status.dismissed"),
    },
    [GithubContributionReviewStatus.Commented]: {
      icon: <Chat4Line />,
      text: T("contribution.review.status.commented"),
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
