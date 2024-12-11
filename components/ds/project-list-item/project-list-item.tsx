import { cn } from "src/utils/cn";

import { AvatarLabelled } from "components/ds/avatar/avatar.labelled";
import { TProjectListItem } from "components/ds/project-list-item/project-list-item.types";
import { BaseLink } from "components/layout/base-link/base-link";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

import { NEXT_ROUTER } from "constants/router";

export function ProjectListItem({ project, className }: TProjectListItem.Props) {
  return (
    <BaseLink
      href={NEXT_ROUTER.projects.details.root(project.slug)}
      className={cn(
        "group flex w-full min-w-0 max-w-full items-center gap-3 px-3 py-4 transition-all hover:bg-card-background-medium sm:gap-5 sm:px-5 sm:py-6",
        className
      )}
    >
      <AvatarLabelled
        avatarProps={{ src: project.logoUrl, alt: project.name, size: "l", shape: "square" }}
        labelProps={{ title: project.name }}
      >
        <Typography variant="title-s" className={"truncate"}>
          {project.name}
        </Typography>
        <Typography variant="body-s" className="line-clamp-2 whitespace-normal text-spaceBlue-100">
          {project.shortDescription}
        </Typography>
      </AvatarLabelled>
      <Icon remixName="ri-arrow-right-s-line" className="transition-all group-hover:translate-x-1" size={24} />
    </BaseLink>
  );
}
