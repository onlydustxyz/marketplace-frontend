import { useWorkEstimation } from "src/hooks/useWorkEstimation";
import View from "./View";

interface Props {
  onChange: (amountToPay: number, hoursWorked: number) => void;
  budget: { initialAmount: number; remainingAmount: number };
  missingContributor: boolean;
  missingWorkItem: boolean;
}

export default function WorkEstimation({ onChange, budget, missingContributor, missingWorkItem }: Props) {
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
        missingContributor,
        missingWorkItem,
      }}
    />
  );
}
