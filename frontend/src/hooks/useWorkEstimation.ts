import { useCallback, useEffect, useState } from "react";

export const BASE_RATE_USD = 500;
export const DEFAULT_NUMBER_OF_DAYS = 2;
export enum Steps {
  Days = "days",
  Hours = "hours",
}

export const useWorkEstimation = (
  onChange: (amount: number) => void,
  budget: { initialAmount: number; remainingAmount: number }
) => {
  const [numberOfDays, setNumberOfDays] = useState(DEFAULT_NUMBER_OF_DAYS);
  const [steps, setSteps] = useState(Steps.Days);
  const amountToPay = numberOfDays * BASE_RATE_USD;

  useEffect(() => {
    onChange(amountToPay);
  }, [amountToPay]);

  const tryIncreaseNumberOfDays = useCallback(() => {
    const increment = numberOfDays < 1 ? 0.5 : 1;
    if (numberOfDays == 0.5) {
      setSteps(Steps.Days);
    }
    if (numberOfDays < 20 && budget.remainingAmount - (numberOfDays + increment) * BASE_RATE_USD >= 0) {
      setNumberOfDays(numberOfDays + increment);
    }
  }, [numberOfDays, budget]);

  const tryDecreaseNumberOfDays = useCallback(() => {
    if (numberOfDays > 0.5) {
      const decrement = numberOfDays == 1 ? 0.5 : 1;
      if (numberOfDays == 1) {
        setSteps(Steps.Hours);
      }
      setNumberOfDays(numberOfDays - decrement);
    }
  }, [numberOfDays, budget]);

  return {
    amountToPay,
    numberOfDays,
    tryIncreaseNumberOfDays,
    tryDecreaseNumberOfDays,
    steps,
  };
};
