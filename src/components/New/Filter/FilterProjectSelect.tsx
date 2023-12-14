import { FilterField } from "src/components/New/Filter/FilterField";
import { FilterSelect, Item } from "src/components/New/Filter/FilterSelect";
import { useIntl } from "src/hooks/useIntl";
import FolderLine from "src/icons/FolderLine";

export function FilterProjectSelect({
  projects,
  selected,
  onChange,
}: {
  projects: Item[];
  selected: Item[];
  onChange: (repos: Item[]) => void;
}) {
  const { T } = useIntl();

  return (
    <FilterField label={T("filter.project.title")}>
      <FilterSelect
        icon={(_, className) => <FolderLine className={className} />}
        tokens={{ zero: "filter.project.all", other: "filter.project" }}
        items={projects}
        multiple
        selected={selected}
        onChange={onChange}
        disabled={projects.length <= 1}
      />
    </FilterField>
  );
}
