import { sortBy } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { useParams } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";

import ProjectApi from "src/api/Project";
import { Period } from "src/components/New/Field/Datepicker";
import { Filter } from "src/components/New/Filter/Filter";
import { FilterContributorCombobox } from "src/components/New/Filter/FilterContributorCombobox";
import { FilterDatepicker } from "src/components/New/Filter/FilterDatepicker";
import { useDatepickerPeriods } from "src/components/New/Filter/FilterDatepicker.hooks";
import { FilterRepoSelect } from "src/components/New/Filter/FilterRepoSelect";
import { Item } from "src/components/New/Filter/FilterSelect";
import { FilterTypeOptions } from "src/components/New/Filter/FilterTypeOptions";
import { ContributorResponse, GithubContributionType } from "src/types";
import { allTime, formatDateQueryParam } from "src/utils/date";

type Filters = {
  dateRange: DateRange;
  period: Period;
  repos: Item[];
  contributors: ContributorResponse[];
  types: GithubContributionType[];
};

const initialFilters: Filters = {
  dateRange: allTime,
  period: Period.AllTime,
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

  // Type of partial Filters is required as the shape required by the state may not exist in the user's local storage
  const [filters, setFilters] = useState<Partial<Filters>>(
    filtersStorage ? JSON.parse(filtersStorage) : initialFilters
  );

  const allPeriods = useDatepickerPeriods({ selectedPeriod: filters.period ?? initialFilters.period });

  useEffect(() => {
    const {
      dateRange,
      period,
      repos = initialFilters.repos,
      contributors = initialFilters.contributors,
      types = initialFilters.types,
    } = filters;

    const filterQueryParams: FilterQueryParams = {
      repositories: repos.map(({ id }) => String(id)).join(","),
      contributorIds: contributors.map(({ githubUserId }) => String(githubUserId)).join(","),
      types: types.join(","),
    };

    // If a predefined period is selected, use the predefined period's date range
    if (period !== Period.Custom) {
      const { value } = allPeriods.find(({ id }) => id === period) ?? {};

      if (value?.from && value?.to) {
        filterQueryParams.fromDate = formatDateQueryParam(value.from);
        filterQueryParams.toDate = formatDateQueryParam(value.to);

        onChange(filterQueryParams);

        // Return early to avoid updating the date range twice
        return;
      }
    }

    // If a custom date range is selected, use the custom date range
    if (dateRange) {
      if (dateRange.from && dateRange.to) {
        filterQueryParams.fromDate = formatDateQueryParam(dateRange.from);
        filterQueryParams.toDate = formatDateQueryParam(dateRange.to);
      }
    } else {
      // If no date range is selected, use all time
      updateDate(initialFilters.dateRange);
    }

    onChange(filterQueryParams);
  }, [filters]);

  const hasActiveFilters = Boolean(
    filters.period !== initialFilters.period ||
      filters.types?.length ||
      filters.contributors?.length ||
      filters.repos?.length
  );

  const { data: reposData } = ProjectApi.queries.useGetProjectBySlug({
    params: { slug: projectKey },
  });
  const repos = reposData?.repos ?? [];

  const sortedRepos = useMemo(
    () =>
      sortBy(
        repos.map(({ id, name }) => ({ id, label: name })),
        ({ label }) => label
      ),
    [repos]
  );

  const { data: contributorsData, isLoading: contributorsLoading } =
    ProjectApi.queries.useProjectContributorsInfiniteList({
      params: { projectId: project?.id ?? "", pageSize: 20, queryParams: { login: contributorsQuery ?? "" } },
      options: { enabled: Boolean(project?.id) },
    });
  const contributors = contributorsData?.pages.flatMap(({ contributors }) => contributors) ?? [];

  function resetFilters() {
    setFilters(initialFilters);
    setFiltersStorage(JSON.stringify(initialFilters));
  }

  function updateState(prevState: Partial<Filters>, newState: Partial<Filters>) {
    const updatedState = { ...prevState, ...newState };

    setFiltersStorage(JSON.stringify(updatedState));

    return updatedState;
  }

  function updateDate(dateRange: DateRange) {
    setFilters(prevState => updateState(prevState, { dateRange }));
  }

  function updatePeriod(period: Period) {
    setFilters(prevState => updateState(prevState, { period }));
  }

  function updateRepos(repos: Item[]) {
    setFilters(prevState => updateState(prevState, { repos }));
  }

  function updateContributors(contributors: ContributorResponse[]) {
    setFilters(prevState => updateState(prevState, { contributors }));
  }

  function updateTypes(type: GithubContributionType) {
    setFilters(prevState => {
      const types = prevState.types?.includes(type)
        ? prevState.types.filter(t => t !== type)
        : [...(prevState?.types ?? []), type];

      return updateState(prevState, { types });
    });
  }

  return (
    <Filter isActive={hasActiveFilters} onClear={resetFilters}>
      <FilterDatepicker
        selected={filters.dateRange ?? initialFilters.dateRange}
        onChange={updateDate}
        selectedPeriod={filters.period ?? initialFilters.period}
        onPeriodChange={updatePeriod}
      />
      <FilterRepoSelect repos={sortedRepos} selected={filters.repos ?? initialFilters.repos} onChange={updateRepos} />
      <FilterContributorCombobox<ContributorResponse>
        contributors={contributors}
        selected={filters.contributors ?? initialFilters.contributors}
        onChange={updateContributors}
        queryState={contributorsQueryState}
        uniqueKey="githubUserId"
        isLoading={contributorsLoading}
      />
      <FilterTypeOptions selected={filters.types ?? initialFilters.types} onChange={updateTypes} />
    </Filter>
  );
}
