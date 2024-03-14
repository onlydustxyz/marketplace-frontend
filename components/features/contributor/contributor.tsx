import { useStackContributorProfile } from "src/App/Stacks/Stacks";
import { IMAGES } from "src/assets/img";
import { cn } from "src/utils/cn";

import { Avatar } from "components/ds/avatar/avatar";
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
  isYou,
  hasPenhdingInvite,
}: TContributor.Props) {
  const [open] = useStackContributorProfile();

  const Component = clickable ? "button" : "div";

  return (
    <Component
      type={clickable ? "button" : undefined}
      className={cn("group/contributor flex flex-row items-center gap-1", className)}
      onClick={
        clickable
          ? e => {
              e.preventDefault();
              open({ githubUserId });
            }
          : undefined
      }
    >
      {avatarUrl ? <Avatar src={avatarUrl} alt={login} size="s" /> : null}

      <Typography
        variant="body-s"
        className={cn({
          "block truncate transition-all group-hover/contributor:text-spacePurple-300": clickable,
        })}
      >
        {login}
        {isYou ? <Translate token="v2.features.contributors.isYou" /> : null}
        {hasPenhdingInvite ? <Translate token="v2.features.contributors.hasPendingInvite" /> : null}
      </Typography>
      {isRegistered ? (
        <Tooltip content={<Translate token="v2.features.contributors.table.userRegisteredTooltip" />}>
          <img id={`od-logo-${login}`} src={IMAGES.logo.original} className="w-3.5" loading="lazy" alt="OnlyDust" />
        </Tooltip>
      ) : null}
    </Component>
  );
}
