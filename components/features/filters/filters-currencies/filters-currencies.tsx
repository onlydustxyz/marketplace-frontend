import { useIntl } from "src/hooks/useIntl";
import MoneyBoxLine from "src/icons/MoneyBoxLine";

import { FilterFieldContainer } from "components/ds/Filters/field-container/field-container";
import { SelectAutocomplete } from "components/ds/form/select-autocomplete/select-autocomplete";
import { TFiltersCurrencies } from "components/features/filters/filters-currencies/filters-currencies.types";

export function FiltersCurrencies({ currencies, selected, onChange, hideLabel, isElevated }: TFiltersCurrencies.Props) {
  const { T } = useIntl();

  return (
    <FilterFieldContainer label={T("filter.currency.title")} hideLabel={hideLabel}>
      <SelectAutocomplete
        type="circle"
        icon={({ className }) => <MoneyBoxLine className={className} />}
        tokens={{ zero: "filter.currency.all", other: "filter.currency", empty: "filter.currency.empty" }}
        items={currencies}
        selected={selected}
        multiple={true}
        onChange={onChange}
        isElevated={isElevated}
      />
    </FilterFieldContainer>
  );
}
