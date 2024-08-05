import { useStackProjectOverview } from "src/App/Stacks/Stacks";
import { ProjectConstants } from "src/api/Project/constants";

import { Avatar } from "components/ds/avatar/avatar";
import { Card } from "components/ds/card/card";
import { IconTag } from "components/ds/icon-tag/icon-tag";
import { Tag } from "components/ds/tag/tag";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { TProjectCard } from "./project-card.types";

import tagMapping = ProjectConstants.tagMapping;

export function ProjectCard({ data }: TProjectCard.Props) {
  const [open] = useStackProjectOverview();
  return (
    <Card className="flex w-full flex-col gap-4 !p-4" background={"base"} onClick={() => open({ slug: data.slug })}>
      <div className="flex h-full flex-col justify-between gap-3">
        <div className="flex w-full flex-row justify-between">
          <Avatar src={data.logoUrl} alt={data.name} size={"m"} shape={"square"} />
          <Flex direction="row" className="justify-start gap-2">
            {(data.tags || []).map(tag => (
              <IconTag
                key={tag}
                icon={{ ...tagMapping[tag].icon, size: 12 }}
                tooltipContent={<Translate token={tagMapping[tag].tooltip} />}
                size={"s"}
              />
            ))}
          </Flex>
        </div>
        <div className="flex flex-col gap-2">
          <Typography variant="title-s">{data.name}</Typography>
          <Typography variant="body-s" className="text-spaceBlue-200">
            {data.shortDescription}
          </Typography>
        </div>
        <div className="flex flex-row gap-2 sm:flex-col">
          <Tag>
            <Icon remixName={"ri-user-line"} size={16} />
            <Translate
              token={"v2.pages.home.leadProjects.contributors"}
              params={{ count: data.contributorCount || 0 }}
            />
          </Tag>
          <Tag>
            <Icon remixName={"ri-money-dollar-circle-line"} size={16} />
            <Translate token={"v2.pages.home.leadProjects.budget"} params={{ count: data.remainingUsdBudget || 0 }} />
          </Tag>
        </div>
      </div>
    </Card>
  );
}
