import { useEffect, useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { useLocalStorage } from "react-use";
import MeApi from "src/api/me";
import { Filter } from "src/components/New/Filter/Filter";
import { FilterDatepicker } from "src/components/New/Filter/FilterDatepicker";
import { FilterProjectSelect } from "src/components/New/Filter/FilterProjectSelect";
import { FilterRepoSelect } from "src/components/New/Filter/FilterRepoSelect";
import { Item } from "src/components/New/Filter/FilterSelect";
import { FilterTypeOptions } from "src/components/New/Filter/FilterTypeOptions";
import { GithubContributionType } from "src/types";
import { formatDateQueryParam } from "src/utils/date";

export type Filters = {
  types: GithubContributionType[];
  dateRange: DateRange;
  repos: Item[];
  projects: Item[];
};

const initialFilters: Filters = {
  types: [],
  dateRange: { from: undefined, to: undefined },
  repos: [],
  projects: [],
};

export type FilterQueryParams = {
  types: string;
  fromDate?: string;
  toDate?: string;
  repositories: string;
  projects: string;
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
    const { types, dateRange } = filters;

    const filterQueryParams: FilterQueryParams = {
      types: types.join(","),
      projects: projectIds.join(","),
      repositories: repoIds.join(","),
    };

    const { from: fromDate, to: toDate } = dateRange || {};

    if (fromDate && toDate) {
      filterQueryParams.fromDate = formatDateQueryParam(fromDate);
      filterQueryParams.toDate = formatDateQueryParam(toDate);
    }

    onChange(filterQueryParams);
  }, [filters, projectIds, repoIds]);

  const hasActiveFilters = Boolean(
    (filters.dateRange?.from && filters.dateRange?.to) ||
      filters.types.length ||
      filters.projects.length ||
      filters.repos.length
  );

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

  function updateDate(dateRange: DateRange) {
    setFilters(prevState => updateState(prevState, { dateRange }));
  }

  function updateRepos(repos: Item[]) {
    setFilters(prevState => updateState(prevState, { repos }));
  }

  function updateProjects(projects: Item[]) {
    setFilters(prevState => updateState(prevState, { projects }));
  }

  return (
    <Filter isActive={hasActiveFilters} onClear={resetFilters}>
      <FilterTypeOptions selected={filters.types} onChange={updateTypes} />
      <FilterDatepicker selected={filters.dateRange} onChange={updateDate} />
      <FilterRepoSelect
        repos={contributedRepos.map(({ id, name }) => ({ id, label: name }))}
        selected={filters.repos}
        onChange={updateRepos}
      />
      <FilterProjectSelect
        projects={contributedProjects.map(({ id, name }) => ({ id, label: name }))}
        selected={filters.projects}
        onChange={updateProjects}
      />
    </Filter>
  );
}
