import { useIntl } from "src/hooks/useIntl";
import Add from "src/icons/Add";
import GitRepositoryLine from "src/icons/GitRepositoryLine";
import Subtract from "src/icons/SubtractLine";
import Time from "src/icons/TimeLine";
import displayRelativeDate from "src/utils/displayRelativeDate";
import { parseIssueLink } from "src/utils/github";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import Card from "src/components/Card";
import { GithubLink } from "src/components/GithubLink/GithubLink";
import CheckboxCircleLine from "src/icons/CheckboxCircleLine";
import IssueCancelled from "src/assets/icons/IssueCancelled";
import IssueOpen from "src/assets/icons/IssueOpen";
import EyeOffLine from "src/icons/EyeOffLine";
import EyeLine from "src/icons/EyeLine";
import classNames from "classnames";
import { withTooltip } from "src/components/Tooltip";
import { GithubIssueFragment, GithubIssueStatus } from "src/__generated/graphql";
import GitCommentLine from "src/icons/GitCommentLine";

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
  const { repoName } = parseIssueLink(issue.htmlUrl || "");

  return (
    <Card
      padded={false}
      className={classNames("flex flex-row gap-3 rounded-2xl p-4 hover:bg-noise-light", {
        "mt-1": addMarginTopForVirtuosoDisplay,
      })}
      withBg={false}
    >
      {action && <ActionButton action={action} onClick={onClick} ignored={ignored} />}
      <div className="flex w-full flex-col gap-2 font-walsheim">
        <div className="flex text-sm font-medium text-greyscale-50">
          <GithubLink url={issue.htmlUrl || ""} text={`#${issue.number} · ${issue.title}`} />
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
