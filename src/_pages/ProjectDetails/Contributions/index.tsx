import { ComponentProps, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ProjectApi from "src/api/Project";
import CancelCircleLine from "src/assets/icons/CancelCircleLine";
import ProgressCircle from "src/assets/icons/ProgressCircle";
import { ContributionTabContents } from "src/components/Contribution/ContributionTabContents";
import { ContributionTable, TableColumns, type TableSort } from "src/components/Contribution/ContributionTable";
import { Tabs } from "src/components/Tabs/Tabs";
import Flex from "src/components/Utils/Flex";
import { AllTabs, useContributionTabs } from "src/hooks/useContributionTabs";
import { useIntl } from "src/hooks/useIntl";
import CheckboxCircleLine from "src/icons/CheckboxCircleLine";
import StackLine from "src/icons/StackLine";
import Title from "src/_pages/ProjectDetails/Title";
import { ContributionStatus, OrderBy } from "src/types";
import { getOrgsWithUnauthorizedRepos } from "src/utils/getOrgsWithUnauthorizedRepos";
import { useLocalStorage } from "usehooks-ts";
import { MissingGithubAppInstallBanner } from "../Banners/MissingGithubAppInstallBanner";
import { EditProjectButton } from "../components/EditProjectButton";
import { FilterQueryParams, ProjectContributionsFilter, ProjectContributionsFilterRef } from "./Filter";
import { useContributionTable } from "./useContributionTable";
import StillFetchingBanner from "../Banners/StillFetchingBanner";
import { RewardProjectButton } from "../components/RewardProjectButton";

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
  const { projectKey = "" } = useParams<{ projectKey?: string }>();

  const { data: project, isLoading: isLoadingProject } = ProjectApi.queries.useGetProjectBySlug({
    params: { slug: projectKey },
  });

  const orgsWithUnauthorizedRepos = project ? getOrgsWithUnauthorizedRepos(project) : [];
  const hasOrgsWithUnauthorizedRepos = orgsWithUnauthorizedRepos.length > 0;

  const { isActiveTab, updateActiveTab } = useContributionTabs();
  const { headerCells, bodyRow } = useContributionTable();

  const [sortStorage, setSortStorage] = useLocalStorage(
    "project-contributions-table-sort",
    JSON.stringify(initialSort)
  );
  const [sort, setSort] = useState<typeof initialSort>(sortStorage ? JSON.parse(sortStorage) : initialSort);

  const [filterQueryParams, setFilterQueryParams] = useState<FilterQueryParams>();

  const filterRef = useRef<ProjectContributionsFilterRef>(null);

  const tabItems = [
    {
      active: isActiveTab(AllTabs.All),
      onClick: () => {
        updateActiveTab(AllTabs.All);
      },
      testId: "project-contributions-all-contributions-tab",
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
      testId: "project-contributions-in-progress-tab",
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
      testId: "project-contributions-completed-tab",
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
      testId: "project-contributions-canceled-tab",
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
      query: ProjectApi.queries.useProjectContributionsInfiniteList({
        params: {
          projectId: project?.id ?? "",
          queryParams: {
            statuses: ContributionStatus.InProgress,
            ...sort.IN_PROGRESS,
            ...filterQueryParams,
          },
        },
        options: {
          enabled: (isActiveTab(AllTabs.All) || isActiveTab(AllTabs.InProgress)) && Boolean(filterQueryParams),
        },
      }),
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
      query: ProjectApi.queries.useProjectContributionsInfiniteList({
        params: {
          projectId: project?.id ?? "",
          queryParams: {
            statuses: ContributionStatus.Completed,
            ...sort.COMPLETED,
            ...filterQueryParams,
          },
        },
        options: {
          enabled: (isActiveTab(AllTabs.All) || isActiveTab(AllTabs.Completed)) && Boolean(filterQueryParams),
        },
      }),
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
      query: ProjectApi.queries.useProjectContributionsInfiniteList({
        params: {
          projectId: project?.id ?? "",
          queryParams: {
            statuses: ContributionStatus.Cancelled,
            ...sort.CANCELLED,
            ...filterQueryParams,
          },
        },
        options: {
          enabled: (isActiveTab(AllTabs.All) || isActiveTab(AllTabs.Cancelled)) && Boolean(filterQueryParams),
        },
      }),
      filterRef,
    },
  ];

  return (
    <>
      <div className="flex flex-col items-start justify-start gap-4 md:flex-row md:items-center md:justify-between md:gap-2">
        <Title>{T("project.details.contributions.title")}</Title>
        {!hasOrgsWithUnauthorizedRepos ? (
          <Flex className="w-full justify-start gap-2 md:w-auto md:justify-end">
            <EditProjectButton projectKey={projectKey} />
            {project && <RewardProjectButton project={project} />}
          </Flex>
        ) : null}
      </div>

      {!project?.indexingComplete && !isLoadingProject ? <StillFetchingBanner /> : null}

      {project && hasOrgsWithUnauthorizedRepos ? (
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

                  <div className="md:-translate-y-3">
                    <ProjectContributionsFilter
                      onChange={filterQueryParams => setFilterQueryParams(filterQueryParams)}
                      ref={filterRef}
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
