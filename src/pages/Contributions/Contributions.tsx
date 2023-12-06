import { ComponentProps, PropsWithChildren, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useLocalStorage } from "react-use";
import { OrderBy } from "src/__generated/graphql";
import MeApi from "src/api/me";
import CancelCircleLine from "src/assets/icons/CancelCircleLine";
import IssueOpen from "src/assets/icons/IssueOpen";
import ProgressCircle from "src/assets/icons/ProgressCircle";
import { Contribution } from "src/components/Contribution/Contribution";
import { ContributionDate } from "src/components/Contribution/ContributionDate";
import { ContributionFilter, Filters } from "src/components/Contribution/ContributionFilter";
import { ContributionLinked } from "src/components/Contribution/ContributionLinked";
import { ContributionProjectRepo } from "src/components/Contribution/ContributionProjectRepo";
import { ContributionTable, type TableSort } from "src/components/Contribution/ContributionTable";
import SEO from "src/components/SEO";
import Cell, { CellHeight } from "src/components/Table/Cell";
import { HeaderCellWidth } from "src/components/Table/HeaderCell";
import Line from "src/components/Table/Line";
import { Tabs } from "src/components/Tabs/Tabs";
import { TooltipPosition, Variant as TooltipVariant } from "src/components/Tooltip";
import { useIntl } from "src/hooks/useIntl";
import CheckboxCircleLine from "src/icons/CheckboxCircleLine";
import Folder3Line from "src/icons/Folder3Line";
import StackLine from "src/icons/StackLine";
import TimeLine from "src/icons/TimeLine";
import { ContributionStatus, Contribution as ContributionT, GithubContributionType } from "src/types";
import { isInArray } from "src/utils/isInArray";

enum AllTabs {
  All = "ALL_CONTRIBUTIONS",
  InProgress = "IN_PROGRESS",
  Completed = "COMPLETED",
  Cancelled = "CANCELLED",
}

enum TableColumns {
  Date = "CREATED_AT",
  Project = "PROJECT_REPO_NAME",
  Id = "GITHUB_NUMBER_TITLE",
  Linked = "LINKS_COUNT",
}

const tabValues = Object.values(AllTabs);

function TabContents({ children }: PropsWithChildren) {
  return <div className="flex items-center gap-2 md:gap-1.5">{children}</div>;
}

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

const initialFilters: Filters = {
  types: [],
  projects: [],
  repos: [],
};

export default function Contributions() {
  const { T } = useIntl();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortStorage, setSortStorage] = useLocalStorage("contributions-table-sort", JSON.stringify(initialSort));
  const [sort, setSort] = useState<typeof initialSort>(sortStorage ? JSON.parse(sortStorage) : initialSort);

  const [filtersStorage, setFiltersStorage] = useLocalStorage(
    "contributions-table-filters",
    JSON.stringify(initialFilters)
  );
  const filtersState = useState<Filters>(filtersStorage ? JSON.parse(filtersStorage) : initialFilters);
  const [{ types, projects, repos }] = filtersState;

  const projectIds = projects.map(({ id }) => String(id));
  const repoIds = repos.map(({ id }) => String(id));

  const filterQueryParams = {
    types: types.join(","),
    projects: projectIds.join(","),
    repositories: repoIds.join(","),
  };

  const tab = searchParams.get("tab") as typeof tabValues[number] | null;

  const [activeTab, setActiveTab] = useState(isInArray(tabValues, tab ?? "") ? tab : AllTabs.All);

  const { data: projectsData } = MeApi.queries.useMyContributedProjects({
    params: { repositories: repoIds.length ? repoIds.join(",") : "" },
  });
  const contributedProjects = projectsData?.projects ?? [];

  const { data: reposData } = MeApi.queries.useMyContributedRepos({
    params: { projects: projectIds.length ? projectIds.join(",") : "" },
  });
  const contributedRepos = reposData?.repos ?? [];

  function isActiveTab(tab: AllTabs) {
    return activeTab === tab;
  }

  function updateActiveTab(tab: AllTabs) {
    setActiveTab(tab);
    setSearchParams({ tab });
  }

  const tabItems = [
    {
      active: isActiveTab(AllTabs.All),
      onClick: () => {
        updateActiveTab(AllTabs.All);
      },
      testId: "contributions-all-contributions-tab",
      children: (
        <TabContents>
          <StackLine className="text-xl leading-none md:hidden" />
          {T("contributions.nav.allContributions")}
        </TabContents>
      ),
    },
    {
      active: isActiveTab(AllTabs.InProgress),
      onClick: () => {
        updateActiveTab(AllTabs.InProgress);
      },
      testId: "contributions-in-progress-tab",
      children: (
        <TabContents>
          <ProgressCircle className="h-5 w-5 md:h-4 md:w-4" />
          {T("contributions.nav.inProgress")}
        </TabContents>
      ),
    },
    {
      active: isActiveTab(AllTabs.Completed),
      onClick: () => {
        updateActiveTab(AllTabs.Completed);
      },
      testId: "contributions-completed-tab",
      children: (
        <TabContents>
          <CheckboxCircleLine className="text-xl leading-none md:text-base" />
          {T("contributions.nav.completed")}
        </TabContents>
      ),
    },
    {
      active: isActiveTab(AllTabs.Cancelled),
      onClick: () => {
        updateActiveTab(AllTabs.Cancelled);
      },
      testId: "contributions-canceled-tab",
      children: (
        <TabContents>
          <CancelCircleLine className="h-5 w-5 md:h-4 md:w-4" />
          {T("contributions.nav.canceled")}
        </TabContents>
      ),
    },
  ];

  const headerCells = [
    {
      sort: TableColumns.Date,
      icon: <TimeLine />,
      label: T("contributions.table.date"),
    },
    {
      sort: TableColumns.Project,
      icon: <Folder3Line />,
      label: T("contributions.table.projectRepo"),
      width: HeaderCellWidth.Quarter,
    },
    {
      sort: TableColumns.Id,
      icon: <StackLine />,
      label: T("contributions.table.contribution"),
      width: HeaderCellWidth.Half,
    },
    {
      sort: TableColumns.Linked,
      icon: (
        <span>
          <IssueOpen className="h-3 w-3" />
        </span>
      ),
      label: T("contributions.table.linkedTo"),
      className: "justify-end",
    },
  ];

  const bodyRow = (contribution?: ContributionT) => {
    if (!contribution) return null;

    const { createdAt, completedAt, githubStatus, id, repo, status, type } = contribution;
    const lineId = "project" in contribution ? `${id}-${contribution.project.id}` : id;
    const lineDate = status === ContributionStatus.InProgress ? createdAt : completedAt;

    return (
      <Line key={lineId} className="border-card-border-light">
        <Cell height={CellHeight.Compact}>
          <ContributionDate
            id={lineId}
            type={type as GithubContributionType}
            status={githubStatus}
            contributionStatus={status}
            date={new Date(lineDate ?? "")}
            tooltipProps={{ variant: TooltipVariant.Default, position: TooltipPosition.Bottom }}
          />
        </Cell>
        <Cell height={CellHeight.Compact}>
          {"project" in contribution ? <ContributionProjectRepo project={contribution.project} repo={repo} /> : null}
        </Cell>
        <Cell height={CellHeight.Compact}>
          <Contribution contribution={contribution} isMine />
        </Cell>
        <Cell className="justify-end gap-1" height={CellHeight.Compact}>
          {ContributionLinked({ contribution }) ? <ContributionLinked contribution={contribution} /> : "-"}
        </Cell>
      </Line>
    );
  };

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
        { enabled: isActiveTab(AllTabs.All) || isActiveTab(AllTabs.InProgress) }
      ),
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
        { enabled: isActiveTab(AllTabs.All) || isActiveTab(AllTabs.Completed) }
      ),
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
        { enabled: isActiveTab(AllTabs.All) || isActiveTab(AllTabs.Cancelled) }
      ),
    },
  ];

  return (
    <>
      <SEO />
      <div className="h-full overflow-y-auto px-6 pb-6">
        <div className="h-full w-full overflow-y-auto rounded-3xl bg-contributions bg-right-top bg-no-repeat scrollbar-thin scrollbar-thumb-white/12 scrollbar-thumb-rounded scrollbar-w-1.5">
          <div className="relative min-h-full">
            <div className="bg-transparency-gradiant absolute inset-0" />
            <div className="relative z-10">
              <header className="sticky top-0 z-10 border-b border-card-border-heavy bg-card-background-base px-4 pb-4 pt-7 shadow-heavy md:px-8 md:pb-0 md:pt-8">
                <div className="flex items-center justify-between md:px-4">
                  <Tabs tabs={tabItems} variant="blue" showMobile mobileTitle={T("navbar.contributions")} />

                  <div className="hidden -translate-y-3 lg:block">
                    <ContributionFilter
                      state={filtersState}
                      projects={contributedProjects}
                      repos={contributedRepos}
                      onChange={newState => {
                        setFiltersStorage(JSON.stringify(newState));
                      }}
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
