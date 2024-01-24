import { RewardableItem } from "src/api/Project/queries";
import Card from "src/components/Card";
import { ContributionDate } from "src/components/Contribution/ContributionDate";
import { ContributionCreationDate } from "src/components/GithubCard/ContributionCreationDate";
import { GithubActionButton } from "src/components/GithubCard/GithubActionButton/GithubActionButton";
import { GithubLink } from "src/components/GithubCard/GithubLink/GithubLink";
import { TooltipPosition, Variant } from "src/components/Tooltip";
import GitRepositoryLine from "src/icons/GitRepositoryLine";
import { ContributionStatus, GithubCodeReviewStatus, GithubContributionType } from "src/types";
import { cn } from "src/utils/cn";
import { parsePullRequestLink } from "src/utils/github";
import { RewardItem } from "src/hooks/useInfiniteRewardItems";
import { ContributionBadge } from "src/components/Contribution/ContributionBadge";
import { ComponentProps } from "react";

export enum Action {
  Add = "add",
  Remove = "remove",
  Ignore = "ignore",
  UnIgnore = "unignore",
}

function getCodeReviewStatusDate(codeReview: Partial<RewardableItem & RewardItem>) {
  switch (codeReview?.status) {
    case GithubCodeReviewStatus.Approved:
    case GithubCodeReviewStatus.Dismissed:
    case ContributionStatus.Completed:
      return codeReview.completedAt ? new Date(codeReview.completedAt) : new Date();
    case GithubCodeReviewStatus.Pending:
    case GithubCodeReviewStatus.ChangeRequested:
    case GithubCodeReviewStatus.Commented:
    default:
      return new Date(codeReview.createdAt ?? new Date());
  }
}

export type GithubCodeReviewProps = {
  action?: Action;
  secondaryAction?: Action;
  onClick?: () => void;
  onCardClick?: () => void;
  onSecondaryClick?: () => void;
  codeReview: Partial<RewardableItem & RewardItem>;
  ignored?: boolean;
  addMarginTopForVirtuosoDisplay?: boolean;
  badgeProps: ComponentProps<typeof ContributionBadge>;
  disabled?: boolean;
};

export default function GithubCodeReview({
  action,
  secondaryAction,
  codeReview,
  onClick,
  onCardClick,
  onSecondaryClick,
  ignored = false,
  addMarginTopForVirtuosoDisplay = false,
  badgeProps,
  disabled,
}: GithubCodeReviewProps) {
  const { title, htmlUrl, githubUrl, createdAt } = codeReview || {};

  const { repoName } = parsePullRequestLink(htmlUrl || githubUrl || "");

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
        className={cn("flex gap-3 rounded-2xl p-4 hover:bg-noise-light", {
          "mt-1": addMarginTopForVirtuosoDisplay,
        })}
        withBg={false}
      >
        {action && <GithubActionButton action={action} onClick={onClick} ignored={ignored} />}
        <div className="flex w-full flex-col gap-3 font-walsheim">
          <div className="flex items-center gap-2">
            <ContributionBadge {...badgeProps} />

            <div className="flex text-sm font-medium text-greyscale-50">
              <GithubLink url={htmlUrl || githubUrl || ""} text={title ?? ""} />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-normal text-greyscale-300 xl:gap-3">
            <div className="flex items-center gap-1">
              <ContributionCreationDate
                id={codeReview.id as string}
                type={GithubContributionType.CodeReview}
                date={new Date(createdAt ?? new Date())}
                tooltipProps={{
                  variant: Variant.Default,
                  position: TooltipPosition.Bottom,
                }}
              />
            </div>
            <div className="flex items-center gap-1">
              <ContributionDate
                id={codeReview.id as string}
                type={GithubContributionType.CodeReview}
                status={codeReview.status as GithubCodeReviewStatus}
                date={getCodeReviewStatusDate(codeReview)}
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
          </div>
        </div>
        {secondaryAction && (
          <GithubActionButton action={secondaryAction} onClick={onSecondaryClick} ignored={ignored} />
        )}
      </Card>
    </div>
  );
}
