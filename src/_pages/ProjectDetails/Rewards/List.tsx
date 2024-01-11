import { useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import ErrorFallback from "src/ErrorFallback";
import Title from "src/_pages/ProjectDetails/Title";
import ProjectApi from "src/api/Project";
import Card from "src/components/Card";
import { FilterPosition } from "src/components/New/Filter/DesktopView";
import ProjectRewardTableFallback from "src/components/ProjectRewardTableFallback";
import { Fields } from "src/components/RewardTable/Headers";
import RewardTable from "src/components/RewardTable/RewardTable";
import useQueryParamsSorting from "src/components/RewardTable/useQueryParamsSorting";
import Skeleton from "src/components/Skeleton";
import Flex from "src/components/Utils/Flex";
import useInfiniteRewardsList from "src/hooks/useInfiniteRewardsList";
import { useIntl } from "src/hooks/useIntl";
import { getOrgsWithUnauthorizedRepos } from "src/utils/getOrgsWithUnauthorizedRepos";

import { MissingGithubAppInstallBanner } from "../Banners/MissingGithubAppInstallBanner";
import StillFetchingBanner from "../Banners/StillFetchingBanner";
import { EditProjectButton } from "../components/EditProjectButton";
import { RewardProjectButton } from "../components/RewardProjectButton";
import { Budget } from "./Budget/Budget";
import { FilterQueryParams, ProjectRewardsFilter, ProjectRewardsFilterRef } from "./Filter";

const RewardList: React.FC = () => {
  const { T } = useIntl();
  const { projectKey = "" } = useParams<{ projectKey: string }>();
  const filterRef = useRef<ProjectRewardsFilterRef>(null);
  const { data: project, isLoading: isLoadingProject } = ProjectApi.queries.useGetProjectBySlug({
    params: { slug: projectKey },
  });

  const [filterQueryParams, setFilterQueryParams] = useState<FilterQueryParams>();

  const { sorting, sortField, queryParams } = useQueryParamsSorting({
    field: Fields.Date,
    isAscending: false,
    storageKey: "projectRewardsSorting",
  });

  const {
    data,
    isLoading: isRewardsLoading,
    fetchNextPage,
    hasNextPage,
    error,
    isFetchingNextPage,
    refetch,
  } = useInfiniteRewardsList({
    projectId: project?.id || "",
    enabled: !!project?.id,
    queryParams: {
      ...(queryParams as URLSearchParams),
      ...filterQueryParams,
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

  const emptyFallback = useMemo(
    () =>
      project && rewards?.length === 0 ? (
        <ProjectRewardTableFallback
          project={project}
          activeFilter={hasActiveFilters}
          activeFilterButtonEvent={filterRef.current?.reset}
        />
      ) : null,
    [hasActiveFilters, filterRef, project, rewards]
  );

  if (error) {
    return <ErrorFallback />;
  }

  return (
    <>
      <div className="flex flex-col items-start justify-start gap-4 md:flex-row md:items-center md:justify-between md:gap-2">
        <Flex className="z-10 gap-8">
          <Title>{T("project.details.rewards.title")}</Title>
          <ProjectRewardsFilter onChange={setFilterQueryParams} position={FilterPosition.Left} ref={filterRef} />
        </Flex>
        {!hasOrgsWithUnauthorizedRepos && project ? (
          <Flex className="w-full justify-start gap-2 md:w-auto md:justify-end">
            <EditProjectButton projectKey={projectKey} />
            <RewardProjectButton project={project} />
          </Flex>
        ) : null}
      </div>

      {project && !project?.indexingComplete ? <StillFetchingBanner /> : null}

      {hasOrgsWithUnauthorizedRepos ? (
        <MissingGithubAppInstallBanner slug={projectKey} orgs={orgsWithUnauthorizedRepos} />
      ) : null}

      {isRewardsLoading || isLoadingProject ? (
        <Skeleton variant="projectRewards" />
      ) : (
        <>
          <Budget {...budget} />
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
