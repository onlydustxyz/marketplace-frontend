import { cn } from "src/utils/cn";
import ArrowRightUpLine from "src/icons/ArrowRightUpLine";
import { ContributionIcon, variants as contributionIconVariants } from "src/components/Contribution/ContributionIcon";
import { Contribution, GithubContributionType, GithubPullRequestStatus } from "src/types";

interface ContributionBadgeWithTooltipProps {
  contribution: Pick<Contribution, "githubNumber" | "githubHtmlUrl" | "githubStatus" | "type"> & {
    status?: Contribution["status"];
  };
  size?: string;
  withTooltip?: boolean;
  showExternal?: boolean;
  asLink?: boolean;
  isExternal?: boolean;
  tooltipId: string;
}

export function ContributionBadgeWithTooltip({
  contribution,
  size,
  withTooltip = false,
  showExternal = false,
  asLink = false,
  isExternal = false,
  tooltipId,
}: ContributionBadgeWithTooltipProps) {
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
