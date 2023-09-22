import classNames from "classnames";
import { GithubCodeReviewFragment } from "src/__generated/graphql";
import CodeReviewCheckIcon from "src/assets/icons/CodeReviewCheckIcon";
import CodeReviewIcon from "src/assets/icons/CodeReviewIcon";
import Card from "src/components/Card";
import { GithubLink } from "src/components/GithubCard/GithubLink/GithubLink";
import { useIntl } from "src/hooks/useIntl";
import GitRepositoryLine from "src/icons/GitRepositoryLine";
import Time from "src/icons/TimeLine";
import displayRelativeDate from "src/utils/displayRelativeDate";
import { parsePullRequestLink } from "src/utils/github";
import { GithubActionButton } from "src/components/GithubCard/GithubActionButton/GithubActionButton";

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
  const { title, number, htmlUrl, createdAt } = codeReview?.githubPullRequest || {};
  const { repoName } = parsePullRequestLink(htmlUrl ?? "");

  return (
    <Card
      padded={false}
      className={classNames("flex flex-row gap-3 rounded-2xl p-4 hover:bg-noise-light", {
        "mt-1": addMarginTopForVirtuosoDisplay,
      })}
      withBg={false}
    >
      {action && <GithubActionButton action={action} onClick={onClick} ignored={ignored} />}
      <div className="flex w-full flex-col gap-3 truncate font-walsheim">
        <div className="flex text-sm font-medium text-greyscale-50">
          <GithubLink url={htmlUrl ?? ""} text={`#${number} · ${title}`} />
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
      {secondaryAction && <GithubActionButton action={secondaryAction} onClick={onSecondaryClick} ignored={ignored} />}
    </Card>
  );
}

function CodeReviewStatus({ codeReview }: { codeReview: GithubCodeReviewFragment }) {
  const { T } = useIntl();

  const status = codeReview?.status?.toUpperCase();

  switch (status) {
    case GithubCodeReviewStatus.Completed:
      return codeReview.outcome.toUpperCase() === GithubCodeReviewOutcome.ChangeRequested ? (
        <>
          <CodeReviewCheckIcon className="-my-1 text-base text-github-purple" />
          {T("githubCodeReview.status.changeRequested", { submittedAt: displayRelativeDate(codeReview.submittedAt) })}
        </>
      ) : (
        <>
          <CodeReviewCheckIcon className="-my-1 text-base text-github-purple" />
          {T("githubCodeReview.status.approved", { submittedAt: displayRelativeDate(codeReview.submittedAt) })}
        </>
      );
    case GithubCodeReviewStatus.Pending:
      return (
        <>
          <CodeReviewIcon className="-my-1 text-base text-github-green" />
          {T("githubCodeReview.status.pending")}
        </>
      );
    default:
      return null;
  }
}
