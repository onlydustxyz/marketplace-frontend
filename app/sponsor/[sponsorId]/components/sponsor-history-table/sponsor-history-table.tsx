import { SortDescriptor } from "@nextui-org/react";
import { format } from "date-fns";
import { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { useLocalStorage } from "react-use";
import { Money } from "utils/Money/Money";

import { TSponsorHistoryTable } from "app/sponsor/[sponsorId]/components/sponsor-history-table/sponsor-history-table.types";
import { SponsorHistoryTransaction } from "app/sponsor/[sponsorId]/components/sponsor-history-transaction/sponsor-history-transaction";
import { useSponsorDetail } from "app/sponsor/[sponsorId]/hooks/use-sponsor-detail/use-sponsor-detail";
import { useSponsorHistory } from "app/sponsor/[sponsorId]/hooks/use-sponsor-history/use-sponsor-history";
import { TUseSponsorHistory } from "app/sponsor/[sponsorId]/hooks/use-sponsor-history/use-sponsor-history.types";

import { Chip } from "src/components/Chip/Chip";
import { CurrencyIcons } from "src/components/Currency/CurrencyIcon";
import { Period } from "src/components/New/Field/Datepicker";
import { FilterDatepicker } from "src/components/New/Filter/FilterDatepicker";
import { ShowMore } from "src/components/Table/ShowMore";
import { useCurrenciesOrder } from "src/hooks/useCurrenciesOrder";
import { useIntl } from "src/hooks/useIntl";
import { allTime, formatDateQueryParam } from "src/utils/date";

import { Avatar } from "components/ds/avatar/avatar";
import { Card } from "components/ds/card/card";
import { TSelectAutocomplete } from "components/ds/form/select-autocomplete/select-autocomplete.types";
import { Table } from "components/ds/table/table";
import { TTable } from "components/ds/table/table.types";
import { FiltersCurrencies } from "components/features/filters/filters-currencies/filters-currencies";
import { FiltersProjects } from "components/features/filters/filters-projects/filters-projects";
import { FiltersTransactions } from "components/features/filters/filters-transactions/filters-transactions";
import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

const initialFilters: Required<TSponsorHistoryTable.Filters> = {
  dateRange: allTime,
  period: Period.AllTime,
  types: [],
  projects: [],
  currencies: [],
  sort: "DATE",
  direction: "descending",
};

export function SponsorHistoryTable() {
  const { T } = useIntl();
  const [filtersStorage, setFiltersStorage] = useLocalStorage("sponsor-table-filters", JSON.stringify(initialFilters));
  const [filters, setFilters] = useState<TSponsorHistoryTable.Filters>(
    filtersStorage ? JSON.parse(filtersStorage) : initialFilters
  );
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: filters.sort,
    direction: filters.direction,
  });

  const queryParams = useMemo(() => {
    const params: TUseSponsorHistory.Props["queryParams"] = {};

    if (filters.dateRange?.from && filters.dateRange?.to) {
      params["fromDate"] = formatDateQueryParam(filters.dateRange.from);
      params["toDate"] = formatDateQueryParam(filters.dateRange.to);
    }

    if (filters.types?.length) {
      params["types"] = filters.types.map(({ value }) => value).join(",");
    }

    if (filters.currencies?.length) {
      params["currencies"] = filters.currencies.map(({ value }) => value).join(",");
    }

    if (filters.projects?.length) {
      params["projects"] = filters.projects.map(({ value }) => value).join(",");
    }

    if (filters.sort) {
      params["sort"] = String(filters.sort);
    }

    if (filters.direction) {
      params["direction"] = filters.direction === "ascending" ? "ASC" : "DESC";
    }

    return params;
  }, [filters]);

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useSponsorHistory({ queryParams });
  const transactions = useMemo(() => data?.pages.flatMap(({ transactions }) => transactions) ?? [], [data]);

  const { data: sponsorDetail } = useSponsorDetail();

  const types = useMemo(
    () => [
      {
        id: "DEPOSIT",
        label: T("v2.pages.sponsor.history.deposit"),
        value: "DEPOSIT",
      },
      {
        id: "ALLOCATION",
        label: T("v2.pages.sponsor.history.allocated"),
        value: "ALLOCATION",
      },
      {
        id: "UNALLOCATION",
        label: T("v2.pages.sponsor.history.unallocated"),
        value: "UNALLOCATION",
      },
      {
        id: "WITHDRAWAL",
        label: T("v2.pages.sponsor.history.withdrawal"),
        value: "WITHDRAWAL",
      },
    ],
    []
  );

  const orderedCurrencies = useCurrenciesOrder({
    currencies:
      sponsorDetail?.availableBudgets.map(budget => ({
        currency: budget.currency,
      })) ?? [],
  });

  const currencies = useMemo(
    () =>
      orderedCurrencies?.map(({ currency: { id, name, logoUrl } }) => ({
        id,
        value: id,
        label: name,
        image: logoUrl,
      })) ?? [],
    [orderedCurrencies]
  );

  const projects = useMemo(
    () => sponsorDetail?.projects.map(p => ({ label: p.name, value: p.id, ...p })) ?? [],
    [sponsorDetail]
  );

  function updateState(prevState: TSponsorHistoryTable.Filters, newState: TSponsorHistoryTable.Filters) {
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

  function updateTypes(types: TSelectAutocomplete.Item[]) {
    setFilters(prevState => updateState(prevState, { types }));
  }

  function updateCurrencies(currencies: TSelectAutocomplete.Item[]) {
    setFilters(prevState => updateState(prevState, { currencies }));
  }

  function updateProjects(projects: TSelectAutocomplete.Item[]) {
    setFilters(prevState => updateState(prevState, { projects }));
  }

  function handleSort(sort: SortDescriptor) {
    setSortDescriptor(sort);
    setFilters(prevState => updateState(prevState, { sort: sort.column, direction: sort.direction }));
  }

  const columns: TTable.Column[] = useMemo(
    () => [
      {
        key: "DATE",
        children: T("v2.pages.sponsor.history.date"),
        width: "50%",
        allowsSorting: true,
      },
      {
        key: "TYPE",
        children: T("v2.pages.sponsor.history.transaction"),
        allowsSorting: true,
      },
      {
        key: "AMOUNT",
        children: T("v2.pages.sponsor.history.amount"),
        allowsSorting: true,
      },
      {
        key: "PROJECT",
        children: T("v2.pages.sponsor.history.project"),
        allowsSorting: true,
      },
    ],
    []
  );

  const rows: TTable.Row[] = useMemo(
    () =>
      transactions?.map((t, i) => ({
        key: t.id ?? String(i),
        DATE: format(new Date(t.date), "MMMM dd yyyy, KK:mm a"),
        TYPE: <SponsorHistoryTransaction type={t.type} />,
        AMOUNT: (
          <Flex className="gap-2" alignItems="center">
            <Chip solid className="h-5 w-5">
              <CurrencyIcons currency={t.amount.currency} className="h-5 w-5" />
            </Chip>
            <Typography variant={"body-s"}>
              {
                Money.format({
                  amount: t.amount.amount,
                  currency: t.amount.currency,
                  options: { currencyClassName: "text-body-xs" },
                }).html
              }
            </Typography>
          </Flex>
        ),
        PROJECT: t.project ? (
          <Avatar.Labelled
            avatarProps={{ src: t.project.logoUrl, alt: t.project.name, shape: "square" }}
            labelProps={{ title: t.project.name }}
            className={"max-w-[120px]"}
            truncate
          >
            {t.project.name}
          </Avatar.Labelled>
        ) : (
          "-"
        ),
      })) ?? ([] as TTable.Row[]),
    [transactions]
  );

  return (
    <Card background={"base"} className={"grid gap-5"}>
      <header className={"flex gap-3"}>
        <FilterDatepicker
          selected={filters.dateRange ?? initialFilters.dateRange}
          onChange={updateDate}
          selectedPeriod={filters.period ?? initialFilters.period}
          onPeriodChange={updatePeriod}
          hideLabel
          isElevated={false}
        />
        <FiltersTransactions
          transactions={types}
          selected={filters.types ?? initialFilters.types}
          onChange={updateTypes}
          hideLabel
          isElevated={false}
        />
        <FiltersCurrencies
          currencies={currencies}
          selected={filters.currencies ?? initialFilters.currencies}
          onChange={updateCurrencies}
          hideLabel
          isElevated={false}
        />
        <FiltersProjects
          projects={projects}
          selected={filters.projects ?? initialFilters.projects}
          onChange={updateProjects}
          hideLabel
          isElevated={false}
        />
      </header>
      <Table
        label={T("v2.pages.sponsor.history.title")}
        columns={columns}
        rows={rows}
        sortDescriptor={sortDescriptor}
        onSortChange={handleSort}
        bottomContent={hasNextPage ? <ShowMore onClick={fetchNextPage} loading={isFetchingNextPage} /> : null}
      />
    </Card>
  );
}
