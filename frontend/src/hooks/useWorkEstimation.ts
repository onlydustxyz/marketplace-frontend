import { useCallback, useEffect, useState } from "react";

export const DAY_RATE_USD = 500;
export const DEFAULT_NUMBER_OF_DAYS = 2;
export enum Steps {
  Days = "days",
  Hours = "hours",
}

type Budget = {
  initialAmount: number;
  remainingAmount: number;
};

type State = {
  stepNumber: number;
  steps: Steps;
};

export enum Action {
  Increase,
  Decrease,
}

const maxSteps = {
  [Steps.Days]: 20,
  [Steps.Hours]: 7,
};

const rates = {
  [Steps.Days]: DAY_RATE_USD,
  [Steps.Hours]: DAY_RATE_USD / 8,
};

export const getReducer = (budget: Budget) => (state: State, action: Action) => {
  switch (action) {
    case Action.Increase: {
      let nextState: State = {
        stepNumber: state.stepNumber + 1,
        steps: state.steps,
      };
      if (state.steps === Steps.Hours && state.stepNumber === maxSteps[state.steps]) {
        nextState = {
          stepNumber: 1,
          steps: Steps.Days,
        };
      }
      if (state.steps === Steps.Days && state.stepNumber === maxSteps[state.steps]) {
        nextState = state;
      }
      if (budget.remainingAmount - nextState.stepNumber * rates[state.steps] < 0) {
        nextState = state;
      }

      return nextState;
    }
    case Action.Decrease: {
      let nextState: State = {
        stepNumber: state.stepNumber - 1,
        steps: state.steps,
      };
      if (state.steps === Steps.Days && state.stepNumber === 1) {
        nextState = {
          stepNumber: maxSteps[Steps.Hours],
          steps: Steps.Hours,
        };
      }
      if (state.steps === Steps.Hours && state.stepNumber === 1) {
        nextState = state;
      }
      return nextState;
    }
  }
};

export const useWorkEstimation = (
  onChange: (amount: number) => void,
  budget: { initialAmount: number; remainingAmount: number }
) => {
  const [numberOfDays, setNumberOfDays] = useState(DEFAULT_NUMBER_OF_DAYS);
  const [steps, setSteps] = useState(Steps.Days);
  const amountToPay = numberOfDays * DAY_RATE_USD;

  useEffect(() => {
    onChange(amountToPay);
  }, [amountToPay]);

  const tryIncreaseNumberOfDays = useCallback(() => {
    const increment = numberOfDays < 1 ? 0.5 : 1;
    if (numberOfDays == 0.5) {
      setSteps(Steps.Days);
    }
    if (numberOfDays < 20 && budget.remainingAmount - (numberOfDays + increment) * DAY_RATE_USD >= 0) {
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
