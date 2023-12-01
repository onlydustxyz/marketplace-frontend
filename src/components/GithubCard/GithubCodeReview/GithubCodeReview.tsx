import { GithubCodeReviewFragment } from "src/__generated/graphql";
import { RewardableItem } from "src/api/Project/queries";
import Card from "src/components/Card";
import { ContributionDate } from "src/components/Contribution/ContributionDate";
import { ContributionCreationDate } from "src/components/GithubCard/ContributionCreationDate";
import { GithubActionButton } from "src/components/GithubCard/GithubActionButton/GithubActionButton";
import { GithubLink } from "src/components/GithubCard/GithubLink/GithubLink";
import { TooltipPosition, Variant } from "src/components/Tooltip";
import GitRepositoryLine from "src/icons/GitRepositoryLine";
import { GithubCodeReviewStatus, ContributionStatus, GithubContributionType } from "src/types";
import { cn } from "src/utils/cn";
import { parsePullRequestLink } from "src/utils/github";

export enum Action {
  Add = "add",
  Remove = "remove",
  Ignore = "ignore",
  UnIgnore = "unignore",
}

function getCodeReviewStatusDate(codeReview: Partial<GithubCodeReviewFragment & RewardableItem>) {
  switch (codeReview?.status) {
    case GithubCodeReviewStatus.Approved:
    case GithubCodeReviewStatus.Dismissed:
    case ContributionStatus.Completed:
      return codeReview.completedAt ? new Date(codeReview.completedAt) : new Date();
    case GithubCodeReviewStatus.Pending:
    case GithubCodeReviewStatus.ChangeRequested:
    case GithubCodeReviewStatus.Commented:
    default:
      return new Date(codeReview.githubPullRequest?.createdAt ?? codeReview.createdAt);
  }
}

export type GithubCodeReviewProps = {
  action?: Action;
  secondaryAction?: Action;
  onClick?: () => void;
  onCardClick?: () => void;
  onSecondaryClick?: () => void;
  codeReview: Partial<GithubCodeReviewFragment & RewardableItem>;
  ignored?: boolean;
  addMarginTopForVirtuosoDisplay?: boolean;
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
}: GithubCodeReviewProps) {
  const { title, number, htmlUrl, createdAt } = codeReview?.githubPullRequest || codeReview || {};

  const { repoName } = parsePullRequestLink(htmlUrl ?? "");

  return (
    <div className={cn("w-full", onCardClick && "cursor-pointer")} onClick={onCardClick}>
      <Card
        padded={false}
        className={cn("flex flex-row gap-3 rounded-2xl p-4 hover:bg-noise-light", {
          "mt-1": addMarginTopForVirtuosoDisplay,
        })}
        withBg={false}
      >
        {action && <GithubActionButton action={action} onClick={onClick} ignored={ignored} />}
        <div className="flex w-full flex-col gap-3 font-walsheim">
          <div className="flex text-sm font-medium text-greyscale-50">
            <GithubLink url={htmlUrl ?? ""} text={`#${number} · ${title}`} />
          </div>
          <div className="flex flex-row flex-wrap items-center gap-2 text-xs font-normal text-greyscale-300 xl:gap-3">
            <div className="flex flex-row items-center gap-1">
              <ContributionCreationDate
                id={codeReview.id as string}
                type={GithubContributionType.CodeReview}
                date={new Date(createdAt)}
                tooltipProps={{
                  variant: Variant.Default,
                  position: TooltipPosition.Bottom,
                }}
              />
            </div>
            <div className="flex flex-row items-center gap-1">
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
            <div className="flex flex-row items-center gap-1">
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
