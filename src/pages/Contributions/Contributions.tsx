import { ComponentProps, PropsWithChildren, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useLocalStorage } from "react-use";
import {
  ContributionsBoolExp,
  ContributionsOrderBy,
  GithubRepos,
  OrderBy,
  Projects,
  useGetAllContributionsQuery,
  useGetContributionProjectsAndReposQuery,
} from "src/__generated/graphql";
import CancelCircleLine from "src/assets/icons/CancelCircleLine";
import ProgressCircle from "src/assets/icons/ProgressCircle";
import { ContributionFilter, Filters } from "src/components/Contribution/ContributionFilter";
import { ContributionTable, TableColumns, type TableSort } from "src/components/Contribution/ContributionTable";
import SEO from "src/components/SEO";
import { Tabs } from "src/components/Tabs/Tabs";
import { useAuth } from "src/hooks/useAuth";
import { useIntl } from "src/hooks/useIntl";
import CheckboxCircleLine from "src/icons/CheckboxCircleLine";
import StackLine from "src/icons/StackLine";
import { GithubContributionStatus } from "src/types";
import { isInArray } from "src/utils/isInArray";

enum AllTabs {
  All = "allContributions",
  InProgress = "inProgress",
  Completed = "completed",
  Canceled = "canceled",
}

const tabValues = Object.values(AllTabs);

function TabContents({ children }: PropsWithChildren) {
  return <div className="flex items-center gap-2 md:gap-1.5">{children}</div>;
}

const initialSort: Record<GithubContributionStatus, TableSort> = {
  [GithubContributionStatus.InProgress]: {
    column: TableColumns.Date,
    direction: OrderBy.Desc,
    orderBy: { createdAt: OrderBy.Desc },
  },
  [GithubContributionStatus.Completed]: {
    column: TableColumns.Date,
    direction: OrderBy.Desc,
    orderBy: { closedAt: OrderBy.Desc },
  },
  [GithubContributionStatus.Canceled]: {
    column: TableColumns.Date,
    direction: OrderBy.Desc,
    orderBy: { closedAt: OrderBy.Desc },
  },
};

export default function Contributions() {
  const { T } = useIntl();
  const { githubUserId } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortStorage, setSortStorage] = useLocalStorage("contributions-table-sort", JSON.stringify(initialSort));
  const [sort, setSort] = useState(sortStorage ? (JSON.parse(sortStorage) as typeof initialSort) : initialSort);

  const filtersState = useState<Filters>({ types: [], projects: [], repos: [] });
  const [{ types, projects, repos }] = filtersState;
  const projectIds = projects.map(({ id }) => id);
  const repoIds = repos.map(({ id }) => id);

  const tab = searchParams.get("tab") as typeof tabValues[number] | null;

  const [activeTab, setActiveTab] = useState(isInArray(tabValues, tab ?? "") ? tab : AllTabs.All);

  function tableWhere({ status }: { status: GithubContributionStatus }) {
    return {
      githubUserId: { _eq: githubUserId },
      projectId: { _in: projectIds.length ? projectIds : undefined },
      repoId: { _in: repoIds.length ? repoIds : undefined },
      status: { _eq: status },
      type: { _in: types.length ? types : undefined },
    };
  }

  function filterWhere() {
    return {
      githubUserId: { _eq: githubUserId },
      projectId: { _in: projects.length ? projects.map(({ id }) => id) : undefined },
      repoId: { _in: repos.length ? repos.map(({ id }) => id) : undefined },
    };
  }

  const {
    data: inProgressData,
    loading: inProgressLoading,
    error: inProgressError,
  } = useGetAllContributionsQuery({
    variables: {
      orderBy: sort[GithubContributionStatus.InProgress].orderBy as ContributionsOrderBy,
      where: tableWhere({ status: GithubContributionStatus.InProgress }) as ContributionsBoolExp,
    },
    skip: !githubUserId || (!isActiveTab(AllTabs.All) && !isActiveTab(AllTabs.InProgress)),
    fetchPolicy: "network-only", // Used for first execution
    nextFetchPolicy: "cache-first", // Used for subsequent executions
  });

  const {
    data: completedData,
    loading: completedLoading,
    error: completedError,
  } = useGetAllContributionsQuery({
    variables: {
      orderBy: sort[GithubContributionStatus.Completed].orderBy as ContributionsOrderBy,
      where: tableWhere({ status: GithubContributionStatus.Completed }) as ContributionsBoolExp,
    },
    skip: !githubUserId || (!isActiveTab(AllTabs.All) && !isActiveTab(AllTabs.Completed)),
    fetchPolicy: "network-only", // Used for first execution
    nextFetchPolicy: "cache-first", // Used for subsequent executions
  });

  const {
    data: canceledData,
    loading: canceledLoading,
    error: canceledError,
  } = useGetAllContributionsQuery({
    variables: {
      orderBy: sort[GithubContributionStatus.Canceled].orderBy as ContributionsOrderBy,
      where: tableWhere({ status: GithubContributionStatus.Canceled }) as ContributionsBoolExp,
    },
    skip: !githubUserId || (!isActiveTab(AllTabs.All) && !isActiveTab(AllTabs.Canceled)),
    fetchPolicy: "network-only", // Used for first execution
    nextFetchPolicy: "cache-first", // Used for subsequent executions
  });

  const { data: projectsAndReposData } = useGetContributionProjectsAndReposQuery({
    variables: { where: filterWhere() as ContributionsBoolExp },
    skip: !githubUserId,
  });

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
      active: isActiveTab(AllTabs.Canceled),
      onClick: () => {
        updateActiveTab(AllTabs.Canceled);
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

  const tableItems: Array<ComponentProps<typeof ContributionTable> & { show: boolean }> = [
    {
      id: "in_progress_contributions_table",
      title: T("contributions.inProgress.title"),
      description: T("contributions.inProgress.description"),
      icon: className => <ProgressCircle className={className} />,
      onHeaderClick: () => {
        updateActiveTab(AllTabs.InProgress);
      },
      data: inProgressData,
      loading: inProgressLoading,
      error: inProgressError,
      status: GithubContributionStatus.InProgress,
      show: isActiveTab(AllTabs.All) || isActiveTab(AllTabs.InProgress),
      sort: sort[GithubContributionStatus.InProgress],
      onSort: sort => {
        setSort(prevState => {
          const state = { ...prevState, [GithubContributionStatus.InProgress]: sort };

          setSortStorage(JSON.stringify(state));

          return state;
        });
      },
    },
    {
      id: "completed_contributions_table",
      title: T("contributions.completed.title"),
      description: T("contributions.completed.description"),
      icon: className => <CheckboxCircleLine className={className} />,
      onHeaderClick: () => {
        updateActiveTab(AllTabs.Completed);
      },
      data: completedData,
      loading: completedLoading,
      error: completedError,
      status: GithubContributionStatus.Completed,
      sort: sort[GithubContributionStatus.Completed],
      onSort: sort => {
        setSort(prevState => {
          const state = { ...prevState, [GithubContributionStatus.Completed]: sort };

          setSortStorage(JSON.stringify(state));

          return state;
        });
      },
      show: isActiveTab(AllTabs.All) || isActiveTab(AllTabs.Completed),
    },
    {
      id: "canceled_contributions_table",
      title: T("contributions.canceled.title"),
      description: T("contributions.canceled.description"),
      icon: className => <CancelCircleLine className={className} />,
      onHeaderClick: () => {
        updateActiveTab(AllTabs.Canceled);
      },
      data: canceledData,
      loading: canceledLoading,
      error: canceledError,
      status: GithubContributionStatus.Canceled,
      sort: sort[GithubContributionStatus.Canceled],
      onSort: sort => {
        setSort(prevState => {
          const state = { ...prevState, [GithubContributionStatus.Canceled]: sort };

          setSortStorage(JSON.stringify(state));

          return state;
        });
      },
      show: isActiveTab(AllTabs.All) || isActiveTab(AllTabs.Canceled),
    },
  ];

  const filterProjectsAndRepos = useMemo(() => {
    let projects: Projects[] = [];
    let repos: GithubRepos[] = [];

    if (!projectsAndReposData) {
      return { projects, repos };
    }

    // Merge all contributions
    const flatContributions = projectsAndReposData.contributions.flat();

    // All unique projects
    projects = [
      ...new Map(flatContributions.map(({ project }) => project).map(project => [project?.id, project])).values(),
    ] as Projects[];

    // All unique repos
    repos = [
      ...new Map(
        flatContributions.map(({ githubRepo }) => githubRepo).map(githubRepo => [githubRepo?.id, githubRepo])
      ).values(),
    ] as GithubRepos[];

    return { projects, repos };
  }, [projectsAndReposData]);

  return (
    <>
      <SEO />
      <div className="h-full overflow-y-auto px-6 pb-6">
        <div className="h-full w-full overflow-y-auto rounded-3xl bg-contributions bg-right-top bg-no-repeat scrollbar-thin scrollbar-thumb-white/12 scrollbar-thumb-rounded scrollbar-w-1.5">
          <div className="relative min-h-full">
            <div className="absolute inset-0 bg-gradient-to-b from-[#000113]/[0] to-[#0E0D2E]" />
            <div className="relative z-10">
              <header className="sticky top-0 z-10 border-b border-greyscale-50/20 bg-whiteFakeOpacity-8 px-4 pb-4 pt-7 shadow-2xl backdrop-blur-3xl md:px-8 md:pb-0 md:pt-8">
                <div className="flex items-center justify-between md:px-4">
                  <Tabs tabs={tabItems} variant="blue" mobileTitle={T("navbar.contributions")} />

                  <div className="hidden -translate-y-3 lg:block">
                    <ContributionFilter
                      state={filtersState}
                      projects={filterProjectsAndRepos.projects}
                      repos={filterProjectsAndRepos.repos}
                      loading={inProgressLoading || completedLoading || canceledLoading}
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
