import { TMoreProject } from "app/(v1)/ecosystems/[ecosystemSlug]/features/more-project/more-project.types";

import { cn } from "src/utils/cn";

import { Card } from "components/ds/card/card";
import { ProjectListItem } from "components/ds/project-list-item/project-list-item";
import { BaseLink } from "components/layout/base-link/base-link";
import { Typography } from "components/layout/typography/typography";

import { NEXT_ROUTER } from "constants/router";

import { Key } from "hooks/translate/use-translate";

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
      className={cn("relative flex h-full w-full flex-col divide-y divide-card-border-light", className)}
      background="base"
      hasPadding={false}
    >
      <div className="grid grid-cols-3 items-center px-3 py-4 sm:px-5 sm:py-6">
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
        <ProjectListItem key={project.id} project={project} />
      ))}
    </Card>
  );
}
