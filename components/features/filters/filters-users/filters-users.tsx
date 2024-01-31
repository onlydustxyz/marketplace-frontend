import { useIntl } from "src/hooks/useIntl";
import User3Line from "src/icons/User3Line";

import { FilterFieldContainer } from "components/ds/Filters/field-container/field-container";
import { SelectAutocomplete } from "components/ds/Filters/select-autocomplete/select-autocomplete";

import { TFiltersUsers } from "./filters-users.types";

export function FiltersUsers({
  users,
  selected,
  onChange,
  onNextPage,
  loadingNextPage,
  controlledSearch,
}: TFiltersUsers.Props) {
  const { T } = useIntl();

  return (
    <FilterFieldContainer label={T("filter.contributor.title")}>
      <SelectAutocomplete
        icon={({ className }) => <User3Line className={className} />}
        tokens={{
          zero: "filter.contributor.placeholder",
          other: "filter.contributor.many",
          empty: "filter.contributor.empty",
        }}
        multiple
        disabled={users.length <= 1 && !controlledSearch}
        type="circle"
        items={users}
        selected={selected}
        onChange={onChange}
        onNextPage={onNextPage}
        loadingNextPage={loadingNextPage}
        controlledSearch={controlledSearch}
      />
    </FilterFieldContainer>
  );
}
