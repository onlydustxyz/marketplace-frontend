import IssueClosed from "src/assets/icons/IssueClosed";
import { useIntl } from "src/hooks/useIntl";
import Add from "src/icons/Add";
import GitMergeLine from "src/icons/GitMergeLine";
import GitPullRequestLine from "src/icons/GitPullRequestLine";
import GitRepositoryLine from "src/icons/GitRepositoryLine";
import Subtract from "src/icons/SubtractLine";
import Time from "src/icons/TimeLine";
import displayRelativeDate from "src/utils/displayRelativeDate";
import { parsePullRequestOrIssueLink } from "src/utils/github";
import { Status, Type } from "src/__generated/graphql";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import Card from "src/components/Card";
import GithubIssueLink from "./GithubIssueLink";
import Tooltip from "src/components/Tooltip";
import CheckboxCircleLine from "src/icons/CheckboxCircleLine";
import IssueCancelled from "src/assets/icons/IssueCancelled";
import IssueOpen from "src/assets/icons/IssueOpen";
import EyeOffLine from "src/icons/EyeOffLine";
import EyeLine from "src/icons/EyeLine";
import classNames from "classnames";

export enum Action {
  Add = "add",
  Remove = "remove",
  Ignore = "ignore",
  UnIgnore = "unignore",
}

export type WorkItem = {
  id: string;
  repoId: number;
  number: number;
  type: Type;
  title: string;
  htmlUrl: string;
  createdAt: Date;
  ignored: boolean;
} & (
  | { status: Status.Open }
  | { status: Status.Merged; mergedAt: Date }
  | { status: Status.Cancelled | Status.Closed | Status.Completed; closedAt: Date }
);

export type Props = {
  action?: Action;
  secondaryAction?: Action;
  onClick?: () => void;
  onSecondaryClick?: () => void;
  workItem: WorkItem;
  ignored?: boolean;
};

export default function GithubIssue({
  action,
  secondaryAction,
  workItem,
  onClick,
  onSecondaryClick,
  ignored = false,
}: Props) {
  const { repoName } = parsePullRequestOrIssueLink(workItem.htmlUrl);

  return (
    <Card padded={false} className="p-4 flex flex-row gap-3 hover:bg-noise-light hover:backdrop-blur-4xl rounded-2xl">
      {action && (
        <ActionButton id={`github-issue-action-${workItem.id}`} action={action} onClick={onClick} ignored={ignored} />
      )}
      <div className="flex flex-col gap-2 font-walsheim w-full">
        <div className="flex font-medium text-sm text-greyscale-50">
          <GithubIssueLink url={workItem.htmlUrl} text={`#${workItem.number} · ${workItem.title}`} />
        </div>
        <div className="flex flex-row gap-3 items-center text-greyscale-300 font-normal text-xs">
          <div className="flex flex-row gap-1 items-center">
            <Time />
            {displayRelativeDate(workItem.createdAt)}
          </div>
          <div className="flex flex-row gap-1 items-center">
            <IssueStatus issue={workItem} />
          </div>
          <div className="flex flex-row gap-1 items-center">
            <GitRepositoryLine />
            {repoName}
          </div>
        </div>
      </div>
      {secondaryAction && (
        <ActionButton
          id={`github-issue-secondary-action-${workItem.id}`}
          action={secondaryAction}
          onClick={onSecondaryClick}
          ignored={ignored}
        />
      )}
    </Card>
  );
}

type ActionButtonProps = {
  id: string;
  action: Action;
  ignored: boolean;
  onClick?: () => void;
};

function ActionButton({ id, action, ignored, onClick }: ActionButtonProps) {
  const { T } = useIntl();

  return (
    <>
      <div className={classNames({ "opacity-70": ignored })}>
        <Button size={ButtonSize.Sm} type={ButtonType.Secondary} id={id} onClick={onClick} iconOnly>
          {action === Action.Add && <Add />}
          {action === Action.Remove && <Subtract />}
          {action === Action.Ignore && <EyeOffLine />}
          {action === Action.UnIgnore && <EyeLine />}
        </Button>
      </div>
      {action === Action.Add && <Tooltip anchorId={id}>{T("githubIssue.tooltip.add")}</Tooltip>}
      {action === Action.Ignore && <Tooltip anchorId={id}>{T("githubIssue.tooltip.ignore")}</Tooltip>}
      {action === Action.UnIgnore && <Tooltip anchorId={id}>{T("githubIssue.tooltip.unignore")}</Tooltip>}
    </>
  );
}

function IssueStatus({ issue }: { issue: WorkItem }) {
  const { T } = useIntl();

  return (
    <>
      {issue.status === Status.Closed ? (
        <>
          <IssueClosed className="fill-github-red" />
          {T("githubIssue.status.closed", { closedAt: displayRelativeDate(issue.closedAt) })}
        </>
      ) : issue.status === Status.Cancelled ? (
        <>
          <IssueCancelled className="fill-github-grey p-0.5" />
          {T("githubIssue.status.closed", { closedAt: displayRelativeDate(issue.closedAt) })}
        </>
      ) : issue.status === Status.Completed ? (
        <>
          <CheckboxCircleLine className="text-github-purple text-base -my-1" />
          {T("githubIssue.status.closed", { closedAt: displayRelativeDate(issue.closedAt) })}
        </>
      ) : issue.status === Status.Open ? (
        <>
          {issue.type === Type.Issue ? (
            <IssueOpen className="fill-github-green p-0.5" />
          ) : (
            <GitPullRequestLine className="text-github-green text-base -my-1" />
          )}
          {T("githubIssue.status.open")}
        </>
      ) : issue.status === Status.Merged ? (
        <>
          <GitMergeLine className="text-github-purple text-base -my-1" />
          {T("githubIssue.status.merged", { mergedAt: displayRelativeDate(issue.mergedAt) })}
        </>
      ) : (
        <div />
      )}
    </>
  );
}
