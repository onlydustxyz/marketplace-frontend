import { ProjectConstants } from "src/api/Project/constants";
import { cn } from "src/utils/cn";

import { SelectableTagItem } from "components/ds/form/selectable-tag/selectable-tag-item/selectable-tag-item";
import { Tooltip } from "components/ds/tooltip/tooltip";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";

import { TTags } from "./tags.types";

export function Tags({ tags, className }: TTags.Props) {
  if (!tags?.length) {
    return null;
  }

  return (
    <Flex wrap="wrap" className={cn("gap-2", className)}>
      {tags?.map(tag => {
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
    </Flex>
  );
}
