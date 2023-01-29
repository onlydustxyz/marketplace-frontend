import { useEffect, useState } from "react";
import View from "./View";

export const BASE_RATE_USD = 500;
const DEFAULT_NUMBER_OF_DAYS = 2;

interface Props {
  onChange: (value: number) => void;
  budget: { initialAmount: number; remainingAmount: number };
  submitDisabled: boolean;
}

export default function WorkEstimation({ onChange, budget, submitDisabled }: Props) {
  const [numberOfDays, setNumberOfDays] = useState(DEFAULT_NUMBER_OF_DAYS);
  const amountToPay = numberOfDays * BASE_RATE_USD;

  useEffect(() => {
    onChange(amountToPay);
  }, [amountToPay]);

  const tryIncreaseNumberOfDays = () => {
    const increment = numberOfDays < 1 ? 0.5 : 1;
    if (numberOfDays < 20 && budget.remainingAmount - (numberOfDays + increment) * BASE_RATE_USD >= 0) {
      setNumberOfDays(numberOfDays + increment);
    }
  };

  const tryDecreaseNumberOfDays = () => {
    if (numberOfDays > 0.5) {
      const decrement = numberOfDays == 1 ? 0.5 : 1;
      setNumberOfDays(numberOfDays - decrement);
    }
  };
  return (
    <View
      {...{ amountToPay, numberOfDays, tryDecreaseNumberOfDays, tryIncreaseNumberOfDays, budget, submitDisabled }}
    />
  );
}
