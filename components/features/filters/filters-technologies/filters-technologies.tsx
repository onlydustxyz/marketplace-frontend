import FolderLine from "src/icons/FolderLine";

import { FilterFieldContainer } from "components/ds/Filters/field-container/field-container";
import { SelectAutocomplete } from "components/ds/form/select-autocomplete/select-autocomplete";
import { TFiltersTechnologies } from "components/features/filters/filters-technologies/filters-technologies.types";

import { useIntl } from "hooks/translate/use-translate";

export function FiltersTechnologies({ technologies, selected, onChange }: TFiltersTechnologies.Props) {
  const { T } = useIntl();
  return (
    <FilterFieldContainer label={T("filter.technologies.title")}>
      <SelectAutocomplete
        type="square"
        icon={({ className }) => <FolderLine className={className} />}
        tokens={{
          zero: "v2.features.filters.technologies.all",
          other: "v2.features.filters.technologies",
          empty: "v2.features.filters.technologies.empty",
        }}
        items={technologies}
        multiple
        selected={selected}
        onChange={onChange}
        disabled={technologies.length <= 1}
      />
    </FilterFieldContainer>
  );
}
