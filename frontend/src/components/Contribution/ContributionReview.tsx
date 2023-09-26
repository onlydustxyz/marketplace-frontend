import { ReactElement } from "react";

import Check from "src/assets/icons/Check";
import FileChange from "src/assets/icons/FileChange";
import Hourglass from "src/assets/icons/Hourglass";
import { ContributionAttribute } from "src/components/Contribution/ContributionAttribute";
import { useIntl } from "src/hooks/useIntl";
import { GithubContributionReviewStatus } from "src/types";

export function ContributionReview({ status }: { status: GithubContributionReviewStatus }) {
  const { T } = useIntl();

  const dict: Record<string, { icon: ReactElement; text: string }> = {
    [GithubContributionReviewStatus.PendingReviewer]: {
      icon: <Hourglass />,
      text: T("contribution.review.status.pendingReviewer"),
    },
    [GithubContributionReviewStatus.UnderReview]: {
      icon: <Hourglass />,
      text: T("contribution.review.status.underReview"),
    },
    [GithubContributionReviewStatus.Approved]: {
      icon: <Check />,
      text: T("contribution.review.status.approved"),
    },
    [GithubContributionReviewStatus.ChangesRequested]: {
      icon: <FileChange />,
      text: T("contribution.review.status.changesRequested"),
    },
  };

  return (
    <ContributionAttribute>
      <div className="flex items-center gap-1 font-walsheim text-spaceBlue-100">
        <span>{dict[status].icon}</span>
        <span className="text-sm leading-none">{dict[status].text}</span>
      </div>
    </ContributionAttribute>
  );
}
