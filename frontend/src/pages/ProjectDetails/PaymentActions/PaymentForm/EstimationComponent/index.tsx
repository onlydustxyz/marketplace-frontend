import headerElementBackground from "src/assets/img/header-element-background.png";
import Card from "src/components/Card";
import { useT } from "talkr";

export const BASE_RATE_USD = 500;

interface EstimationComponentProps {
  numberOfDays: number;
  decreaseNumberOfDays: () => void;
  increaseNumberOfDays: () => void;
  budget: { initialAmount: number; remainingAmount: number };
}

export default function EstimationComponent({
  numberOfDays,
  decreaseNumberOfDays,
  increaseNumberOfDays,
  budget,
}: EstimationComponentProps) {
  const amountToPay = numberOfDays * BASE_RATE_USD;
  const { T } = useT();
  return (
    <Card backgroundImageUrl={headerElementBackground}>
      <div className="flex flex-col gap-10 items-stretch justify-items-center">
        <div className="flex flex-row justify-between items-center">
          <div className="text-3xl">
            <span className="font-walsheim font-black">{numberOfDays}</span> <span>days</span>
          </div>
          <div className="flex flex-row gap-3 text-white items-center">
            <div className="border rounded-xl w-fit py-2 px-4 hover:cursor-pointer" onClick={decreaseNumberOfDays}>
              -
            </div>
            <div className="border rounded-xl w-fit py-2 px-4 hover:cursor-pointer" onClick={increaseNumberOfDays}>
              +
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
            <div>Total budget</div>
            <div>$ {budget.initialAmount}</div>
          </div>
          <div className="flex flex-row justify-between">
            <div>This payment</div>
            <div>$ {amountToPay}</div>
          </div>
          <div className="flex flex-row justify-between">
            <div>Left to spend</div>
            <div>$ {budget.remainingAmount - amountToPay}</div>
          </div>
        </div>
        <button type="submit" className=" border-white border-2 px-3 py-2 rounded-md bg-neutral-50 text-black">
          {T("payment.form.confirm")}
        </button>
      </div>
    </Card>
  );
}
