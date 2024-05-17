import { MouseEvent } from "react";

import { TDetailsAccordion } from "app/u/[githubLogin]/features/details-accordion/details-accordion.types";

import { useStackProjectOverview } from "src/App/Stacks/Stacks";
import { cn } from "src/utils/cn";

import { Avatar } from "components/ds/avatar/avatar";
import { Tooltip } from "components/ds/tooltip/tooltip";
import { BaseLink } from "components/layout/base-link/base-link";

export function ProjectAvatar({ name, slug, logoUrl }: TDetailsAccordion.ProjectAvatarProps) {
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
          src={logoUrl}
          alt={name}
          size="s"
          shape="square"
          className={cn("border-card-border-light transition-colors hover:border-card-border-heavy")}
        />
      </BaseLink>
    </Tooltip>
  );
}
