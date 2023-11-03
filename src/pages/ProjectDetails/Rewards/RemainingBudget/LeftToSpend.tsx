import { useMemo } from "react";
import { useIntl } from "src/hooks/useIntl";

type LeftToSpendProps = {
  budget: { initialAmount: number; remaining: number };
};

export function LeftToSpend({ budget }: LeftToSpendProps) {
  const { T } = useIntl();
  const leftToSpend = useMemo(
    () => (budget.initialAmount ? (budget.remaining / budget.initialAmount) * 100 : 0),
    [budget]
  );

  const leftToSpendFormated = useMemo(() => {
    if (leftToSpend < 1 || leftToSpend > 99) {
      return leftToSpend.toFixed(1);
    }
    return Math.round(leftToSpend);
  }, [leftToSpend]);

  return (
    <div className="flex shrink-0 text-sm text-white">
      {leftToSpendFormated}% {T("project.details.remainingBudget.leftToSpend")}
    </div>
  );
}
