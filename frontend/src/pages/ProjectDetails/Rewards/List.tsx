import { Suspense } from "react";
import { useOutletContext } from "react-router-dom";
import Card from "src/components/Card";
import Loader from "src/components/Loader";
import RewardTable from "src/components/RewardTable";
import ProjectRewardTableFallback from "src/components/ProjectRewardTableFallback";
import { useIntl } from "src/hooks/useIntl";
import RemainingBudget from "src/pages/ProjectDetails/Rewards/RemainingBudget";
import { Sortable } from "src/types";
import { ExtendedPaymentRequestFragment } from "src/__generated/graphql";
import Title from "src/pages/ProjectDetails/Title";

const RewardList: React.FC = () => {
  const { projectId, rewards, budget } = useOutletContext<{
    projectId: string;
    rewards: (ExtendedPaymentRequestFragment & Sortable)[];
    budget: { initialAmount: number; remainingAmount: number };
  }>();

  const { T } = useIntl();

  return (
    <>
      <Title>{T("project.details.rewards.title")}</Title>
      <div className="flex h-full flex-col-reverse items-start gap-4 xl:flex-row">
        <div className="flex w-full basis-2/3">
          {rewards.length > 0 ? (
            <Card>
              <Suspense fallback={<Loader />}>
                <RewardTable rewards={rewards} projectId={projectId} />
              </Suspense>
            </Card>
          ) : (
            <Card className="p-16">
              <ProjectRewardTableFallback disabled={budget.initialAmount === 0 || budget.remainingAmount === 0} />
            </Card>
          )}
        </div>
        <div className="flex w-full basis-1/3">
          <RemainingBudget budget={budget} disabled={budget.remainingAmount === 0 || rewards.length === 0} />
        </div>
      </div>
    </>
  );
};

export default RewardList;
