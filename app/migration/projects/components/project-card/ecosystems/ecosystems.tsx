import { useMemo } from "react";

import { TEcosystems } from "app/migration/projects/components/project-card/ecosystems/ecosystems.types";

import { EcosystemsLogos } from "components/features/ecosystem-logos/ecosystem-logos";
import { Typography } from "components/layout/typography/typography";

export function Ecosystems({ ecosystems }: TEcosystems.Props) {
  const hasOnlyOneEcosystem = useMemo(() => {
    if (ecosystems.length === 1 && ecosystems[0].name) {
      const ecosystem = ecosystems[0];
      return (
        <div className="flex flex-row items-center gap-1 text-snow">
          <Typography variant="body-s" className="truncate">
            {ecosystem.name}
          </Typography>
        </div>
      );
    }

    return null;
  }, [ecosystems]);

  if (!ecosystems.length) {
    return null;
  }

  return (
    <div className="flex flex-row items-center gap-1 font-walsheim text-snow">
      <EcosystemsLogos ecosystems={ecosystems} />
      {ecosystems.length > 0 ? (
        <div className="flex flex-row items-center gap-1 truncate whitespace-nowrap">
          <Typography
            variant="body-s"
            className="truncate"
            translate={{ token: "v2.features.ecosystems.counters", params: { count: ecosystems.length } }}
          />
          {hasOnlyOneEcosystem}
        </div>
      ) : null}
    </div>
  );
}
