import { useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "react-use";
import MeApi from "src/api/me";
import { Filter } from "src/components/New/Filter/Filter";
import { FilterProjectSelect } from "src/components/New/Filter/FilterProjectSelect";
import { FilterRepoSelect } from "src/components/New/Filter/FilterRepoSelect";
import { Item } from "src/components/New/Filter/FilterSelect";
import { FilterTypeOptions } from "src/components/New/Filter/FilterTypeOptions";
import { GithubContributionType } from "src/types";

export type Filters = {
  types: GithubContributionType[];
  projects: Item[];
  repos: Item[];
};

const initialFilters: Filters = {
  types: [],
  projects: [],
  repos: [],
};

export type FilterQueryParams = {
  types: string;
  projects: string;
  repositories: string;
};

export function ContributionsFilter({ onChange }: { onChange: (filterQueryParams: FilterQueryParams) => void }) {
  const [filtersStorage, setFiltersStorage] = useLocalStorage(
    "contributions-table-filters",
    JSON.stringify(initialFilters)
  );

  const [filters, setFilters] = useState<Filters>(filtersStorage ? JSON.parse(filtersStorage) : initialFilters);

  // useMemo required to avoid infinite loop in useEffect
  const projectIds = useMemo(() => filters.projects.map(({ id }) => String(id)), [filters]);
  const repoIds = useMemo(() => filters.repos.map(({ id }) => String(id)), [filters]);

  useEffect(() => {
    onChange({
      types: filters.types.join(","),
      projects: projectIds.join(","),
      repositories: repoIds.join(","),
    });
  }, [filters, projectIds, repoIds]);

  const hasActiveFilters = Boolean(filters.types.length || filters.projects.length || filters.repos.length);

  const { data: projectsData } = MeApi.queries.useMyContributedProjects({
    params: { repositories: repoIds.length ? repoIds.join(",") : "" },
  });
  const contributedProjects = projectsData?.projects ?? [];

  const { data: reposData } = MeApi.queries.useMyContributedRepos({
    params: { projects: projectIds.length ? projectIds.join(",") : "" },
  });
  const contributedRepos = reposData?.repos ?? [];

  function resetFilters() {
    setFilters(initialFilters);
    setFiltersStorage(JSON.stringify(initialFilters));
  }

  function updateState(prevState: Filters, newState: Partial<Filters>) {
    const updatedState = { ...prevState, ...newState };

    setFiltersStorage(JSON.stringify(updatedState));

    return updatedState;
  }

  function updateTypes(type: GithubContributionType) {
    setFilters(prevState => {
      const types = prevState.types.includes(type)
        ? prevState.types.filter(t => t !== type)
        : [...prevState.types, type];

      return updateState(prevState, { types });
    });
  }

  function updateProjects(projects: Item[]) {
    setFilters(prevState => updateState(prevState, { projects }));
  }

  function updateRepos(repos: Item[]) {
    setFilters(prevState => updateState(prevState, { repos }));
  }

  return (
    <Filter isActive={hasActiveFilters} onClear={resetFilters}>
      <FilterTypeOptions selected={filters.types} onChange={updateTypes} />
      <FilterProjectSelect
        projects={contributedProjects.map(({ id, name }) => ({ id, label: name }))}
        selected={filters.projects}
        onChange={updateProjects}
      />
      <FilterRepoSelect
        repos={contributedRepos.map(({ id, name }) => ({ id, label: name }))}
        selected={filters.repos}
        onChange={updateRepos}
      />
    </Filter>
  );
}
