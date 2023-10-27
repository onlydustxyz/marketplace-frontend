import { useWorkEstimation } from "src/hooks/useWorkEstimation";
import View from "./View";
import { ProjectBudgetType } from "src/pages/ProjectDetails/Rewards/RemainingBudget/RemainingBudget";
import { BudgetCurrencyType } from "src/utils/money";

interface Props {
  onChange: (amountToPay: number, currency: BudgetCurrencyType) => void;
  budget: ProjectBudgetType;
  requestNewPaymentMutationLoading: boolean;
  preferredCurrency: BudgetCurrencyType | null;
}

export default function WorkEstimation({
  onChange,
  budget,
  requestNewPaymentMutationLoading,
  preferredCurrency,
}: Props) {
  const [selectedBudget] = preferredCurrency
    ? budget.budgets.filter(b => b.currency === preferredCurrency)
    : budget.budgets;

  const { amountToPay, stepNumber, steps, tryDecreaseNumberOfDays, tryIncreaseNumberOfDays, canDecrease, canIncrease } =
    useWorkEstimation(onChange, selectedBudget);

  return (
    <View
      {...{
        amountToPay,
        canIncrease,
        canDecrease,
        stepNumber,
        steps,
        tryDecreaseNumberOfDays,
        tryIncreaseNumberOfDays,
        budget: selectedBudget,
        requestNewPaymentMutationLoading,
      }}
    />
  );
}
