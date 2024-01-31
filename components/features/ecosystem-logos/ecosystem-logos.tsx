import { ThumbnailGroup } from "components/ds/thumbnail-group/thumbnail-group";
import { Tooltip } from "components/ds/tooltip/tooltip";
import { TEcosystemLogos } from "components/features/ecosystem-logos/ecosystem-logos.types";
import { Ecosystem } from "components/features/ecosystem/ecosystem";

export function EcosystemsLogos({ ecosystems, ...variant }: TEcosystemLogos.Props) {
  function ecosystemContent() {
    return (
      <div className="flex flex-row flex-wrap items-center gap-4 text-snow">
        {ecosystems.map(ecosystem => (
          <Ecosystem key={ecosystem.id} name={ecosystem.name} logoUrl={ecosystem.logoUrl} />
        ))}
      </div>
    );
  }

  return (
    <Tooltip content={ecosystemContent()}>
      <ThumbnailGroup
        thumbnails={ecosystems.map(ecosystem => ({
          src: ecosystem.logoUrl,
          alt: ecosystem.name,
        }))}
        size="xs"
        {...variant}
      />
    </Tooltip>
  );
}
