"use client";

import { debounce } from "lodash";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { IMAGES } from "src/assets/img";
import { cn } from "src/utils/cn";

import { Avatar } from "components/ds/avatar/avatar";
import { Tooltip } from "components/ds/tooltip/tooltip";
import { TContributor } from "components/features/contributor/contributor.types";
import { ProfileCardPopover } from "components/features/profile-card/profile-card.popover";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { NEXT_ROUTER } from "constants/router";

export function Contributor({
  githubUserId,
  login,
  isRegistered,
  avatarUrl,
  clickable,
  className,
  isYou,
  hasPendingInvite,
  typograhy,
  avatarProps,
  hasPopover = true,
}: TContributor.Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPreload, setIsPreload] = useState(false);
  const router = useRouter();
  const Component = clickable ? "button" : "div";

  const debounceOpen = useCallback(
    debounce((open: boolean) => {
      setIsOpen(open);
    }, 500),
    []
  );

  function toggleCard(open: boolean) {
    setIsPreload(open);
    debounceOpen(open);

    if (!open) {
      debounceOpen(false);
    }
  }

  function contributorContent() {
    return (
      <Component
        type={clickable ? "button" : undefined}
        className={cn("group/contributor flex flex-row items-center gap-1", className)}
        onClick={
          clickable
            ? e => {
                e.preventDefault();
                router.push(NEXT_ROUTER.publicProfile.root(login));
              }
            : undefined
        }
      >
        {typeof avatarUrl === "string" ? <Avatar src={avatarUrl} alt={login} size="s" {...avatarProps} /> : null}

        <Typography
          variant="body-s"
          as="div"
          className={cn(
            {
              "relative block truncate transition-all group-hover/contributor:text-spacePurple-300": clickable,
            },
            typograhy?.className
          )}
          {...typograhy}
        >
          <div className="relative flex flex-row gap-1 truncate">
            <span>{login}</span>
            {isYou ? <Translate token="v2.features.contributors.isYou" /> : null}
            {hasPendingInvite && !isYou ? <Translate token="v2.features.contributors.hasPendingInvite" /> : null}
          </div>
        </Typography>
        {isRegistered ? (
          <Tooltip content={<Translate token="v2.features.contributors.table.userRegisteredTooltip" />}>
            <img id={`od-logo-${login}`} src={IMAGES.logo.original} className="w-3.5" loading="lazy" alt="OnlyDust" />
          </Tooltip>
        ) : null}
      </Component>
    );
  }

  if (!hasPopover) {
    return contributorContent();
  }

  return (
    <ProfileCardPopover
      githubId={githubUserId}
      isOpen={isOpen}
      isPreload={isPreload}
      onMouseEnter={() => toggleCard(true)}
      onMouseLeave={() => toggleCard(false)}
      onClick={() => toggleCard(false)}
    >
      {contributorContent()}
    </ProfileCardPopover>
  );
}
