import { useCallback, useEffect, useMemo, useReducer } from "react";
import { BudgetCurrencyType } from "src/utils/money";

export const DAY_RATE_USD = 500;
export const DEFAULT_NUMBER_OF_DAYS = 2;
export enum Steps {
  Days = "days",
  Hours = "hours",
}

export type Budget = {
  currency: BudgetCurrencyType;
  initialAmount: number;
  initialDollarsEquivalent?: number;
  remaining: number;
  remainingDollarsEquivalent?: number;
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

export const hours = {
  [Steps.Days]: maxSteps[Steps.Hours] + 1,
  [Steps.Hours]: 1,
};

export const rates = {
  [Steps.Days]: DAY_RATE_USD,
  [Steps.Hours]: DAY_RATE_USD / hours[Steps.Days],
};

export const stepSizes = {
  [Steps.Days]: 0.5,
  [Steps.Hours]: 1,
};

export const getInitialStep = (budget: Budget): State => {
  if (budget?.remainingAmount < DAY_RATE_USD) {
    return {
      stepNumber: Math.floor(budget?.remainingAmount / rates[Steps.Hours]),
      steps: Steps.Hours,
    };
  }

  return {
    stepNumber: Math.min(DEFAULT_NUMBER_OF_DAYS, Math.floor(budget?.remainingAmount / rates[Steps.Days])),
    steps: Steps.Days,
  };
};

export const getReducer = (budget: Budget) => (state: State, action: Action) => {
  switch (action) {
    case Action.Increase: {
      let nextState: State = {
        stepNumber: state.stepNumber + stepSizes[state.steps],
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
      if (budget?.remainingAmount - nextState.stepNumber * rates[state.steps] < 0) {
        nextState = state;
      }

      return nextState;
    }
    case Action.Decrease: {
      let nextState: State = {
        stepNumber: state.stepNumber - stepSizes[state.steps],
        steps: state.steps,
      };
      if (state.steps === Steps.Days && state.stepNumber === 1) {
        nextState = {
          stepNumber: maxSteps[Steps.Hours],
          steps: Steps.Hours,
        };
      }
      if (state.steps === Steps.Hours && state.stepNumber <= 1) {
        nextState = state;
      }
      return nextState;
    }
  }
};

export const useWorkEstimation = (
  onChange: (amountToPay: number, currency: BudgetCurrencyType) => void,
  budget: {
    currency: BudgetCurrencyType;
    initialAmount: number;
    initialDollarsEquivalent?: number;
    remaining: number;
    remainingDollarsEquivalent?: number;
  }
) => {
  const reducer = useMemo(() => getReducer(budget), [budget]);
  const initialStep = useMemo(() => getInitialStep(budget), [budget]);
  const [estimationState, dispatch] = useReducer(reducer, initialStep);
  const { stepNumber, steps } = estimationState;

  const amountToPay = useMemo(() => Math.ceil(stepNumber * rates[steps]), [stepNumber, steps]);
  const hoursWorked = useMemo(() => Math.ceil(stepNumber * hours[steps]), [stepNumber, steps]);

  useEffect(() => {
    onChange(amountToPay, budget.currency);
  }, [amountToPay, hoursWorked]);

  const canDecrease = useMemo(() => steps === Steps.Days || stepNumber > 1, [steps, stepNumber]);

  const canIncrease = useMemo(
    () =>
      (stepNumber + stepSizes[steps]) * rates[steps] <=
      Math.min(budget?.remainingAmount, maxSteps[Steps.Days] * rates[Steps.Days]),
    [steps, stepNumber]
  );

  const tryIncreaseNumberOfDays = useCallback(() => dispatch(Action.Increase), []);
  const tryDecreaseNumberOfDays = useCallback(() => dispatch(Action.Decrease), []);

  return {
    amountToPay,
    stepNumber,
    tryIncreaseNumberOfDays,
    tryDecreaseNumberOfDays,
    steps,
    canDecrease,
    canIncrease,
  };
};
