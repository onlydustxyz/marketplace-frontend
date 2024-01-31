import { useContext } from "react";

import { ProjectTypes } from "src/api/Project/types";
import { useIntl } from "src/hooks/useIntl";

import { SelectableTag } from "components/ds/form/selectable-tag/selectable-tag";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";

import { ProjectsContext } from "../../../context/project.context";

export function FiltersTags() {
  const { T } = useIntl();
  const { filters } = useContext(ProjectsContext);

  const onFilterChange = (value: ProjectTypes.Tags[]) => {
    filters.set({ tags: value });
  };

  return (
    <Flex className="gap-2">
      <SelectableTag
        mode="multiple"
        value={filters.values.tags}
        onChange={onFilterChange}
        options={[
          {
            value: ProjectTypes.Tags.BeginnersWelcome,
            children: T(`v2.commons.enums.project.tags.${ProjectTypes.Tags.BeginnersWelcome}`),
            icon: props => <Icon remixName="ri-seedling-line" {...props} />,
          },
          {
            value: ProjectTypes.Tags.StrongExpertise,
            children: T(`v2.commons.enums.project.tags.${ProjectTypes.Tags.StrongExpertise}`),
            icon: props => <Icon remixName="ri-git-fork-line" {...props} />,
          },
          {
            value: ProjectTypes.Tags.LikelyToSendRewards,
            children: T(`v2.commons.enums.project.tags.${ProjectTypes.Tags.LikelyToSendRewards}`),
            icon: props => <Icon remixName="ri-hand-coin-line" {...props} />,
          },
          {
            value: ProjectTypes.Tags.FastPaced,
            children: T(`v2.commons.enums.project.tags.${ProjectTypes.Tags.FastPaced}`),
            icon: props => <Icon remixName="ri-rocket-2-line" {...props} />,
          },
        ]}
      />
    </Flex>
  );
}
