import { TFiltersProjects } from "./filters-projects.types";
import FolderLine from "src/icons/FolderLine";
import { SelectAutocomplete } from "components/ds/Filters/select-autocomplete/select-autocomplete";
import { useIntl } from "src/hooks/useIntl";
import { FilterFieldContainer } from "components/ds/Filters/field-container/field-container";

export function FiltersProjects({ projects, selected, onChange }: TFiltersProjects.Props) {
  const { T } = useIntl();
  return (
    <FilterFieldContainer label={T("filter.project.title")}>
      <SelectAutocomplete
        type="square"
        icon={({ className }) => <FolderLine className={className} />}
        tokens={{ zero: "filter.project.all", other: "filter.project" }}
        items={projects}
        multiple
        selected={selected}
        onChange={onChange}
        disabled={projects.length <= 1}
      />
    </FilterFieldContainer>
  );
}
