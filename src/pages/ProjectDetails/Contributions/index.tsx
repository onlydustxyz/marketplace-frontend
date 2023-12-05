import { ComponentProps, PropsWithChildren, useState } from "react";
import { generatePath, useNavigate, useOutletContext, useSearchParams } from "react-router-dom";
import { ProjectRewardsRoutePaths, ProjectRoutePaths, RoutePaths } from "src/App";
import { OrderBy } from "src/__generated/graphql";
import MeApi from "src/api/me";
import CancelCircleLine from "src/assets/icons/CancelCircleLine";
import ProgressCircle from "src/assets/icons/ProgressCircle";
import Button, { ButtonOnBackground, ButtonSize, Width } from "src/components/Button";
import { Filters } from "./Filter";
import { ContributionTable, TableColumns, TableSort } from "src/components/Contribution/ContributionTable";
import { Tabs } from "src/components/Tabs/Tabs";
import { withTooltip } from "src/components/Tooltip";
import Flex from "src/components/Utils/Flex";
import { useIntl } from "src/hooks/useIntl";
import CheckboxCircleLine from "src/icons/CheckboxCircleLine";
import StackLine from "src/icons/StackLine";
import Title from "src/pages/ProjectDetails/Title";
import { ContributionStatus } from "src/types";
import { getOrgsWithUnauthorizedRepos } from "src/utils/getOrgsWithUnauthorizedRepos";
import { isInArray } from "src/utils/isInArray";
import { useLocalStorage } from "usehooks-ts";
import { OutletContext } from "../View";
import { EditProjectButton } from "../components/EditProjectButton";
import { Filter } from "./Filter";
import { MissingGithubAppInstallBanner } from "../Banners/MissingGithubAppInstallBanner";
import { useProjectLeader } from "src/hooks/useProjectLeader/useProjectLeader";

enum AllTabs {
  All = "ALL_CONTRIBUTIONS",
  InProgress = "IN_PROGRESS",
  Completed = "COMPLETED",
  Cancelled = "CANCELLED",
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
  dateRange: { from: undefined, to: undefined },
  repos: [],
  contributors: [],
  types: [],
};

export default function Contributions() {
  const { T } = useIntl();
  const navigate = useNavigate();

  const { project } = useOutletContext<OutletContext>();
  const { slug: projectKey } = project;

  const remainingBudget = project?.remainingUsdBudget;
  const isRewardDisabled = !remainingBudget;
  const orgsWithUnauthorizedRepos = getOrgsWithUnauthorizedRepos(project);
  const hasOrgsWithUnauthorizedRepos = orgsWithUnauthorizedRepos.length > 0;
  const isProjectLeader = useProjectLeader({ id: project.id });

  // -------------------

  const [searchParams, setSearchParams] = useSearchParams();
  const [sortStorage, setSortStorage] = useLocalStorage(
    "project-contributions-table-sort",
    JSON.stringify(initialSort)
  );
  const [sort, setSort] = useState<typeof initialSort>(sortStorage ? JSON.parse(sortStorage) : initialSort);

  const [filtersStorage, setFiltersStorage] = useLocalStorage(
    "project-contributions-table-filters",
    JSON.stringify(initialFilters)
  );
  const filtersState = useState<Filters>(filtersStorage ? JSON.parse(filtersStorage) : initialFilters);
  const [{ types, repos }] = filtersState;

  const repoIds = repos.map(({ id }) => String(id));

  const filterQueryParams = {
    types: types.join(","),
    projects: "",
    repositories: repoIds.join(","),
  };

  const tab = searchParams.get("tab") as typeof tabValues[number] | null;

  const [activeTab, setActiveTab] = useState(isInArray(tabValues, tab ?? "") ? tab : AllTabs.All);

  const { data: reposData } = MeApi.queries.useMyContributedRepos({
    params: { projects: "" },
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
      queryProps: [
        {
          queryParams: {
            statuses: ContributionStatus.InProgress,
            ...sort.IN_PROGRESS,
            ...filterQueryParams,
          },
        },
      ],
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
      queryProps: [
        {
          queryParams: {
            statuses: ContributionStatus.Completed,
            ...sort.COMPLETED,
            ...filterQueryParams,
          },
        },
      ],
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
      queryProps: [
        {
          queryParams: {
            statuses: ContributionStatus.Cancelled,
            ...sort.CANCELLED,
            ...filterQueryParams,
          },
        },
      ],
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between">
        <Title>{T("project.details.contributions.title")}</Title>
        {!hasOrgsWithUnauthorizedRepos ? (
          <Flex className="gap-2">
            <EditProjectButton projectKey={projectKey} />
            <Button
              width={Width.Fit}
              size={ButtonSize.Sm}
              disabled={isRewardDisabled}
              onBackground={ButtonOnBackground.Blue}
              onClick={() => {
                return navigate(
                  generatePath(
                    `${RoutePaths.ProjectDetails}/${ProjectRoutePaths.Rewards}/${ProjectRewardsRoutePaths.New}`,
                    {
                      projectKey,
                    }
                  )
                );
              }}
              {...withTooltip(T("contributor.table.noBudgetLeft"), {
                visible: isRewardDisabled,
              })}
            >
              <span>{T("project.details.remainingBudget.newReward")}</span>
            </Button>
          </Flex>
        ) : null}
      </div>
      {isProjectLeader && hasOrgsWithUnauthorizedRepos ? (
        <MissingGithubAppInstallBanner slug={project.slug} orgs={orgsWithUnauthorizedRepos} />
      ) : null}
      <div className="h-full overflow-y-auto">
        <div className="h-full w-full overflow-y-auto rounded-3xl bg-contributions bg-right-top bg-no-repeat scrollbar-thin scrollbar-thumb-white/12 scrollbar-thumb-rounded scrollbar-w-1.5">
          <div className="relative min-h-full">
            <div className="bg-transparency-gradiant absolute inset-0" />
            <div className="relative z-10">
              <header className="sticky top-0 z-10 border-b border-card-border-heavy bg-card-background-base px-4 pb-4 pt-7 shadow-heavy md:pb-0 md:pt-8">
                <div className="flex items-center justify-between md:px-4">
                  <Tabs tabs={tabItems} variant="blue" showMobile mobileTitle={T("navbar.contributions")} />

                  <div className="hidden -translate-y-3 lg:block">
                    <Filter
                      state={filtersState}
                      repos={contributedRepos}
                      onChange={newState => {
                        setFiltersStorage(JSON.stringify(newState));
                      }}
                    />
                  </div>
                </div>
              </header>
              <div className="flex flex-col gap-4 px-2 py-3 md:px-3 md:py-6">
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
