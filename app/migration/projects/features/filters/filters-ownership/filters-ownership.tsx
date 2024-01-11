import { useContext } from "react";
import { ProjectsContext } from "../../../context/project.context";
import { Flex } from "components/layout/flex/flex";
import { SelectableTag } from "components/ds/selectable-tag/selectable-tag";
import { Translate } from "components/layout/translate/translate";
import { Icon } from "components/layout/icon/icon";
import { Ownership } from "../../../context/project.context.types";

export function FiltersOwnership() {
  const { filters } = useContext(ProjectsContext);

  const handleAllClick = () => {
    filters.set({ ownership: Ownership.All });
  };

  const handleMineClick = () => {
    filters.set({ ownership: Ownership.Mine });
  };

  return (
    <Flex className="gap-2">
      <SelectableTag selected={filters.values.ownership === Ownership.All} onClick={handleAllClick}>
        <Translate token="filter.ownership.all" />
      </SelectableTag>

      <SelectableTag selected={filters.values.ownership === Ownership.Mine} onClick={handleMineClick}>
        <Icon remixName="ri-star-line" />
        <Translate token="filter.ownership.mine" />
      </SelectableTag>
    </Flex>
  );
}
