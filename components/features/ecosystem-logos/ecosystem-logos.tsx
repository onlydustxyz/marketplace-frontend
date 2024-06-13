import { PropsWithChildren, useCallback } from "react";

import { ProjectTypes } from "src/api/Project/types";

import { AvatarGroup } from "components/ds/avatar-group/avatar-group";
import { Avatar } from "components/ds/avatar/avatar";
import { Link } from "components/ds/link/link";
import { Tooltip } from "components/ds/tooltip/tooltip";
import { TEcosystemLogos } from "components/features/ecosystem-logos/ecosystem-logos.types";
import { Typography } from "components/layout/typography/typography";

import { NEXT_ROUTER } from "constants/router";

function TooltipContent({ ecosystems }: { ecosystems: ProjectTypes.EcoSystem[] }) {
  return (
    <div className="flex flex-col flex-wrap gap-4 text-snow">
      {ecosystems.map(ecosystem => (
        <Link key={ecosystem.id} href={NEXT_ROUTER.ecosystems.details.root(ecosystem.slug)} className="gap-1">
          <Avatar src={ecosystem.logoUrl} alt={ecosystem.name} size="s" />
          <Typography variant="body-s" className="truncate">
            {ecosystem.name}
          </Typography>
        </Link>
      ))}
    </div>
  );
}

export function EcosystemsLogos({ ecosystems, avatarProps, enableTooltip = true }: TEcosystemLogos.Props) {
  const Parent = useCallback(
    ({ children }: PropsWithChildren) => {
      if (enableTooltip) {
        return <Tooltip content={<TooltipContent ecosystems={ecosystems} />}>{children}</Tooltip>;
      }

      return <>{children}</>;
    },
    [enableTooltip, ecosystems]
  );

  return (
    <Parent>
      <AvatarGroup
        avatars={ecosystems.map(ecosystem => ({
          src: ecosystem.logoUrl,
          alt: ecosystem.name,
        }))}
        avatarProps={avatarProps}
      />
    </Parent>
  );
}

EcosystemsLogos.TooltipContent = TooltipContent;
