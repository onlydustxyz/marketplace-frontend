import { TProjectLanguages } from "app/hackathons/[hackathonSlug]/features/project-side-overview/components/project-languages/project-languages.types";

import { Paper } from "components/atoms/paper";
import { Tag } from "components/atoms/tag";
import { Typo } from "components/atoms/typo";
import { Icon } from "components/layout/icon/icon";

export function ProjectLanguages({ languages }: TProjectLanguages.Props) {
  if (!languages.length) return null;
  return (
    <Paper size={"m"} container={"2"} classNames={{ base: "grid gap-3" }}>
      <div className="flex gap-1">
        <Icon remixName="ri-code-line" />
        <Typo size={"xs"} color={"text-1"} translate={{ token: "v2.features.projectSideOverview.languages" }} />
      </div>

      <div className={"flex flex-wrap gap-2"}>
        {languages.map(s => (
          <Tag key={s.id} avatar={{ src: s.logoUrl, alt: s.name }} style={"outline"} color={"grey"} size={"s"}>
            {s.name}
          </Tag>
        ))}
      </div>
    </Paper>
  );
}
