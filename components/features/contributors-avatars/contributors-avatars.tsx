import { TContributorsAvatars } from "./contributors-avatars.types";
import { Tooltip } from "components/ds/tooltip/tooltip";
import { ThumbnailGroup } from "components/ds/thumbnail-group/thumbnail-group";
import { Contributor } from "components/features/contributor/contributor";

export function ContributorsAvatars({ contributors, ...variant }: TContributorsAvatars.Props) {
  const formatUserNames = () =>
    contributors
      .filter(contributor => contributor.login)
      .map(contributor => contributor.login)
      .join(", ");

  function contributorsContent() {
    return (
      <div className="flex flex-row items-center gap-3 text-snow">
        {contributors.map(contributor => (
          <Contributor
            key={contributor.githubUserId}
            githubUserId={contributor.githubUserId}
            login={contributor.login}
            avatarUrl={contributor.avatarUrl}
            isRegistered={false}
            clickable
          />
        ))}
      </div>
    );
  }

  return (
    <Tooltip content={contributorsContent()}>
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
