import { FilterFieldContainer } from "components/ds/Filters/field-container/field-container";
import { SelectAutocomplete } from "components/ds/form/select-autocomplete/select-autocomplete";
import { TFiltersLanguages } from "components/features/filters/filters-languages/filters-languages.types";
import { Icon } from "components/layout/icon/icon";

import { useIntl } from "hooks/translate/use-translate";

export function FiltersLanguages({ languages, selected, onChange }: TFiltersLanguages.Props) {
  const { T } = useIntl();
  return (
    <FilterFieldContainer label={T("filter.languages.title")}>
      <SelectAutocomplete
        type="circle"
        icon={({ className }) => <Icon remixName={"ri-code-s-slash-line"} className={className} />}
        tokens={{
          zero: "v2.features.filters.languages.all",
          other: "v2.features.filters.languages",
          empty: "v2.features.filters.languages.empty",
        }}
        items={languages}
        multiple
        selected={selected}
        onChange={onChange}
        disabled={languages.length <= 1}
      />
    </FilterFieldContainer>
  );
}
