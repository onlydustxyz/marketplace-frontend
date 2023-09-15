import onlyDustLogo from "assets/img/onlydust-logo.png";
import { withTooltip } from "src/components/Tooltip";
import { useIntl } from "src/hooks/useIntl";
import { Contributor as ContributorType } from "src/types";
import RoundedImage, { ImageSize, Rounding } from "src/components/RoundedImage";
import classNames from "classnames";
import { useContributorProfilePanel } from "src/hooks/useContributorProfilePanel";

type Props = {
  contributor: ContributorType;
  clickable?: boolean;
};

export default function Contributor({ contributor, clickable }: Props) {
  const { T } = useIntl();
  const { open } = useContributorProfilePanel();

  return (
    <div className="flex items-center gap-1.5 truncate">
      <div
        className="flex flex-row items-center gap-2 truncate text-sm font-normal"
        onClick={e => {
          if (clickable) {
            e.preventDefault();
            open(contributor.githubUserId);
          }
        }}
      >
        {contributor.avatarUrl && (
          <RoundedImage
            alt={contributor.githubUserId.toString()}
            rounding={Rounding.Circle}
            size={ImageSize.Sm}
            src={contributor.avatarUrl}
          />
        )}
        <div
          className={classNames({
            "truncate text-spacePurple-300 hover:cursor-pointer hover:underline": clickable,
          })}
        >
          {contributor.login}
        </div>
      </div>
      {contributor.userId && (
        <>
          <img
            id={`od-logo-${contributor.login}`}
            src={onlyDustLogo}
            className="mt-px h-3.5"
            {...withTooltip(T("contributor.table.userRegisteredTooltip"), { className: "w-36" })}
          />
        </>
      )}
    </div>
  );
}
