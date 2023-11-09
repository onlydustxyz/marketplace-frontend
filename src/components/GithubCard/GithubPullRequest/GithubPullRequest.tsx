import { GithubPullRequestWithCommitsFragment, GithubUserFragment } from "src/__generated/graphql";
import Card from "src/components/Card";
import { ContributionDate } from "src/components/Contribution/ContributionDate";
import { ContributionCreationDate } from "src/components/GithubCard/ContributionCreationDate";
import { GithubActionButton } from "src/components/GithubCard/GithubActionButton/GithubActionButton";
import { GithubLink } from "src/components/GithubCard/GithubLink/GithubLink";
import Tooltip, { TooltipPosition, Variant } from "src/components/Tooltip";
import GitCommitLine from "src/icons/GitCommitLine";
import GitRepositoryLine from "src/icons/GitRepositoryLine";
import { ContributionStatus, GithubContributionType } from "src/types";
import { cn } from "src/utils/cn";
import { parsePullRequestLink } from "src/utils/github";
import { CommitsTooltip } from "./CommitsTooltip";

export enum GithubPullRequestStatus {
  Merged = "MERGED",
  Open = "OPEN",
  Closed = "CLOSED",
}

export enum Action {
  Add = "add",
  Remove = "remove",
  Ignore = "ignore",
  UnIgnore = "unignore",
}

function getPullRequestStatusDate(pullRequest: GithubPullRequestWithCommitsFragment) {
  switch (pullRequest.status) {
    case GithubPullRequestStatus.Closed:
    case ContributionStatus.Cancelled:
      return new Date(pullRequest.closedAt);
    case GithubPullRequestStatus.Merged:
    case ContributionStatus.Completed:
      return new Date(pullRequest.mergedAt);
    case GithubPullRequestStatus.Open:
    case ContributionStatus.InProgress:
    default:
      return new Date(pullRequest.createdAt);
  }
}

export type GithubPullRequestProps = {
  action?: Action;
  secondaryAction?: Action;
  onClick?: () => void;
  onSecondaryClick?: () => void;
  pullRequest: GithubPullRequestWithCommitsFragment;
  ignored?: boolean;
  addMarginTopForVirtuosoDisplay?: boolean;
  contributor?: GithubUserFragment;
};

export default function GithubPullRequest({
  action,
  secondaryAction,
  pullRequest,
  onClick,
  onSecondaryClick,
  ignored = false,
  addMarginTopForVirtuosoDisplay = false,
  contributor,
}: GithubPullRequestProps) {
  const { repoName } = parsePullRequestLink(pullRequest.htmlUrl ?? "");

  const userCommits = pullRequest?.userCommitsCount?.aggregate?.count;
  const commitsCount = pullRequest?.commitsCount?.aggregate?.count;

  return pullRequest ? (
    <Card
      padded={false}
      className={cn("flex flex-row gap-3 rounded-2xl p-4 hover:bg-noise-light hover:backdrop-blur-4xl", {
        "mt-1": addMarginTopForVirtuosoDisplay,
      })}
      withBg={false}
    >
      {action && <GithubActionButton action={action} onClick={onClick} ignored={ignored} />}
      <div className="flex w-full flex-col gap-2 font-walsheim">
        <div className="flex text-sm font-medium text-greyscale-50">
          <GithubLink url={pullRequest.htmlUrl ?? ""} text={`#${pullRequest.number} · ${pullRequest.title}`} />
        </div>
        <div className="flex flex-row flex-wrap items-center gap-2 text-xs font-normal text-greyscale-300 xl:gap-3">
          <div className="flex flex-row items-center gap-1">
            <ContributionCreationDate
              id={pullRequest.id}
              type={GithubContributionType.PullRequest}
              date={new Date(pullRequest.createdAt)}
              tooltipProps={{
                variant: Variant.Default,
                position: TooltipPosition.Bottom,
              }}
            />
          </div>
          <div className="flex flex-row items-center gap-1">
            <ContributionDate
              id={pullRequest.id}
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
          <div className="inline-flex flex-row items-center gap-1">
            <GitRepositoryLine />
            {repoName}
          </div>

          <div id={pullRequest?.id} className="flex flex-row items-center gap-1 ">
            <GitCommitLine />
            {userCommits + "/" + commitsCount}

            {pullRequest?.author ? (
              <Tooltip anchorId={pullRequest?.id} clickable>
                <CommitsTooltip
                  pullRequest={pullRequest}
                  userCommits={userCommits}
                  commitsCount={commitsCount}
                  contributorLogin={contributor?.login ?? ""}
                />
              </Tooltip>
            ) : null}
          </div>
        </div>
      </div>
      {secondaryAction && <GithubActionButton action={secondaryAction} onClick={onSecondaryClick} ignored={ignored} />}
    </Card>
  ) : null;
}
