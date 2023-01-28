import Card from "src/components/Card";
import { formatMoneyAmount } from "src/utils/money";
import { useT } from "talkr";

export const BASE_RATE_USD = 500;

interface Props {
  numberOfDays: number;
  decreaseNumberOfDays: () => void;
  increaseNumberOfDays: () => void;
  budget: { initialAmount: number; remainingAmount: number };
  submitDisabled: boolean;
}

export default function WorkEstimation({
  numberOfDays,
  decreaseNumberOfDays,
  increaseNumberOfDays,
  budget,
  submitDisabled,
}: Props) {
  const amountToPay = numberOfDays * BASE_RATE_USD;
  const { T } = useT();
  return (
    <Card>
      <div className="flex flex-col gap-10 items-stretch justify-items-center w-full">
        <div className="flex flex-row justify-between items-center">
          <div className="text-3xl">
            <span className="font-walsheim font-black">{numberOfDays}</span> <span>{T("payment.form.days")}</span>
          </div>
          <div className="flex flex-row gap-3 text-white items-center">
            <div className="border rounded-xl w-fit py-2 px-4 hover:cursor-pointer" onClick={decreaseNumberOfDays}>
              {T("payment.form.decrease")}
            </div>
            <div className="border rounded-xl w-fit py-2 px-4 hover:cursor-pointer" onClick={increaseNumberOfDays}>
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
