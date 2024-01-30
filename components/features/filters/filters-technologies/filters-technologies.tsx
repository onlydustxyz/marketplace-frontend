import { useIntl } from "src/hooks/useIntl";
import FolderLine from "src/icons/FolderLine";

import { FilterFieldContainer } from "components/ds/Filters/field-container/field-container";
import { SelectAutocomplete } from "components/ds/form/select-autocomplete/select-autocomplete";

import { TFiltersTechnologies } from "components/features/filters/filters-technologies/filters-technologies.types";

export function FiltersTechnologies({ technologies, selected, onChange }: TFiltersTechnologies.Props) {
  const { T } = useIntl();
  return (
    <FilterFieldContainer label={T("filter.technologies.title")}>
      <SelectAutocomplete
        type="square"
        icon={({ className }) => <FolderLine className={className} />}
        tokens={{
          zero: "filter.technologies.all",
          other: "filter.technologies",
          empty: "filter.technologies.empty",
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
