import { useContext } from "react";
import { ProjectsContext } from "../../../context/project.context.tsx";
import { Flex } from "@/components/layout/flex/flex.tsx";
import { SelectableTag } from "@/components/ds/selectable-tag/selectable-tag.tsx";
import Translate from "@/components/layout/translate/translate.tsx";
import { Icon } from "@/components/layout/icon/icon.tsx";
import { Ownership } from "../../../context/project.context.type.ts";

function FiltersOwnership() {
  const { filters } = useContext(ProjectsContext);
  const handleAllClick = () => {
    filters.set({ ownership: Ownership.All });
  };

  const handleMineClick = () => {
    filters.set({ ownership: Ownership.Mine });
  };

  // todo make this dynamic
  const isProjectLeader = true;

  if (!isProjectLeader) {
    return null;
  }

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

export default FiltersOwnership;
