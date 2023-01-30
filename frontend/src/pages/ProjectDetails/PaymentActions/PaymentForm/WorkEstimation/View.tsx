import classNames from "classnames";
import Button, { ButtonSize, ButtonType, Width } from "src/components/Button";
import Card from "src/components/Card";
import { Steps } from "src/hooks/useWorkEstimation";
import Add from "src/icons/Add";
import Subtract from "src/icons/Subtract";
import { formatMoneyAmount } from "src/utils/money";
import { useT } from "talkr";

interface Props {
  budget: { initialAmount: number; remainingAmount: number };
  submitDisabled: boolean;
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
  submitDisabled,
  stepNumber,
  steps,
}: Props) {
  const { T } = useT();

  return (
    <Card padded={false}>
      <div className={classNames("divide-y divide-greyscale-50/8", "bg-space-card bg-top bg-cover bg-no-repeat")}>
        <div className={classNames("flex flex-col gap-5 items-stretch justify-items-center", "p-8 pb-5 w-full")}>
          <div className="flex flex-row justify-between items-center">
            <div className="font-belwe">
              <span className="text-5xl mr-2">{stepNumber}</span>
              <span className="text-2xl">{T("payment.form.steps." + steps, { count: stepNumber })}</span>{" "}
            </div>
            <div className="flex flex-row gap-3 text-white items-center">
              <div onClick={tryDecreaseNumberOfDays}>
                <Button size={ButtonSize.Small} type={ButtonType.Secondary} disabled={canDecrease}>
                  <div className="absolute top-1">
                    <Subtract />
                  </div>
                </Button>
              </div>
              <div onClick={tryIncreaseNumberOfDays}>
                <Button size={ButtonSize.Small} type={ButtonType.Secondary} disabled={canIncrease}>
                  <div className="absolute top-1">
                    <Add />
                  </div>
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full bg-purple-200 rounded-full h-2">
            <div
              className="bg-stripe-pattern h-full rounded-full"
              style={{
                width: `${Math.floor(
                  ((budget.initialAmount - budget.remainingAmount + amountToPay) * 100) / budget.initialAmount
                )}%`,
              }}
            >
              <div
                className="bg-purple-500 h-full rounded-full"
                style={{
                  width: `${Math.floor(
                    ((budget.initialAmount - budget.remainingAmount) * 100) /
                      (budget.initialAmount - budget.remainingAmount + amountToPay)
                  )}%`,
                }}
              ></div>
            </div>
          </div>
          <div className="flex flex-col text-sm">
            <div className="flex flex-row justify-between">
              <div className="text-greyscale-300">{T("payment.form.totalBudget")}</div>
              <div>{formatMoneyAmount(budget.initialAmount)}</div>
            </div>
            <div className="flex flex-row justify-between">
              <div className="text-greyscale-300">{T("payment.form.thisPayment")}</div>
              <div className="text-purple-500">{formatMoneyAmount(amountToPay)}</div>
            </div>
            <div className="flex flex-row justify-between">
              <div className="text-greyscale-300">{T("payment.form.leftToSpend")}</div>
              <div>{formatMoneyAmount(budget.remainingAmount - amountToPay)}</div>
            </div>
          </div>
        </div>
        {!submitDisabled && (
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
