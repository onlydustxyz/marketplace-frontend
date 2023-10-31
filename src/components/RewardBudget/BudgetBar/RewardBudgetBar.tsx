import { useMemo } from "react";
import { RewardBudgetUtils } from "src/components/RewardBudget/RewardBudget.utils";

type Props = {
  total: number;
  remaining: number;
  spending: number;
};

const RewardBudgetBar = ({ total, remaining, spending }: Props) => {
  const progression = useMemo(
    () => RewardBudgetUtils.getBudgetProgression({ total, remaining, spending }),
    [total, remaining, spending]
  );

  console.log("BAR", { total, remaining, spending });

  console.log("PRO", progression, `${progression.remaining}%`);

  return (
    <div className="relative h-2 w-full overflow-hidden rounded-full bg-spacePurple-200 ">
      <div
        className="absolute inset-y-0 left-0 h-2 rounded-full rounded-br-none rounded-tr-none bg-spacePurple-500"
        style={{
          width: `${progression.remaining}%`,
        }}
      />
      <div
        className="absolute inset-y-0 left-0 h-2 bg-stripe-pattern"
        style={{
          width: `${progression.spending}%`,
          left: `${progression.remaining}%`,
        }}
      />
    </div>
  );
};

export default RewardBudgetBar;
