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
import { parseApiRepositoryLink } from "src/utils/github";
import { IssueDetailsFragment, Status } from "src/__generated/graphql";
import Button, { ButtonSize, ButtonType } from "../Button";
import Card from "../Card";
import ExternalLink from "../ExternalLink";
import Tooltip from "../Tooltip";

export enum Action {
  Add = "add",
  Remove = "remove",
}

export type WorkItem = IssueDetailsFragment;

export type Props = {
  action?: Action;
  onClick?: () => void;
  workItem: WorkItem;
};

export default function GithubIssue({ action, workItem, onClick }: Props) {
  const { T } = useIntl();
  const { owner, name } = parseApiRepositoryLink(workItem.repositoryUrl);

  return (
    <Card padded={false} blurred={false} className="p-4 flex flex-row gap-3">
      {action && (
        <>
          <div id={`github-issue-action-${workItem.id}`} onClick={onClick} className="h-fit">
            <Button size={ButtonSize.Sm} type={ButtonType.Secondary} iconOnly>
              {action === Action.Add && <Add />}
              {action === Action.Remove && <Subtract />}
            </Button>
          </div>
          {action === Action.Add && (
            <Tooltip anchorId={`github-issue-action-${workItem.id}`}>{T("githubIssue.addTooltip")}</Tooltip>
          )}
        </>
      )}
      <div className="flex flex-col gap-2 font-walsheim ">
        <div className="font-medium text-sm text-greyscale-50">
          <ExternalLink
            url={`https://github.com/${owner}/${name}/issues/${workItem.number}`}
            text={`#${workItem.number} · ${workItem.title}`}
          />
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
            {name}
          </div>
        </div>
      </div>
    </Card>
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
      ) : issue.status === Status.Open ? (
        <>
          <GitPullRequestLine className="text-github-green text-base -my-1" />
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
    number
    status
    title
    createdAt
    closedAt
    mergedAt
    repositoryUrl
  }
`;
