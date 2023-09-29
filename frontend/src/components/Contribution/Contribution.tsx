import classNames from "classnames";
import { GithubPullRequestStatus, GithubUser } from "src/__generated/graphql";

import { ContributionBadge } from "src/components/Contribution/ContributionBadge";
import { ContributionReview } from "src/components/Contribution/ContributionReview";
import { ContributionReward } from "src/components/Contribution/ContributionReward";
import {
  GithubCodeReviewOutcome,
  GithubContributionReviewStatus,
  GithubContributionType,
  GithubItemStatus,
  GithubPullRequestDraft,
  QueryContribution,
} from "src/types";

type Props = {
  contribution: Pick<
    QueryContribution,
    "githubCodeReview" | "githubIssue" | "githubPullRequest" | "id" | "rewardItems" | "type"
  >;
  isMobile?: boolean;
};

export function Contribution({ contribution, isMobile = false }: Props) {
  const { githubIssue, githubPullRequest, githubCodeReview, id, rewardItems, type } = contribution;

  const title = githubIssue?.title ?? githubPullRequest?.title ?? githubCodeReview?.githubPullRequest?.title ?? "";
  const htmlUrl =
    githubIssue?.htmlUrl ?? githubPullRequest?.htmlUrl ?? githubCodeReview?.githubPullRequest?.htmlUrl ?? "";
  const number = githubIssue?.number ?? githubPullRequest?.number ?? githubCodeReview?.githubPullRequest?.number ?? "";
  const status = githubPullRequest?.draft
    ? GithubPullRequestDraft.Draft
    : ((githubIssue?.status ?? githubPullRequest?.status ?? githubCodeReview?.status ?? "") as GithubItemStatus);
  const author = (githubIssue?.author ?? githubPullRequest?.author ?? githubCodeReview?.reviewer ?? "") as GithubUser;

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
      className={classNames("flex w-full gap-2", {
        "flex-col items-start": isMobile,
        "items-center": !isMobile,
      })}
    >
      <div className="flex min-w-0 items-center gap-1">
        <ContributionBadge
          id={id ?? ""}
          number={number}
          type={type as GithubContributionType}
          status={status}
          title={title}
          author={author}
          url={htmlUrl}
        />
        <a href={htmlUrl} target="_blank" rel="noopener noreferrer" className="truncate text-sm hover:underline">
          {title}
        </a>
      </div>
      <div className="inline-flex items-center gap-1 empty:hidden">
        {rewardItems?.length ? <ContributionReward id={id ?? ""} rewards={rewardItems} /> : null}
        {renderReview()}
      </div>
    </div>
  );
}
