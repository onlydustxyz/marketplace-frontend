type Props = {
  budget: { initialAmount: number; remainingAmount: number };
  pendingSpending: number;
  displayPendingSpending: boolean;
};

const BudgetBar = ({ budget, pendingSpending }: Props) => {
  return (
    <div className="w-full bg-purple-200 rounded-full h-2">
      <div
        className="bg-stripe-pattern h-full rounded-full"
        style={{
          width: `${Math.floor(
            ((budget.initialAmount - budget.remainingAmount + pendingSpending) * 100) / budget.initialAmount
          )}%`,
        }}
      >
        <div
          className="bg-purple-500 h-full rounded-full"
          style={{
            width: `${Math.floor(
              ((budget.initialAmount - budget.remainingAmount) * 100) /
                (budget.initialAmount - budget.remainingAmount + pendingSpending)
            )}%`,
          }}
        />
      </div>
    </div>
  );
};

export default BudgetBar;
