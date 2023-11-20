import { GithubIssueFragment, GithubIssueStatus } from "src/__generated/graphql";
import { RewardableItem } from "src/api/Project/queries";
import Card from "src/components/Card";
import { ContributionDate } from "src/components/Contribution/ContributionDate";
import { ContributionCreationDate } from "src/components/GithubCard/ContributionCreationDate";
import { GithubActionButton } from "src/components/GithubCard/GithubActionButton/GithubActionButton";
import { GithubLink } from "src/components/GithubCard/GithubLink/GithubLink";
import { TooltipPosition, Variant } from "src/components/Tooltip";
import GitCommentLine from "src/icons/GitCommentLine";
import GitRepositoryLine from "src/icons/GitRepositoryLine";
import { ContributionStatus, GithubContributionType } from "src/types";
import { cn } from "src/utils/cn";
import { parseIssueLink } from "src/utils/github";

export enum Action {
  Add = "add",
  Remove = "remove",
  Ignore = "ignore",
  UnIgnore = "unignore",
}

function getIssueStatusDate(issue: GithubIssueFragment) {
  switch (issue.status) {
    case GithubIssueStatus.Cancelled:
    case GithubIssueStatus.Completed:
    case ContributionStatus.Completed:
    case ContributionStatus.Cancelled:
      return new Date(issue.closedAt);
    case GithubIssueStatus.Open:
    case ContributionStatus.InProgress:
    default:
      return new Date(issue.createdAt);
  }
}

export type GithubIssueProps = {
  action?: Action;
  secondaryAction?: Action;
  onClick?: () => void;
  onSecondaryClick?: () => void;
  issue: RewardableItem;
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
      className={cn("flex flex-row gap-3 rounded-2xl p-4 hover:bg-noise-light", {
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
            <ContributionCreationDate
              id={issue.id}
              type={GithubContributionType.Issue}
              date={new Date(issue.createdAt)}
              tooltipProps={{
                variant: Variant.Default,
                position: TooltipPosition.Bottom,
              }}
            />
          </div>
          <div className="flex flex-row items-center gap-1">
            <ContributionDate
              id={issue.id}
              type={GithubContributionType.Issue}
              status={issue.status as GithubIssueStatus}
              date={getIssueStatusDate(issue)}
              tooltipProps={{
                variant: Variant.Default,
                position: TooltipPosition.Bottom,
              }}
              withIcon
            />
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
