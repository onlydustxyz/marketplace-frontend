import { useIntl } from "src/hooks/useIntl";

import { FilterFieldContainer } from "components/ds/Filters/field-container/field-container";
import { SelectAutocomplete } from "components/ds/form/select-autocomplete/select-autocomplete";
import { Icon } from "components/layout/icon/icon";

import { TFiltersTransactions } from "./filters-transactions.types";

export function FiltersTransactions({ transactions, selected, onChange, hideLabel }: TFiltersTransactions.Props) {
  const { T } = useIntl();
  return (
    <FilterFieldContainer label={T("v2.features.filters.transactions.title")} hideLabel={hideLabel}>
      <SelectAutocomplete
        type="square"
        icon={({ className }) => <Icon remixName={"ri-folder-transfer-line"} className={className} />}
        tokens={{
          zero: "v2.features.filters.transactions.all",
          other: "v2.features.filters.transactions",
          empty: "v2.features.filters.transactions.empty",
        }}
        items={transactions}
        multiple
        selected={selected}
        onChange={onChange}
        disabled={transactions.length <= 1}
      />
    </FilterFieldContainer>
  );
}
