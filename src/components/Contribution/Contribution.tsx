import { cn } from "src/utils/cn";

import { ComponentProps } from "react";
import { ContributionBadge } from "src/components/Contribution/ContributionBadge";
import { ContributionReview } from "src/components/Contribution/ContributionReview";
import { ContributionReward } from "src/components/Contribution/ContributionReward";
import { useAuth } from "src/hooks/useAuth";
import { useContributionDetailPanel } from "src/hooks/useContributionDetailPanel";
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
    "githubCodeReview" | "githubIssue" | "githubPullRequest" | "id" | "rewardItems" | "type" | "project"
  >;
  isMobile?: boolean;
};

export function Contribution({ contribution, isMobile = false }: Props) {
  const { githubPullRequest, id, rewardItems } = contribution;

  const { type, title, htmlUrl, author, status, number } = getContributionInfo(contribution);

  const { githubUserId } = useAuth();
  const { open } = useContributionDetailPanel();

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
      <div className="flex min-w-0 items-center gap-2 font-walsheim">
        <ContributionBadge
          id={id ?? ""}
          number={number}
          type={type}
          status={status}
          title={title}
          author={author}
          url={htmlUrl}
        />
        <button
          className="text-left hover:underline"
          onClick={() => {
            if (githubUserId && id && contribution.project?.id)
              open({ githubUserId, contributionId: id, projectId: contribution.project.id }, htmlUrl);
          }}
        >
          {title}
        </button>
      </div>
      <div className="inline-flex items-center gap-1 empty:hidden">
        {rewardItems?.length ? (
          <ContributionReward
            id={id ?? ""}
            rewards={rewardItems as ComponentProps<typeof ContributionReward>["rewards"]}
          />
        ) : null}
        {renderReview()}
      </div>
    </div>
  );
}
