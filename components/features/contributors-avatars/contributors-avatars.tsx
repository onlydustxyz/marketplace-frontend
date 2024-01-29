import { TContributorsAvatars } from "./contributors-avatars.types";
import { Tooltip } from "components/ds/tooltip/tooltip";
import { ThumbnailGroup } from "components/ds/thumbnail-group/thumbnail-group";

export function ContributorsAvatars({ contributors, ...variant }: TContributorsAvatars.Props) {
  const formatUserNames = () => contributors.map(contributor => contributor.login || "").join(", ");

  return (
    <Tooltip content={formatUserNames()}>
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
    </Tooltip>
  );
}
