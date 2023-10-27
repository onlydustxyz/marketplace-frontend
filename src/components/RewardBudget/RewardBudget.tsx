import { FC } from "react";
import { components } from "src/__generated/api";
import { RewardBudgetSelect } from "./RewardBudgetSelect";

// default value order (1) Dollars, (2) Ether, (3) Stark, (4) Optimism, (5) Aptos
// If project has only 1 currency left with non-zero amount, disable the select behaviour and display budget / currency as a non editable input
// Dollar -> Reward granted on the Ethereum network or regular banking system depending on user preferences
// Optimisum
// Etherium
// Aptos
// Starknet
// total spent initial - remaining
// remaining - nouvelle valeurs

export type WorkEstimationBudgetDetails = components["schemas"]["BudgetResponse"];

export interface RewardBudgetChangeProps {
  currency: WorkEstimationBudgetDetails["currency"];
  amount: number;
}

export interface RewardBudgetProps {
  budgets: WorkEstimationBudgetDetails[];
  initialDollarsEquivalent?: number;
  remainingDollarsEquivalent?: number;
  onChange?: (props: RewardBudgetChangeProps) => void;
}

export const RewardBudget: FC<RewardBudgetProps> = props => {
  return (
    <div className="flex w-full flex-col rounded-2xl border border-greyscale-50/8 bg-white/5 shadow-light">
      <div className="flex w-full flex-col px-8 pb-2 pt-4">
        <RewardBudgetSelect {...props} />
      </div>
      <div className="flex w-full flex-col border-b-[1px] border-greyscale-50/8 px-8 pb-6 pt-3">Section 2</div>
      <div className="flex w-full flex-col px-6 pb-6 pt-4">Section 3</div>
    </div>
  );
};
