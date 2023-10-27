import { CurrencyIcons } from "src/components/Currency/CurrencyIcon";
import { WorkEstimationBudgetDetails } from "src/components/RewardBudget/RewardBudget.type";
import { useIntl } from "src/hooks/useIntl";
import { Currency } from "src/types";
import { formatMoneyAmount } from "src/utils/money";

interface RewardBudgetDetailsProps {
  budget: WorkEstimationBudgetDetails;
  amount: number;
  initialDollarsEquivalent?: number;
  remainingDollarsEquivalent?: number;
}

const RewardBudgetDetails = ({ budget, amount }: RewardBudgetDetailsProps) => {
  const { T } = useIntl();

  return (
    <div className="flex flex-col items-start justify-start gap-1">
      <div className="flex flex-row items-center justify-between gap-1">
        <p className="font-walsheim text-sm text-greyscale-300">{T("rewardBudget.detail.remaining")}</p>
        <div className="flex flex-row items-center justify-end gap-1">
          <p>
            {budget.remainingDollarsEquivalent && (
              <span className="font-walsheim text-[10px] font-normal text-spaceBlue-200">
                {`~${formatMoneyAmount({ amount: budget.remainingDollarsEquivalent, currency: Currency.USD })}`}
              </span>
            )}
            &nbsp;
            <span className="font-walsheim text-sm font-normal">
              {formatMoneyAmount({
                amount: budget.remaining,
                currency: budget.currency,
                showCurrency: false,
              })}
            </span>
          </p>
          <CurrencyIcons currency={budget.currency} className="h-2 w-2" />
        </div>
      </div>
    </div>
  );
};

export default RewardBudgetDetails;
