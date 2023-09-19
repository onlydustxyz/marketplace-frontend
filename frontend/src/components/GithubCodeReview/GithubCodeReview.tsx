import { useIntl } from "src/hooks/useIntl";
import Add from "src/icons/Add";
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
import { GithubCodeReviewFragment } from "src/__generated/graphql";
import { GithubLink } from "src/components/GithubLink/GithubLink";
import CodeReviewCheckIcon from "src/assets/icons/CodeReviewCheckIcon";
import CodeReviewIcon from "src/assets/icons/CodeReviewIcon";

export enum Action {
  Add = "add",
  Remove = "remove",
  Ignore = "ignore",
  UnIgnore = "unignore",
}

export enum GithubCodeReviewStatus {
  Pending = "PENDING",
  Completed = "COMPLETED",
}

export enum GithubCodeReviewOutcome {
  Approved = "APPROVED",
  ChangeRequested = "CHANGE_REQUESTED",
}

export type GithubCodeReviewProps = {
  action?: Action;
  secondaryAction?: Action;
  onClick?: () => void;
  onSecondaryClick?: () => void;
  codeReview: GithubCodeReviewFragment;
  ignored?: boolean;
  addMarginTopForVirtuosoDisplay?: boolean;
};

export default function GithubCodeReview({
  action,
  secondaryAction,
  codeReview,
  onClick,
  onSecondaryClick,
  ignored = false,
  addMarginTopForVirtuosoDisplay = false,
}: GithubCodeReviewProps) {
  const { title, number, htmlUrl, createdAt } = codeReview?.pullRequest || {};
  const { repoName } = parsePullRequestLink(htmlUrl || "");

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
          <GithubLink url={htmlUrl || ""} text={`#${number} · ${title}`} />
        </div>
        <div className="flex flex-row flex-wrap items-center gap-2 text-xs font-normal text-greyscale-300 xl:gap-3">
          <div className="flex flex-row items-center gap-1">
            <Time />
            {displayRelativeDate(createdAt)}
          </div>
          <div className="flex flex-row items-center gap-1">{<CodeReviewStatus codeReview={codeReview} />}</div>
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

function CodeReviewStatus({ codeReview }: { codeReview: GithubCodeReviewFragment }) {
  const { T } = useIntl();

  const status = codeReview?.status?.toUpperCase();

  switch (status) {
    case GithubCodeReviewStatus.Completed:
      return codeReview.outcome.toUpperCase() === GithubCodeReviewOutcome.ChangeRequested ? (
        <>
          <CodeReviewCheckIcon size={12} className="-my-1 text-base text-github-purple" />
          {T("githubCodeReview.status.changeRequested", { submittedAt: displayRelativeDate(codeReview.submittedAt) })}
        </>
      ) : (
        <>
          <CodeReviewCheckIcon size={12} className="-my-1 text-base text-github-purple" />
          {T("githubCodeReview.status.approved", { submittedAt: displayRelativeDate(codeReview.submittedAt) })}
        </>
      );
    case GithubCodeReviewStatus.Pending:
      return (
        <>
          <CodeReviewIcon size={12} className="-my-1 text-base text-github-green" />
          {T("githubCodeReview.status.pending")}
        </>
      );
    default:
      return <div />;
  }
}
