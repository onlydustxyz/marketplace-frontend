"use client";

import { TooltipPosition, withTooltip } from "src/components/Tooltip";
import config from "src/config";
import { useIntl } from "src/hooks/useIntl";

import { Thumbnail } from "components/ds/thumbnail/thumbnail";

import { TSponsors } from "./sponsors.types";
import { Typography } from "components/layout/typography/typography";

export function Sponsors({ sponsors }: TSponsors.Props) {
  const { T } = useIntl();

  if (!sponsors?.length) {
    return null;
  }

  const hasMoreThan1Sponsor = sponsors.length > 1;
  const tooltipsContent = hasMoreThan1Sponsor
    ? T("project.fundedBy", {
        topSponsorsString: sponsors.map(sponsor => sponsor.name).join(", "),
      })
    : "";

  return (
    <div
      className="flex flex-row items-center gap-1"
      {...withTooltip(tooltipsContent, { position: TooltipPosition.Bottom, className: "w-fit" })}
    >
      <div className="flex flex-row -space-x-1">
        {sponsors.map(sponsor => (
          <Thumbnail
            size="xs"
            key={sponsor.id}
            src={sponsor.logoUrl ? config.CLOUDFLARE_RESIZE_W_100_PREFIX + sponsor.logoUrl : sponsor.logoUrl || ""}
            alt={sponsor.name || ""}
            type="user"
          />
        ))}
      </div>
      {sponsors.length === 1 ? (
        <Typography variant="body-s" className="truncate">
          {sponsors.at(0)?.name}
        </Typography>
      ) : (
        <Typography
          variant="body-s"
          className="truncate"
          translate={{ token: "project.sponsorsCount", params: { count: sponsors.length } }}
        />
      )}
    </div>
  );
}
