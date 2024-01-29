import { useContext } from "react";
import { ProjectsContext } from "../../../context/project.context";
import { Flex } from "components/layout/flex/flex";
import { SelectableTag } from "components/ds/form/selectable-tag/selectable-tag";
import { Ownership } from "../../../context/project.context.types";
import { SelectableTagItem } from "components/ds/form/selectable-tag/selectable-tag-item/selectable-tag-item";
import { Icon } from "components/layout/icon/icon";

export function FiltersOwnership() {
  const { filters } = useContext(ProjectsContext);

  const onFilterChange = (value: Ownership | null) => {
    filters.set({ ownership: value || Ownership.All });
  };

  return (
    <Flex className="gap-2">
      <SelectableTag
        mode="single"
        value={filters.values.ownership}
        onChange={onFilterChange}
        options={[
          {
            value: Ownership.Mine,
            children: "Mine",
            icon: props => <Icon remixName="ri-seedling-line" {...props} />,
          },
          {
            value: Ownership.All,
            children: "All",
          },
          {
            value: Ownership.All,
            children: "All2",
            disabled: true,
          },
        ]}
      />

      <SelectableTagItem value={Ownership.Mine} checkboxProps={{ onChange: () => null }}>
        Display tag
      </SelectableTagItem>
    </Flex>
  );
}
