type Props = {
  totalSpent: number;
  remaining: number;
  spending: number;
};

// const BudgetBar = ({ totalSpent, remaining, spending }: Props) => {
//   return (
//     <div className="relative h-2 w-full overflow-hidden rounded-full bg-spacePurple-200 ">
//       <div
//         className="absolute inset-y-0 left-0 h-2 rounded-full bg-stripe-pattern"
//         style={{
//           width: `${Math.floor(
//             ((budget.initialAmount - budget.remaining + pendingSpending) * 100) / budget.initialAmount
//           )}%`,
//         }}
//       />
//       <div
//         className="absolute inset-y-0 left-0 h-2 rounded-full bg-spacePurple-500"
//         style={{
//           width: `${Math.floor(((budget.initialAmount - budget.remaining) * 100) / budget.initialAmount)}%`,
//         }}
//       />
//     </div>
//   );
// };

const BudgetBar = () => {
  return <></>;
};

export default BudgetBar;
