import { ecosystemsApiClient } from "api-client/resources/ecosystems";

import { TMoreProject } from "app/ecosystems/[ecosystemSlug]/features/more-project/more-project.types";

import { cn } from "src/utils/cn";

import { AvatarLabelled } from "components/ds/avatar/avatar.labelled";
import { Card } from "components/ds/card/card";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

import { Key } from "hooks/translate/use-translate";

function MoreProjectItem({ project }: TMoreProject.MoreProjectItemProps) {
  return (
    <div className="flex items-center gap-2 py-6">
      <AvatarLabelled
        avatarProps={{ src: project.logoUrl, alt: project.name, size: "l", shape: "square" }}
        labelProps={{ title: project.name }}
        className="col-span-3 flex-1"
      >
        <Typography variant="title-s">{project.name}</Typography>
        <Typography variant="body-s" className="line-clamp-2 text-spaceBlue-100">
          {project.shortDescription}
        </Typography>
      </AvatarLabelled>
      <Icon remixName="ri-arrow-right-s-line" size={24} />
    </div>
  );
}

export async function MoreProject({ ecosystemSlug, tag, className }: TMoreProject.MoreProjectProps) {
  const projects = await ecosystemsApiClient.fetch
    .getEcosystemProjectBySlug(
      { ecosystemSlug },
      {
        tag,
      },
      {
        pageSize: 3,
        pageIndex: 0,
      }
    )
    .request({
      next: { revalidate: 120 },
    })
    .then(res => res.projects);

  const title = (): Key => {
    switch (tag) {
      case "HOT_COMMUNITY":
        return "v2.pages.ecosystems.detail.moreProject.hotCommunitySubtitle";
      case "NEWBIES_WELCOME":
        return "v2.pages.ecosystems.detail.moreProject.newbiesWelcomeSubtitle";
      case "FAST_AND_FURIOUS":
        return "v2.pages.ecosystems.detail.moreProject.fastAndFuriousSubtitle";
      default:
        return "v2.pages.ecosystems.detail.moreProject.newbiesWelcomeSubtitle";
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Typography
        variant="title-s"
        translate={{
          token: title(),
        }}
      />
      <Card
        className={cn("relative flex w-full flex-col divide-y divide-card-border-light !p-5", className)}
        background="base"
      >
        {projects?.map(project => (
          <MoreProjectItem key={project.id} project={project} />
        ))}
      </Card>
    </div>
  );
}
