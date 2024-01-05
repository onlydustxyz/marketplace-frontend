import { ContributorsAvatarsProps } from "./contributors-avatars.type.ts";
import { TooltipPosition, withTooltip } from "../../../src/components/Tooltip";
import { ThumbnailGroup } from "@/components/ds/thumbnail-group";
import React from "react";

export function ContributorsAvatars({ contributors, ...variant }: ContributorsAvatarsProps) {
  const formatUserNames = () => contributors.map(contributor => contributor.login || "").join(", ");

  return (
    <div
      {...withTooltip(formatUserNames(), {
        visible: contributors.length > 1,
        position: TooltipPosition.Bottom,
      })}
    >
      <ThumbnailGroup
        thumbnails={contributors.map(contributor => ({
          src: contributor.avatarUrl
            ? `${process.env.NEXT_PUBLIC_CLOUDFLARE_RESIZE_W_100_PREFIX}${contributor.avatarUrl}`
            : "",
          alt: contributor.login || "",
        }))}
        size="xs"
        {...variant}
      />
    </div>
  );
}

export default ContributorsAvatars;
