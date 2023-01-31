type Props = {
  budget: { initialAmount: number; remainingAmount: number };
  pendingSpending: number;
  displayPendingSpending: boolean;
};

const BudgetBar = ({ budget, pendingSpending, displayPendingSpending }: Props) => {
  return (
    <div className="w-full bg-purple-200 rounded-full h-2 relative overflow-hidden">
      {displayPendingSpending && (
        <div
          className="bg-stripe-pattern h-2 rounded-full absolute inset-y-0 left-0"
          style={{
            width: `${Math.floor(
              ((budget.initialAmount - budget.remainingAmount + pendingSpending) * 100) / budget.initialAmount
            )}%`,
          }}
        />
      )}
      <div
        className="bg-purple-500 h-2 rounded-full absolute inset-y-0 left-0"
        style={{
          width: `${Math.floor(((budget.initialAmount - budget.remainingAmount) * 100) / budget.initialAmount)}%`,
        }}
      />
    </div>
  );
};

export default BudgetBar;
