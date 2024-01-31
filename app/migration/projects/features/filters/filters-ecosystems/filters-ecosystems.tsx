import { useContext } from "react";

import { TSelectAutocomplete } from "components/ds/form/select-autocomplete/select-autocomplete.types";
import { FiltersEcosystems as Filter } from "components/features/filters/filters-ecosystems/filters-ecosystems";

import { ProjectsContext } from "../../../context/project.context";

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
