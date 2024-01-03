"use client";
import Tag from "@/components/ds/tag/tag.tsx";
import { TagSize } from "../../../../../../src/components/Tag";
import { TooltipPosition, withTooltip } from "../../../../../../src/components/Tooltip";
import RoundedImage, { ImageSize, Rounding } from "../../../../../../src/components/RoundedImage";
import config from "../../../../../../src/config.ts";
import { useIntl } from "../../../../../../src/hooks/useIntl.tsx";

type Props = {
  sponsors: { id: string; logoUrl: string; name: string; url: string }[];
};
export default function Sponsors({ sponsors }: Props) {
  const { T } = useIntl();
  if (!sponsors?.length) {
    return null;
  }

  const asMoreThan1Sponsor = sponsors.length > 1;
  const tooltipsContent = asMoreThan1Sponsor
    ? T("project.fundedBy", {
        topSponsorsString: sponsors.map(sponsor => sponsor.name).join(", "),
      })
    : "";

  return (
    <Tag
      size={TagSize.Small}
      {...withTooltip(tooltipsContent, { position: TooltipPosition.Bottom, className: "w-fit" })}
    >
      <div className="flex flex-row -space-x-1">
        {sponsors.map(sponsor => (
          <RoundedImage
            key={sponsor.id}
            src={sponsor.logoUrl ? config.CLOUDFLARE_RESIZE_W_100_PREFIX + sponsor.logoUrl : sponsor.logoUrl || ""}
            alt={sponsor.name || ""}
            size={ImageSize.Xxs}
            rounding={Rounding.Circle}
          />
        ))}
      </div>
      {sponsors.length === 1 ? sponsors.at(0)?.name : T("project.sponsorsCount", { count: sponsors.length })}
    </Tag>
  );
}
