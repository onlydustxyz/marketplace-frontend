import { generatePath, useNavigate, useOutletContext } from "react-router-dom";
import { ProjectRewardsRoutePaths, ProjectRoutePaths, RoutePaths } from "src/App";
import Button, { ButtonSize, Width } from "src/components/Button";
import Card from "src/components/Card";
import ProjectRewardTableFallback from "src/components/ProjectRewardTableFallback";
import RewardTable from "src/components/RewardTable/RewardTable";
import { withTooltip } from "src/components/Tooltip";
import useInfiniteRewardsList from "src/hooks/useInfiniteRewardsList";
import { useIntl } from "src/hooks/useIntl";
import Title from "src/pages/ProjectDetails/Title";
import { ProjectBudgetType, RemainingBudget } from "./RemainingBudget/RemainingBudget";
import { Fields } from "src/components/RewardTable/Headers";
import useQueryParamsSorting from "src/components/RewardTable/useQueryParamsSorting";
import ErrorFallback from "src/ErrorFallback";
import Skeleton from "src/components/Skeleton";

const RewardList: React.FC = () => {
  const { T } = useIntl();
  const navigate = useNavigate();

  const { projectId, projectKey, projectBudget, isBudgetLoading, refetchBudgets } = useOutletContext<{
    projectId: string;
    projectKey: string;
    projectBudget: ProjectBudgetType;
    isBudgetLoading: boolean;
    refetchBudgets: () => void;
  }>();

  const { sorting, sortField, queryParams } = useQueryParamsSorting({ field: Fields.Date, isAscending: false });
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
  const isRewardDisabled = projectBudget?.remainingDollarsEquivalent === 0 || rewards.length === 0;

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
      <div className="flex items-center justify-between">
        <Title>{T("project.details.rewards.title")}</Title>
        <Button
          width={Width.Fit}
          size={ButtonSize.Sm}
          disabled={isRewardDisabled}
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
      </div>
      {!isBudgetLoading && projectBudget ? <RemainingBudget projectBudget={projectBudget} /> : null}
      <div className="flex h-full flex-col-reverse items-start gap-4 xl:flex-row">
        <div className="w-full">
          {rewards.length > 0 ? (
            <Card>
              <RewardTable
                rewards={rewards}
                options={{ fetchNextPage, hasNextPage, sorting, sortField, isFetchingNextPage, refetch, refetchBudgets }}
                projectId={projectId}
              />
            </Card>
          ) : (
            !isRewardsLoading && (
              <Card className="p-16">
                <ProjectRewardTableFallback
                  disabled={
                    projectBudget?.initialDollarsEquivalent === 0 || projectBudget?.remainingDollarsEquivalent === 0
                  }
                />
              </Card>
            )
          )}
        </div>
      </div>
    </>
  ) : null;
};

export default RewardList;
