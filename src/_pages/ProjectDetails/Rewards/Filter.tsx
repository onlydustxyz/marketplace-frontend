import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { DateRange } from "react-day-picker";
import { useParams } from "react-router-dom";
import ProjectApi from "src/api/Project";
import { Filter } from "src/components/New/Filter/Filter";
import { FilterDatepicker } from "src/components/New/Filter/FilterDatepicker";
import { ContributorResponse } from "src/types";
import { useLocalStorage } from "usehooks-ts";
import { allTime, formatDateQueryParam } from "src/utils/date";
import { FilterPosition } from "src/components/New/Filter/DesktopView";
import { Period } from "src/components/New/Field/Datepicker";
import { useDatepickerPeriods } from "src/components/New/Filter/FilterDatepicker.hooks";
import { Item } from "src/components/New/Filter/FilterSelect";
import { useCurrenciesOrder } from "src/hooks/useCurrenciesOrder";
import { FiltersUsers } from "components/features/filters/filters-users/filters-users";
import { FiltersCurrencies } from "components/features/filters/filters-currencies/filters-currencies";
import { isArray } from "lodash";

type Filters = {
  period: Period;
  dateRange: DateRange;
  contributors: Item[];
  currency: Item[];
};

const initialFilters: Filters = {
  period: Period.AllTime,
  dateRange: allTime,
  contributors: [],
  currency: [],
};

export type FilterQueryParams = {
  fromDate?: string;
  toDate?: string;
  contributors?: string;
  currencies?: string;
};

export type ProjectRewardsFilterRef = {
  reset: () => void;
  hasActiveFilters: boolean;
};

export const ProjectRewardsFilter = forwardRef(function ProjectRewardsFilter(
  {
    onChange,
    position,
  }: {
    onChange: (filterQueryParams: FilterQueryParams) => void;
    position?: FilterPosition;
  },
  ref: React.Ref<ProjectRewardsFilterRef>
) {
  const { projectKey = "" } = useParams<{ projectKey?: string }>();

  const { data: project } = ProjectApi.queries.useGetProjectBySlug({
    params: { slug: projectKey },
  });

  const { data: projectBudget } = ProjectApi.queries.useProjectBudget({
    params: { projectId: project?.id },
  });

  const orderedCurrencies = useCurrenciesOrder({ currencies: projectBudget?.budgets });

  const [filtersStorage, setFiltersStorage] = useLocalStorage(
    `project-rewards-table-filters-${projectKey}`,
    JSON.stringify(initialFilters)
  );

  const contributorsQueryState = useState<string>();
  const [contributorsQuery] = contributorsQueryState;
  function parseFiltersStorage() {
    if (filtersStorage) {
      let parsed = JSON.parse(filtersStorage);

      if (parsed.contributors?.[0]?.githubUserId) {
        parsed.contributors = parsed.contributors.map((contributor: ContributorResponse) => ({
          label: contributor.login,
          id: contributor.githubUserId,
          image: contributor.avatarUrl,
        }));
      }

      if (!isArray(parsed.currency)) {
        if (parsed.currency?.value === "" || !parsed.currency?.value) {
          parsed.currency = [];
        } else {
          parsed.currency = [parsed.currency];
        }
      }

      return parsed;
    }

    return initialFilters;
  }

  // Type of partial Filters is required as the shape required by the state may not exist in the user's local storage
  const [filters, setFilters] = useState<Partial<Filters>>(parseFiltersStorage());

  const allPeriods = useDatepickerPeriods({ selectedPeriod: filters.period ?? initialFilters.period });

  useEffect(() => {
    const { dateRange, period, contributors, currency } = filters;

    const filterQueryParams: FilterQueryParams = {};

    if (contributors?.length) {
      filterQueryParams.contributors = contributors?.map(({ id }) => String(id)).join(",");
    }
    if (currency?.length) {
      filterQueryParams.currencies = currency.map(({ value }) => String(value)).join(",");
    }

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
  }, [filters]);

  const hasActiveFilters = Boolean(
    filters.period !== initialFilters.period || filters.contributors?.length || filters.currency?.length
  );

  const { data: contributorsData } = ProjectApi.queries.useProjectContributorsInfiniteList({
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

    const removeCurrenciesJsx = updatedState.currency?.map(c => ({
      ...c,
      label: "",
    }));

    setFiltersStorage(JSON.stringify({ ...updatedState, currency: removeCurrenciesJsx }));

    return updatedState;
  }

  function updateDate(dateRange: DateRange) {
    setFilters(prevState => updateState(prevState, { dateRange }));
  }

  function updatePeriod(period: Period) {
    setFilters(prevState => updateState(prevState, { period }));
  }

  function updateContributors(contributors: Item[]) {
    setFilters(prevState => updateState(prevState, { contributors }));
  }

  function updateCurrency(currency: Item[]) {
    setFilters(prevState =>
      updateState(prevState, {
        currency,
      })
    );
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

  return (
    <Filter isActive={hasActiveFilters} onClear={resetFilters} position={position}>
      <div className="focus-within:z-10">
        <FilterDatepicker
          selected={filters.dateRange ?? initialFilters.dateRange}
          selectedPeriod={filters.period ?? initialFilters.period}
          onChange={updateDate}
          onPeriodChange={updatePeriod}
        />
      </div>
      <div className="focus-within:z-10">
        <FiltersUsers
          users={contributors.map(({ login, githubUserId, avatarUrl }) => ({
            id: githubUserId,
            label: login,
            image: avatarUrl,
          }))}
          selected={filters.contributors ?? initialFilters.contributors}
          onChange={updateContributors}
        />
      </div>
      <div className="focus-within:z-10">
        {projectBudget ? (
          <FiltersCurrencies
            selected={filters.currency ?? initialFilters.currency}
            onChange={updateCurrency}
            currencies={
              orderedCurrencies?.map(currency => ({
                id: currency.currency,
                value: currency.currency,
              })) ?? []
            }
          />
        ) : null}
      </div>
    </Filter>
  );
});
