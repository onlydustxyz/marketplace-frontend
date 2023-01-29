import classNames from "classnames";
import Card from "src/components/Card";
import { Steps } from "src/hooks/useWorkEstimation";
import { formatMoneyAmount } from "src/utils/money";
import { useT } from "talkr";

interface Props {
  budget: { initialAmount: number; remainingAmount: number };
  submitDisabled: boolean;
  amountToPay: number;
  stepNumber: number;
  steps: Steps;
  tryIncreaseNumberOfDays: () => void;
  tryDecreaseNumberOfDays: () => void;
}

export default function WorkEstimation({
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
      <div
        className={classNames(
          "flex flex-col gap-10 items-stretch justify-items-center",
          "p-6 w-full",
          "bg-space-card bg-top bg-contain bg-no-repeat"
        )}
      >
        <div className="flex flex-row justify-between items-center">
          <div className="text-3xl">
            <span className="font-walsheim font-black">{T("payment.form.steps." + steps, { count: stepNumber })}</span>
          </div>
          <div className="flex flex-row gap-3 text-white items-center">
            <div className="border rounded-xl w-fit py-2 px-4 hover:cursor-pointer" onClick={tryDecreaseNumberOfDays}>
              {T("payment.form.decrease")}
            </div>
            <div className="border rounded-xl w-fit py-2 px-4 hover:cursor-pointer" onClick={tryIncreaseNumberOfDays}>
              {T("payment.form.increase")}
            </div>
          </div>
        </div>
        <div className="w-full bg-purple-400 rounded-full h-3">
          <div
            className="bg-purple-600 h-3 rounded-full"
            style={{
              width: `${Math.floor(
                ((budget.initialAmount - budget.remainingAmount + amountToPay) * 100) / budget.initialAmount
              )}%`,
            }}
          >
            <div
              className="bg-purple-800 h-3 rounded-full"
              style={{
                width: `${Math.floor(
                  ((budget.initialAmount - budget.remainingAmount) * 100) /
                    (budget.initialAmount - budget.remainingAmount + amountToPay)
                )}%`,
              }}
            ></div>
          </div>
        </div>
        <div className="flex flex-col gap-3 font-medium">
          <div className="flex flex-row justify-between">
            <div>{T("payment.form.totalBudget")}</div>
            <div>{formatMoneyAmount(budget.initialAmount)}</div>
          </div>
          <div className="flex flex-row justify-between">
            <div>{T("payment.form.thisPayment")}</div>
            <div className="text-purple-600">{formatMoneyAmount(amountToPay)}</div>
          </div>
          <div className="flex flex-row justify-between">
            <div>{T("payment.form.leftToSpend")}</div>
            <div>{formatMoneyAmount(budget.remainingAmount - amountToPay)}</div>
          </div>
        </div>
        <button
          type="submit"
          disabled={submitDisabled}
          className=" border-white border-2 px-3 py-2 rounded-md bg-neutral-50 text-black"
        >
          {T("payment.form.confirm")}
        </button>
      </div>
    </Card>
  );
}
