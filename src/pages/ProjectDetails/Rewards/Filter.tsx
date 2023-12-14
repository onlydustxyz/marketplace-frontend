import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { useParams } from "react-router-dom";
import ProjectApi from "src/api/Project";
import { Filter } from "src/components/New/Filter/Filter";
import { FilterContributorCombobox } from "src/components/New/Filter/FilterContributorCombobox";
import { FilterCurrencySelect } from "src/components/New/Filter/FilterCurrencySelect";
import { FilterDatepicker } from "src/components/New/Filter/FilterDatepicker";
import { ContributorResponse, Currency } from "src/types";
import { useLocalStorage, useMediaQuery } from "usehooks-ts";
import { Item } from "src/components/New/Filter/FilterSelect";
import { formatDateQueryParam } from "src/utils/date";
import { cn } from "src/utils/cn";
import { viewportConfig } from "src/config";
import { FilterPosition } from "src/components/New/Filter/DesktopView";

type Filters = {
  dateRange: DateRange;
  contributors: ContributorResponse[];
  currency: { id: string | number; value?: string };
};

const initialFilters: Filters = {
  dateRange: { from: undefined, to: undefined },
  contributors: [],
  currency: { id: 0, value: Currency.USD },
};

export type FilterQueryParams = {
  fromDate?: string;
  toDate?: string;
  contributors: string;
  currency?: string;
};

export function ProjectRewardsFilter({
  onChange,
  position,
}: {
  onChange: (filterQueryParams: FilterQueryParams) => void;
  position?: FilterPosition;
}) {
  const { projectKey = "" } = useParams<{ projectKey?: string }>();
  const isMobile = useMediaQuery(`(max-width: ${viewportConfig.breakpoints.md}px)`);

  const { data: project } = ProjectApi.queries.useGetProjectBySlug({
    params: { slug: projectKey },
  });

  const { data: projectBudget } = ProjectApi.queries.useProjectBudget({
    params: { projectId: project?.id },
  });

  const [filtersStorage, setFiltersStorage] = useLocalStorage(
    "project-rewards-table-filters",
    JSON.stringify(initialFilters)
  );

  const contributorsQueryState = useState<string>();
  const [contributorsQuery] = contributorsQueryState;

  const [filters, setFilters] = useState<Filters>(filtersStorage ? JSON.parse(filtersStorage) : initialFilters);

  useEffect(() => {
    const { dateRange, contributors, currency } = filters;

    const filterQueryParams: FilterQueryParams = {
      contributors: contributors.map(({ githubUserId }) => String(githubUserId)).join(","),
    };

    const { from: fromDate, to: toDate } = dateRange;

    if (fromDate && toDate) {
      filterQueryParams.fromDate = formatDateQueryParam(fromDate);
      filterQueryParams.toDate = formatDateQueryParam(toDate);
    }

    if (currency) {
      filterQueryParams.currency = currency.value;
    }

    onChange(filterQueryParams);
  }, [filters]);

  const hasActiveFilters = Boolean(
    (filters.dateRange.from && filters.dateRange.to) || filters.contributors.length || filters.currency
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

  function updateState(prevState: Filters, newState: Partial<Filters>) {
    const updatedState = { ...prevState, ...newState };

    setFiltersStorage(JSON.stringify(updatedState));

    return updatedState;
  }

  function updateDate(dateRange: DateRange) {
    setFilters(prevState => updateState(prevState, { dateRange }));
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

  return (
    <Filter isActive={hasActiveFilters} onClear={resetFilters} position={position} className="min-w-[360px]">
      <div className="z-20">
        <FilterDatepicker selected={filters.dateRange} onChange={updateDate} />
      </div>

      <div className="z-10">
        <FilterContributorCombobox<ContributorResponse>
          contributors={contributors}
          selected={filters.contributors}
          onChange={updateContributors}
          queryState={contributorsQueryState}
          uniqueKey="githubUserId"
          isLoading={contributorsLoading}
        />
      </div>

      <div className={cn({ "z-30": isMobile })}>
        {projectBudget ? (
          <FilterCurrencySelect
            selected={filters.currency}
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
}
