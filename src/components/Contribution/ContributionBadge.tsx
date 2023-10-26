import { cn } from "src/utils/cn";

import { GithubUser } from "src/__generated/graphql";
import { ContributionIcon, variants as contributionIconVariants } from "src/components/Contribution/ContributionIcon";
import Contributor from "src/components/Contributor";
import ExternalLink from "src/components/ExternalLink";
import Tooltip, { TooltipPosition, Variant } from "src/components/Tooltip";
import { useAuth } from "src/hooks/useAuth";
import { useIntl } from "src/hooks/useIntl";
import ArrowRightUpLine from "src/icons/ArrowRightUpLine";
import { GithubContributionType, GithubItemStatus } from "src/types";

export enum ContributionBadgeSizes {
  Xs = "text-xs",
  Sm = "text-sm",
  Md = "text-base",
}

export function ContributionBadge({
  id,
  number,
  type,
  status,
  title,
  description,
  author,
  url,
  withTooltip = true,
  asLink = false,
  size = ContributionBadgeSizes.Sm,
  tooltipProps = {
    position: TooltipPosition.TopEnd,
    variant: Variant.Blue,
  },
}: {
  id: string;
  number: number;
  type: GithubContributionType;
  status: GithubItemStatus;
  title: string;
  description?: string;
  author: Pick<GithubUser, "id" | "login" | "avatarUrl"> | null;
  url: string;
  withTooltip?: boolean;
  asLink?: boolean;
  size?: ContributionBadgeSizes;
  tooltipProps?: React.ComponentProps<typeof Tooltip>;
}) {
  const Component = asLink ? "a" : "div";
  const ComponentProps = asLink ? { href: url, target: "_blank", rel: "noopener noreferrer" } : {};
  const { T } = useIntl();
  const { githubUserId } = useAuth();

  const isExternal = author && githubUserId !== author.id;
  const tooltipId = `${id}-${number}-${type}-${status}`;

  const tokens = {
    [GithubContributionType.PullRequest]: T("contributions.tooltip.badgePullRequest"),
    [GithubContributionType.CodeReview]: T("contributions.tooltip.badgeCodeReview"),
    [GithubContributionType.Issue]: T("contributions.tooltip.badgeIssue"),
  };

  return (
    <>
      {withTooltip ? (
        <Tooltip id={tooltipId} clickable {...tooltipProps}>
          <div className="flex flex-col gap-1">
            {isExternal ? (
              <div className="flex items-center justify-center text-sm">
                <span className="text-spaceBlue-200">{tokens[type]}</span>

                <Contributor
                  className="ml-1 flex-row-reverse"
                  contributor={{
                    login: author?.login ?? "",
                    avatarUrl: author?.avatarUrl ?? "",
                    githubUserId: author?.id,
                  }}
                  clickable
                />
              </div>
            ) : null}
            <div className="flex gap-2">
              <ContributionIcon type={type} status={status} />
              <div className="flex flex-col items-start gap-2">
                <span className="text-sm font-medium leading-4">
                  <ExternalLink url={url} text={`#${number} • ${title}`} />
                </span>
                {description ? <p className="text-xs text-spaceBlue-200">{description}</p> : null}
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
            status as keyof typeof contributionIconVariants.status[GithubContributionType]
          ]
        )}
        {...ComponentProps}
      >
        <ContributionIcon type={type} status={status} />
        <div className="flex">
          <span className={cn("leading-none", size)}>{number}</span>
          {isExternal ? <ArrowRightUpLine className="text-xs leading-none" /> : null}
        </div>
      </Component>
    </>
  );
}
