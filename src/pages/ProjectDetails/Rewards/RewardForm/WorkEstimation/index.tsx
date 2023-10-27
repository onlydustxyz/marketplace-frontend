import { useWorkEstimation } from "src/hooks/useWorkEstimation";
import View from "./View";
import { ProjectBudgetType } from "src/pages/ProjectDetails/Rewards/RemainingBudget/RemainingBudget";

interface Props {
  onChange: (amountToPay: number, hoursWorked: number) => void;
  budget: ProjectBudgetType;
  requestNewPaymentMutationLoading: boolean;
}

export default function WorkEstimation({ onChange, budget, requestNewPaymentMutationLoading }: Props) {
  //TODO: currency handling logic here
  const { amountToPay, stepNumber, steps, tryDecreaseNumberOfDays, tryIncreaseNumberOfDays, canDecrease, canIncrease } =
    useWorkEstimation(onChange, budget);

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
        budget,
        requestNewPaymentMutationLoading,
      }}
    />
  );
}
