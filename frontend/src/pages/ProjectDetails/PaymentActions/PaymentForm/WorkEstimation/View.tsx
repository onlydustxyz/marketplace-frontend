import classNames from "classnames";
import Button, { ButtonSize, ButtonType, Width } from "src/components/Button";
import Card from "src/components/Card";
import { Steps } from "src/hooks/useWorkEstimation";
import Add from "src/icons/Add";
import Subtract from "src/icons/Subtract";
import BudgetBar from "src/pages/ProjectDetails/PaymentActions/PaymentForm/WorkEstimation/BudgetBar";
import { formatMoneyAmount } from "src/utils/money";
import { useT } from "talkr";

interface Props {
  budget: { initialAmount: number; remainingAmount: number };
  disabled: boolean;
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
  disabled,
  stepNumber,
  steps,
}: Props) {
  const { T } = useT();

  return (
    <Card padded={false}>
      <div
        className={classNames("divide-y divide-greyscale-50/8", "bg-space-card bg-top bg-no-repeat rounded-2xl", {
          "bg-cover": disabled,
          "bg-contain 2xl:bg-cover": !disabled,
        })}
      >
        <div className={classNames("flex flex-col gap-5 items-stretch justify-items-center", "p-8 pb-5 w-full")}>
          {!disabled && (
            <div className="flex flex-col gap-1">
              <div className="font-semibold">{T("payment.form.estimate")}</div>
              <div className="flex flex-row justify-between items-end">
                <div className="font-belwe">
                  {stepNumber > 0 && <span className="text-5xl mr-2">{stepNumber}</span>}
                  <span className="text-2xl">{T("payment.form.steps." + steps, { count: stepNumber })}</span>{" "}
                </div>
                <div className="flex flex-row gap-3 text-white items-center">
                  <div onClick={tryDecreaseNumberOfDays}>
                    <Button size={ButtonSize.Small} type={ButtonType.Secondary} disabled={!canDecrease}>
                      <div className="absolute top-1">
                        <Subtract />
                      </div>
                    </Button>
                  </div>
                  <div onClick={tryIncreaseNumberOfDays}>
                    <Button size={ButtonSize.Small} type={ButtonType.Secondary} disabled={!canIncrease}>
                      <div className="absolute top-1">
                        <Add />
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {disabled && <div className="font-semibold text-center mt-2 mb-5 px-2">{T("payment.form.disabled")}</div>}
          <BudgetBar budget={budget} pendingSpending={amountToPay} displayPendingSpending={!disabled} />
          <div className="flex flex-col text-sm font-medium">
            <div className="flex flex-row justify-between">
              <div className="text-greyscale-300">{T("payment.form.remainingBudget")}</div>
              <div className="font-semibold">{formatMoneyAmount(budget.remainingAmount)}</div>
            </div>
            {!disabled && (
              <>
                <div className="flex flex-row justify-between">
                  <div className="text-greyscale-300">{T("payment.form.thisPayment")}</div>
                  <div className="text-purple-500 font-semibold">{formatMoneyAmount(amountToPay)}</div>
                </div>
                <div className="flex flex-row justify-between">
                  <div className="text-greyscale-300">{T("payment.form.leftToSpend")}</div>
                  <div className="font-semibold">{formatMoneyAmount(budget.remainingAmount - amountToPay)}</div>
                </div>
              </>
            )}
          </div>
        </div>
        {!disabled && (
          <div className="p-6 pt-5 w-full">
            <Button htmlType="submit" width={Width.Full}>
              <span>{T("payment.form.confirm")}</span>
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
