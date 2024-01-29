import { useContext } from "react";

import { IMAGES } from "src/assets/img";

import { FiltersDropDown } from "components/ds/drop-down/filters-drop-down";

import { ProjectsContext } from "../../../context/project.context";
import { FilterFieldContainer } from "components/ds/Filters/field-container/field-container";
import { SelectAutocomplete } from "components/ds/form/select-autocomplete/select-autocomplete";
import { SelectAutocomplete as SelectAutocompleteV1 } from "components/ds/form/select-autocomplete-v1/select-autocomplete";
import FolderLine from "src/icons/FolderLine";
import { useIntl } from "src/hooks/useIntl";

export function FiltersTechnologies() {
  const { T } = useIntl();
  const { filters } = useContext(ProjectsContext);

  const handleTechnologyClick = (technologies: string[]) => {
    filters.set({ technologies });
  };

  return (
    <>
      <FiltersDropDown
        title="filter.technologies.all"
        // TODO change svg to webp
        image={IMAGES.svg.technology}
        options={filters.options.technologies}
        value={filters.values.technologies || []}
        onChange={handleTechnologyClick}
      />
      <FilterFieldContainer label={T("filter.technologies.all")}>
        <SelectAutocompleteV1
          type="square"
          icon={({ className }) => <FolderLine className={className} />}
          tokens={{ zero: "filter.project.all", other: "filter.project", empty: "filter.project.empty" }}
          items={filters.options.technologies.map(({ id, label }) => ({ id, label, image: undefined }))}
          multiple
          selected={filters.values.technologies.map(name => ({
            label: name,
            id: name,
          }))}
          onChange={() => console.log("onChange")}
        />
      </FilterFieldContainer>
      <FilterFieldContainer label={T("filter.technologies.all")}>
        <SelectAutocomplete
          type="square"
          icon={({ className }) => <FolderLine className={className} />}
          tokens={{ zero: "filter.project.all", other: "filter.project", empty: "filter.project.empty" }}
          items={filters.options.technologies.map(({ id, label }) => ({ id, label, image: undefined }))}
          multiple
          selected={filters.values.technologies.map(name => ({
            label: name,
            id: name,
          }))}
          onChange={() => console.log("onChange")}
        />
      </FilterFieldContainer>
    </>
  );
}
