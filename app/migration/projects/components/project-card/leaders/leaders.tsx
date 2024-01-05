"use client";
import { Leader } from "../../../types/projects.types.ts";
import Contributor from "@/components/features/Contributor/contributor.tsx";
import RoundedImage from "@/components/layout/rounded-image/rounded-image.tsx";
import Translate from "@/components/layout/translate/translate.tsx";
import React, { useMemo } from "react";
import { TooltipPosition, withTooltip } from "../../../../../../src/components/Tooltip";
import { formatLeadNames } from "./leaders.utils.tsx";
import { ThumbnailGroup } from "@/components/ds/thumbnail-group";

export default function Leaders({ leaders }: { leaders: Leader[] }) {
  const AsOnlyOneLead = useMemo(() => {
    if (leaders.length === 1 && leaders[0].login) {
      const lead = leaders[0];
      return (
        <div className="flex flex-row items-center gap-1 pt-0.5 text-sm text-spaceBlue-200">
          <Contributor
            githubUserId={lead.githubUserId}
            login={lead.login}
            avatarUrl={null}
            isRegistered={false}
            clickable
          />
        </div>
      );
    }

    return null;
  }, [leaders]);

  const LeadersAvatars = useMemo(
    () => (
      <div
        className="flex flex-row -space-x-1"
        {...withTooltip(formatLeadNames(leaders), {
          visible: leaders.length > 1,
          position: TooltipPosition.Bottom,
        })}
      >
        {leaders.map(leader => (
          <RoundedImage
            rounding="circle"
            alt={leader.login || ""}
            size="xxs"
            key={leader.id}
            src={leader.avatarUrl ? `${process.env.NEXT_PUBLIC_CLOUDFLARE_RESIZE_W_100_PREFIX}${leader.avatarUrl}` : ""} // TODO refactor this
          />
        ))}
        <ThumbnailGroup
          thumbnails={leaders.map(leader => ({
            src: leader.avatarUrl,
            alt: leader.login || "",
          }))}
          size="xs"
        />
      </div>
    ),
    [leaders]
  );

  // render a placeholder if no leaders
  if (!leaders.length) {
    return (
      <div className="flex flex-row items-center gap-1 pt-0.5 text-sm text-spaceBlue-200">
        <div className="flex flex-row gap-1 truncate whitespace-nowrap">
          <Translate token="project.noLed" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row items-center gap-1 pt-0.5 text-sm text-spaceBlue-200">
      {leaders.length > 0 && (
        <div className="flex flex-row gap-1 truncate whitespace-nowrap">
          <Translate token="project.ledBy" params={{ count: leaders.length }} />
          {AsOnlyOneLead}
        </div>
      )}
      {LeadersAvatars}
    </div>
  );
}
