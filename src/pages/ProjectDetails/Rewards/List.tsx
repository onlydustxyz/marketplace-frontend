import { Suspense } from "react";
import { useOutletContext } from "react-router-dom";
import { ExtendedPaymentRequestFragment } from "src/__generated/graphql";
import Button, { ButtonSize, Width } from "src/components/Button";
import Card from "src/components/Card";
import Loader from "src/components/Loader";
import ProjectRewardTableFallback from "src/components/ProjectRewardTableFallback";
import RewardTable from "src/components/RewardTable/RewardTable";
import { withTooltip } from "src/components/Tooltip";
import { useIntl } from "src/hooks/useIntl";
import { Sortable } from "src/types";
import Title from "src/pages/ProjectDetails/Title";
import { useRestfulData } from "src/hooks/useRestfulData/useRestfulData";
import { RemainingBudget } from "./RemainingBudget/RemainingBudget";

const RewardList: React.FC = () => {
  const { T } = useIntl();

  const { projectId, rewards } = useOutletContext<{
    projectId: string;
    rewards: (ExtendedPaymentRequestFragment & Sortable)[];
  }>();

  const { data: projectBudget, isLoading } = useRestfulData({
    resourcePath: `/api/v1/projects/${projectId}/budgets`,
    method: "GET",
  });

  const isRewardDisabled = projectBudget?.remainingDollarsEquivalent === 0 || rewards.length === 0;

  return (
    <>
      <div className="flex items-center justify-between">
        <Title>{T("project.details.rewards.title")}</Title>
        <Button
          width={Width.Fit}
          size={ButtonSize.Sm}
          className="m-w-[200px]"
          disabled={isRewardDisabled}
          {...withTooltip(T("contributor.table.noBudgetLeft"), {
            visible: isRewardDisabled,
          })}
        >
          <span>{T("project.details.remainingBudget.newReward")}</span>
        </Button>
      </div>
      {!isLoading && projectBudget ? <RemainingBudget projectBudget={projectBudget} /> : null}
      <div className="flex h-full flex-col-reverse items-start gap-4 xl:flex-row">
        <div className="w-full">
          {rewards.length > 0 ? (
            <Card>
              <Suspense fallback={<Loader />}>
                <RewardTable rewards={rewards} projectId={projectId} />
              </Suspense>
            </Card>
          ) : (
            <Card className="p-16">
              <ProjectRewardTableFallback
                disabled={
                  projectBudget.initialDollarsEquivalent === 0 || projectBudget.remainingDollarsEquivalent === 0
                }
              />
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default RewardList;
