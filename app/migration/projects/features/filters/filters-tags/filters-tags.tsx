import { useContext } from "react";

import { ProjectConstants } from "src/api/Project/constants";
import { ProjectTypes } from "src/api/Project/types";

import { SelectableTag } from "components/ds/form/selectable-tag/selectable-tag";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";

import { ProjectsContext } from "../../../context/project.context";

export function FiltersTags() {
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
            value: ProjectTypes.Tags.HotCommunity,
            children: <Translate token={ProjectConstants.tagMapping.HOT_COMMUNITY.label} />,
            icon: props => <Icon {...ProjectConstants.tagMapping.HOT_COMMUNITY.icon} {...props} />,
          },
          {
            value: ProjectTypes.Tags.NewbiesWelcome,
            children: <Translate token={ProjectConstants.tagMapping.NEWBIES_WELCOME.label} />,
            icon: props => <Icon {...ProjectConstants.tagMapping.NEWBIES_WELCOME.icon} {...props} />,
          },
          {
            value: ProjectTypes.Tags.LikelyToReward,
            children: <Translate token={ProjectConstants.tagMapping.LIKELY_TO_REWARD.label} />,
            icon: props => <Icon {...ProjectConstants.tagMapping.LIKELY_TO_REWARD.icon} {...props} />,
          },
          {
            value: ProjectTypes.Tags.WorkInProgress,
            children: <Translate token={ProjectConstants.tagMapping.WORK_IN_PROGRESS.label} />,
            icon: props => <Icon {...ProjectConstants.tagMapping.WORK_IN_PROGRESS.icon} {...props} />,
          },
          {
            value: ProjectTypes.Tags.FastAndFurious,
            children: <Translate token={ProjectConstants.tagMapping.FAST_AND_FURIOUS.label} />,
            icon: props => <Icon {...ProjectConstants.tagMapping.FAST_AND_FURIOUS.icon} {...props} />,
          },
          {
            value: ProjectTypes.Tags.BigWhale,
            children: <Translate token={ProjectConstants.tagMapping.BIG_WHALE.label} />,
            icon: props => <Icon {...ProjectConstants.tagMapping.BIG_WHALE.icon} {...props} />,
          },
        ]}
      />
    </Flex>
  );
}
