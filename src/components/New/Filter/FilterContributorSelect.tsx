import { FilterField } from "src/components/New/Filter/FilterField";
import { FilterSelect, Item } from "src/components/New/Filter/FilterSelect";
import { useIntl } from "src/hooks/useIntl";
import SearchLine from "src/icons/SearchLine";

export function FilterContributorSelect({
  contributors,
  selected,
  onChange,
}: {
  contributors: Item[];
  selected: Item[];
  onChange: (contributors: Item[]) => void;
}) {
  const { T } = useIntl();

  return (
    <FilterField label={T("filter.contributor.title")}>
      <FilterSelect
        icon={className => <SearchLine className={className} />}
        tokens={{ zero: "filter.contributor.all", other: "filter.contributor" }}
        items={contributors}
        multiple
        selected={selected}
        onChange={value => {
          const contributors = Array.isArray(value) ? value : [value];
          onChange(contributors);
        }}
        disabled={contributors.length <= 1}
      />
    </FilterField>
  );
}
