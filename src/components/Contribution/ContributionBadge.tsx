import ExternalLink from "src/components/ExternalLink";
import Tooltip, { PaddingVariant, TooltipPosition, Variant } from "src/components/Tooltip";
import { useAuth } from "src/hooks/useAuth";
import { useIntl } from "src/hooks/useIntl";

import { Contribution, GithubContributionType } from "src/types";
import Contributor from "../Contributor";
import { ContributionBadgeWithTooltip } from "./ContributionBadgeWithTooltip";

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
    variant: Variant.Default,
  },
  showExternal = false,
}: {
  contribution: Pick<
    Contribution,
    "githubNumber" | "githubTitle" | "githubBody" | "githubHtmlUrl" | "githubAuthor" | "githubStatus" | "type"
  > & { status?: Contribution["status"] };
  withTooltip?: boolean;
  asLink?: boolean;
  size?: ContributionBadgeSizes;
  tooltipProps?: React.ComponentProps<typeof Tooltip>;
  showExternal?: boolean;
}) {
  const { T } = useIntl();
  const { githubUserId } = useAuth();

  const { githubNumber, githubTitle, githubBody, githubHtmlUrl, githubAuthor, githubStatus, type } = contribution;

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
        <Tooltip id={tooltipId} clickable padding={PaddingVariant.Large} {...tooltipProps}>
          <div className="flex max-w-sm flex-col gap-2 text-left">
            <div className="flex items-center justify-between gap-2">
              <span className="line-clamp-2 text-sm font-medium leading-4">
                <ExternalLink
                  url={githubHtmlUrl}
                  text={githubTitle}
                  anchorProps={{ className: "line-clamp-2 whitespace-pre-line" }}
                />
              </span>

              <ContributionBadgeWithTooltip
                contribution={contribution}
                size={size}
                showExternal={showExternal}
                asLink={asLink}
                isExternal={isExternal}
                tooltipId={tooltipId}
              />
            </div>

            <div className="flex items-center text-xs font-medium">
              <span className="text-spaceBlue-200">{tokens[type]}</span>
              <Contributor className="ml-1 flex-row-reverse" contributor={githubAuthor} clickable />
            </div>

            {githubBody ? <p className="line-clamp-2 break-all text-xs text-spaceBlue-200">{githubBody}</p> : null}
          </div>
        </Tooltip>
      ) : null}

      <ContributionBadgeWithTooltip
        contribution={contribution}
        size={size}
        showExternal={showExternal}
        asLink={asLink}
        isExternal={isExternal}
        tooltipId={tooltipId}
        withTooltip={withTooltip}
      />
    </>
  );
}
