import { PropsWithChildren, useCallback } from "react";

import { ProjectTypes } from "src/api/Project/types";

import { AvatarGroup } from "components/ds/avatar-group/avatar-group";
import { Tooltip } from "components/ds/tooltip/tooltip";
import { TEcosystemLogos } from "components/features/ecosystem-logos/ecosystem-logos.types";
import { Ecosystem } from "components/features/ecosystem/ecosystem";

function TooltipContent({ ecosystems }: { ecosystems: ProjectTypes.EcoSystem[] }) {
  return (
    <div className="flex flex-col flex-wrap gap-4 text-snow">
      {ecosystems.map(ecosystem => (
        <Ecosystem key={ecosystem.id} name={ecosystem.name} logoUrl={ecosystem.logoUrl} />
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
