"use client";

import { ComponentProps, useEffect, useRef, useState } from "react";
import { useLocalStorage } from "react-use";

import MeApi from "src/api/me";
import CancelCircleLine from "src/assets/icons/CancelCircleLine";
import ProgressCircle from "src/assets/icons/ProgressCircle";
import { ContributionTabContents } from "src/components/Contribution/ContributionTabContents";
import { ContributionTable, TableColumns, type TableSort } from "src/components/Contribution/ContributionTable";
import SEO from "src/components/SEO";
import { Tabs } from "src/components/Tabs/Tabs";
import { AllTabs, useContributionTabs } from "src/hooks/useContributionTabs";
import { useIntl } from "src/hooks/useIntl";
import { usePosthog } from "src/hooks/usePosthog";
import CheckboxCircleLine from "src/icons/CheckboxCircleLine";
import StackLine from "src/icons/StackLine";
import { ContributionStatus, OrderBy } from "src/types";

import { ContributionsFilter, ContributionsFilterRef, FilterQueryParams } from "./Filter";
import { useContributionTable } from "./useContributionTable";

const initialSort: Record<ContributionStatus, TableSort> = {
  [ContributionStatus.InProgress]: {
    sort: TableColumns.Date,
    direction: OrderBy.Desc,
  },
  [ContributionStatus.Completed]: {
    sort: TableColumns.Date,
    direction: OrderBy.Desc,
  },
  [ContributionStatus.Cancelled]: {
    sort: TableColumns.Date,
    direction: OrderBy.Desc,
  },
};

export default function Contributions() {
  const { T } = useIntl();
  const [sortStorage, setSortStorage] = useLocalStorage("contributions-table-sort-v02", JSON.stringify(initialSort));
  const [sort, setSort] = useState<typeof initialSort>(sortStorage ? JSON.parse(sortStorage) : initialSort);
  const { isActiveTab, updateActiveTab } = useContributionTabs();
  const { headerCells, bodyRow } = useContributionTable();
  const { capture } = usePosthog();

  const [filterQueryParams, setFilterQueryParams] = useState<FilterQueryParams>();

  const filterRef = useRef<ContributionsFilterRef>(null);

  useEffect(() => {
    capture("contributions_list_viewed");
  }, []);

  const tabItems = [
    {
      active: isActiveTab(AllTabs.All),
      onClick: () => {
        updateActiveTab(AllTabs.All);
      },
      testId: "contributions-all-contributions-tab",
      children: (
        <ContributionTabContents>
          <StackLine className="text-xl leading-none md:hidden" />
          {T("contributions.nav.allContributions")}
        </ContributionTabContents>
      ),
    },
    {
      active: isActiveTab(AllTabs.InProgress),
      onClick: () => {
        updateActiveTab(AllTabs.InProgress);
      },
      testId: "contributions-in-progress-tab",
      children: (
        <ContributionTabContents>
          <ProgressCircle className="h-5 w-5 md:h-4 md:w-4" />
          {T("contributions.nav.inProgress")}
        </ContributionTabContents>
      ),
    },
    {
      active: isActiveTab(AllTabs.Completed),
      onClick: () => {
        updateActiveTab(AllTabs.Completed);
      },
      testId: "contributions-completed-tab",
      children: (
        <ContributionTabContents>
          <CheckboxCircleLine className="text-xl leading-none md:text-base" />
          {T("contributions.nav.completed")}
        </ContributionTabContents>
      ),
    },
    {
      active: isActiveTab(AllTabs.Cancelled),
      onClick: () => {
        updateActiveTab(AllTabs.Cancelled);
      },
      testId: "contributions-canceled-tab",
      children: (
        <ContributionTabContents>
          <CancelCircleLine className="h-5 w-5 md:h-4 md:w-4" />
          {T("contributions.nav.canceled")}
        </ContributionTabContents>
      ),
    },
  ];

  const tableItems: Array<ComponentProps<typeof ContributionTable> & { show: boolean }> = [
    {
      id: "in_progress_contributions_table",
      title: T("contributions.inProgress.title"),
      description: T("contributions.inProgress.description"),
      icon: className => <ProgressCircle className={className} />,
      show: isActiveTab(AllTabs.All) || isActiveTab(AllTabs.InProgress),
      sort: sort[ContributionStatus.InProgress],
      onSort: sort => {
        setSort(prevState => {
          const state = { ...prevState, [ContributionStatus.InProgress]: sort };

          setSortStorage(JSON.stringify(state));

          return state;
        });
      },
      headerCells,
      bodyRow,
      query: MeApi.queries.useMyContributions(
        {
          queryParams: {
            statuses: ContributionStatus.InProgress,
            ...sort.IN_PROGRESS,
            ...filterQueryParams,
          },
        },
        { enabled: (isActiveTab(AllTabs.All) || isActiveTab(AllTabs.InProgress)) && Boolean(filterQueryParams) }
      ),
      filterRef,
    },
    {
      id: "completed_contributions_table",
      title: T("contributions.completed.title"),
      description: T("contributions.completed.description"),
      icon: className => <CheckboxCircleLine className={className} />,
      sort: sort[ContributionStatus.Completed],
      onSort: sort => {
        setSort(prevState => {
          const state = { ...prevState, [ContributionStatus.Completed]: sort };

          setSortStorage(JSON.stringify(state));

          return state;
        });
      },
      show: isActiveTab(AllTabs.All) || isActiveTab(AllTabs.Completed),
      headerCells,
      bodyRow,
      query: MeApi.queries.useMyContributions(
        {
          queryParams: {
            statuses: ContributionStatus.Completed,
            ...sort.COMPLETED,
            ...filterQueryParams,
          },
        },
        { enabled: (isActiveTab(AllTabs.All) || isActiveTab(AllTabs.Completed)) && Boolean(filterQueryParams) }
      ),
      filterRef,
    },
    {
      id: "canceled_contributions_table",
      title: T("contributions.canceled.title"),
      description: T("contributions.canceled.description"),
      icon: className => <CancelCircleLine className={className} />,
      sort: sort[ContributionStatus.Cancelled],
      onSort: sort => {
        setSort(prevState => {
          const state = { ...prevState, [ContributionStatus.Cancelled]: sort };

          setSortStorage(JSON.stringify(state));

          return state;
        });
      },
      show: isActiveTab(AllTabs.All) || isActiveTab(AllTabs.Cancelled),
      headerCells,
      bodyRow,
      query: MeApi.queries.useMyContributions(
        {
          queryParams: {
            statuses: ContributionStatus.Cancelled,
            ...sort.CANCELLED,
            ...filterQueryParams,
          },
        },
        { enabled: (isActiveTab(AllTabs.All) || isActiveTab(AllTabs.Cancelled)) && Boolean(filterQueryParams) }
      ),
      filterRef,
    },
  ];

  return (
    <>
      <SEO />
      <div className="h-full overflow-y-auto pb-6">
        <div className="h-full w-full overflow-y-auto scrollbar-thin scrollbar-thumb-white/12 scrollbar-thumb-rounded scrollbar-w-1.5">
          <div className="relative min-h-full">
            <div className="bg-transparency-gradiant absolute inset-0" />
            <div className="relative z-10">
              <header className="sticky top-0 z-10 border-b border-card-border-heavy bg-card-background-base px-4 pb-4 pt-7 shadow-heavy md:px-8 md:pb-0 md:pt-8">
                <div className="flex items-center justify-between md:px-4">
                  <Tabs tabs={tabItems} variant="blue" showMobile mobileTitle={T("navbar.contributions")} />

                  <div className="md:-translate-y-3">
                    <ContributionsFilter
                      onChange={filterQueryParams => setFilterQueryParams(filterQueryParams)}
                      ref={filterRef}
                    />
                  </div>
                </div>
              </header>
              <div className="flex flex-col gap-4 px-2 py-3 md:px-4 md:py-6 lg:px-8">
                {tableItems.map(({ show, ...restProps }) =>
                  show ? (
                    <ContributionTable key={restProps.id} {...restProps} fullTable={isActiveTab(AllTabs.All)} />
                  ) : null
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
