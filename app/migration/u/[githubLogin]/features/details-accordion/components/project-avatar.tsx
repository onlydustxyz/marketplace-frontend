import { MouseEvent } from "react";

import { TDetailsAccordion } from "app/migration/u/[githubLogin]/features/details-accordion/details-accordion.types";

import { useStackProjectOverview } from "src/App/Stacks/Stacks";
import { cn } from "src/utils/cn";

import { Avatar } from "components/ds/avatar/avatar";
import { Tooltip } from "components/ds/tooltip/tooltip";
import { BaseLink } from "components/layout/base-link/base-link";

export function ProjectAvatar({
  name,
  slug,
  avatarUrl,
  hasPendingInvitation,
  hasMissingGithubAppInstallation,
}: TDetailsAccordion.ProjectAvatarProps) {
  const [openProjectOverview] = useStackProjectOverview();

  const onClickProject = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    openProjectOverview({ slug });
  };
  return (
    <Tooltip key={name} content={name}>
      <BaseLink onClick={e => onClickProject(e)} href={""}>
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
