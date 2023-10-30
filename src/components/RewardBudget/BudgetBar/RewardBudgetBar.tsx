type Props = {
  total: number;
  remaining: number;
  spending: number;
};

const RewardBudgetBar = ({ total, remaining, spending }: Props) => {
  return (
    <div className="relative h-2 w-full overflow-hidden rounded-full bg-spacePurple-200 ">
      <div
        className="absolute inset-y-0 left-0 h-2 rounded-full rounded-br-none rounded-tr-none bg-spacePurple-500"
        style={{
          width: `${Math.floor((remaining / total) * 100)}%`,
        }}
      />
      <div
        className="absolute inset-y-0 left-0 h-2 bg-stripe-pattern"
        style={{
          width: `${Math.floor((spending / total) * 100)}%`,
          left: `${Math.floor((remaining / total) * 100)}%`,
        }}
      />
    </div>
  );
};

export default RewardBudgetBar;
