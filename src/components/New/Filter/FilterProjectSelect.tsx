import { FilterField } from "src/components/New/Filter/FilterField";
import { useIntl } from "src/hooks/useIntl";
import FolderLine from "src/icons/FolderLine";
import {
  FilterSelectAutoComplete,
  Item,
} from "src/components/New/Filter/FilterSelectedAutoComplete/FilterSelectAutoComplete";
import { SelectAutocomplete } from "components/ds/Filters/select-autocomplete/select-autocomplete";

export function FilterProjectSelect({
  projects,
  selected,
  onChange,
}: {
  projects: Item[];
  selected: Item[];
  onChange: (repos: Item[]) => void;
}) {
  const { T } = useIntl();

  return (
    <FilterField label={T("filter.project.title")}>
      <FilterSelectAutoComplete
        type="project"
        icon={({ className }) => <FolderLine className={className} />}
        tokens={{ zero: "filter.project.all", other: "filter.project" }}
        items={projects}
        multiple
        selected={selected}
        onChange={onChange}
        disabled={projects.length <= 1}
      />{" "}
      <SelectAutocomplete
        type="project"
        icon={({ className }) => <FolderLine className={className} />}
        tokens={{ zero: "filter.project.all", other: "filter.project" }}
        items={projects}
        multiple
        selected={selected}
        onChange={onChange}
        disabled={projects.length <= 1}
      />
    </FilterField>
  );
}
