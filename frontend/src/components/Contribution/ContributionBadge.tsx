import classNames from "classnames";

import { GithubUser } from "src/__generated/graphql";
import ExternalArrow from "src/assets/icons/ExternalArrow";
import { ContributionIcon, variants as contributionIconVariants } from "src/components/Contribution/ContributionIcon";
import RoundedImage, { ImageSize, Rounding } from "src/components/RoundedImage";
import Tooltip, { TooltipPosition, Variant } from "src/components/Tooltip";
import { useAuth } from "src/hooks/useAuth";
import { useContributorProfilePanel } from "src/hooks/useContributorProfilePanel";
import { useIntl } from "src/hooks/useIntl";
import { GithubContributionIconStatusType, GithubContributionType } from "src/types";

export function ContributionBadge({
  id,
  number,
  type,
  status,
  title,
  description,
  author,
  url,
}: {
  id: string;
  number: number;
  type: GithubContributionType;
  status: GithubContributionIconStatusType;
  title: string;
  description?: string;
  author: GithubUser;
  url: string;
}) {
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
      <Tooltip id={tooltipId} clickable position={TooltipPosition.Top} variant={Variant.Blue}>
        <div className="flex flex-col gap-4 px-1 py-2">
          {isExternal ? (
            <div className="flex gap-1 text-xs font-medium text-spaceBlue-200">
              <span>
                {tokens[type]}{" "}
                <button
                  type="button"
                  className="text-spacePurple-300 hover:underline"
                  onClick={
                    author
                      ? () => {
                          openProfilePanel(author.id);
                        }
                      : undefined
                  }
                >
                  {author.login}
                </button>
              </span>
              <RoundedImage src={author.avatarUrl} alt={author.login} rounding={Rounding.Circle} size={ImageSize.Xxs} />
            </div>
          ) : null}
          <div className="flex gap-2">
            <ContributionIcon type={type} status={status} />
            <div className="flex flex-col items-start gap-2">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold leading-4 text-greyscale-50 hover:underline"
              >
                <span>#{number}</span> • <span>{title}</span>
              </a>
              {description ? <p className="text-xs text-spaceBlue-200">{description}</p> : null}
            </div>
          </div>
        </div>
      </Tooltip>

      <div
        data-tooltip-id={tooltipId}
        className={classNames(
          "inline-flex w-auto items-center gap-1 rounded-full px-1 py-0.5 font-walsheim hover:bg-whiteFakeOpacity-8",
          {
            "border border-dashed": isExternal,
            "border-0.5 border-solid": !isExternal,
          },
          contributionIconVariants.status[status]
        )}
      >
        <ContributionIcon type={type} status={status} />
        <div className="flex">
          <span className="text-sm leading-none">{number}</span>
          {isExternal ? <ExternalArrow className="mt-[3px]" /> : null}
        </div>
      </div>
    </>
  );
}
