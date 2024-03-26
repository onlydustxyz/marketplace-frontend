import { SortDescriptor } from "@nextui-org/react";
import { format } from "date-fns";
import { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { useLocalStorage } from "react-use";
import { Money } from "utils/Money/Money";

import { SponsorHistoryTransaction } from "app/sponsor/components/sponsor-history-transaction/sponsor-history-transaction";

import { Chip } from "src/components/Chip/Chip";
import { CurrencyIcons } from "src/components/Currency/CurrencyIcon";
import { Period } from "src/components/New/Field/Datepicker";
import { FilterDatepicker } from "src/components/New/Filter/FilterDatepicker";
import { ShowMore } from "src/components/Table/ShowMore";
import { useIntl } from "src/hooks/useIntl";
import { allTime } from "src/utils/date";

import { Avatar } from "components/ds/avatar/avatar";
import { Card } from "components/ds/card/card";
import { TSelectAutocomplete } from "components/ds/form/select-autocomplete/select-autocomplete.types";
import { Table } from "components/ds/table/table";
import { TTable } from "components/ds/table/table.types";
import { FiltersProjects } from "components/features/filters/filters-projects/filters-projects";
import { FiltersTransactions } from "components/features/filters/filters-transactions/filters-transactions";
import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

const projects = [
  {
    id: 123,
    label: "test project",
    value: "test project",
  },
  {
    id: 1234,
    label: "test project",
    value: "test project",
  },
];

const transactions = [
  {
    id: "deposit",
    label: "Deposit",
    value: "deposit",
  },
  {
    id: "allocated",
    label: "Allocated",
    value: "allocated",
  },
  {
    id: "unallocated",
    label: "Unallocated",
    value: "unallocated",
  },
];

type Filters = {
  dateRange: DateRange;
  period: Period;
  projects: TSelectAutocomplete.Item[];
};

const initialFilters: Filters = {
  dateRange: allTime,
  period: Period.AllTime,
  projects: [],
};

export function SponsorHistoryTable() {
  const { T } = useIntl();

  const [filtersStorage, setFiltersStorage] = useLocalStorage("sponsor-table-filters", JSON.stringify(initialFilters));
  const [filters, setFilters] = useState<Partial<Filters>>(
    filtersStorage ? JSON.parse(filtersStorage) : initialFilters
  );
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>();

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

  function handleSort(sort: SortDescriptor) {
    setSortDescriptor(sort);
  }

  const hasNextPage = true;
  const fetchNextPage = () => {};
  const isFetchingNextPage = false;

  const columns: TTable.Column[] = useMemo(
    () => [
      {
        key: "date",
        children: T("v2.pages.sponsor.history.date"),
        width: "50%",
        allowsSorting: true,
      },
      {
        key: "transaction",
        children: T("v2.pages.sponsor.history.transaction"),
      },
      {
        key: "amount",
        children: T("v2.pages.sponsor.history.amount"),
      },
      {
        key: "project",
        children: T("v2.pages.sponsor.history.project"),
      },
    ],
    []
  );

  const rows: TTable.Row[] = [
    {
      key: "123",
      date: format(new Date(), "MMMM dd yyyy, KK:mm a"),
      transaction: <SponsorHistoryTransaction type={"deposit"} />,
      amount: (
        <Flex className="gap-2" alignItems="center">
          <Chip solid className="h-5 w-5">
            <CurrencyIcons currency={Money.fromSchema({ code: "USD" })} className="h-5 w-5" />
          </Chip>
          <Typography variant={"body-s"}>
            {
              Money.format({
                amount: 123,
                currency: Money.fromSchema({ code: "USD" }),
                options: { currencyClassName: "text-body-xs" },
              }).html
            }
          </Typography>
        </Flex>
      ),
      project: (
        <Avatar.Labelled
          avatarProps={{ src: "", alt: "", shape: "square" }}
          labelProps={{ title: "" }}
          className={"max-w-[120px]"}
          truncate
        >
          Madara
        </Avatar.Labelled>
      ),
    },
  ];

  return (
    <Card background={"base"} className={"grid gap-5"}>
      <header className={"flex gap-3"}>
        <Flex>
          <FilterDatepicker
            selected={filters.dateRange ?? initialFilters.dateRange}
            onChange={updateDate}
            selectedPeriod={filters.period ?? initialFilters.period}
            onPeriodChange={updatePeriod}
            hideLabel
          />
        </Flex>
        <Flex>
          <FiltersTransactions transactions={transactions} selected={[]} onChange={() => {}} hideLabel />
        </Flex>
        <Flex>
          <FiltersProjects projects={projects} selected={[]} onChange={() => {}} hideLabel />
        </Flex>
      </header>
      <Table
        label={T("v2.pages.sponsor.history.title")}
        columns={columns}
        rows={rows}
        sortDescriptor={sortDescriptor}
        onSortChange={handleSort}
        bottomContent={
          hasNextPage ? <ShowMore onClick={fetchNextPage} loading={isFetchingNextPage} isInfinite={false} /> : null
        }
      />
    </Card>
  );
}
