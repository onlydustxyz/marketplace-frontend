import { useContext } from "react";

import { useIntl } from "hooks/translate/use-translate";

import { SearchBar } from "../../components/search-bar/search-bar";
import { ProjectsContext } from "../../context/project.context";

export function ProjectSearch() {
  const { filters } = useContext(ProjectsContext);
  const { T } = useIntl();

  const onSearchChange = (value: string | null) => {
    filters.set({ search: value || undefined });
  };

  return (
    <SearchBar
      value={filters.values.search}
      onChange={onSearchChange}
      placeholder={T("v2.pages.projects.searchBar.placeholder")}
    />
  );
}
