import { gql } from "@apollo/client";
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
import { IssueDetailsFragment, Status, Type } from "src/__generated/graphql";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import Card from "src/components/Card";
import ExternalLink from "src/components/ExternalLink";
import Tooltip from "src/components/Tooltip";
import CheckboxCircleLine from "src/icons/CheckboxCircleLine";
import IssueCancelled from "src/assets/icons/IssueCancelled";
import IssueOpen from "src/assets/icons/IssueOpen";
import EyeOffLine from "src/icons/EyeOffLine";
import EyeLine from "src/icons/EyeLine";

export enum Action {
  Add = "add",
  Remove = "remove",
  Ignore = "ignore",
  UnIgnore = "unignore",
}

export type WorkItem = IssueDetailsFragment;

export type Props = {
  action?: Action;
  secondaryAction?: Action;
  onClick?: () => void;
  onSecondaryClick?: () => void;
  workItem: WorkItem;
};

export default function GithubIssue({ action, secondaryAction, workItem, onClick, onSecondaryClick }: Props) {
  const { repoName } = parsePullRequestOrIssueLink(workItem.htmlUrl);

  return (
    <Card padded={false}>
      <div className="p-4 flex flex-row gap-3 hover:bg-noise-light hover:backdrop-blur-4xl rounded-2xl ">
        {action && <ActionButton id={`github-issue-action-${workItem.id}`} action={action} onClick={onClick} />}
        <div className="flex flex-col gap-2 font-walsheim grow">
          <div className="font-medium text-sm text-greyscale-50">
            <ExternalLink url={workItem.htmlUrl} text={`#${workItem.number} · ${workItem.title}`} numberOfLines={2} />
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
          />
        )}
      </div>
    </Card>
  );
}

type ActionButtonProps = {
  id: string;
  action: Action;
  onClick?: () => void;
};

function ActionButton({ id, action, onClick }: ActionButtonProps) {
  const { T } = useIntl();

  return (
    <>
      <Button size={ButtonSize.Sm} type={ButtonType.Secondary} id={id} onClick={onClick} iconOnly>
        {action === Action.Add && <Add />}
        {action === Action.Remove && <Subtract />}
        {action === Action.Ignore && <EyeOffLine />}
        {action === Action.UnIgnore && <EyeLine />}
      </Button>
      {action === Action.Add && <Tooltip anchorId={id}>{T("githubIssue.tooltip.add")}</Tooltip>}
      {action === Action.Ignore && <Tooltip anchorId={id}>{T("githubIssue.tooltip.ignore")}</Tooltip>}
      {action === Action.UnIgnore && <Tooltip anchorId={id}>{T("githubIssue.tooltip.unignore")}</Tooltip>}
    </>
  );
}

function IssueStatus({ issue }: { issue: IssueDetailsFragment }) {
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

export const GITHUB_ISSUE_FRAGMENTS = gql`
  fragment IssueDetails on Issue {
    id
    repoId
    number
    type
    status
    title
    htmlUrl
    createdAt
    closedAt
    mergedAt
  }
`;
