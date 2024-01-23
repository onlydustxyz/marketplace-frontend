"use client";
import { Tag } from "components/ds/tag/tag";
import { TooltipPosition, withTooltip } from "src/components/Tooltip";
import config from "src/config";
import { useIntl } from "src/hooks/useIntl";
import { Thumbnail } from "components/ds/thumbnail/thumbnail";
import { TSponsors } from "./sponsors.types";
import { Translate } from "components/layout/translate/translate";

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
    <Tag size="small" {...withTooltip(tooltipsContent, { position: TooltipPosition.Bottom, className: "w-fit" })}>
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
        sponsors.at(0)?.name
      ) : (
        <Translate token="project.sponsorsCount" params={{ count: sponsors.length }} />
      )}
    </Tag>
  );
}
