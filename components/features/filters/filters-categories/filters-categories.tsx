"use client";

import { FilterFieldContainer } from "components/ds/Filters/field-container/field-container";
import { SelectAutocomplete } from "components/ds/form/select-autocomplete/select-autocomplete";
import { Icon } from "components/layout/icon/icon";

import { useIntl } from "hooks/translate/use-translate";

import { TFiltersCategories } from "./filters-categories.types";

export function FiltersCategories({
  categories,
  selected,
  onChange,
  hideLabel,
  hideIcon,
  isBlueBackground,
}: TFiltersCategories.Props) {
  const { T } = useIntl();
  return (
    <FilterFieldContainer label={T("v2.features.filters.categories.title")} hideLabel={hideLabel}>
      <SelectAutocomplete
        type="circle"
        icon={!hideIcon ? ({ className }) => <Icon remixName="ri-global-line" className={className} /> : undefined}
        tokens={{
          zero: "v2.features.filters.categories.all",
          other: "v2.features.filters.categories",
          empty: "v2.features.filters.categories.empty",
        }}
        items={categories}
        isBlueBackground={isBlueBackground}
        multiple
        selected={selected}
        onChange={onChange}
        disabled={categories.length <= 1}
      />
    </FilterFieldContainer>
  );
}
