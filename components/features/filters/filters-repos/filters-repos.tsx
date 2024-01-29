import { useIntl } from "src/hooks/useIntl";
import GitRepositoryLine from "src/icons/GitRepositoryLine";

import { FilterFieldContainer } from "components/ds/Filters/field-container/field-container";
import { SelectAutocomplete } from "components/ds/Filters/select-autocomplete/select-autocomplete";

import { TFiltersRepos } from "./filters-repos.types";

export function FiltersRepos({ repos, selected, onChange }: TFiltersRepos.Props) {
  const { T } = useIntl();
  return (
    <FilterFieldContainer label={T("filter.repository.title")}>
      <SelectAutocomplete
        icon={({ className }) => <GitRepositoryLine className={className} />}
        tokens={{ zero: "filter.repository.all", other: "filter.repository", empty: "filter.repository.empty" }}
        items={repos}
        multiple
        selected={selected}
        onChange={onChange}
        disabled={repos.length <= 1}
        type="square"
      />
    </FilterFieldContainer>
  );
}
