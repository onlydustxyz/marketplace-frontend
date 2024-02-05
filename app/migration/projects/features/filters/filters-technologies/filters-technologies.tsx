import { useContext } from "react";

import { TSelectAutocomplete } from "components/ds/form/select-autocomplete/select-autocomplete.types";
import { FiltersTechnologies as Filter } from "components/features/filters/filters-technologies/filters-technologies";

import { ProjectsContext } from "../../../context/project.context";

export function FiltersTechnologies() {
  const { filters } = useContext(ProjectsContext);

  const handleTechnologyClick = (technologies: TSelectAutocomplete.Item[]) => {
    filters.set({ technologies: technologies.map(t => t.value) });
  };

  return (
    <Filter
      selected={filters.values.technologies.map(name => ({
        label: name,
        id: name,
        value: name,
      }))}
      technologies={filters.options.technologies}
      onChange={handleTechnologyClick}
    />
  );
}
