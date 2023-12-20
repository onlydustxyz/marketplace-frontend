import { useContext, useEffect, useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { Filter } from "src/components/New/Filter/Filter";
import { FilterCurrencySelect } from "src/components/New/Filter/FilterCurrencySelect";
import { FilterDatepicker } from "src/components/New/Filter/FilterDatepicker";
import { useLocalStorage } from "usehooks-ts";
import { Item } from "src/components/New/Filter/FilterSelect";
import { allTime, formatDateQueryParam, isAllTime } from "src/utils/date";
import { FilterPosition } from "src/components/New/Filter/DesktopView";
import { Period } from "src/components/New/Field/Datepicker";
import { useDatepickerPeriods } from "src/components/New/Filter/FilterDatepicker.hooks";
import { UserRewardsContext } from "./context";
import { FilterProjectSelect } from "src/components/New/Filter/FilterProjectSelect";

type Filters = {
  period: Period;
  dateRange: DateRange;
  projects: Item[];
  currency: Item;
};

const initialFilters: Filters = {
  period: Period.AllTime,
  dateRange: allTime,
  projects: [],
  currency: { id: 0, value: "" },
};

export type FilterQueryParams = {
  fromDate?: string;
  toDate?: string;
  projects?: string;
  currencies?: string;
};

export function UserRewardsFilter({ position }: { position?: FilterPosition }) {
  const { rewards, setFilterQueryParams } = useContext(UserRewardsContext);

  const [filtersStorage, setFiltersStorage] = useLocalStorage(
    "project-my-rewards-table-filters",
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
      filterQueryParams.currencies = currency.value ?? "";
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
    !isAllTime(filters?.dateRange) || filters.projects?.length || filters.currency?.value
  );

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

  function updateProjects(projects: Item[]) {
    setFilters(prevState => updateState(prevState, { projects }));
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

  const uniqueProjects = rewards
    ?.filter(
      (value, index, self) => index === self.findIndex(t => t.rewardedOnProjectName === value.rewardedOnProjectName)
    )
    .map(reward => ({
      id: reward.projectId,
      label: reward.rewardedOnProjectName,
      image: reward.rewardedOnProjectLogoUrl,
    }));

  return (
    <Filter isActive={hasActiveFilters} onClear={resetFilters} position={position} className="z-10">
      <div className="isolate focus-within:z-50">
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
            <FilterProjectSelect
              projects={uniqueProjects ?? []}
              selected={filters.projects ?? initialFilters.projects}
              onChange={updateProjects}
            />
          </div>

          <div className="focus-within:z-10">
            <FilterCurrencySelect
              selected={filters.currency ?? initialFilters.currency}
              onChange={updateCurrency}
              currencies={rewards.map((reward, index) => ({
                id: index,
                value: reward.amount.currency,
              }))}
            />
          </div>
        </>
      ) : null}
    </Filter>
  );
}
