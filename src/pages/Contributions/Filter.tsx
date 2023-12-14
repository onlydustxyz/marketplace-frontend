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
import { allTime, formatDateQueryParam, isAllTime } from "src/utils/date";

export type Filters = {
  types: GithubContributionType[];
  dateRange: DateRange;
  repos: Item[];
  projects: Item[];
};

const initialFilters: Filters = {
  types: [],
  dateRange: allTime,
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
    const { types } = filters;

    const filterQueryParams: FilterQueryParams = {
      types: types.join(","),
      projects: projectIds.join(","),
      repositories: repoIds.join(","),
    };

    // Users may have an old filter shape in local storage that doesn't contain dateRange
    if (filters?.dateRange) {
      const { from, to } = filters.dateRange;

      if (from && to) {
        filterQueryParams.fromDate = formatDateQueryParam(from);
        filterQueryParams.toDate = formatDateQueryParam(to);
      }
    } else {
      // Init to all time
      updateDate(initialFilters.dateRange);
    }

    onChange(filterQueryParams);
  }, [filters, projectIds, repoIds]);

  const hasActiveFilters = Boolean(
    // from and to may be undefined if the user hasn't got dateRange in local storage
    (filters?.dateRange?.from && filters?.dateRange?.to && !isAllTime(filters?.dateRange)) ||
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
      <FilterDatepicker selected={filters.dateRange} onChange={updateDate} />
      <FilterProjectSelect
        projects={contributedProjects.map(({ id, name, logoUrl }) => ({ id, label: name, image: logoUrl }))}
        selected={filters.projects}
        onChange={updateProjects}
      />
      <FilterRepoSelect
        repos={contributedRepos.map(({ id, name }) => ({ id, label: name }))}
        selected={filters.repos}
        onChange={updateRepos}
      />
      <FilterTypeOptions selected={filters.types} onChange={updateTypes} />
    </Filter>
  );
}
