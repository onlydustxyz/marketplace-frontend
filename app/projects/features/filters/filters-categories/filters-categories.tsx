import { useContext } from "react";

import { TSelectAutocomplete } from "components/ds/form/select-autocomplete/select-autocomplete.types";
import { FiltersCategories as Filter } from "components/features/filters/filters-categories/filters-categories";

import { ProjectsContext } from "../../../context/project.context";

export function FiltersCategories() {
  const { filters } = useContext(ProjectsContext);

  const handleEcosystemClick = (categories: TSelectAutocomplete.Item[]) => {
    filters.set({ categories });
  };

  const selected = filters.options.categories.filter(({ value }) =>
    filters.values.categories.some(({ value: selectedValue }) => value === selectedValue)
  );

  return <Filter selected={selected} categories={filters.options.categories} onChange={handleEcosystemClick} />;
}
