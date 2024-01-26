import ExternalLink from "src/components/ExternalLink";
import Tooltip, { PaddingVariant, TooltipPosition, Variant } from "src/components/Tooltip";
import { useIntl } from "src/hooks/useIntl";
import { ContributionIcon, variants as contributionIconVariants } from "src/components/Contribution/ContributionIcon";
import ArrowRightUpLine from "src/icons/ArrowRightUpLine";
import { Contribution, GithubContributionType, GithubPullRequestStatus } from "src/types";
import Contributor from "../Contributor";
import { cn } from "src/utils/cn";
import { ComponentProps } from "react";
import { useCurrentUser } from "hooks/users/useCurrentUser";

interface ContributionBadgeProps {
  contribution: Pick<
    Contribution,
    "githubNumber" | "githubTitle" | "githubBody" | "githubHtmlUrl" | "githubAuthor" | "githubStatus" | "type"
  > & { status?: Contribution["status"] };
  withTooltip?: boolean;
  asLink?: boolean;
  size?: ContributionBadgeSizes;
  tooltipProps?: ComponentProps<typeof Tooltip>;
  showExternal?: boolean;
}

interface ContributionBadgeContentProps extends Omit<ContributionBadgeProps, "tooltipProps"> {
  isExternal: boolean;
  tooltipId: string;
}

export enum ContributionBadgeSizes {
  Xs = "text-xs",
  Sm = "text-sm",
  Md = "text-base",
}

function ContributionBadgeContent({
  contribution,
  size,
  withTooltip = false,
  showExternal = false,
  asLink = false,
  isExternal = false,
  tooltipId,
}: ContributionBadgeContentProps) {
  const { githubNumber, githubHtmlUrl, githubStatus, status, type } = contribution;

  const Component = asLink ? "a" : "div";
  const ComponentProps = asLink ? { href: githubHtmlUrl, target: "_blank", rel: "noopener noreferrer" } : {};

  const statusClassnames =
    status && githubStatus !== GithubPullRequestStatus.Draft
      ? contributionIconVariants.contributionStatus[status]
      : contributionIconVariants.status[type][
          githubStatus as keyof typeof contributionIconVariants.status[GithubContributionType]
        ];

  return (
    <Component
      data-tooltip-id={withTooltip ? tooltipId : undefined}
      className={cn(
        "inline-flex w-auto items-center gap-1 rounded-full px-1 py-0.5 font-walsheim",
        isExternal && showExternal ? "border border-dashed" : "border-0.5 border-solid",
        {
          "hover:bg-card-background-heavy": withTooltip || asLink,
        },
        statusClassnames
      )}
      {...ComponentProps}
    >
      <ContributionIcon type={type as GithubContributionType} status={githubStatus} contributionStatus={status} />

      <div className="flex">
        <span className={cn("leading-none", size)}>{githubNumber}</span>
        {isExternal && showExternal ? <ArrowRightUpLine className="text-xs leading-none" /> : null}
      </div>
    </Component>
  );
}

export function ContributionBadge({
  contribution,
  withTooltip = true,
  asLink = false,
  size = ContributionBadgeSizes.Sm,
  tooltipProps = {
    position: TooltipPosition.Bottom,
    variant: Variant.Default,
  },
  showExternal = false,
}: ContributionBadgeProps) {
  const { T } = useIntl();
  const { githubUserId } = useCurrentUser();

  const { githubNumber, githubTitle, githubBody, githubHtmlUrl, githubAuthor, githubStatus, type } = contribution;

  const isExternal = githubAuthor && githubUserId !== githubAuthor.githubUserId;
  const tooltipId = `${githubNumber}-${type}-${githubStatus}`;

  const tokens = {
    [GithubContributionType.PullRequest]: T("contributions.tooltip.badgePullRequest"),
    [GithubContributionType.CodeReview]: T("contributions.tooltip.badgeCodeReview"),
    [GithubContributionType.Issue]: T("contributions.tooltip.badgeIssue"),
  };

  const contentProps = {
    contribution,
    withTooltip,
    asLink,
    size,
    showExternal,
    isExternal,
    tooltipId,
  };

  return (
    <>
      {withTooltip ? (
        <Tooltip id={tooltipId} clickable padding={PaddingVariant.Large} {...tooltipProps}>
          <div
            className="flex max-w-sm flex-col gap-2 text-left"
            // When this element is nested inside another clickable element, we don't want the click to propagate to the parent
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="line-clamp-2 text-sm font-medium leading-4">
                <ExternalLink
                  url={githubHtmlUrl}
                  text={githubTitle}
                  anchorProps={{ className: "line-clamp-2 whitespace-pre-line" }}
                />
              </span>

              <ContributionBadgeContent {...contentProps} withTooltip={false} />
            </div>

            <div className="flex items-center text-xs font-medium">
              <span className="text-spaceBlue-200">{tokens[type]}</span>
              <Contributor className="ml-1 flex-row-reverse text-xs font-medium" contributor={githubAuthor} clickable />
            </div>

            {githubBody ? <p className="line-clamp-2 break-all text-xs text-spaceBlue-200">{githubBody}</p> : null}
          </div>
        </Tooltip>
      ) : null}

      <ContributionBadgeContent {...contentProps} />
    </>
  );
}
