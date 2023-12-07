import { FilterSelect, Item } from "src/components/FilterSelect/FilterSelect";
import { useIntl } from "src/hooks/useIntl";
import GitRepositoryLine from "src/icons/GitRepositoryLine";

export function FilterRepoSelect({
  repos,
  selected,
  onChange,
  multiple = false,
}: {
  repos: Item[];
  selected: Item[];
  onChange: (repos: Item[]) => void;
  multiple?: boolean;
}) {
  const { T } = useIntl();

  return (
    <FilterSelect
      label={T("filter.repository.title")}
      icon={className => <GitRepositoryLine className={className} />}
      tokens={{ zero: "filter.repository.all", other: "filter.repository" }}
      items={repos}
      multiple={multiple}
      selected={selected}
      onChange={value => {
        const repos = Array.isArray(value) ? value : [value];
        onChange(repos);
      }}
      disabled={repos.length <= 1}
    />
  );
}
