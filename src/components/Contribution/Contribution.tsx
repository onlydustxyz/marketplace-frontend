import { cn } from "src/utils/cn";

import { ContributionBadge } from "src/components/Contribution/ContributionBadge";
import { ContributionReview } from "src/components/Contribution/ContributionReview";
import { ContributionReward } from "src/components/Contribution/ContributionReward";
import { useAuth } from "src/hooks/useAuth";
import { useContributionDetailPanel } from "src/hooks/useContributionDetailPanel";
import {
  GithubCodeReviewOutcome,
  GithubContributionReviewStatus,
  GithubPullRequestStatus,
  Contribution as ContributionT,
} from "src/types";

type Props = {
  contribution: ContributionT;
  isMobile?: boolean;
};

export function Contribution({ contribution, isMobile = false }: Props) {
  const { githubPullRequest, project, rewardIds } = contribution;

  //   const { type, title, htmlUrl, author, status, number } = getContributionInfo(contribution);
  const {
    id,
    type,
    githubTitle: title,
    githubHtmlUrl: htmlUrl,
    githubAuthor: author,
    status,
    githubNumber: number,
  } = contribution;

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
          className="truncate text-left hover:underline"
          onClick={() => {
            if (githubUserId && id && contribution.project?.id)
              open({ githubUserId, contributionId: id, projectId: contribution.project.id }, htmlUrl);
          }}
        >
          {title}
        </button>
      </div>
      <div className="inline-flex items-center gap-1 empty:hidden">
        {rewardIds?.length ? (
          <ContributionReward contributionId={id} projectId={project.id} rewardIds={rewardIds} />
        ) : null}
        {renderReview()}
      </div>
    </div>
  );
}
