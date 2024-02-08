import { ProgressBar } from "components/ds/progress-bar/progress-bar";

import { TAmountCounter } from "./amount-counter.types";

export function AmountCounter({ children }: TAmountCounter.Props) {
  return <ProgressBar maxValue={1000} value={100} />;
}
