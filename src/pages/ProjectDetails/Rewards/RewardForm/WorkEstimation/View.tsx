import Button, { ButtonSize, ButtonType, Width } from "src/components/Button";
import Card from "src/components/Card";
import { Steps } from "src/hooks/useWorkEstimation";
import Add from "src/icons/Add";
import Subtract from "src/icons/Subtract";
import BudgetBar from "src/pages/ProjectDetails/Rewards/RewardForm/WorkEstimation/BudgetBar";
import { formatMoneyAmount } from "src/utils/money";
import { useT } from "talkr";

interface Props {
  budget: { initialAmount: number; remainingAmount: number };
  requestNewPaymentMutationLoading: boolean;
  canIncrease: boolean;
  canDecrease: boolean;
  amountToPay: number;
  stepNumber: number;
  steps: Steps;
  tryIncreaseNumberOfDays: () => void;
  tryDecreaseNumberOfDays: () => void;
}

export default function WorkEstimation({
  canIncrease,
  canDecrease,
  tryIncreaseNumberOfDays,
  tryDecreaseNumberOfDays,
  budget,
  amountToPay,
  requestNewPaymentMutationLoading,
  stepNumber,
  steps,
}: Props) {
  const { T } = useT();

  return (
    <Card padded={false}>
      <div className="divide-y divide-greyscale-50/8 rounded-2xl bg-space-card bg-cover bg-top bg-no-repeat">
        <div className="flex flex-col items-stretch justify-items-center gap-5 px-8 py-6">
          <div className="flex flex-col gap-1">
            <div className="font-semibold">{T("reward.form.estimate")}</div>
            <div className="flex flex-row items-end justify-between">
              <div className="font-belwe">
                {stepNumber > 0 && <span className="mr-2 text-5xl">{stepNumber}</span>}
                <span className="text-2xl">{T("reward.form.steps." + steps, { count: stepNumber })}</span>{" "}
              </div>
              <div className="flex flex-row items-center gap-3 text-white">
                <div onClick={tryDecreaseNumberOfDays} className="relative">
                  <Button size={ButtonSize.Sm} type={ButtonType.Secondary} disabled={!canDecrease}>
                    <div className="absolute top-1">
                      <Subtract />
                    </div>
                  </Button>
                </div>
                <div onClick={tryIncreaseNumberOfDays} className="relative">
                  <Button size={ButtonSize.Sm} type={ButtonType.Secondary} disabled={!canIncrease}>
                    <div className="absolute top-1">
                      <Add />
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <BudgetBar budget={budget} pendingSpending={amountToPay} />
          <div className="flex flex-col text-sm font-medium">
            <div className="flex flex-row justify-between">
              <div className="text-greyscale-300">{T("reward.form.remainingBudget")}</div>
              <div className="font-semibold">{formatMoneyAmount({ amount: budget.remainingAmount })}</div>
            </div>
            <div className="flex flex-row justify-between">
              <div className="text-greyscale-300">{T("reward.form.thisReward")}</div>
              <div className="font-semibold text-purple-500">{formatMoneyAmount({ amount: amountToPay })}</div>
            </div>
            <div className="flex flex-row justify-between">
              <div className="text-greyscale-300">{T("reward.form.leftToSpend")}</div>
              <div className="font-semibold">{formatMoneyAmount({ amount: budget.remainingAmount - amountToPay })}</div>
            </div>
          </div>
        </div>
        <div className="w-full p-6 pt-5">
          <Button
            htmlType="submit"
            width={Width.Full}
            disabled={requestNewPaymentMutationLoading}
            data-testid="give-reward-button"
          >
            <span>{T("reward.form.confirm")}</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}
