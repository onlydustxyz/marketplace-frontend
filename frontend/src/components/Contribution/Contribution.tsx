import { ComponentProps } from "react";

import { ContributionBadge } from "src/components/Contribution/ContributionBadge";
import { ContributionBadgeTooltip } from "src/components/Contribution/ContributionBadgeTooltip";
import { ContributionReview } from "src/components/Contribution/ContributionReview";
import { ContributionReward } from "src/components/Contribution/ContributionReward";
import {
  GithubContributionIconStatus,
  GithubContributionIconStatusType,
  GithubContributionReviewStatus,
} from "src/types";

type Props = { id: string; title: string; url: string } & ComponentProps<typeof ContributionBadge> &
  ComponentProps<typeof ContributionReward> & { review?: GithubContributionReviewStatus };

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
          status={status as GithubContributionIconStatusType}
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
        {review && status === GithubContributionIconStatus.Open ? <ContributionReview status={review} /> : null}
      </div>
    </div>
  );
}
