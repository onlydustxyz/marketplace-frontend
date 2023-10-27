import { FC, useState } from "react";
import { RewardBudgetSelect } from "./RewardBudgetSelect/RewardBudgetSelect";
import { RewardBudgetProps, WorkEstimationBudgetDetails } from "./RewardBudget.type";
import Input from "src/components/FormInput";

// default value order (1) Dollars, (2) Ether, (3) Stark, (4) Optimism, (5) Aptos
// If project has only 1 currency left with non-zero amount, disable the select behaviour and display budget / currency as a non editable input
// Dollar -> Reward granted on the Ethereum network or regular banking system depending on user preferences
// Optimisum
// Etherium
// Aptos
// Starknet
// total spent initial - remaining
// remaining - nouvelle valeurs

export const RewardBudget: FC<RewardBudgetProps> = props => {
  const [selectedBudget, setSelectedBudget] = useState<WorkEstimationBudgetDetails>(props.budgets[0]);

  const onSelectedBudgetChange = (newBudget: WorkEstimationBudgetDetails) => {
    setSelectedBudget(newBudget);
  };

  console.log("selectedBudget", selectedBudget);

  return (
    <div className="flex w-full flex-col rounded-2xl border border-greyscale-50/8 bg-white/5 shadow-light">
      <div className="flex w-full flex-col px-8 pb-2 pt-4">
        <div className="flex w-full">
          <div className="z-50 flex flex-1 flex-row items-center justify-between gap-4">
            <RewardBudgetSelect {...props} value={selectedBudget} onChange={onSelectedBudgetChange} />
            <Input name="budget-amount-input" type="number" value={1} withMargin={false} />
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col border-b-[1px] border-greyscale-50/8 px-8 pb-6 pt-3">Section 2</div>
      <div className="flex w-full flex-col px-6 pb-6 pt-4">Section 3</div>
    </div>
  );
};
