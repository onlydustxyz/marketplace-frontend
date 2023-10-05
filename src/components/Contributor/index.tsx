import onlyDustLogo from "assets/img/onlydust-logo.png";
import { withTooltip } from "src/components/Tooltip";
import { useIntl } from "src/hooks/useIntl";
import { Contributor as ContributorType } from "src/types";
import RoundedImage, { ImageSize, Rounding } from "src/components/RoundedImage";
import { cn } from "src/utils/cn";
import { useContributorProfilePanel } from "src/hooks/useContributorProfilePanel";

type Props = {
  contributor: ContributorType;
  clickable?: boolean;
  className?: string;
};

export default function Contributor({ className, contributor, clickable }: Props) {
  const { T } = useIntl();
  const { open } = useContributorProfilePanel();

  return (
    <div
      className={cn("inline-flex flex-row items-center gap-2 truncate text-sm font-normal", className)}
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
          size={ImageSize.Xs}
          src={contributor.avatarUrl}
        />
      )}
      <div
        className={cn({
          "truncate text-spacePurple-300 hover:cursor-pointer hover:underline": clickable,
        })}
      >
        {contributor.login}
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
