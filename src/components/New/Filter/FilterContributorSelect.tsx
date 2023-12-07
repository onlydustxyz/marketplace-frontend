import { FilterSelect, Item } from "src/components/FilterSelect/FilterSelect";
import { useIntl } from "src/hooks/useIntl";
import GitRepositoryLine from "src/icons/GitRepositoryLine";

export function FilterContributorSelect({
  contributors,
  selected,
  onChange,
  multiple = false,
}: {
  contributors: Item[];
  selected: Item[];
  onChange: (contributors: Item[]) => void;
  multiple?: boolean;
}) {
  const { T } = useIntl();

  return (
    <FilterSelect
      label={T("filter.contributor.title")}
      // TOOD update icon
      icon={className => <GitRepositoryLine className={className} />}
      tokens={{ zero: "filter.contributor.all", other: "filter.contributor" }}
      items={contributors}
      multiple={multiple}
      selected={selected}
      onChange={value => {
        const contributors = Array.isArray(value) ? value : [value];
        onChange(contributors);
      }}
      disabled={contributors.length <= 1}
    />
  );
}
