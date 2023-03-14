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
import { PullRequestDetailsFragment, RepositoryDetailsForGithubIssueFragment, Status } from "src/__generated/graphql";
import Button, { ButtonSize, ButtonType } from "../Button";
import Card from "../Card";
import ExternalLink from "../ExternalLink";
import Tooltip from "../Tooltip";

export enum Action {
  Add = "add",
  Remove = "remove",
}

export type WorkItem = {
  repository: RepositoryDetailsForGithubIssueFragment;
  issue: PullRequestDetailsFragment;
};

export type Props = {
  action?: Action;
  onClick?: () => void;
} & WorkItem;

export default function GithubIssue({ action, repository, issue, onClick }: Props) {
  const { T } = useIntl();

  return (
    <Card padded={false} blurred={false} className="p-4 flex flex-row gap-3">
      {action && (
        <>
          <div id={`github-issue-action-${issue.id}`} onClick={onClick} className="h-fit">
            <Button size={ButtonSize.Sm} type={ButtonType.Secondary} iconOnly>
              {action === Action.Add && <Add />}
              {action === Action.Remove && <Subtract />}
            </Button>
          </div>
          {action === Action.Add && (
            <Tooltip anchorId={`github-issue-action-${issue.id}`}>{T("githubIssue.addTooltip")}</Tooltip>
          )}
        </>
      )}
      <div className="flex flex-col gap-2 font-walsheim ">
        <div className="font-medium text-sm text-greyscale-50">
          <ExternalLink
            url={`https://github.com/${repository.owner}/${repository.name}/issues/${issue.number}`}
            text={`#${issue.number} · ${issue.title}`}
          />
        </div>
        <div className="flex flex-row gap-3 items-center text-greyscale-300 font-normal text-xs">
          <div className="flex flex-row gap-1 items-center">
            <Time />
            {displayRelativeDate(issue.createdAt)}
          </div>
          <div className="flex flex-row gap-1 items-center">
            <IssueStatus issue={issue} />
          </div>
          <div className="flex flex-row gap-1 items-center">
            <GitRepositoryLine />
            {repository.name}
          </div>
        </div>
      </div>
    </Card>
  );
}

function IssueStatus({ issue }: { issue: PullRequestDetailsFragment }) {
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
  fragment RepositoryDetailsForGithubIssue on GithubRepoDetails {
    owner
    name
  }

  fragment PullRequestDetails on PullRequest {
    id
    number
    status
    title
    createdAt
    closedAt
    mergedAt
  }
`;
