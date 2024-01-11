import { useStackContributorProfile } from "src/App/Stacks/Stacks";
import { IMAGES } from "src/assets/img";
import { withTooltip } from "src/components/Tooltip";
import { useIntl } from "src/hooks/useIntl";
import { ContributorT } from "src/types";
import { cn } from "src/utils/cn";

import { Avatar } from "../New/Avatar";

type Props = {
  contributor: Pick<ContributorT, "login" | "avatarUrl" | "githubUserId" | "isRegistered">;
  clickable?: boolean;
  className?: string;
};

export default function Contributor({ contributor, clickable, className }: Props) {
  const { T } = useIntl();
  const [open] = useStackContributorProfile();

  const Component = clickable ? "button" : "div";

  return (
    <Component
      type={clickable ? "button" : undefined}
      className={cn("group flex items-center gap-2 truncate font-walsheim text-xs font-medium", className)}
      onClick={
        clickable
          ? e => {
              e.preventDefault();
              open({ githubUserId: contributor.githubUserId });
            }
          : undefined
      }
    >
      {contributor.avatarUrl ? <Avatar src={contributor.avatarUrl} alt={contributor.login} size="5" /> : null}

      <span
        className={cn({
          "block truncate text-spacePurple-300 group-hover:underline": clickable,
        })}
      >
        {contributor.login}
      </span>

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
    </Component>
  );
}
