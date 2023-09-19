import IssueClosed from "src/assets/icons/IssueClosed";
import { useIntl } from "src/hooks/useIntl";
import Add from "src/icons/Add";
import GitMergeLine from "src/icons/GitMergeLine";
import GitPullRequestLine from "src/icons/GitPullRequestLine";
import GitRepositoryLine from "src/icons/GitRepositoryLine";
import Subtract from "src/icons/SubtractLine";
import Time from "src/icons/TimeLine";
import displayRelativeDate from "src/utils/displayRelativeDate";
import { parsePullRequestLink } from "src/utils/github";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import Card from "src/components/Card";
import EyeOffLine from "src/icons/EyeOffLine";
import EyeLine from "src/icons/EyeLine";
import classNames from "classnames";
import { withTooltip } from "src/components/Tooltip";
import { GithubPullRequestFragment, GithubPullRequestStatus } from "src/__generated/graphql";
import { GithubLink } from "src/components/GithubLink/GithubLink";

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
  pullRequest: GithubPullRequestFragment;
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
  const { repoName } = parsePullRequestLink(pullRequest.htmlUrl || "");

  return (
    <Card
      padded={false}
      className={classNames("flex flex-row gap-3 rounded-2xl p-4 hover:bg-noise-light hover:backdrop-blur-4xl ", {
        "mt-1": addMarginTopForVirtuosoDisplay,
      })}
      withBg={false}
    >
      {action && <ActionButton action={action} onClick={onClick} ignored={ignored} />}
      <div className="flex w-full flex-col gap-2 font-walsheim">
        <div className="flex text-sm font-medium text-greyscale-50">
          <GithubLink url={pullRequest.htmlUrl || ""} text={`#${pullRequest.number} · ${pullRequest.title}`} />
        </div>
        <div className="flex flex-row flex-wrap items-center gap-2 text-xs font-normal text-greyscale-300 xl:gap-3">
          <div className="flex flex-row items-center gap-1">
            <Time />
            {displayRelativeDate(pullRequest.createdAt)}
          </div>
          <div className="flex flex-row items-center gap-1">
            <PullRequestStatus pullrequest={pullRequest} />
          </div>
          <div className="flex flex-row items-center gap-1">
            <GitRepositoryLine />
            {repoName}
          </div>
        </div>
      </div>
      {secondaryAction && <ActionButton action={secondaryAction} onClick={onSecondaryClick} ignored={ignored} />}
    </Card>
  );
}

type ActionButtonProps = {
  action: Action;
  ignored: boolean;
  onClick?: () => void;
};

function ActionButton({ action, ignored, onClick }: ActionButtonProps) {
  const { T } = useIntl();

  return (
    <div className={classNames({ "opacity-70": ignored })}>
      <Button
        size={ButtonSize.Sm}
        type={ButtonType.Secondary}
        onClick={onClick}
        iconOnly
        {...withTooltip(action !== Action.Remove ? T(`githubIssue.tooltip.${action}`) : "", {
          visible: action !== Action.Remove,
        })}
      >
        {action === Action.Add && <Add />}
        {action === Action.Remove && <Subtract />}
        {action === Action.Ignore && <EyeOffLine />}
        {action === Action.UnIgnore && <EyeLine />}
      </Button>
    </div>
  );
}

function PullRequestStatus({ pullrequest }: { pullrequest: GithubPullRequestFragment }) {
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
