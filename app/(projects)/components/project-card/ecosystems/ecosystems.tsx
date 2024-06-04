import { useMemo } from "react";

import { Tooltip } from "components/ds/tooltip/tooltip";
import { EcosystemsLogos } from "components/features/ecosystem-logos/ecosystem-logos";
import { Typography } from "components/layout/typography/typography";

import { TEcosystems } from "./ecosystems.types";

export function Ecosystems({ ecosystems }: TEcosystems.Props) {
  const sortedByName = useMemo(() => {
    return [...ecosystems].sort((a, b) => a.name.localeCompare(b.name));
  }, [ecosystems]);

  const hasOnlyOneEcosystem = useMemo(() => {
    if (sortedByName.length === 1 && sortedByName[0].name) {
      const ecosystem = sortedByName[0];
      return (
        <div className="flex flex-row items-center gap-1 text-snow">
          <Typography variant="body-s" className="truncate">
            {ecosystem.name}
          </Typography>
        </div>
      );
    }

    return null;
  }, [sortedByName]);

  if (!sortedByName.length) {
    return null;
  }

  return (
    <Tooltip
      content={<EcosystemsLogos.TooltipContent ecosystems={sortedByName} />}
      enabled={sortedByName.length > 1}
      canInteract
    >
      <div className="flex flex-row items-center gap-1 font-walsheim text-snow">
        <EcosystemsLogos ecosystems={sortedByName} avatarProps={{ size: "xs" }} enableTooltip={false} />

        <div className="flex flex-row items-center gap-1 truncate whitespace-nowrap">
          {sortedByName.length > 1 ? (
            <Typography
              variant="body-s"
              className="truncate"
              translate={{ token: "v2.features.ecosystems.counters", params: { count: sortedByName.length } }}
            />
          ) : null}
          {hasOnlyOneEcosystem}
        </div>
      </div>
    </Tooltip>
  );
}
