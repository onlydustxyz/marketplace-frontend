import classNames from "classnames";
import { GithubIssueFragment, GithubIssueStatus } from "src/__generated/graphql";
import IssueCancelled from "src/assets/icons/IssueCancelled";
import IssueOpen from "src/assets/icons/IssueOpen";
import Card from "src/components/Card";
import { GithubLink } from "src/components/GithubCard/GithubLink/GithubLink";
import { useIntl } from "src/hooks/useIntl";
import CheckboxCircleLine from "src/icons/CheckboxCircleLine";
import GitCommentLine from "src/icons/GitCommentLine";
import GitRepositoryLine from "src/icons/GitRepositoryLine";
import Time from "src/icons/TimeLine";
import displayRelativeDate from "src/utils/displayRelativeDate";
import { parseIssueLink } from "src/utils/github";
import { GithubActionButton } from "src/components/GithubCard/GithubActionButton/GithubActionButton";

export enum Action {
  Add = "add",
  Remove = "remove",
  Ignore = "ignore",
  UnIgnore = "unignore",
}

export type GithubIssueProps = {
  action?: Action;
  secondaryAction?: Action;
  onClick?: () => void;
  onSecondaryClick?: () => void;
  issue: GithubIssueFragment;
  ignored?: boolean;
  addMarginTopForVirtuosoDisplay?: boolean;
};

export default function GithubIssue({
  action,
  secondaryAction,
  issue,
  onClick,
  onSecondaryClick,
  ignored = false,
  addMarginTopForVirtuosoDisplay = false,
}: GithubIssueProps) {
  const { repoName } = parseIssueLink(issue.htmlUrl ?? "");

  return (
    <Card
      padded={false}
      className={classNames("flex flex-row gap-3 rounded-2xl p-4 hover:bg-noise-light", {
        "mt-1": addMarginTopForVirtuosoDisplay,
      })}
      withBg={false}
    >
      {action && <GithubActionButton action={action} onClick={onClick} ignored={ignored} />}
      <div className="flex w-full flex-col gap-2 font-walsheim">
        <div className="flex text-sm font-medium text-greyscale-50">
          <GithubLink url={issue.htmlUrl ?? ""} text={`#${issue.number} · ${issue.title}`} />
        </div>
        <div className="flex flex-row flex-wrap items-center gap-2 text-xs font-normal text-greyscale-300 xl:gap-3">
          <div className="flex flex-row items-center gap-1">
            <Time />
            {displayRelativeDate(issue.createdAt)}
          </div>
          <div className="flex flex-row items-center gap-1">
            <IssueStatus issue={issue} />
          </div>
          <div className="flex flex-row items-center gap-1">
            <GitRepositoryLine />
            {repoName}
          </div>
          <div className="flex flex-row items-center gap-1">
            <GitCommentLine />
            {issue.commentsCount}
          </div>
        </div>
      </div>
      {secondaryAction && <GithubActionButton action={secondaryAction} onClick={onSecondaryClick} ignored={ignored} />}
    </Card>
  );
}

function IssueStatus({ issue }: { issue: GithubIssueFragment }) {
  const { T } = useIntl();

  switch (issue.status) {
    case GithubIssueStatus.Cancelled:
      return issue.closedAt ? (
        <>
          <IssueCancelled className="fill-github-grey p-0.5" />
          {T("githubIssue.status.closed", { closedAt: displayRelativeDate(issue.closedAt) })}
        </>
      ) : null;
    case GithubIssueStatus.Completed:
      return issue.closedAt ? (
        <>
          <CheckboxCircleLine className="-my-1 text-base text-github-purple" />
          {T("githubIssue.status.closed", { closedAt: displayRelativeDate(issue.closedAt) })}
        </>
      ) : null;
    case GithubIssueStatus.Open:
      return (
        <>
          <IssueOpen className="fill-github-green p-0.5" />
          {T("githubIssue.status.open")}
        </>
      );
    default:
      return <div />;
  }
}
