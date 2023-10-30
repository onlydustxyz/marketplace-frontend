import { FC, useMemo } from "react";
import { Listbox } from "@headlessui/react";
import { RewardBudgetSelectOption } from "./RewardBudgetSelectOption";
import { RewardBudgetSelectValue } from "./RewardBudgetSelectValue";
import { WorkEstimationBudgetDetails } from "src/components/RewardBudget/RewardBudget.type";

export interface RewardBudgetSelectProps {
  budgets: WorkEstimationBudgetDetails[];
  value: WorkEstimationBudgetDetails;
  onChange: (value: WorkEstimationBudgetDetails) => void;
}

export const RewardBudgetSelect: FC<RewardBudgetSelectProps> = ({ budgets, onChange, value }) => {
  const disabled = useMemo(() => budgets.filter(b => b.remaining > 0).length === 1, []);

  const handleSelectChange = (value: WorkEstimationBudgetDetails) => {
    onChange(value);
  };

  return (
    <Listbox value={value} onChange={handleSelectChange} disabled={disabled}>
      {({ value }) => (
        <div className="relative flex-1">
          <RewardBudgetSelectValue value={value} disabled={disabled} />
          <Listbox.Options className="absolute left-0 top-full  w-full translate-y-1 overflow-hidden rounded-2xl border border-greyscale-50/12 bg-greyscale-900 shadow-heavy">
            <div className="max-h-[144px] w-full overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-white/12 scrollbar-thumb-rounded scrollbar-w-1.5">
              {budgets.map((budget, i) => (
                <RewardBudgetSelectOption key={budget.currency} budget={budget} last={i === budgets.length - 1} />
              ))}
            </div>
          </Listbox.Options>
        </div>
      )}
    </Listbox>
  );
};
