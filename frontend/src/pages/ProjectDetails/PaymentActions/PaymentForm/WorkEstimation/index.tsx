import { useEffect, useState } from "react";
import Card from "src/components/Card";
import { formatMoneyAmount } from "src/utils/money";
import { useT } from "talkr";

export const BASE_RATE_USD = 500;
const DEFAULT_NUMBER_OF_DAYS = 2;

interface Props {
  onChange: (value: number) => void;
  budget: { initialAmount: number; remainingAmount: number };
  submitDisabled: boolean;
}

export default function WorkEstimation({ onChange, budget, submitDisabled }: Props) {
  const { T } = useT();
  const [numberOfDays, setNumberOfDays] = useState(DEFAULT_NUMBER_OF_DAYS);
  const amountToPay = numberOfDays * BASE_RATE_USD;

  useEffect(() => {
    onChange(amountToPay);
  }, [amountToPay]);

  const tryIncreaseNumberOfDays = () => {
    const increment = numberOfDays < 1 ? 0.5 : 1;
    if (numberOfDays < 20 && budget.remainingAmount - (numberOfDays + increment) * BASE_RATE_USD >= 0) {
      setNumberOfDays(numberOfDays + increment);
    }
  };

  const tryDecreaseNumberOfDays = () => {
    if (numberOfDays > 0.5) {
      const decrement = numberOfDays == 1 ? 0.5 : 1;
      setNumberOfDays(numberOfDays - decrement);
    }
  };
  return (
    <Card>
      <div className="flex flex-col gap-10 items-stretch justify-items-center w-full">
        <div className="flex flex-row justify-between items-center">
          <div className="text-3xl">
            <span className="font-walsheim font-black">{numberOfDays}</span> <span>{T("payment.form.days")}</span>
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
