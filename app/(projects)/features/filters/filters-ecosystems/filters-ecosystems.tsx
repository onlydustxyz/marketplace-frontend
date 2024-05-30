import { useContext } from "react";

import { TSelectAutocomplete } from "components/ds/form/select-autocomplete/select-autocomplete.types";
import { FiltersEcosystems as Filter } from "components/features/filters/filters-ecosystems/filters-ecosystems";

import { ProjectsContext } from "../../../context/project.context";

export function FiltersEcosystems() {
  const { filters } = useContext(ProjectsContext);

  const handleEcosystemClick = (ecosystems: TSelectAutocomplete.Item[]) => {
    filters.set({ ecosystems });
  };

  const selected = filters.options.ecosystems.filter(({ id }) =>
    filters.values.ecosystems.some(({ id: selectedId }) => selectedId === id)
  );

  return <Filter selected={selected} ecosystems={filters.options.ecosystems} onChange={handleEcosystemClick} />;
}
