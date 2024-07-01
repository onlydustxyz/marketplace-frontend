"use client";

import { ContributionIcon, variants as contributionIconVariants } from "src/components/Contribution/ContributionIcon";
import Tooltip, { PaddingVariant, TooltipPosition, Variant } from "src/components/Tooltip";
import ArrowRightUpLine from "src/icons/ArrowRightUpLine";
import { GithubContributionType, GithubPullRequestStatus } from "src/types";
import { cn } from "src/utils/cn";

import { Link } from "components/ds/link/link";
import { TContributionBadge } from "components/features/contribution/contribution-badge/contribution-badge.type";
import { Contributor } from "components/features/contributor/contributor";

import { useIntl } from "hooks/translate/use-translate";
import { useCurrentUser } from "hooks/users/use-current-user/use-current-user";

function ContributionBadgeContent({
  contribution,
  size,
  withTooltip = false,
  showExternal = false,
  asLink = false,
  isExternal = false,
  tooltipId,
}: TContributionBadge.ContentProps) {
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
  size = TContributionBadge.sizes.Sm,
  tooltipProps = {
    position: TooltipPosition.Bottom,
    variant: Variant.Default,
  },
  showExternal = false,
}: TContributionBadge.Props) {
  const { T } = useIntl();
  const { githubUserId } = useCurrentUser();

  const { id, githubNumber, githubTitle, githubBody, githubHtmlUrl, githubAuthor, githubStatus, type } = contribution;

  const isExternal = githubAuthor && githubUserId !== githubAuthor.githubUserId;
  const tooltipId = `${id}-${githubNumber}-${type}-${githubStatus}`;

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
                <Link href={githubHtmlUrl} className="line-clamp-2 whitespace-pre-line">
                  {githubTitle}
                </Link>
              </span>

              <ContributionBadgeContent {...contentProps} withTooltip={false} />
            </div>

            <div className="flex items-center text-xs font-medium">
              <span className="text-spaceBlue-200">{tokens[type]}</span>
              <Contributor
                className="ml-1 flex-row-reverse text-xs font-medium"
                githubUserId={githubAuthor.githubUserId}
                login={githubAuthor.login}
                avatarUrl={githubAuthor.avatarUrl}
                isRegistered={false}
                clickable
              />
            </div>

            {githubBody ? <p className="line-clamp-2 break-all text-xs text-spaceBlue-200">{githubBody}</p> : null}
          </div>
        </Tooltip>
      ) : null}

      <ContributionBadgeContent {...contentProps} />
    </>
  );
}
