import { useIntl } from "src/hooks/useIntl";

interface RemainingBudgetProps {
  remainingAmount: number;
  initialAmount: number;
}

export default function RemainingBudget({ remainingAmount, initialAmount }: RemainingBudgetProps) {
  const { T } = useIntl();
  return (
    <div className="flex flex-col">
      <div>{T("project.remainingBudget")}</div>
      <div className="flex flex-row items-center space-x-3 md:flex-nowrap flex-wrap">
        <div className="text-xl font-black">${remainingAmount}</div>
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{
              width: `${Math.floor((remainingAmount * 100) / initialAmount)}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
