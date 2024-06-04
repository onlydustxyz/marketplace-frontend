import { ecosystemsApiClient } from "api-client/resources/ecosystems";

import { TMoreProjectTitle } from "app/ecosystems/[ecosystemSlug]/features/more-project-title/more-project-title.types";

import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

export async function MoreProjectTitle({ ecosystemSlug }: TMoreProjectTitle.Props) {
  const [hasHotCommunity, hasNewbiesWelcome, hasHastAndFurious] = await Promise.all([
    ecosystemsApiClient.fetch
      .getEcosystemProjectBySlug(
        { ecosystemSlug },
        { tag: "HOT_COMMUNITY" },
        {
          pageSize: 3,
          pageIndex: 0,
        }
      )
      .request({
        next: { revalidate: 120 },
      })
      .then(res => {
        return !!res.projects.length;
      }),
    ecosystemsApiClient.fetch
      .getEcosystemProjectBySlug(
        { ecosystemSlug },
        { tag: "NEWBIES_WELCOME" },
        {
          pageSize: 3,
          pageIndex: 0,
        }
      )
      .request({
        next: { revalidate: 120 },
      })
      .then(res => {
        return !!res.projects.length;
      }),
    ecosystemsApiClient.fetch
      .getEcosystemProjectBySlug(
        { ecosystemSlug },
        { tag: "FAST_AND_FURIOUS" },
        {
          pageSize: 3,
          pageIndex: 0,
        }
      )
      .request({
        next: { revalidate: 120 },
      })
      .then(res => {
        return !!res.projects.length;
      }),
  ]);

  if (!hasHotCommunity && !hasNewbiesWelcome && !hasHastAndFurious) {
    throw new Error("No more projects found");
  }
  return (
    <div className="flex items-baseline gap-2">
      <Icon remixName="ri-folder-3-line" size={24} />
      <Typography variant="title-m" translate={{ token: "v2.pages.ecosystems.detail.moreProjects.title" }} />
    </div>
  );
}