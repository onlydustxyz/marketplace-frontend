import { useStackContributorProfile } from "src/App/Stacks/Stacks";
import { IMAGES } from "src/assets/img";
import { withTooltip } from "src/components/Tooltip";
import { useIntl } from "src/hooks/useIntl";
import { ContributorT } from "src/types";
import { cn } from "src/utils/cn";
import { Avatar } from "../New/Avatar";
import { Link } from "components/ds/link/link";
import { SyntheticEvent } from "react";

interface Props {
  contributor: Pick<ContributorT, "login" | "avatarUrl" | "githubUserId" | "isRegistered">;
  clickable?: boolean;
  className?: string;
}

function ContributorContent({ contributor }: Props) {
  const { T } = useIntl();

  return (
    <>
      {contributor.avatarUrl ? <Avatar src={contributor.avatarUrl} alt={contributor.login} size="5" /> : null}

      {contributor.login}

      {contributor.isRegistered ? (
        <img
          id={`od-logo-${contributor.login}`}
          src={IMAGES.logo.original}
          className="w-3.5"
          loading="lazy"
          alt="OnlyDust"
          {...withTooltip(T("contributor.table.userRegisteredTooltip"), { className: "w-36" })}
        />
      ) : null}
    </>
  );
}

export default function Contributor({ contributor, clickable, className }: Props) {
  const [open] = useStackContributorProfile();

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    open({ githubUserId: contributor.githubUserId });
  };

  return clickable ? (
    <Link onClick={handleClick} className={cn("group flex items-center gap-2 truncate", className)}>
      <ContributorContent contributor={contributor} clickable={clickable} />
    </Link>
  ) : (
    <div className={cn("group flex items-center gap-2 truncate", className)}>
      <ContributorContent contributor={contributor} clickable={clickable} />
    </div>
  );
}
