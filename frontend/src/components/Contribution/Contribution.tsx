import { ContributionBadge, ContributionBadgeStatus } from "src/components/ContributionBadge/ContributionBadge";
import { ContributionReward } from "src/components/ContributionReward/ContributionReward";
import { ContributionReview, ContributionReviewStatus } from "src/components/ContributionReview/ContributionReview";

type Props = { name: string; url: string } & React.ComponentProps<typeof ContributionBadge> &
  React.ComponentProps<typeof ContributionReward> & { review?: ContributionReviewStatus };

export function Contribution({
  name,
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
        <ContributionBadge number={number} type={type} status={status} external={external} draft={draft} />
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="block truncate font-walsheim text-greyscale-50"
        >
          {name}
        </a>
      </div>
      <div className="inline-flex items-center gap-1">
        {rewards ? <ContributionReward rewards={rewards} /> : null}
        {review && status === ContributionBadgeStatus.Open ? <ContributionReview status={review} /> : null}
      </div>
    </div>
  );
}

export {
  ContributionBadgeStatus as ContributionStatus,
  ContributionBadgeType as ContributionType,
} from "../ContributionBadge/ContributionBadge";

export { ContributionReviewStatus as ContributionReview } from "../ContributionReview/ContributionReview";
