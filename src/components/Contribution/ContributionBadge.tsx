import { cn } from "src/utils/cn";

import { ContributionIcon, variants as contributionIconVariants } from "src/components/Contribution/ContributionIcon";
import Contributor from "src/components/Contributor";
import ExternalLink from "src/components/ExternalLink";
import Tooltip, { TooltipPosition, Variant } from "src/components/Tooltip";
import { useAuth } from "src/hooks/useAuth";
import { useIntl } from "src/hooks/useIntl";
import ArrowRightUpLine from "src/icons/ArrowRightUpLine";
import { Contribution, GithubContributionType } from "src/types";

export enum ContributionBadgeSizes {
  Xs = "text-xs",
  Sm = "text-sm",
  Md = "text-base",
}

export function ContributionBadge({
  contribution,
  withTooltip = true,
  asLink = false,
  size = ContributionBadgeSizes.Sm,
  tooltipProps = {
    position: TooltipPosition.Bottom,
    variant: Variant.Blue,
  },
}: {
  contribution: Pick<
    Contribution,
    "githubNumber" | "githubTitle" | "githubBody" | "githubHtmlUrl" | "githubAuthor" | "githubStatus" | "type"
  >;
  withTooltip?: boolean;
  asLink?: boolean;
  size?: ContributionBadgeSizes;
  tooltipProps?: React.ComponentProps<typeof Tooltip>;
}) {
  const { T } = useIntl();
  const { githubUserId } = useAuth();

  const { githubNumber, githubTitle, githubBody, githubHtmlUrl, githubAuthor, githubStatus, type } = contribution;
  const Component = asLink ? "a" : "div";
  const ComponentProps = asLink ? { href: githubHtmlUrl, target: "_blank", rel: "noopener noreferrer" } : {};
  const isExternal = githubAuthor && githubUserId !== githubAuthor.githubUserId;
  const tooltipId = `${githubNumber}-${type}-${githubStatus}`;

  const tokens = {
    [GithubContributionType.PullRequest]: T("contributions.tooltip.badgePullRequest"),
    [GithubContributionType.CodeReview]: T("contributions.tooltip.badgeCodeReview"),
    [GithubContributionType.Issue]: T("contributions.tooltip.badgeIssue"),
  };

  return (
    <>
      {withTooltip ? (
        <Tooltip id={tooltipId} clickable {...tooltipProps}>
          <div className="flex flex-col gap-2 text-left">
            {isExternal ? (
              <div className="flex items-center justify-center text-sm">
                <span className="text-spaceBlue-200">{tokens[type]}</span>
                <Contributor className="ml-1 flex-row-reverse" contributor={githubAuthor} clickable />
              </div>
            ) : null}
            <div className="flex gap-2">
              <ContributionIcon type={type as GithubContributionType} status={githubStatus} />
              <div className="flex max-w-sm flex-col items-start justify-start gap-2">
                <span className="line-clamp-2 text-sm font-medium leading-4">
                  <ExternalLink
                    url={githubHtmlUrl}
                    text={`#${githubNumber} • ${githubTitle}`}
                    anchorProps={{ className: "line-clamp-2 whitespace-pre-line" }}
                  />
                </span>
                {githubBody ? <p className="line-clamp-2 break-all text-xs text-spaceBlue-200">{githubBody}</p> : null}
              </div>
            </div>
          </div>
        </Tooltip>
      ) : null}

      <Component
        data-tooltip-id={withTooltip ? tooltipId : undefined}
        className={cn(
          "inline-flex w-auto items-center gap-1 rounded-full px-1 py-0.5 font-walsheim",
          {
            "hover:bg-whiteFakeOpacity-8": withTooltip || asLink,
            "border border-dashed": isExternal,
            "border-0.5 border-solid": !isExternal,
          },
          contributionIconVariants.status[type][
            githubStatus as keyof typeof contributionIconVariants.status[GithubContributionType]
          ]
        )}
        {...ComponentProps}
      >
        <ContributionIcon type={type as GithubContributionType} status={githubStatus} />
        <div className="flex">
          <span className={cn("leading-none", size)}>{githubNumber}</span>
          {isExternal ? <ArrowRightUpLine className="text-xs leading-none" /> : null}
        </div>
      </Component>
    </>
  );
}
