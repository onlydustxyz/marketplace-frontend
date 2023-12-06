import { generatePath, useNavigate, useOutletContext } from "react-router-dom";
import { ProjectRewardsRoutePaths, ProjectRoutePaths, RoutePaths } from "src/App";
import ErrorFallback from "src/ErrorFallback";
import Button, { ButtonOnBackground, ButtonSize, Width } from "src/components/Button";
import Card from "src/components/Card";
import ProjectRewardTableFallback from "src/components/ProjectRewardTableFallback";
import { Fields } from "src/components/RewardTable/Headers";
import RewardTable from "src/components/RewardTable/RewardTable";
import useQueryParamsSorting from "src/components/RewardTable/useQueryParamsSorting";
import Skeleton from "src/components/Skeleton";
import { withTooltip } from "src/components/Tooltip";
import Flex from "src/components/Utils/Flex";
import useInfiniteRewardsList from "src/hooks/useInfiniteRewardsList";
import { useIntl } from "src/hooks/useIntl";
import Title from "src/pages/ProjectDetails/Title";
import { getOrgsWithUnauthorizedRepos } from "src/utils/getOrgsWithUnauthorizedRepos";
import { MissingGithubAppInstallBanner } from "../Banners/MissingGithubAppInstallBanner";
import StillFetchingBanner from "../Banners/StillFetchingBanner";
import { EditProjectButton } from "../components/EditProjectButton";
import { ProjectBudgetType, RemainingBudget } from "./RemainingBudget/RemainingBudget";

const RewardList: React.FC = () => {
  const { T } = useIntl();
  const navigate = useNavigate();

  const { project, projectBudget, isBudgetLoading, refetchBudgets } = useOutletContext<{
    project: Parameters<typeof getOrgsWithUnauthorizedRepos>[0];
    projectBudget: ProjectBudgetType;
    isBudgetLoading: boolean;
    refetchBudgets: () => void;
  }>();

  const { id: projectId, slug: projectKey } = project;

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
    projectId,
    queryParams,
  });

  const rewards = data?.pages.flatMap(page => page.rewards) || [];
  const isRewardDisabled = !projectBudget?.remainingDollarsEquivalent;
  const orgsWithUnauthorizedRepos = getOrgsWithUnauthorizedRepos(project);
  const hasOrgsWithUnauthorizedRepos = orgsWithUnauthorizedRepos.length > 0;

  if (error) {
    return <ErrorFallback />;
  }

  if (isRewardsLoading) {
    return (
      <>
        <div className="max-w-[15%]">
          <Skeleton variant="counter" />
        </div>
        <Skeleton variant="contributorList" />
      </>
    );
  }

  return rewards ? (
    <>
      <div className="flex flex-col items-start justify-start gap-4 md:flex-row md:items-center md:justify-between md:gap-2">
        <Title>{T("project.details.rewards.title")}</Title>
        {!hasOrgsWithUnauthorizedRepos ? (
          <Flex className="w-full justify-start gap-2 md:w-auto md:justify-end">
            <EditProjectButton projectKey={projectKey} />
            <Button
              width={Width.Fit}
              className="flex-1 md:flex-initial"
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
      {!project.indexingComplete ? <StillFetchingBanner /> : null}
      {hasOrgsWithUnauthorizedRepos ? (
        <MissingGithubAppInstallBanner slug={projectKey} orgs={orgsWithUnauthorizedRepos} />
      ) : null}
      {!isBudgetLoading && projectBudget ? <RemainingBudget projectBudget={projectBudget} /> : null}
      <div className="flex h-full flex-col-reverse items-start gap-4 xl:flex-row">
        <div className="w-full">
          {rewards.length > 0 ? (
            <Card>
              <RewardTable
                rewards={rewards}
                options={{
                  fetchNextPage,
                  hasNextPage,
                  sorting,
                  sortField,
                  isFetchingNextPage,
                  refetch,
                  refetchBudgets,
                }}
                projectId={projectId}
              />
            </Card>
          ) : (
            !isRewardsLoading && (
              <Card className="p-16">
                <ProjectRewardTableFallback disabled={isRewardDisabled} />
              </Card>
            )
          )}
        </div>
      </div>
    </>
  ) : null;
};

export default RewardList;
