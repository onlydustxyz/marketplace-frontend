import { useWorkEstimation } from "src/hooks/useWorkEstimation";
import View from "./View";

interface Props {
  onChange: (value: number) => void;
  budget: { initialAmount: number; remainingAmount: number };
  submitDisabled: boolean;
}

export default function WorkEstimation({ onChange, budget, submitDisabled }: Props) {
  const { amountToPay, stepNumber, steps, tryDecreaseNumberOfDays, tryIncreaseNumberOfDays } = useWorkEstimation(
    onChange,
    budget
  );
  return (
    <View
      {...{ amountToPay, stepNumber, steps, tryDecreaseNumberOfDays, tryIncreaseNumberOfDays, budget, submitDisabled }}
    />
  );
}
