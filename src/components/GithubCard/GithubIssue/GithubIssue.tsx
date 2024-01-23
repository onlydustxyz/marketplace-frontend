import { RewardableItem } from "src/api/Project/queries";
import Card from "src/components/Card";
import { ContributionDate } from "src/components/Contribution/ContributionDate";
import { ContributionCreationDate } from "src/components/GithubCard/ContributionCreationDate";
import { GithubActionButton } from "src/components/GithubCard/GithubActionButton/GithubActionButton";
import { GithubLink } from "src/components/GithubCard/GithubLink/GithubLink";
import { TooltipPosition, Variant } from "src/components/Tooltip";
import GitCommentLine from "src/icons/GitCommentLine";
import GitRepositoryLine from "src/icons/GitRepositoryLine";
import { ContributionStatus, GithubContributionType, GithubIssueStatus } from "src/types";
import { cn } from "src/utils/cn";
import { parseIssueLink } from "src/utils/github";
import { RewardItem } from "src/hooks/useInfiniteRewardItems";
import { ContributionBadge } from "src/components/Contribution/ContributionBadge";
import { ComponentProps } from "react";

export enum Action {
  Add = "add",
  Remove = "remove",
  Ignore = "ignore",
  UnIgnore = "unignore",
}

function getIssueStatusDate(issue: Partial<RewardableItem & RewardItem>) {
  switch (issue.status) {
    case GithubIssueStatus.Cancelled:
    case GithubIssueStatus.Completed:
    case ContributionStatus.Completed:
    case ContributionStatus.Cancelled:
      return issue.completedAt ? new Date(issue.completedAt) : new Date();
    case GithubIssueStatus.Open:
    default:
      return new Date(issue.createdAt ?? new Date());
  }
}

export type GithubIssueProps = {
  action?: Action;
  secondaryAction?: Action;
  onClick?: () => void;
  onCardClick?: () => void;
  onSecondaryClick?: () => void;
  issue: Partial<RewardableItem & RewardItem>;
  ignored?: boolean;
  addMarginTopForVirtuosoDisplay?: boolean;
  badgeProps: ComponentProps<typeof ContributionBadge>;
  disabled?: boolean;
};

export default function GithubIssue({
  action,
  secondaryAction,
  issue,
  onClick,
  onCardClick,
  onSecondaryClick,
  ignored = false,
  addMarginTopForVirtuosoDisplay = false,
  badgeProps,
  disabled,
}: GithubIssueProps) {
  const { repoName } = parseIssueLink(issue?.htmlUrl || issue?.githubUrl || "");

  return (
    <div
      className={cn("w-full", {
        "cursor-pointer": onCardClick,
        "cursor-not-allowed": disabled,
      })}
      onClick={onCardClick}
    >
      <Card
        padded={false}
        className={cn("flex flex-row gap-3 rounded-2xl p-4 hover:bg-noise-light", {
          "mt-1": addMarginTopForVirtuosoDisplay,
        })}
        withBg={false}
      >
        {action && <GithubActionButton action={action} onClick={onClick} ignored={ignored} />}
        <div className="flex w-full flex-col gap-2 font-walsheim">
          <div className="flex items-center gap-2">
            <ContributionBadge {...badgeProps} />

            <div className="flex text-sm font-medium text-greyscale-50">
              <GithubLink url={issue?.htmlUrl || issue?.githubUrl || ""} text={issue.title} />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-normal text-greyscale-300 xl:gap-3">
            <div className="flex items-center gap-1">
              <ContributionCreationDate
                id={issue.id ?? ""}
                type={GithubContributionType.Issue}
                date={new Date(issue.createdAt ?? new Date())}
                tooltipProps={{
                  variant: Variant.Default,
                  position: TooltipPosition.Bottom,
                }}
              />
            </div>
            <div className="flex items-center gap-1">
              <ContributionDate
                id={issue.id ?? ""}
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
            <div className="flex items-center gap-1">
              <GitRepositoryLine />
              {repoName}
            </div>
            <div className="flex items-center gap-1">
              <GitCommentLine />
              {issue.commentsCount}
            </div>
          </div>
        </div>
        {secondaryAction && (
          <GithubActionButton action={secondaryAction} onClick={onSecondaryClick} ignored={ignored} />
        )}
      </Card>
    </div>
  );
}
