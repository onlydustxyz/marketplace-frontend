import { useStackContributorProfile } from "src/App/Stacks/Stacks";
import { IMAGES } from "src/assets/img";
import { withTooltip } from "src/components/Tooltip";
import { useIntl } from "src/hooks/useIntl";
import { cn } from "src/utils/cn";
import { TContributor } from "@/components/features/contributor/contributor.types";
import { Thumbnail } from "@/components/ds/thumbnail/thumbnail";

export function Contributor({
  githubUserId,
  login,
  isRegistered,
  avatarUrl,
  clickable,
  className,
}: TContributor.Props) {
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
              open({ githubUserId });
            }
          : undefined
      }
    >
      {avatarUrl ? <Thumbnail src={avatarUrl} alt={login} size="xs" type="user" /> : null}

      <span
        className={cn({
          "block truncate text-spacePurple-300 group-hover:underline": clickable,
        })}
      >
        {login}
      </span>

      {isRegistered ? (
        <img
          id={`od-logo-${login}`}
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
