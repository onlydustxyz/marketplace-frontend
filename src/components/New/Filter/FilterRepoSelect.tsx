import { FilterField } from "src/components/New/Filter/FilterField";
import { FilterSelect, Item } from "src/components/New/Filter/FilterSelect";
import { useIntl } from "src/hooks/useIntl";
import GitRepositoryLine from "src/icons/GitRepositoryLine";

export function FilterRepoSelect({
  repos,
  selected,
  onChange,
}: {
  repos: Item[];
  selected: Item[];
  onChange: (repos: Item[]) => void;
}) {
  const { T } = useIntl();

  return (
    <FilterField label={T("filter.repository.title")}>
      <FilterSelect
        icon={(_, className) => <GitRepositoryLine className={className} />}
        tokens={{ zero: "filter.repository.all", other: "filter.repository" }}
        items={repos}
        multiple
        selected={selected}
        onChange={onChange}
        disabled={repos.length <= 1}
      />
    </FilterField>
  );
}
