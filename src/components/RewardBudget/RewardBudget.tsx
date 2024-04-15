import { FC, useMemo } from "react";
import { Money } from "utils/Money/Money";

import Button, { ButtonOnBackground } from "src/components/Button";
import { Width } from "src/components/Button";
import { FieldInfoMessage } from "src/components/New/Field/InfoMessage";
import { useIntl } from "src/hooks/useIntl";
import CheckLine from "src/icons/CheckLine";
import InformationLine from "src/icons/InformationLine";
import { cn } from "src/utils/cn";

import { CurrencyBudget } from "components/features/currency/currency-budget/currency-budget";
import { CurrencyConverter } from "components/features/currency/currency-converter/currency-converter";
import { useCurrencyConverter } from "components/features/currency/currency-converter/hooks/use-currency-converter";

import { RewardBudgetProps } from "./RewardBudget.type";
import { RewardBudgetUtils } from "./RewardBudget.utils";

export const RewardBudget: FC<RewardBudgetProps> = props => {
  const { T } = useIntl();

  const { budgets } = props;
  const { currencyAmount, handleSetCurrencyAmount, handleSetCurrencySelection, currencySelection, currencyBudget } =
    useCurrencyConverter({
      budgets,
    });

  const onSelectedBudgetChange = ({ amount, currency }: { amount?: string; currency?: Money.Currency }) => {
    if (!props.onChange) return;
    if (amount) {
      handleSetCurrencyAmount(amount);
      props.onChange({
        amount: parseFloat(amount) || 0,
      });
    }
    if (currency) {
      handleSetCurrencySelection(currency);
      props.onChange({
        currency,
      });
    }
  };

  const withDefaultAmount = useMemo(() => parseFloat(currencyAmount) || 0, [currencyAmount]);

  const canRewards = useMemo(
    () => RewardBudgetUtils.canRewards({ remaining: currencyBudget?.remaining ?? 0, amount: withDefaultAmount }),
    [currencyBudget, withDefaultAmount]
  );

  return (
    <div className="flex w-full flex-col rounded-2xl border border-greyscale-50/8 bg-whiteFakeOpacity-2 shadow-light">
      <div className="flex flex-col p-6 pb-4">
        <CurrencyConverter
          budgets={budgets}
          onChange={onSelectedBudgetChange}
          className="border-b border-b-greyscale-50/8 pb-4"
        />

        <CurrencyBudget selectedBudget={currencyBudget} rewardAmount={currencyAmount} className="pt-4" />
      </div>

      <div className="flex w-full flex-col gap-2 border-t border-t-greyscale-50/8 p-6 pt-4">
        <Button
          width={Width.Full}
          disabled={!canRewards || props.loading}
          htmlType="submit"
          onBackground={ButtonOnBackground.Blue}
        >
          <CheckLine />
          {T("rewardBudget.submit")}
        </Button>
        <FieldInfoMessage
          icon={({ className }) => <InformationLine className={className} />}
          className={cn({
            "items-start": Money.isFiat(currencySelection),
          })}
        >
          {Money.isFiat(currencySelection)
            ? T("currencies.network.label_dollar")
            : T("currencies.network.label", { currency: T(`currencies.network.${currencySelection?.code}`) })}
        </FieldInfoMessage>
      </div>
    </div>
  );
};
