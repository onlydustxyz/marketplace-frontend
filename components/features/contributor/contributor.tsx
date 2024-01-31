import { useStackContributorProfile } from "src/App/Stacks/Stacks";
import { IMAGES } from "src/assets/img";
import { cn } from "src/utils/cn";

import { Thumbnail } from "components/ds/thumbnail/thumbnail";
import { Tooltip } from "components/ds/tooltip/tooltip";
import { TContributor } from "components/features/contributor/contributor.types";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

export function Contributor({
  githubUserId,
  login,
  isRegistered,
  avatarUrl,
  clickable,
  className,
}: TContributor.Props) {
  const [open] = useStackContributorProfile();

  const Component = clickable ? "button" : "div";

  return (
    <Component
      type={clickable ? "button" : undefined}
      className={cn("group flex flex-row items-center gap-1", className)}
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

      <Typography
        variant="body-s"
        className={cn({
          "block truncate group-hover:text-spacePurple-300 group-hover:underline": clickable,
        })}
      >
        {login}
      </Typography>

      {isRegistered ? (
        <Tooltip content={<Translate token="v2.features.contributors.table.userRegisteredTooltip" />}>
          <img id={`od-logo-${login}`} src={IMAGES.logo.original} className="w-3.5" loading="lazy" alt="OnlyDust" />
        </Tooltip>
      ) : null}
    </Component>
  );
}
