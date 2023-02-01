import { useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useWorkEstimation } from "src/hooks/useWorkEstimation";
import View from "./View";

interface Props {
  onChange: (value: number) => void;
  budget: { initialAmount: number; remainingAmount: number };
}

export default function WorkEstimation({ onChange, budget }: Props) {
  const { amountToPay, stepNumber, steps, tryDecreaseNumberOfDays, tryIncreaseNumberOfDays, canDecrease, canIncrease } =
    useWorkEstimation(onChange, budget);
  const {
    formState: {
      errors: { contributorHandle: contributorHandleError },
    },
  } = useFormContext();
  const contributorId = useWatch({ name: "contributorId" });
  const linkToIssue = useWatch({ name: "linkToIssue" });

  const disabled = useMemo(
    () => !!contributorHandleError || !contributorId || !linkToIssue,
    [contributorHandleError, contributorId, linkToIssue]
  );
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
        disabled,
      }}
    />
  );
}
