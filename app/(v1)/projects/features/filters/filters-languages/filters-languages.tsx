import { useContext } from "react";

import { TSelectAutocomplete } from "components/ds/form/select-autocomplete/select-autocomplete.types";
import { FiltersLanguages as Filter } from "components/features/filters/filters-languages/filters-languages";

import { ProjectsContext } from "../../../context/project.context";

export function FiltersLanguages() {
  const { filters } = useContext(ProjectsContext);

  const handleClick = (languages: TSelectAutocomplete.Item[]) => {
    filters.set({ languages });
  };

  const selected = filters.options.languages.filter(({ value }) =>
    filters.values.languages.some(({ value: selectedValue }) => value === selectedValue)
  );

  return <Filter selected={selected} languages={filters.options.languages} onChange={handleClick} />;
}
