import { useContext } from "react";
import { SearchBar } from "../../components/search-bar/search-bar";
import { useIntl } from "src/hooks/useIntl";
import { ProjectsContext } from "../../context/project.context";

export function ProjectSearch() {
  const { filters } = useContext(ProjectsContext);
  const { T } = useIntl();

  const onSearchChange = (value: string | null) => {
    filters.set({ search: value || undefined });
  };

  return (
    <SearchBar value={filters.values.search} onChange={onSearchChange} placeholder={T("searchBar.placeholderShort")} />
  );
}
