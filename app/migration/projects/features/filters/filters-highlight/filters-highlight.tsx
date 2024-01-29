import { useContext } from "react";
import { ProjectsContext } from "../../../context/project.context";
import { Flex } from "components/layout/flex/flex";
import { SelectableTag } from "components/ds/form/selectable-tag/selectable-tag";
import { Icon } from "components/layout/icon/icon";
import { ProjectTypes } from "src/api/Project/types";

export function FiltersHighlight() {
  const { filters } = useContext(ProjectsContext);

  const onFilterChange = (value: ProjectTypes.Ownership | null) => {
    filters.set({ ownership: value || ProjectTypes.Ownership.All });
  };

  return (
    <Flex className="gap-2">
      <SelectableTag
        mode="single"
        value={filters.values.ownership}
        onChange={onFilterChange}
        options={[
          {
            value: ProjectTypes.Ownership.Mine,
            children: "Beginners welcome",
            icon: props => <Icon remixName="ri-seedling-line" {...props} />,
          },
          {
            value: ProjectTypes.Ownership.All,
            children: "Strong expertise required",
            icon: props => <Icon remixName="ri-git-fork-line" {...props} />,
          },
          {
            value: ProjectTypes.Ownership.All,
            children: "Likely to send rewards",
            icon: props => <Icon remixName="ri-hand-coin-line" {...props} />,
          },
          {
            value: ProjectTypes.Ownership.All,
            children: "High velocity",
            icon: props => <Icon remixName="ri-rocket-2-line" {...props} />,
          },
        ]}
      />
    </Flex>
  );
}
