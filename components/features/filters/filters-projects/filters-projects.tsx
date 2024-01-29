import { useIntl } from "src/hooks/useIntl";
import FolderLine from "src/icons/FolderLine";

import { FilterFieldContainer } from "components/ds/Filters/field-container/field-container";
import { SelectAutocomplete } from "components/ds/Filters/select-autocomplete/select-autocomplete";

import { TFiltersProjects } from "./filters-projects.types";

export function FiltersProjects({ projects, selected, onChange }: TFiltersProjects.Props) {
  const { T } = useIntl();
  return (
    <FilterFieldContainer label={T("filter.project.title")}>
      <SelectAutocomplete
        type="square"
        icon={({ className }) => <FolderLine className={className} />}
        tokens={{ zero: "filter.project.all", other: "filter.project", empty: "filter.project.empty" }}
        items={projects}
        multiple
        selected={selected}
        onChange={onChange}
        disabled={projects.length <= 1}
      />
    </FilterFieldContainer>
  );
}
