import { useContext } from "react";
import { ProjectsContext } from "../../../context/project.context";
import { TSelectAutocomplete } from "components/ds/form/select-autocomplete/select-autocomplete.types";
import { FiltersEcosystems as Filter } from "components/features/filters/filters-ecosystems/filters-ecosystems";

export function FiltersEcosystems() {
  const { filters } = useContext(ProjectsContext);

  const handleEcosystemClick = (ecosystems: TSelectAutocomplete.Item[]) => {
    filters.set({ ecosystemId: ecosystems });
  };

  return (
    <>
      <Filter
        selected={filters.values.ecosystemId}
        ecosystems={filters.options.ecosystems}
        onChange={handleEcosystemClick}
      />
    </>
  );
}
