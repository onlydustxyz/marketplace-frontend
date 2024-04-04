import { Listbox } from "@headlessui/react";
import { FC, useMemo } from "react";

import { WorkEstimationBudgetDetails } from "src/components/RewardBudget/RewardBudget.type";

import { RewardBudgetSelectOption } from "./RewardBudgetSelectOption";
import { RewardBudgetSelectValue } from "./RewardBudgetSelectValue";

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
          <Listbox.Options className="absolute left-0 top-full w-auto min-w-full translate-y-1 overflow-hidden rounded-2xl border border-greyscale-50/12 bg-greyscale-900 shadow-heavy">
            <div className="scrollbar-sm max-h-[240px] w-auto min-w-full overflow-y-auto overflow-x-hidden">
              {budgets.map((budget, i) => (
                <RewardBudgetSelectOption
                  key={budget.currency.id}
                  budget={budget}
                  last={i === budgets.length - 1}
                  active={value.currency.id === budget.currency.id}
                />
              ))}
            </div>
          </Listbox.Options>
        </div>
      )}
    </Listbox>
  );
};
