"use client";

import { ComponentProps, useEffect, useRef, useState } from "react";
import { useLocalStorage } from "react-use";

import UsersApi from "src/api/Users";
import { ContributionTabContents } from "src/components/Contribution/ContributionTabContents";
import { ContributionTable, TableColumns, type TableSort } from "src/components/Contribution/ContributionTable";
import SEO from "src/components/SEO";
import { Tabs } from "src/components/Tabs/Tabs";
import { AllTabs, useContributionTabs } from "src/hooks/useContributionTabs";
import { usePosthog } from "src/hooks/usePosthog";
import { ContributionStatus, OrderBy } from "src/types";

import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";

import { useIntl } from "hooks/translate/use-translate";
import { useCurrentUser } from "hooks/users/use-current-user/use-current-user";

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
  const { githubUserId } = useCurrentUser();
  const [sortStorage, setSortStorage] = useLocalStorage("contributions-table-sort-v02", JSON.stringify(initialSort));
  const [sort, setSort] = useState<typeof initialSort>(sortStorage ? JSON.parse(sortStorage) : initialSort);
  const { isActiveTab, updateActiveTab } = useContributionTabs({ defaultTab: AllTabs.InProgress });
  const { headerCells, bodyRow } = useContributionTable();
  const { capture } = usePosthog();

  const [filterQueryParams, setFilterQueryParams] = useState<FilterQueryParams>();

  const filterRef = useRef<ContributionsFilterRef>(null);

  useEffect(() => {
    capture("contributions_list_viewed");
  }, []);

  const tabItems = [
    {
      active: isActiveTab(AllTabs.InProgress),
      onClick: () => {
        updateActiveTab(AllTabs.InProgress);
      },
      testId: "contributions-in-progress-tab",
      children: (
        <ContributionTabContents>
          <Icon remixName="ri-progress-4-line" />
          <Translate token="contributions.nav.inProgress" />
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
          <Icon remixName="ri-checkbox-circle-line" />
          <Translate token="contributions.nav.completed" />
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
          <Icon remixName="ri-close-circle-line" />
          <Translate token="contributions.nav.canceled" />
        </ContributionTabContents>
      ),
    },
  ];

  const tableItems: Array<ComponentProps<typeof ContributionTable> & { show: boolean }> = [
    {
      id: "in_progress_contributions_table",
      title: T("contributions.inProgress.title"),
      description: T("contributions.inProgress.description"),
      icon: className => <Icon remixName="ri-progress-4-line" className={className} />,
      show: isActiveTab(AllTabs.InProgress),
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
      query: UsersApi.queries.useUserContributions({
        params: {
          login: githubUserId?.toString() ?? "",
          queryParams: {
            statuses: ContributionStatus.InProgress,
            ...sort.IN_PROGRESS,
            ...filterQueryParams,
            includePrivateProjects: "true",
          },
        },
        options: {
          enabled: Boolean(githubUserId) && isActiveTab(AllTabs.InProgress) && Boolean(filterQueryParams),
        },
      }),
      filterRef,
    },
    {
      id: "completed_contributions_table",
      title: T("contributions.completed.title"),
      description: T("contributions.completed.description"),
      icon: className => <Icon remixName="ri-checkbox-circle-line" className={className} />,
      sort: sort[ContributionStatus.Completed],
      onSort: sort => {
        setSort(prevState => {
          const state = { ...prevState, [ContributionStatus.Completed]: sort };

          setSortStorage(JSON.stringify(state));

          return state;
        });
      },
      show: isActiveTab(AllTabs.Completed),
      headerCells,
      bodyRow,
      query: UsersApi.queries.useUserContributions({
        params: {
          login: githubUserId?.toString() ?? "",
          queryParams: {
            statuses: ContributionStatus.Completed,
            ...sort.COMPLETED,
            ...filterQueryParams,
            includePrivateProjects: "true",
          },
        },
        options: {
          enabled: Boolean(githubUserId) && isActiveTab(AllTabs.Completed) && Boolean(filterQueryParams),
        },
      }),
      filterRef,
    },
    {
      id: "canceled_contributions_table",
      title: T("contributions.canceled.title"),
      description: T("contributions.canceled.description"),
      icon: className => <Icon remixName="ri-close-circle-line" className={className} />,
      sort: sort[ContributionStatus.Cancelled],
      onSort: sort => {
        setSort(prevState => {
          const state = { ...prevState, [ContributionStatus.Cancelled]: sort };

          setSortStorage(JSON.stringify(state));

          return state;
        });
      },
      show: isActiveTab(AllTabs.Cancelled),
      headerCells,
      bodyRow,
      query: UsersApi.queries.useUserContributions({
        params: {
          login: githubUserId?.toString() ?? "",
          queryParams: {
            statuses: ContributionStatus.Cancelled,
            ...sort.CANCELLED,
            ...filterQueryParams,
            includePrivateProjects: "true",
          },
        },
        options: {
          enabled: Boolean(githubUserId) && isActiveTab(AllTabs.Cancelled) && Boolean(filterQueryParams),
        },
      }),
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
                  show ? <ContributionTable key={restProps.id} {...restProps} fullTable={false} /> : null
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
