import classNames from "classnames";
import { GithubPullRequestWithCommitsFragment } from "src/__generated/graphql";
import IssueClosed from "src/assets/icons/IssueClosed";
import Card from "src/components/Card";
import { GithubLink } from "src/components/GithubCard/GithubLink/GithubLink";
import Tooltip from "src/components/Tooltip";
import { useIntl } from "src/hooks/useIntl";
import GitCommitLine from "src/icons/GitCommitLine";
import GitMergeLine from "src/icons/GitMergeLine";
import GitPullRequestLine from "src/icons/GitPullRequestLine";
import GitRepositoryLine from "src/icons/GitRepositoryLine";
import Time from "src/icons/TimeLine";
import displayRelativeDate from "src/utils/displayRelativeDate";
import { parsePullRequestLink } from "src/utils/github";
import { GithubActionButton } from "src/components/GithubCard/GithubActionButton/GithubActionButton";
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

export type GithubPullRequestProps = {
  action?: Action;
  secondaryAction?: Action;
  onClick?: () => void;
  onSecondaryClick?: () => void;
  pullRequest: GithubPullRequestWithCommitsFragment;
  ignored?: boolean;
  addMarginTopForVirtuosoDisplay?: boolean;
};

export default function GithubPullRequest({
  action,
  secondaryAction,
  pullRequest,
  onClick,
  onSecondaryClick,
  ignored = false,
  addMarginTopForVirtuosoDisplay = false,
}: GithubPullRequestProps) {
  const { repoName } = parsePullRequestLink(pullRequest.htmlUrl ?? "");

  const userCommits = pullRequest?.userCommitsCount?.aggregate?.count;
  const commitsCount = pullRequest?.commitsCount?.aggregate?.count;

  return (
    <Card
      padded={false}
      className={classNames("flex flex-row gap-3 rounded-2xl p-4 hover:bg-noise-light hover:backdrop-blur-4xl", {
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
            <Time />
            {displayRelativeDate(pullRequest.createdAt)}
          </div>
          <div className="flex flex-row items-center gap-1">
            <PullRequestStatus pullrequest={pullRequest} />
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
                <CommitsTooltip pullRequest={pullRequest} userCommits={userCommits} commitsCount={commitsCount} />
              </Tooltip>
            ) : null}
          </div>
        </div>
      </div>
      {secondaryAction && <GithubActionButton action={secondaryAction} onClick={onSecondaryClick} ignored={ignored} />}
    </Card>
  );
}

function PullRequestStatus({ pullrequest }: { pullrequest: GithubPullRequestWithCommitsFragment }) {
  const { T } = useIntl();

  switch (pullrequest.status) {
    case GithubPullRequestStatus.Closed:
      return pullrequest.closedAt ? (
        <>
          <IssueClosed className="fill-github-red" />
          {T("githubIssue.status.closed", { closedAt: displayRelativeDate(pullrequest.closedAt) })}
        </>
      ) : null;
    case GithubPullRequestStatus.Merged:
      return pullrequest.mergedAt ? (
        <>
          <GitMergeLine className="-my-1 text-base text-github-purple" />
          {T("githubIssue.status.merged", { mergedAt: displayRelativeDate(pullrequest.mergedAt) })}
        </>
      ) : null;
    case GithubPullRequestStatus.Open:
      return (
        <>
          <GitPullRequestLine className="-my-1 text-base text-github-green" />
          {T("githubIssue.status.open")}
        </>
      );
    default:
      return <div />;
  }
}
