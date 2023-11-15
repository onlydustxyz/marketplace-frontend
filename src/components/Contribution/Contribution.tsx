import { cn } from "src/utils/cn";

import { ContributionBadge } from "src/components/Contribution/ContributionBadge";
import { ContributionReview } from "src/components/Contribution/ContributionReview";
import { ContributionReward } from "src/components/Contribution/ContributionReward";
import { useContributionDetailPanel } from "src/hooks/useContributionDetailPanel";
import {
  GithubContributionReviewStatus,
  GithubPullRequestStatus,
  Contribution as ContributionT,
  GithubContributionType,
} from "src/types";

type Props = {
  contribution: ContributionT;
  isMobile?: boolean;
};

export function Contribution({ contribution, isMobile = false }: Props) {
  const { open } = useContributionDetailPanel();

  const { githubCodeReviewOutcome, githubHtmlUrl, githubStatus, githubTitle, id, project, rewardIds, type } =
    contribution;

  function renderReview() {
    if (type === GithubContributionType.PullRequest && githubStatus === GithubPullRequestStatus.Open) {
      let review = GithubContributionReviewStatus.PendingReviewer;

      if (githubCodeReviewOutcome === "COMMENTED") {
        review = GithubContributionReviewStatus.UnderReview;
      }

      if (githubCodeReviewOutcome === "CHANGES_REQUESTED") {
        review = GithubContributionReviewStatus.ChangesRequested;
      }

      if (githubCodeReviewOutcome === "APPROVED") {
        review = GithubContributionReviewStatus.Approved;
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
      <div className={cn("flex items-center gap-2 font-walsheim", isMobile ? "w-full" : "min-w-0")}>
        <ContributionBadge contribution={contribution} />
        <button
          className="truncate break-all text-left hover:underline"
          onClick={() => {
            if (id && contribution.project?.id)
              open({ contributionId: id, projectId: contribution.project.id }, githubHtmlUrl);
          }}
        >
          {githubTitle}
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
