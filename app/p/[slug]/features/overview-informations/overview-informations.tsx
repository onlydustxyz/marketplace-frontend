import Image from "next/image";

import { ProjectConstants } from "src/api/Project/constants";
import { IMAGES } from "src/assets/img";
import MarkdownPreview from "src/components/MarkdownPreview";

import { Card } from "components/ds/card/card";
import { SelectableTagItem } from "components/ds/form/selectable-tag/selectable-tag-item/selectable-tag-item";
import { Tooltip } from "components/ds/tooltip/tooltip";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { TOverviewInformations } from "./overview-informations.types";

// TODO: Refacto MarkdownPreview
export function OverviewInformations({ project }: TOverviewInformations.Props) {
  const renderTags = () => {
    return (
      <>
        {project.tags?.map(tag => {
          const { icon, label, tooltip } = ProjectConstants.tagMapping[tag];

          return (
            <Tooltip key={label} content={<Translate token={tooltip} />}>
              <SelectableTagItem.Static>
                <Icon {...icon} />
                <Translate token={label} />
              </SelectableTagItem.Static>
            </Tooltip>
          );
        })}
      </>
    );
  };

  return (
    <Card background="base" hasPadding={false}>
      <Flex direction="col" className="gap-4 px-6 py-4">
        <Flex direction="col" className="gap-2">
          <Flex alignItems="center" className="gap-1 md:gap-4">
            <Image
              alt={project.name}
              src={project?.logoUrl || IMAGES.logo.space}
              loading="lazy"
              objectFit="cover"
              width={80}
              height={80}
              className="h-8 w-8 rounded-lg md:h-20 md:w-20"
            />

            <Flex direction="col" className="gap-1">
              <Typography variant="title-m">{project.name}</Typography>

              {project.tags?.length ? (
                <Flex wrap="wrap" className="hidden gap-2 lg:flex">
                  {renderTags()}
                </Flex>
              ) : null}
            </Flex>
          </Flex>

          {project.tags?.length ? (
            <Flex wrap="wrap" className="gap-2 lg:hidden">
              {renderTags()}
            </Flex>
          ) : null}
        </Flex>

        <MarkdownPreview className="text-sm">{project.longDescription}</MarkdownPreview>
      </Flex>
    </Card>
  );
}
