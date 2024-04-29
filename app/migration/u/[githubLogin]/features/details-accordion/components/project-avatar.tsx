import { TDetailsAccordion } from "app/migration/u/[githubLogin]/features/details-accordion/details-accordion.types";

import { cn } from "src/utils/cn";

import { Avatar } from "components/ds/avatar/avatar";
import { Tooltip } from "components/ds/tooltip/tooltip";
import { BaseLink } from "components/layout/base-link/base-link";

import { NEXT_ROUTER } from "constants/router";

export function ProjectAvatar({
  name,
  slug,
  avatarUrl,
  hasPendingInvitation,
  hasMissingGithubAppInstallation,
}: TDetailsAccordion.ProjectAvatarProps) {
  return (
    <Tooltip key={name} content={name}>
      <BaseLink href={NEXT_ROUTER.projects.details.root(slug)}>
        <Avatar
          src={avatarUrl}
          alt={name}
          size="s"
          shape="square"
          className={cn("border-card-border-light transition-colors hover:border-card-border-heavy", {
            "border-orange-700 hover:border-orange-500": hasMissingGithubAppInstallation,
            "border-multicolored h-7 w-7 border-none opacity-80 transition-opacity before:rounded-lg before:p-0.5 hover:opacity-100":
              hasPendingInvitation,
          })}
        />
      </BaseLink>
    </Tooltip>
  );
}
