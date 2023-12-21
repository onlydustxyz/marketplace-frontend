import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { DateRange } from "react-day-picker";
import { useParams } from "react-router-dom";
import ProjectApi from "src/api/Project";
import { Filter } from "src/components/New/Filter/Filter";
import { FilterContributorCombobox } from "src/components/New/Filter/FilterContributorCombobox";
import { FilterCurrencySelect } from "src/components/New/Filter/FilterCurrencySelect";
import { FilterDatepicker } from "src/components/New/Filter/FilterDatepicker";
import { ContributorResponse, Currency } from "src/types";
import { useLocalStorage } from "usehooks-ts";
import { allTime, formatDateQueryParam, isAllTime } from "src/utils/date";
import { FilterPosition } from "src/components/New/Filter/DesktopView";
import { Period } from "src/components/New/Field/Datepicker";
import { useDatepickerPeriods } from "src/components/New/Filter/FilterDatepicker.hooks";
import { Item } from "src/components/New/Filter/FilterSelect";

type Filters = {
  period: Period;
  dateRange: DateRange;
  contributors: ContributorResponse[];
  currency: { id: string | number; value: string };
};

const initialFilters: Filters = {
  period: Period.AllTime,
  dateRange: allTime,
  contributors: [],
  currency: { id: 0, value: "" },
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

  const [filtersStorage, setFiltersStorage] = useLocalStorage(
    `project-rewards-table-filters-${projectKey}`,
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
    const { dateRange, period, contributors, currency } = filters;

    const filterQueryParams: FilterQueryParams = {
      contributors: contributors?.map(({ githubUserId }) => String(githubUserId)).join(","),
    };

    if (currency) {
      filterQueryParams.currencies = currency.value;
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
    (filters?.dateRange?.from && filters?.dateRange?.to && !isAllTime(filters?.dateRange)) ||
      filters.contributors?.length ||
      filters.currency?.value !== Currency.USD
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

  function updateContributors(contributors: ContributorResponse[]) {
    setFilters(prevState => updateState(prevState, { contributors }));
  }

  function updateCurrency(currency: Item) {
    setFilters(prevState =>
      updateState(prevState, {
        currency: {
          id: currency.id,
          value: currency.value || "",
        },
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
        <FilterContributorCombobox<ContributorResponse>
          contributors={contributors}
          selected={filters.contributors ?? initialFilters.contributors}
          onChange={updateContributors}
          queryState={contributorsQueryState}
          uniqueKey="githubUserId"
          isLoading={contributorsLoading}
        />
      </div>

      <div className="focus-within:z-10">
        {projectBudget ? (
          <FilterCurrencySelect
            selected={filters.currency ?? initialFilters.currency}
            onChange={updateCurrency}
            currencies={projectBudget.budgets.map((budget, index) => ({
              id: index,
              value: budget.currency,
            }))}
          />
        ) : null}
      </div>
    </Filter>
  );
});
