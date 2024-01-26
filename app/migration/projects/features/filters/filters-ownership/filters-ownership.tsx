import { useContext } from "react";
import { ProjectsContext } from "../../../context/project.context";
import { Flex } from "components/layout/flex/flex";
import { SelectableTag } from "components/ds/form/selectable-tag/selectable-tag";
import { Ownership } from "../../../context/project.context.types";
import { SelectableTagItem } from "components/ds/form/selectable-tag/selectable-tag-item/selectable-tag-item";

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
          },
          {
            value: Ownership.All,
            children: "All",
          },
        ]}
      />

      <SelectableTagItem value={Ownership.Mine} checkboxProps={{ onChange: (...args) => console.log("args", args) }}>
        Display tag
      </SelectableTagItem>
    </Flex>
  );
}
