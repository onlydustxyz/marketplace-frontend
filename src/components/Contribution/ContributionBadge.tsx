import { cn } from "src/utils/cn";

import { GithubUser } from "src/__generated/graphql";
import { ContributionIcon, variants as contributionIconVariants } from "src/components/Contribution/ContributionIcon";
import { GithubLoginLink } from "src/components/GithubLoginLink/GithubLoginLink";
import { Link } from "src/components/Link/Link";
import Tooltip, { TooltipPosition, Variant } from "src/components/Tooltip";
import { useAuth } from "src/hooks/useAuth";
import { useContributorProfilePanel } from "src/hooks/useContributorProfilePanel";
import { useIntl } from "src/hooks/useIntl";
import ArrowRightUpLine from "src/icons/ArrowRightUpLine";
import { GithubContributionType, GithubItemStatus } from "src/types";

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
}: {
  id: string;
  number: number;
  type: GithubContributionType;
  status: GithubItemStatus;
  title: string;
  description?: string;
  author: Pick<GithubUser, "id" | "login" | "avatarUrl">;
  url: string;
  withTooltip?: boolean;
  asLink?: boolean;
}) {
  const Component = asLink ? "a" : "div";
  const ComponentProps = asLink ? { href: url, target: "_blank", rel: "noopener noreferrer" } : {};
  const { T } = useIntl();
  const { githubUserId } = useAuth();
  const { open: openProfilePanel } = useContributorProfilePanel();

  const isExternal = githubUserId !== author.id;
  const tooltipId = `${id}-${number}-${type}-${status}`;

  const tokens = {
    [GithubContributionType.PullRequest]: T("contributions.tooltip.badgePullRequest"),
    [GithubContributionType.CodeReview]: T("contributions.tooltip.badgeCodeReview"),
    [GithubContributionType.Issue]: T("contributions.tooltip.badgeIssue"),
  };

  return (
    <>
      {withTooltip ? (
        <Tooltip id={tooltipId} clickable position={TooltipPosition.Top} variant={Variant.Blue}>
          <div className="flex flex-col gap-4 px-1 py-2">
            {isExternal ? (
              <div className="flex font-medium">
                <span className="text-spaceBlue-200">{tokens[type]}</span>
                &nbsp;
                <button
                  type="button"
                  onClick={() => {
                    openProfilePanel(author.id);
                  }}
                >
                  <GithubLoginLink author={author} />
                </button>
              </div>
            ) : null}
            <div className="flex gap-2">
              <ContributionIcon type={type} status={status} />
              <div className="flex flex-col items-start gap-2">
                <Link href={url} className="text-sm font-semibold leading-4 text-greyscale-50 hover:underline">
                  <span>#{number}</span> • <span>{title}</span>
                </Link>
                {description ? <p className="text-xs text-spaceBlue-200">{description}</p> : null}
              </div>
            </div>
          </div>
        </Tooltip>
      ) : null}

      <Component
        data-tooltip-id={tooltipId}
        className={cn(
          "inline-flex w-auto items-center gap-1 rounded-full px-1 py-0.5 font-walsheim hover:bg-whiteFakeOpacity-8",
          {
            "border border-dashed": isExternal,
            "border-0.5 border-solid": !isExternal,
          },
          contributionIconVariants.status[status]
        )}
        {...ComponentProps}
      >
        <ContributionIcon type={type} status={status} />
        <div className="flex">
          <span className="text-sm leading-none">{number}</span>
          {isExternal ? <ArrowRightUpLine className="text-xs leading-none" /> : null}
        </div>
      </Component>
    </>
  );
}
