import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import MeApi from "src/api/me";
import { Item } from "src/components/FilterSelect/FilterSelect";
import { Filter } from "src/components/New/Filter/Filter";
import FilterDatepicker from "src/components/New/Filter/FilterDatepicker";
import { FilterRepoSelect } from "src/components/New/Filter/FilterRepoSelect";
import { FilterTypeOptions } from "src/components/New/Filter/FilterTypeOptions";
import { GithubContributionType } from "src/types";
import { useLocalStorage } from "usehooks-ts";

type Filters = {
  dateRange: DateRange;
  repos: Item[];
  contributors: string[]; // Contributor ids
  types: GithubContributionType[];
};

const initialFilters: Filters = {
  dateRange: { from: undefined, to: undefined },
  repos: [],
  contributors: [],
  types: [],
};

export type FilterQueryParams = {
  fromDate?: string;
  toDate?: string;
  repositories: string;
  contributorIds: string;
  types: string;
};

export function ProjectContributionsFilter({ onChange }: { onChange: (filterQueryParams: FilterQueryParams) => void }) {
  const [filtersStorage, setFiltersStorage] = useLocalStorage(
    "project-contributions-table-filters",
    JSON.stringify(initialFilters)
  );

  const [filters, setFilters] = useState<Filters>(filtersStorage ? JSON.parse(filtersStorage) : initialFilters);

  useEffect(() => {
    const { dateRange, repos, contributors, types } = filters;

    const filterQueryParams: FilterQueryParams = {
      repositories: repos.map(({ id }) => String(id)).join(","),
      contributorIds: contributors.map(({ id }) => String(id)).join(","),
      types: types.join(","),
    };

    const { from: fromDate, to: toDate } = dateRange;

    if (fromDate && toDate) {
      filterQueryParams.fromDate = fromDate instanceof Date ? fromDate.toISOString() : fromDate;
      filterQueryParams.toDate = toDate instanceof Date ? toDate.toISOString() : toDate;
    }

    onChange(filterQueryParams);
  }, [filters, onChange]);

  const hasActiveFilters = Boolean(
    (filters.dateRange.from && filters.dateRange.to) ||
      filters.types.length ||
      filters.contributors.length ||
      filters.repos.length
  );

  // TODO update query
  const { data: reposData } = MeApi.queries.useMyContributedRepos({
    params: { projects: "" },
  });
  const contributedRepos = reposData?.repos ?? [];

  // TODO contributors query

  function resetFilters() {
    setFilters(initialFilters);
    setFiltersStorage(JSON.stringify(initialFilters));
  }

  function updateState(prevState: Filters, newState: Partial<Filters>) {
    const updatedState = { ...prevState, ...newState };

    setFiltersStorage(JSON.stringify(updatedState));

    return updatedState;
  }

  function updateDate(dateRange: DateRange) {
    setFilters(prevState => updateState(prevState, { dateRange }));
  }

  function updateRepos(repos: Item[]) {
    setFilters(prevState => updateState(prevState, { repos }));
  }

  //   function updateContributors(contributors: Item[]) {
  //     setFilters(prevState => updateState(prevState, { contributors }));
  //   }

  function updateTypes(type: GithubContributionType) {
    setFilters(prevState => {
      const types = prevState.types.includes(type)
        ? prevState.types.filter(t => t !== type)
        : [...prevState.types, type];

      return updateState(prevState, { types });
    });
  }

  return (
    <Filter isActive={hasActiveFilters} onClear={resetFilters}>
      <FilterDatepicker selected={filters.dateRange} onChange={updateDate} />
      <FilterRepoSelect
        repos={contributedRepos.map(({ id, name }) => ({ id, label: name }))}
        selected={filters.repos}
        onChange={updateRepos}
      />
      {/* <FilterContributorSelect contributors={} selected={filters.contributors} onChange={updateContributors} /> */}
      <FilterTypeOptions selected={filters.types} onChange={updateTypes} />
    </Filter>
  );
}
