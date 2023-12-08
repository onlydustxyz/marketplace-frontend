import { format } from "date-fns";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { useParams } from "react-router-dom";
import ProjectApi from "src/api/Project";
import { Filter } from "src/components/New/Filter/Filter";
import { FilterContributorCombobox } from "src/components/New/Filter/FilterContributorCombobox";
import FilterDatepicker from "src/components/New/Filter/FilterDatepicker";
import { FilterRepoSelect } from "src/components/New/Filter/FilterRepoSelect";
import { Item } from "src/components/New/Filter/FilterSelect";
import { FilterTypeOptions } from "src/components/New/Filter/FilterTypeOptions";
import { ContributorResponse, GithubContributionType } from "src/types";
import { useLocalStorage } from "usehooks-ts";

type Filters = {
  dateRange: DateRange;
  repos: Item[];
  contributors: ContributorResponse[];
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
  const { projectKey = "" } = useParams<{ projectKey?: string }>();

  const { data: project } = ProjectApi.queries.useGetProjectBySlug({
    params: { slug: projectKey },
  });

  const [filtersStorage, setFiltersStorage] = useLocalStorage(
    "project-contributions-table-filters",
    JSON.stringify(initialFilters)
  );

  const contributorsQueryState = useState<string>();
  const [contributorsQuery] = contributorsQueryState;

  const [filters, setFilters] = useState<Filters>(filtersStorage ? JSON.parse(filtersStorage) : initialFilters);

  useEffect(() => {
    const { dateRange, repos, contributors, types } = filters;

    const filterQueryParams: FilterQueryParams = {
      repositories: repos.map(({ id }) => String(id)).join(","),
      contributorIds: contributors.map(({ githubUserId }) => String(githubUserId)).join(","),
      types: types.join(","),
    };

    const { from: fromDate, to: toDate } = dateRange;

    if (fromDate && toDate) {
      filterQueryParams.fromDate = fromDate instanceof Date ? format(fromDate, "yyyy-MM-dd") : fromDate;
      filterQueryParams.toDate = toDate instanceof Date ? format(toDate, "yyyy-MM-dd") : toDate;
    }

    onChange(filterQueryParams);
  }, [filters]);

  const hasActiveFilters = Boolean(
    (filters.dateRange.from && filters.dateRange.to) ||
      filters.types.length ||
      filters.contributors.length ||
      filters.repos.length
  );

  const { data: reposData } = ProjectApi.queries.useGetProjectBySlug({
    params: { slug: projectKey },
  });
  const repos = reposData?.repos ?? [];

  const { data: contributorsData } = ProjectApi.queries.useProjectContributorsInfiniteList({
    params: { projectId: project?.id ?? "", pageSize: 20, queryParams: { login: contributorsQuery ?? "" } },
    options: { enabled: Boolean(project?.id) },
  });
  const contributors = contributorsData?.pages.flatMap(({ contributors }) => contributors) ?? [];

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

  function updateContributors(contributors: ContributorResponse[]) {
    setFilters(prevState => updateState(prevState, { contributors }));
  }

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
        repos={repos.map(({ id, name }) => ({ id, label: name }))}
        selected={filters.repos}
        onChange={updateRepos}
      />
      <FilterContributorCombobox<ContributorResponse>
        contributors={contributors}
        selected={filters.contributors}
        onChange={updateContributors}
        queryState={contributorsQueryState}
        uniqueKey="githubUserId"
      />
      <FilterTypeOptions selected={filters.types} onChange={updateTypes} />
    </Filter>
  );
}
