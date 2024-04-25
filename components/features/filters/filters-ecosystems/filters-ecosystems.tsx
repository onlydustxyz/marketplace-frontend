import { FilterFieldContainer } from "components/ds/Filters/field-container/field-container";
import { SelectAutocomplete } from "components/ds/form/select-autocomplete/select-autocomplete";
import { Icon } from "components/layout/icon/icon";

import { useIntl } from "hooks/translate/use-translate";

import { TFiltersEcosystems } from "./filters-ecosystems.types";

export function FiltersEcosystems({ ecosystems, selected, onChange }: TFiltersEcosystems.Props) {
  const { T } = useIntl();
  return (
    <FilterFieldContainer label={T("v2.features.filters.ecosystems.title")}>
      <SelectAutocomplete
        type="circle"
        icon={({ className }) => <Icon remixName="ri-global-line" className={className} />}
        tokens={{
          zero: "v2.features.filters.ecosystems.all",
          other: "v2.features.filters.ecosystems",
          empty: "v2.features.filters.ecosystems.empty",
        }}
        items={ecosystems}
        multiple
        selected={selected}
        onChange={onChange}
        disabled={ecosystems.length <= 1}
      />
    </FilterFieldContainer>
  );
}
