import Card from "src/components/Card";
import { ContributionDate } from "src/components/Contribution/ContributionDate";
import { ContributionCreationDate } from "src/components/GithubCard/ContributionCreationDate";
import { GithubActionButton } from "src/components/GithubCard/GithubActionButton/GithubActionButton";
import Tooltip, { TooltipPosition, Variant } from "src/components/Tooltip";
import GitCommitLine from "src/icons/GitCommitLine";
import GitRepositoryLine from "src/icons/GitRepositoryLine";
import { ContributionStatus, GithubContributionType, GithubPullRequestStatus } from "src/types";
import { cn } from "src/utils/cn";
import { parsePullRequestLink } from "src/utils/github";
import { CommitsTooltip } from "./CommitsTooltip";
import { RewardableItem } from "src/api/Project/queries";
import { RewardItem } from "src/hooks/useInfiniteRewardItems";
import { ContributionBadge } from "src/components/Contribution/ContributionBadge";
import { ComponentProps } from "react";
import { Link } from "components/ds/link/link";

export enum Action {
  Add = "add",
  Remove = "remove",
  Ignore = "ignore",
  UnIgnore = "unignore",
}

function getPullRequestStatusDate(pullRequest: Partial<RewardableItem & RewardItem>) {
  switch (pullRequest.status) {
    case GithubPullRequestStatus.Closed:
    case GithubPullRequestStatus.Merged:
    case ContributionStatus.Cancelled:
    case ContributionStatus.Completed:
      return pullRequest.completedAt ? new Date(pullRequest.completedAt) : new Date();
    case GithubPullRequestStatus.Open:
    case GithubPullRequestStatus.Draft:
    default:
      return new Date(pullRequest.createdAt ?? new Date());
  }
}

export type GithubPullRequestProps = {
  action?: Action;
  secondaryAction?: Action;
  onClick?: () => void;
  onCardClick?: () => void;
  onSecondaryClick?: () => void;
  pullRequest: Partial<RewardableItem & RewardItem>;
  ignored?: boolean;
  addMarginTopForVirtuosoDisplay?: boolean;
  contributorLogin?: string;
  badgeProps: ComponentProps<typeof ContributionBadge>;
  disabled?: boolean;
};

export default function GithubPullRequest({
  action,
  secondaryAction,
  pullRequest,
  onClick,
  onSecondaryClick,
  ignored = false,
  addMarginTopForVirtuosoDisplay = false,
  contributorLogin,
  onCardClick,
  badgeProps,
  disabled,
}: GithubPullRequestProps) {
  const { repoName } = parsePullRequestLink(pullRequest?.htmlUrl || pullRequest?.githubUrl || "");

  const userCommits = pullRequest?.userCommitsCount ?? 0;
  const commitsCount = pullRequest?.commitsCount ?? 0;

  return pullRequest ? (
    <div
      className={cn("w-full", {
        "cursor-pointer": onCardClick,
        "cursor-not-allowed": disabled,
      })}
      onClick={onCardClick}
    >
      <Card
        padded={false}
        className={cn("flex gap-3 rounded-2xl p-4 shadow-light hover:bg-noise-light hover:backdrop-blur-4xl", {
          "mt-1": addMarginTopForVirtuosoDisplay,
        })}
        withBg={false}
      >
        {action && <GithubActionButton action={action} onClick={onClick} ignored={ignored} />}
        <div className="flex w-full flex-col gap-2 font-walsheim">
          <div className="flex items-center gap-2">
            <ContributionBadge {...badgeProps} />

            <div className="text-sm font-medium text-greyscale-50">
              <Link href={pullRequest?.htmlUrl || pullRequest?.githubUrl || ""}>{pullRequest.title}</Link>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-normal text-greyscale-300 xl:gap-3">
            <div className="flex items-center gap-1">
              <ContributionCreationDate
                id={pullRequest.id ?? ""}
                type={GithubContributionType.PullRequest}
                date={new Date(pullRequest.createdAt ?? new Date())}
                tooltipProps={{
                  variant: Variant.Default,
                  position: TooltipPosition.Bottom,
                }}
              />
            </div>
            <div className="flex items-center gap-1">
              <ContributionDate
                id={pullRequest.id ?? ""}
                type={GithubContributionType.PullRequest}
                status={pullRequest.status as GithubPullRequestStatus}
                date={getPullRequestStatusDate(pullRequest)}
                tooltipProps={{
                  variant: Variant.Default,
                  position: TooltipPosition.Bottom,
                }}
                withIcon
              />
            </div>
            <div className="inline-flex items-center gap-1">
              <GitRepositoryLine />
              {repoName || pullRequest.repoName}
            </div>

            <div id={pullRequest?.id} className="flex items-center gap-1 ">
              <GitCommitLine />
              {userCommits + "/" + commitsCount}
              {pullRequest?.authorLogin ? (
                <Tooltip anchorId={pullRequest?.id} clickable>
                  <CommitsTooltip
                    author={{
                      authorLogin: pullRequest?.authorLogin,
                      authorAvatarUrl: pullRequest?.authorAvatarUrl,
                      githubAuthorId: pullRequest?.githubAuthorId,
                    }}
                    userCommits={userCommits}
                    commitsCount={commitsCount}
                    contributorLogin={contributorLogin ?? ""}
                  />
                </Tooltip>
              ) : null}
            </div>
          </div>
        </div>
        {secondaryAction && (
          <GithubActionButton action={secondaryAction} onClick={onSecondaryClick} ignored={ignored} />
        )}
      </Card>
    </div>
  ) : null;
}
