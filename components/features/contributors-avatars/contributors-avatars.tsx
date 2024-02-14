import { PropsWithChildren, useCallback } from "react";

import { Leader } from "src/types";
import isDefined from "src/utils/isDefined";

import { AvatarGroup } from "components/ds/avatar-group/avatar-group";
import { Tooltip } from "components/ds/tooltip/tooltip";
import { Contributor } from "components/features/contributor/contributor";

import { TContributorsAvatars } from "./contributors-avatars.types";

function TooltipContent({ contributors }: { contributors: Leader[] }) {
  return (
    <div className="flex flex-col flex-wrap gap-4 text-snow">
      {contributors
        .filter(
          contributor =>
            isDefined(contributor.githubUserId) && isDefined(contributor.login) && isDefined(contributor.avatarUrl)
        )
        .map(contributor => (
          <Contributor
            key={contributor.githubUserId}
            githubUserId={contributor.githubUserId}
            login={contributor.login}
            avatarUrl={contributor.avatarUrl}
            isRegistered={false}
            clickable
          />
        ))}
    </div>
  );
}

export function ContributorsAvatars({ contributors, avatarProps, enableTooltip = false }: TContributorsAvatars.Props) {
  const Parent = useCallback(
    ({ children }: PropsWithChildren) => {
      if (enableTooltip) {
        return <Tooltip content={<TooltipContent contributors={contributors} />}>{children}</Tooltip>;
      }

      return <>{children}</>;
    },
    [enableTooltip, contributors]
  );

  return (
    <Parent>
      <AvatarGroup
        avatars={contributors.map(contributor => ({
          src: contributor.avatarUrl,
          alt: contributor.login || "",
        }))}
        avatarProps={avatarProps}
      />
    </Parent>
  );
}

ContributorsAvatars.TooltipContent = TooltipContent;
