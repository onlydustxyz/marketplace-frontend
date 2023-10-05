import { cn } from "src/utils/cn";

import { ContributionBadge } from "src/components/Contribution/ContributionBadge";
import { ContributionReview } from "src/components/Contribution/ContributionReview";
import { ContributionReward } from "src/components/Contribution/ContributionReward";
import { Link } from "src/components/Link/Link";
import {
  GithubCodeReviewOutcome,
  GithubContributionReviewStatus,
  GithubPullRequestStatus,
  QueryContribution,
} from "src/types";
import { getContributionInfo } from "src/utils/getContributionInfo";

type Props = {
  contribution: Pick<
    QueryContribution,
    "githubCodeReview" | "githubIssue" | "githubPullRequest" | "id" | "rewardItems" | "type"
  >;
  isMobile?: boolean;
};

export function Contribution({ contribution, isMobile = false }: Props) {
  const { githubPullRequest, id, rewardItems } = contribution;

  const { type, title, htmlUrl, author, status, number } = getContributionInfo(contribution);

  function renderReview() {
    if (githubPullRequest && status === GithubPullRequestStatus.Open) {
      let review = GithubContributionReviewStatus.PendingReviewer;
      const {
        codeReviews: [codeReview],
      } = githubPullRequest;

      switch (codeReview?.outcome) {
        case null:
          review = GithubContributionReviewStatus.UnderReview;
          break;
        case GithubCodeReviewOutcome.ChangesRequested:
          review = GithubContributionReviewStatus.ChangesRequested;
          break;
        case GithubCodeReviewOutcome.Approved:
          review = GithubContributionReviewStatus.Approved;
          break;
      }

      return <ContributionReview status={review} />;
    }

    return null;
  }

  return (
    <div
      className={cn("flex w-full gap-2", {
        "flex-col items-start": isMobile,
        "items-center": !isMobile,
      })}
    >
      <div className="flex min-w-0 items-center gap-1">
        <ContributionBadge
          id={id ?? ""}
          number={number}
          type={type}
          status={status}
          title={title}
          author={author}
          url={htmlUrl}
        />
        <Link href={htmlUrl} className="truncate text-sm hover:underline">
          {title}
        </Link>
      </div>
      <div className="inline-flex items-center gap-1 empty:hidden">
        {rewardItems?.length ? <ContributionReward id={id ?? ""} rewards={rewardItems} /> : null}
        {renderReview()}
      </div>
    </div>
  );
}
