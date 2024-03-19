import { forwardRef, useContext, useEffect, useImperativeHandle, useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { useLocalStorage } from "usehooks-ts";

import { Period } from "src/components/New/Field/Datepicker";
import { FilterPosition } from "src/components/New/Filter/DesktopView";
import { Filter } from "src/components/New/Filter/Filter";
import { FilterDatepicker } from "src/components/New/Filter/FilterDatepicker";
import { useDatepickerPeriods } from "src/components/New/Filter/FilterDatepicker.hooks";
import { allTime, formatDateQueryParam } from "src/utils/date";

import { TSelectAutocomplete } from "components/ds/form/select-autocomplete/select-autocomplete.types";
import { FiltersCurrencies } from "components/features/filters/filters-currencies/filters-currencies";
import { FiltersProjects } from "components/features/filters/filters-projects/filters-projects";

import { UserRewardsContext } from "./context/UserRewards";

type Filters = {
  period: Period;
  dateRange: DateRange;
  projects: TSelectAutocomplete.Item[];
  currency: TSelectAutocomplete.Item[];
};

const initialFilters: Filters = {
  period: Period.AllTime,
  dateRange: allTime,
  projects: [],
  currency: [],
};

export type FilterQueryParams = {
  fromDate?: string;
  toDate?: string;
  projects?: string;
  currencies?: string;
};

export type UserRewardsFilterRef = {
  reset: () => void;
  hasActiveFilters: boolean;
};

export const UserRewardsFilter = forwardRef(function UserRewardsFilter(
  { position }: { position?: FilterPosition },
  ref: React.Ref<UserRewardsFilterRef>
) {
  const { rewards, setFilterQueryParams, currencies, projects } = useContext(UserRewardsContext);

  const [filtersStorage, setFiltersStorage] = useLocalStorage(
    "my-rewards-table-filters-v3-0-0",
    JSON.stringify(initialFilters)
  );

  // Type of partial Filters is required as the shape required by the state may not exist in the user's local storage
  const [filters, setFilters] = useState<Partial<Filters>>(
    filtersStorage ? JSON.parse(filtersStorage) : initialFilters
  );

  const allPeriods = useDatepickerPeriods({ selectedPeriod: filters.period ?? initialFilters.period });
  const projectIds = useMemo(() => filters.projects?.map(({ id }) => String(id)), [filters]) ?? [];

  useEffect(() => {
    const { dateRange, period, currency } = filters;

    const filterQueryParams: FilterQueryParams = {
      projects: projectIds.join(","),
    };

    if (currency) {
      filterQueryParams.currencies = currency.map(({ value }) => String(value)).join(",");
    }

    // If a predefined period is selected, use the predefined period's date range
    if (period !== Period.Custom) {
      const { value } = allPeriods.find(({ id }) => id === period) ?? {};

      if (value?.from && value?.to) {
        filterQueryParams.fromDate = formatDateQueryParam(value.from);
        filterQueryParams.toDate = formatDateQueryParam(value.to);

        setFilterQueryParams(filterQueryParams);

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

    setFilterQueryParams(filterQueryParams);
  }, [filters]);

  const hasActiveFilters = Boolean(
    filters.period !== initialFilters.period || filters.projects?.length || filters.currency?.length
  );

  function resetFilters() {
    setFilters(initialFilters);
    setFiltersStorage(JSON.stringify(initialFilters));
  }

  function updateState(prevState: Partial<Filters>, newState: Partial<Filters>) {
    const updatedState = { ...prevState, ...newState };

    setFiltersStorage(JSON.stringify({ ...updatedState }));

    return updatedState;
  }

  function updateDate(dateRange: DateRange) {
    setFilters(prevState => updateState(prevState, { dateRange }));
  }

  function updatePeriod(period: Period) {
    setFilters(prevState => updateState(prevState, { period }));
  }

  function updateProjects(projects: TSelectAutocomplete.Item[]) {
    setFilters(prevState => updateState(prevState, { projects }));
  }

  function updateCurrency(currencies: TSelectAutocomplete.Item[]) {
    setFilters(prevState =>
      updateState(prevState, {
        currency: currencies,
      })
    );
  }

  const projectsFilters = useMemo(
    () =>
      projects.map(project => ({
        id: project.id,
        label: project.name,
        image: project.logoUrl,
        value: project.id,
      })),
    [rewards]
  );

  const currenciesFilters = useMemo(
    () =>
      currencies.map(currency => ({
        id: currency.id,
        value: currency.id,
        label: currency.name,
        image: currency.logoUrl,
      })),
    [currencies]
  );

  useImperativeHandle(
    ref,
    () => {
      return {
        reset: resetFilters,
        hasActiveFilters,
      };
    },
    [hasActiveFilters, currencies]
  );

  const filterCount = useMemo(() => {
    let count = 0;

    if (filters.projects?.length) {
      count += 1;
    }

    if (filters.currency?.length) {
      count += 1;
    }

    if (filters.period !== initialFilters.period) {
      count += 1;
    }
    return count;
  }, [filters]);

  return (
    <Filter isActive={hasActiveFilters} onClear={resetFilters} position={position} count={filterCount}>
      <div className="focus-within:z-50">
        <FilterDatepicker
          selected={filters.dateRange ?? initialFilters.dateRange}
          selectedPeriod={filters.period ?? initialFilters.period}
          onChange={updateDate}
          onPeriodChange={updatePeriod}
        />
      </div>

      {rewards ? (
        <>
          <div className="focus-within:z-10">
            <FiltersProjects
              projects={projectsFilters ?? []}
              selected={filters.projects ?? initialFilters.projects}
              onChange={updateProjects}
            />
          </div>

          <div className="focus-within:z-10">
            <FiltersCurrencies
              selected={filters.currency ?? initialFilters.currency}
              onChange={updateCurrency}
              currencies={currenciesFilters ?? []}
            />
          </div>
        </>
      ) : null}
    </Filter>
  );
});
