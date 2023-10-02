import { useWorkEstimation } from "src/hooks/useWorkEstimation";
import View from "./View";

interface Props {
  onChange: (amountToPay: number, hoursWorked: number) => void;
  budget: { initialAmount: number; remainingAmount: number };
  requestNewPaymentMutationLoading: boolean;
}

export default function WorkEstimation({ onChange, budget, requestNewPaymentMutationLoading }: Props) {
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
