import { ComponentProps } from "react";

import { ContributionBadge } from "src/components/Contribution/ContributionBadge";
import { ContributionReview } from "src/components/Contribution/ContributionReview";
import { ContributionReward } from "src/components/Contribution/ContributionReward";
import { GithubContributionIconStatus, GithubContributionReviewStatus } from "src/types";

type Props = ComponentProps<typeof ContributionBadge> &
  ComponentProps<typeof ContributionReward> & { review?: GithubContributionReviewStatus };

export function Contribution({ id, title, url, number, type, status, author, draft = false, rewards, review }: Props) {
  return (
    <div className="inline-flex items-center gap-2">
      <div className="inline-flex items-center gap-1">
        <ContributionBadge
          id={id}
          number={number}
          type={type}
          status={status}
          title={title}
          author={author}
          url={url}
          draft={draft}
        />
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
        {rewards.length ? <ContributionReward id={id} rewards={rewards} /> : null}
        {review && status === GithubContributionIconStatus.Open ? <ContributionReview status={review} /> : null}
      </div>
    </div>
  );
}
