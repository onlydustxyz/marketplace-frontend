import { sortBy } from "lodash";
import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { useParams } from "react-router-dom";
import ProjectApi from "src/api/Project";
import { Period } from "src/components/New/Field/Datepicker";
import { Filter } from "src/components/New/Filter/Filter";
import { FilterDatepicker } from "src/components/New/Filter/FilterDatepicker";
import { useDatepickerPeriods } from "src/components/New/Filter/FilterDatepicker.hooks";
import { Item } from "src/components/New/Filter/FilterSelect";
import { FilterTypeOptions } from "src/components/New/Filter/FilterTypeOptions";
import { ContributorResponse, GithubContributionType } from "src/types";
import { allTime, formatDateQueryParam } from "src/utils/date";
import { useLocalStorage } from "usehooks-ts";
import { FiltersRepos } from "components/features/filters/filters-repos/filters-repos";
import { FiltersUsers } from "components/features/filters/filters-users/filters-users";

type Filters = {
  dateRange: DateRange;
  period: Period;
  repos: Item[];
  contributors: Item[];
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

export type ProjectContributionsFilterRef = {
  reset: () => void;
  hasActiveFilters: boolean;
};
export const ProjectContributionsFilter = forwardRef(function ProjectContributionsFilter(
  { onChange }: { onChange: (filterQueryParams: FilterQueryParams) => void },
  ref: React.Ref<ProjectContributionsFilterRef>
) {
  const { projectKey = "" } = useParams<{ projectKey?: string }>();

  const { data: project } = ProjectApi.queries.useGetProjectBySlug({
    params: { slug: projectKey },
  });

  const [filtersStorage, setFiltersStorage] = useLocalStorage(
    "project-contributions-table-filters-v2-0-0",
    JSON.stringify(initialFilters)
  );

  const [contributorsQuery, setContributorsQuery] = useState<string>();

  function parseFiltersStorage() {
    if (filtersStorage) {
      const parsed = JSON.parse(filtersStorage);

      if (parsed.contributors?.[0]?.id) {
        return parsed;
      }

      if (parsed.contributors?.[0]?.githubUserId) {
        return {
          ...parsed,
          contributors: parsed.contributors.map((contributor: ContributorResponse) => ({
            label: contributor.login,
            id: contributor.githubUserId,
            image: contributor.avatarUrl,
          })),
        };
      }

      return JSON.parse(filtersStorage);
    }

    return initialFilters;
  }

  // Type of partial Filters is required as the shape required by the state may not exist in the user's local storage
  const [filters, setFilters] = useState<Partial<Filters>>(parseFiltersStorage());

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
      contributorIds: contributors.map(({ id }) => String(id)).join(","),
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

  const {
    data: contributorsData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = ProjectApi.queries.useProjectContributorsInfiniteList({
    params: { projectId: project?.id ?? "", pageSize: 20, queryParams: { login: contributorsQuery ?? "" } },
    options: { enabled: Boolean(project?.id) },
  });

  const [contributors, setContributors] = useState<Item[]>([]);

  useEffect(() => {
    const flattenContributors = contributorsData?.pages.flatMap(({ contributors }) => contributors) ?? [];
    if (flattenContributors?.length) {
      setContributors(
        flattenContributors.map(({ login, githubUserId, avatarUrl }) => ({
          id: githubUserId,
          label: login,
          image: avatarUrl,
        }))
      );
    }
  }, [contributorsData]);

  const handleContributorsPagination = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

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

  function updateContributors(contributors: Item[]) {
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

    if (filters.contributors?.length) {
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
      <FiltersRepos repos={sortedRepos} selected={filters.repos ?? initialFilters.repos} onChange={updateRepos} />
      <FiltersUsers
        users={contributors}
        selected={filters.contributors ?? initialFilters.contributors}
        onChange={updateContributors}
        onNextPage={handleContributorsPagination}
        loadingNextPage={isFetchingNextPage}
        controlledSearch={{
          value: contributorsQuery || "",
          onChange: (value: string) => setContributorsQuery(value),
        }}
      />
      <FilterTypeOptions selected={filters.types ?? initialFilters.types} onChange={updateTypes} />
    </Filter>
  );
});
