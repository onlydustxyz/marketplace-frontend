import { ComponentProps } from "react";

import { ContributionBadge } from "src/components/Contribution/ContributionBadge";
import { ContributionBadgeTooltip } from "src/components/Contribution/ContributionBadgeTooltip";
import { ContributionIconStatus, ContributionIconStatusType } from "src/components/Contribution/ContributionIcon";
import { ContributionReview, ContributionReviewStatus } from "src/components/Contribution/ContributionReview";
import { ContributionReward } from "src/components/Contribution/ContributionReward";

type Props = { id: string; title: string; url: string } & ComponentProps<typeof ContributionBadge> &
  ComponentProps<typeof ContributionReward> & { review?: ContributionReviewStatus };

export function Contribution({
  id,
  title,
  url,
  number,
  type,
  status,
  external = false,
  draft = false,
  rewards,
  review,
}: Props) {
  return (
    <div className="inline-flex items-center gap-2">
      <div className="inline-flex items-center gap-1">
        <ContributionBadgeTooltip
          id={`${id}-${type}-contribution-badge-tooltip`}
          type={type}
          status={status as ContributionIconStatusType}
          number={number}
          title={title ?? ""}
        />
        <div id={`${id}-${type}-contribution-badge-tooltip`}>
          <ContributionBadge number={number} type={type} status={status} external={external} draft={draft} />
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="block truncate font-walsheim text-greyscale-50"
        >
          {title}
        </a>
      </div>
      <div className="inline-flex items-center gap-1">
        {rewards ? <ContributionReward rewards={rewards} /> : null}
        {review && status === ContributionIconStatus.Open ? <ContributionReview status={review} /> : null}
      </div>
    </div>
  );
}

export {
  ContributionIconStatus as ContributionStatus,
  ContributionIconType as ContributionType,
} from "src/components/Contribution/ContributionIcon";

export { ContributionReviewStatus as ContributionReview } from "src/components/Contribution/ContributionReview";
