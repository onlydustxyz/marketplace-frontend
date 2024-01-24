import { FilterField } from "src/components/New/Filter/FilterField";
import { useIntl } from "src/hooks/useIntl";
import GitRepositoryLine from "src/icons/GitRepositoryLine";
import { Item } from "src/components/New/Filter/FilterSelectedAutoComplete/FilterSelectAutoComplete";
import { SelectAutocomplete } from "components/ds/Filters/select-autocomplete/select-autocomplete";
export function FilterRepoSelect({
  repos,
  selected,
  onChange,
}: {
  repos: Item[];
  selected: Item[];
  onChange: (repos: Item[]) => void;
}) {
  const { T } = useIntl();

  return (
    <FilterField label={T("filter.repository.title")}>
      <SelectAutocomplete
        icon={({ className }) => <GitRepositoryLine className={className} />}
        tokens={{ zero: "filter.repository.all", other: "filter.repository" }}
        items={repos}
        multiple
        selected={selected}
        onChange={onChange}
        disabled={repos.length <= 1}
        type="project"
      />
    </FilterField>
  );
}
