import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { useLocalStorage } from "react-use";

import MeApi from "src/api/me";
import { Period } from "src/components/New/Field/Datepicker";
import { Filter } from "src/components/New/Filter/Filter";
import { FilterDatepicker } from "src/components/New/Filter/FilterDatepicker";
import { useDatepickerPeriods } from "src/components/New/Filter/FilterDatepicker.hooks";
import { FilterTypeOptions } from "src/components/New/Filter/FilterTypeOptions";
import { GithubContributionType } from "src/types";
import { allTime, formatDateQueryParam } from "src/utils/date";

import { TSelectAutocomplete } from "components/ds/form/select-autocomplete/select-autocomplete.types";
import { FiltersProjects } from "components/features/filters/filters-projects/filters-projects";
import { FiltersRepos } from "components/features/filters/filters-repos/filters-repos";

export type Filters = {
  dateRange: DateRange;
  period: Period;
  repos: TSelectAutocomplete.Item[];
  projects: TSelectAutocomplete.Item[];
  types: GithubContributionType[];
};

const initialFilters: Filters = {
  dateRange: allTime,
  period: Period.AllTime,
  repos: [],
  projects: [],
  types: [],
};

export type FilterQueryParams = {
  types: string;
  fromDate?: string;
  toDate?: string;
  repositories: string;
  projects: string;
};

export type ContributionsFilterRef = {
  reset: () => void;
  hasActiveFilters: boolean;
};

export const ContributionsFilter = forwardRef(function ContributionsFilter(
  { onChange }: { onChange: (filterQueryParams: FilterQueryParams) => void },
  ref: React.Ref<ContributionsFilterRef>
) {
  const [filtersStorage, setFiltersStorage] = useLocalStorage(
    "contributions-table-filters-v2-0-0",
    JSON.stringify(initialFilters)
  );

  // Type of partial Filters is required as the shape required by the state may not exist in the user's local storage
  const [filters, setFilters] = useState<Partial<Filters>>(
    filtersStorage ? JSON.parse(filtersStorage) : initialFilters
  );

  const allPeriods = useDatepickerPeriods({ selectedPeriod: filters.period ?? initialFilters.period });

  // useMemo required to avoid infinite loop in useEffect
  const projectIds = useMemo(() => filters.projects?.map(({ id }) => String(id)), [filters]) ?? [];
  const repoIds = useMemo(() => filters.repos?.map(({ id }) => String(id)), [filters]) ?? [];

  useEffect(() => {
    const { dateRange, period, types = initialFilters.types } = filters;

    const filterQueryParams: FilterQueryParams = {
      types: types.join(","),
      projects: projectIds.join(","),
      repositories: repoIds.join(","),
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
      if (dateRange?.from && dateRange?.to) {
        filterQueryParams.fromDate = formatDateQueryParam(dateRange.from);
        filterQueryParams.toDate = formatDateQueryParam(dateRange.to);
      }
    } else {
      // If no date range is selected, use all time
      updateDate(initialFilters.dateRange);
    }

    onChange(filterQueryParams);
  }, [filters, projectIds, repoIds]);

  const hasActiveFilters = Boolean(
    filters.period !== initialFilters.period ||
      filters.types?.length ||
      filters.projects?.length ||
      filters.repos?.length
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

  function updateState(prevState: Partial<Filters>, newState: Partial<Filters>) {
    const updatedState = { ...prevState, ...newState };

    setFiltersStorage(JSON.stringify(updatedState));

    return updatedState;
  }

  function updateTypes(type: GithubContributionType) {
    setFilters(prevState => {
      const types = prevState.types?.includes(type)
        ? prevState.types.filter(t => t !== type)
        : [...(prevState.types ?? []), type];

      return updateState(prevState, { types });
    });
  }

  function updateDate(dateRange: DateRange) {
    setFilters(prevState => updateState(prevState, { dateRange }));
  }

  function updatePeriod(period: Period) {
    setFilters(prevState => updateState(prevState, { period }));
  }

  function updateRepos(repos: TSelectAutocomplete.Item[]) {
    setFilters(prevState => updateState(prevState, { repos }));
  }

  function updateProjects(projects: TSelectAutocomplete.Item[]) {
    setFilters(prevState => updateState(prevState, { projects }));
  }

  useImperativeHandle(
    ref,
    () => {
      return {
        reset: resetFilters,
        hasActiveFilters,
      };
    },
    [hasActiveFilters]
  );

  const filterCount = useMemo(() => {
    let count = 0;

    if (filters.projects?.length) {
      count += 1;
    }

    if (filters.types?.length) {
      count += 1;
    }

    if (filters.repos?.length) {
      count += 1;
    }

    if (filters.period !== initialFilters.period) {
      count += 1;
    }
    return count;
  }, [filters]);

  return (
    <Filter isActive={hasActiveFilters} onClear={resetFilters} count={filterCount}>
      <FilterDatepicker
        selected={filters.dateRange ?? initialFilters.dateRange}
        onChange={updateDate}
        selectedPeriod={filters.period ?? initialFilters.period}
        onPeriodChange={updatePeriod}
      />
      <FiltersProjects
        projects={contributedProjects.map(({ id, name, logoUrl }) => ({ id, label: name, image: logoUrl, value: id }))}
        selected={filters.projects ?? initialFilters.projects}
        onChange={updateProjects}
      />
      <FiltersRepos
        repos={contributedRepos.map(({ id, name }) => ({ id, label: name, value: `${id}` }))}
        selected={filters.repos ?? initialFilters.repos}
        onChange={updateRepos}
      />
      <FilterTypeOptions selected={filters.types ?? initialFilters.types} onChange={updateTypes} />
    </Filter>
  );
});
