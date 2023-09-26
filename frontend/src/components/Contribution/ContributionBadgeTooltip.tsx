import { GithubUser } from "src/__generated/graphql";
import { ContributionIcon } from "src/components/Contribution/ContributionIcon";
import RoundedImage, { ImageSize, Rounding } from "src/components/RoundedImage";
import Tooltip, { TooltipPosition, Variant } from "src/components/Tooltip";
import { useIntl } from "src/hooks/useIntl";
import { GithubContributionIconStatusType, GithubContributionType } from "src/types";

export function ContributionBadgeTooltip({
  id,
  type,
  status,
  number,
  title,
  description,
  author,
}: {
  id: string;
  type: GithubContributionType;
  status: GithubContributionIconStatusType;
  number: number;
  title: string;
  description?: string;
  author?: GithubUser;
}) {
  const { T } = useIntl();

  return (
    <Tooltip anchorId={id} clickable position={TooltipPosition.Top} variant={Variant.Blue}>
      <div className="flex flex-col gap-4 px-1 py-2">
        {author ? (
          <div className="flex gap-1 text-xs font-medium text-spaceBlue-200">
            <span>
              {T("contributions.tooltip.badgePullRequest")}{" "}
              <a
                href={author.htmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-spacePurple-300 hover:underline"
              >
                {author.login}
              </a>
            </span>
            <RoundedImage src={author.avatarUrl} alt={author.login} rounding={Rounding.Circle} size={ImageSize.Xxs} />
          </div>
        ) : null}
        <div className="flex gap-2">
          <ContributionIcon type={type} status={status} />
          <div className="flex flex-col items-start gap-2">
            <p className="text-sm font-semibold leading-4 text-greyscale-50">
              <span>#{number}</span> • <span>{title}</span>
            </p>
            {description ? <p className="text-xs text-spaceBlue-200">{description}</p> : null}
          </div>
        </div>
      </div>
    </Tooltip>
  );
}
