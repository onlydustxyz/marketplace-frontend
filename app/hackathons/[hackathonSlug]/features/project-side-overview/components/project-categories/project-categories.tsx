import { TProjectCategories } from "app/hackathons/[hackathonSlug]/features/project-side-overview/components/project-categories/project-categories.types";

import { Paper } from "components/atoms/paper";
import { Tag } from "components/atoms/tag";
import { Typo } from "components/atoms/typo";
import { Icon } from "components/layout/icon/icon";

export function ProjectCategories({ categories }: TProjectCategories.Props) {
  if (!categories.length) return null;
  return (
    <Paper size={"m"} container={"2"} classNames={{ base: "flex flex-col gap-3" }}>
      <div className="flex gap-1">
        <Icon remixName="ri-price-tag-3-line" />
        <Typo size={"xs"} color={"text-1"} translate={{ token: "v2.features.projectSideOverview.categories" }} />
      </div>

      <div className={"flex flex-wrap gap-2"}>
        {categories.map(s => (
          <Tag key={s.id} style={"outline"} color={"grey"} size={"s"}>
            {s.name}
          </Tag>
        ))}
      </div>
    </Paper>
  );
}
