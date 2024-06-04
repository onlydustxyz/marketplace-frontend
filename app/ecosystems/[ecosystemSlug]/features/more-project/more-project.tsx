import { TMoreProject } from "app/ecosystems/[ecosystemSlug]/features/more-project/more-project.types";

import { cn } from "src/utils/cn";

import { AvatarLabelled } from "components/ds/avatar/avatar.labelled";
import { Card } from "components/ds/card/card";
import { BaseLink } from "components/layout/base-link/base-link";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

import { NEXT_ROUTER } from "constants/router";

import { Key } from "hooks/translate/use-translate";

function MoreProjectItem({ project }: TMoreProject.MoreProjectItemProps) {
  return (
    <BaseLink href={NEXT_ROUTER.projects.details.root(project.slug)} className="w-full">
      <div className="flex max-w-full items-center gap-2 py-6">
        <AvatarLabelled
          avatarProps={{ src: project.logoUrl, alt: project.name, size: "l", shape: "square" }}
          labelProps={{ title: project.name }}
          className="col-span-3 flex-1"
        >
          <Typography variant="title-s">{project.name}</Typography>
          <Typography variant="body-s" className="line-clamp-2 whitespace-normal text-spaceBlue-100">
            {project.shortDescription}
          </Typography>
        </AvatarLabelled>
        <Icon remixName="ri-arrow-right-s-line" size={24} />
      </div>
    </BaseLink>
  );
}

export function MoreProject({ projects, hasMore, tag, ecosystemSlug, className }: TMoreProject.MoreProjectProps) {
  const title = (): Key => {
    switch (tag) {
      case "HOT_COMMUNITY":
        return "v2.pages.ecosystems.detail.moreProjects.hotCommunitySubtitle";
      case "NEWBIES_WELCOME":
        return "v2.pages.ecosystems.detail.moreProjects.newbiesWelcomeSubtitle";
      case "FAST_AND_FURIOUS":
        return "v2.pages.ecosystems.detail.moreProjects.fastAndFuriousSubtitle";
      default:
        return "v2.pages.ecosystems.detail.moreProjects.newbiesWelcomeSubtitle";
    }
  };

  if (!projects.length) return null;

  return (
    <Card
      className={cn("relative flex h-full w-full flex-col divide-y divide-card-border-light !px-5 !py-0", className)}
      background="base"
    >
      <div className="grid grid-cols-3 items-center py-6">
        <Typography
          variant="title-s"
          translate={{
            token: title(),
          }}
          className="col-span-2"
        />
        {hasMore ? (
          <BaseLink
            href={NEXT_ROUTER.projects.allWithParams({ tags: tag, ecosystems: ecosystemSlug })}
            className="w-full"
          >
            <Typography
              variant="body-xs-bold"
              className="text-right text-spacePurple-500"
              translate={{ token: "v2.pages.ecosystems.detail.moreProjects.seeMore" }}
            />
          </BaseLink>
        ) : null}
      </div>
      {projects?.map(project => (
        <MoreProjectItem key={project.id} project={project} />
      ))}
    </Card>
  );
}
