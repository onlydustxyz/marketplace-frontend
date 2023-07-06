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
import CheckboxCircleLine from "src/icons/CheckboxCircleLine";
import IssueCancelled from "src/assets/icons/IssueCancelled";
import IssueOpen from "src/assets/icons/IssueOpen";
import EyeOffLine from "src/icons/EyeOffLine";
import EyeLine from "src/icons/EyeLine";
import classNames from "classnames";
import { withTooltip } from "src/components/Tooltip";

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
  addMarginTopForVirtuosoDisplay?: boolean;
};

export default function GithubIssue({
  action,
  secondaryAction,
  workItem,
  onClick,
  onSecondaryClick,
  ignored = false,
  addMarginTopForVirtuosoDisplay = false,
}: Props) {
  const { repoName } = parsePullRequestOrIssueLink(workItem.htmlUrl);

  return (
    <Card
      padded={false}
      className={classNames("flex flex-row gap-3 rounded-2xl p-4 hover:bg-noise-light hover:backdrop-blur-4xl ", {
        "mt-1": addMarginTopForVirtuosoDisplay,
      })}
    >
      {action && <ActionButton action={action} onClick={onClick} ignored={ignored} />}
      <div className="flex w-full flex-col gap-2 font-walsheim">
        <div className="flex text-sm font-medium text-greyscale-50">
          <GithubIssueLink url={workItem.htmlUrl} text={`#${workItem.number} · ${workItem.title}`} />
        </div>
        <div className="flex flex-row flex-wrap items-center gap-2 text-xs font-normal text-greyscale-300 xl:gap-3">
          <div className="flex flex-row items-center gap-1">
            <Time />
            {displayRelativeDate(workItem.createdAt)}
          </div>
          <div className="flex flex-row items-center gap-1">
            <IssueStatus issue={workItem} />
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
          <CheckboxCircleLine className="-my-1 text-base text-github-purple" />
          {T("githubIssue.status.closed", { closedAt: displayRelativeDate(issue.closedAt) })}
        </>
      ) : issue.status === Status.Open ? (
        <>
          {issue.type === Type.Issue ? (
            <IssueOpen className="fill-github-green p-0.5" />
          ) : (
            <GitPullRequestLine className="-my-1 text-base text-github-green" />
          )}
          {T("githubIssue.status.open")}
        </>
      ) : issue.status === Status.Merged ? (
        <>
          <GitMergeLine className="-my-1 text-base text-github-purple" />
          {T("githubIssue.status.merged", { mergedAt: displayRelativeDate(issue.mergedAt) })}
        </>
      ) : (
        <div />
      )}
    </>
  );
}
