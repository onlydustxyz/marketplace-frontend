import { useStackContribution } from "src/App/Stacks/Stacks";
import { ContributionReview, ReviewStateStatuses } from "src/components/Contribution/ContributionReview";
import { ContributionReward } from "src/components/Contribution/ContributionReward";
import { Contribution as ContributionT, GithubContributionType, GithubPullRequestStatus } from "src/types";
import { cn } from "src/utils/cn";

import { Link } from "components/ds/link/link";
import { ContributionBadge } from "components/features/contribution/contribution-badge/contribution-badge";

import { useCurrentUser } from "hooks/users/use-current-user/use-current-user";

type Props = {
  contribution: ContributionT;
  isMobile?: boolean;
  showExternal?: boolean;
};

export function Contribution({ contribution, isMobile = false, showExternal = false }: Props) {
  const { user } = useCurrentUser();
  const [openContributionPanel] = useStackContribution();

  const {
    githubPullRequestReviewState,
    githubHtmlUrl,
    githubStatus,
    githubTitle,
    id,
    project,
    rewardIds,
    type,
    githubAuthor: { githubUserId },
  } = contribution;

  const isMine = githubUserId === user?.githubUserId;

  function renderReview() {
    if (
      type === GithubContributionType.PullRequest &&
      githubStatus === GithubPullRequestStatus.Open &&
      githubPullRequestReviewState
    ) {
      return <ContributionReview status={ReviewStateStatuses[githubPullRequestReviewState]} />;
    }

    return null;
  }

  const handleClick = () => {
    if (id && project?.id) {
      openContributionPanel({
        contributionId: id,
        projectId: project.id,
        githubHtmlUrl,
      });
    }
  };

  return (
    <div
      className={cn("flex w-full gap-2", {
        "flex-col items-start": isMobile,
        "items-center": !isMobile,
      })}
    >
      <div className={cn("flex items-center gap-2 font-walsheim", isMobile ? "w-full" : "min-w-0")}>
        <ContributionBadge contribution={contribution} showExternal={showExternal} />
        {id && project?.id ? (
          <Link.Button onClick={handleClick} className="truncate break-all text-left">
            {githubTitle}
          </Link.Button>
        ) : (
          <span className="truncate break-all text-left">{githubTitle}</span>
        )}
      </div>
      <div className="inline-flex items-center gap-1 empty:hidden">
        {rewardIds?.length ? (
          <ContributionReward contributionId={id} rewardIds={rewardIds} projectId={project.id} isMine={isMine} />
        ) : null}
        {renderReview()}
      </div>
    </div>
  );
}
