import { ProjectReactQueryAdapter } from "core/application/react-query-adapter/project";
import { useParams } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { Money } from "utils/Money/Money";

import ErrorFallback from "src/ErrorFallback";
import Title from "src/_pages/ProjectDetails/Title";
import ProjectApi from "src/api/Project";
import { IMAGES } from "src/assets/img";
import Card from "src/components/Card";
import { FilterPosition } from "src/components/New/Filter/DesktopView";
import { Fields } from "src/components/RewardTable/Headers";
import RewardTable from "src/components/RewardTable/RewardTable";
import useQueryParamsSorting from "src/components/RewardTable/useQueryParamsSorting";
import Skeleton from "src/components/Skeleton";
import Flex from "src/components/Utils/Flex";
import { getOrgsWithUnauthorizedRepos } from "src/utils/getOrgsWithUnauthorizedRepos";

import { PosthogOnMount } from "components/features/posthog/components/posthog-on-mount/posthog-on-mount";
import { EmptyState } from "components/layout/placeholders/empty-state/empty-state";

import { useIntl } from "hooks/translate/use-translate";

import { MissingGithubAppInstallBanner } from "../Banners/MissingGithubAppInstallBanner";
import StillFetchingBanner from "../Banners/StillFetchingBanner";
import { EditProjectButton } from "../components/EditProjectButton";
import { RewardProjectButton } from "../components/RewardProjectButton";
import { Budget } from "./Budget/Budget";
import { FilterQueryParams, Filters, ProjectRewardsFilter, ProjectRewardsFilterRef } from "./Filter";

const RewardList: React.FC = () => {
  const { T } = useIntl();
  const { slug = "" } = useParams<{ slug: string }>();
  const filterRef = useRef<ProjectRewardsFilterRef>(null);
  const { data: project, isLoading: isLoadingProject } = ProjectApi.queries.useGetProjectBySlug({
    params: { slug },
  });

  const [filterQueryParams, setFilterQueryParams] = useState<FilterQueryParams>();
  const [filterState, setFilterState] = useState<Partial<Filters>>({});
  const onFilterChange = (filterQueryParams: FilterQueryParams, filters: Partial<Filters>) => {
    setFilterQueryParams(filterQueryParams);
    setFilterState(filters);
  };

  const { sorting, sortField, queryParams } = useQueryParamsSorting({
    field: Fields.Date,
    isAscending: false,
    storageKey: "projectRewardsSorting-v2",
  });

  const {
    data,
    isLoading: isRewardsLoading,
    fetchNextPage,
    hasNextPage,
    error,
    isFetchingNextPage,
    refetch,
  } = ProjectReactQueryAdapter.client.useGetProjectRewards({
    pathParams: { projectId: project?.id ?? "" },
    queryParams: {
      ...(queryParams as Record<string, string>),
      ...filterQueryParams,
    },
    options: {
      enabled: !!project?.id,
    },
  });

  const rewards = data?.pages.flatMap(page => page.rewards) || [];
  const orgsWithUnauthorizedRepos = project ? getOrgsWithUnauthorizedRepos(project) : [];
  const hasOrgsWithUnauthorizedRepos = orgsWithUnauthorizedRepos.length > 0;

  const budget = {
    remainingBudget: data?.pages[0].remainingBudget,
    spentAmount: data?.pages[0].spentAmount,
    sentRewards: {
      count: data?.pages[0].sentRewardsCount,
      total: data?.pages[0].rewardedContributionsCount,
    },
    rewardedContributorsCount: data?.pages[0].rewardedContributorsCount,
  };

  const hasActiveFilters = !!filterRef?.current?.hasActiveFilters;

  const emptyFallback = useMemo(() => {
    if (project && rewards?.length === 0) {
      if (hasActiveFilters) {
        return (
          <EmptyState
            illustrationSrc={IMAGES.global.payment}
            title={{ token: "project.details.tableFallback.withFilter.title" }}
            description={{ token: "project.details.tableFallback.withFilter.message" }}
            actionLabel={{ token: "project.details.tableFallback.withFilter.buttonLabel" }}
            onAction={filterRef.current?.reset}
          />
        );
      }
      return (
        <EmptyState
          illustrationSrc={IMAGES.global.payment}
          title={{ token: "project.details.tableFallback.noRewards" }}
          description={{ token: "project.details.tableFallback.send" }}
        />
      );
    }
    return null;
  }, [hasActiveFilters, filterRef, project, rewards]);

  const getFilteredCurrencies = useMemo(() => {
    if (filterState.currency) {
      return filterState.currency
        .map(({ value, label, image }) =>
          Money.fromSchema({ id: value, name: label?.toString(), logoUrl: image || undefined })
        )
        .filter(Boolean) as Money.Currency[];
    }

    return undefined;
  }, [filterState.currency]);

  if (error) {
    return <ErrorFallback error={error} />;
  }

  return (
    <>
      <PosthogOnMount eventName={"project_reward_list_viewed"} />

      <div className="flex flex-col items-start justify-start gap-4 md:flex-row md:items-center md:justify-between md:gap-2">
        <Flex className="z-10 gap-8">
          <Title>{T("project.details.rewards.title")}</Title>
          <ProjectRewardsFilter onChange={onFilterChange} position={FilterPosition.Left} ref={filterRef} />
        </Flex>
        {!hasOrgsWithUnauthorizedRepos && project ? (
          <Flex className="w-full justify-start gap-2 md:w-auto md:justify-end">
            <EditProjectButton projectKey={slug} />
            <RewardProjectButton project={project} />
          </Flex>
        ) : null}
      </div>

      {project && !project?.indexingComplete ? <StillFetchingBanner /> : null}

      {hasOrgsWithUnauthorizedRepos ? (
        <MissingGithubAppInstallBanner slug={slug} orgs={orgsWithUnauthorizedRepos} />
      ) : null}

      {isRewardsLoading || isLoadingProject ? (
        <Skeleton variant="projectRewards" />
      ) : (
        <>
          {project ? <Budget {...budget} filteredCurrencies={getFilteredCurrencies} projectId={project.id} /> : null}
          <div className="flex h-full flex-col-reverse items-start gap-4 xl:flex-row">
            <div className="w-full">
              {(project && rewards?.length > 0) || (hasActiveFilters && project) ? (
                <Card>
                  <RewardTable
                    emptyFallback={emptyFallback}
                    rewards={rewards}
                    options={{
                      fetchNextPage,
                      hasNextPage,
                      sorting,
                      sortField,
                      isFetchingNextPage,
                      refetch,
                    }}
                    projectId={project.id}
                  />
                </Card>
              ) : !isRewardsLoading && !!project ? (
                <Card className="p-16">{emptyFallback}</Card>
              ) : null}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default RewardList;
