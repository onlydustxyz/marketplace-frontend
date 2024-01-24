import { TFiltersUsers } from "./filters-users.types";
import { useIntl } from "src/hooks/useIntl";
import { FilterFieldContainer } from "components/ds/Filters/field-container/field-container";
import { SelectAutocomplete } from "components/ds/Filters/select-autocomplete/select-autocomplete";
import User3Line from "src/icons/User3Line";

export function FiltersUsers({ users, selected, onChange }: TFiltersUsers.Props) {
  const { T } = useIntl();

  return (
    <FilterFieldContainer label={T("filter.contributor.title")}>
      <SelectAutocomplete
        icon={({ className }) => <User3Line className={className} />}
        tokens={{ zero: "filter.contributor.placeholder", other: "filter.contributor.many" }}
        multiple
        disabled={users.length <= 1}
        type="user"
        items={users}
        selected={selected}
        onChange={onChange}
      />
    </FilterFieldContainer>
  );
}
