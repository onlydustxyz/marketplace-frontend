import { FC, useMemo } from "react";
import { Money } from "utils/Money/Money";

import Button, { ButtonOnBackground } from "src/components/Button";
import { Width } from "src/components/Button";
import { FieldInfoMessage } from "src/components/New/Field/InfoMessage";
import { useIntl } from "src/hooks/useIntl";
import CheckLine from "src/icons/CheckLine";
import InformationLine from "src/icons/InformationLine";
import { cn } from "src/utils/cn";

import { CurrencyConverter } from "components/features/currency/currency-converter/currency-converter";
import { TCurrencyConverter } from "components/features/currency/currency-converter/currency-converter.types";
import { UseCurrencyConverter } from "components/features/currency/currency-converter/hooks/use-currency-converter";
import { ProjectBudget } from "components/features/project-budget/project-budget";

import { RewardBudgetProps } from "./RewardBudget.type";
import { RewardBudgetUtils } from "./RewardBudget.utils";

export const RewardBudget: FC<RewardBudgetProps> = props => {
  const { T } = useIntl();

  const { budgets } = props;

  const { currencyAmount, handleSetCurrencyAmount, handleSetCurrencySelection, currencySelection, currencyBudget } =
    UseCurrencyConverter({
      budgets,
    });

  const onSelectedBudgetChange = (value: TCurrencyConverter.CurrencyAmount) => {
    console.log({ value, currency: currencyBudget?.currency.code });
    handleSetCurrencyAmount(value.amount);
    handleSetCurrencySelection(value.currency);
    const amount = parseFloat(value.amount) || 0;
    if (
      props.onChange &&
      currencyBudget?.remaining &&
      currencyBudget?.remaining > 0 &&
      currencyBudget?.remaining - amount >= 0
    ) {
      props.onChange({
        amount: parseFloat(value.amount),
        currency: value.currency,
      });
    }
  };

  const withDefaultAmount = useMemo(() => parseFloat(currencyAmount) || 0, [currencyAmount]);

  const canRewards = useMemo(
    () => RewardBudgetUtils.canRewards({ remaining: currencyBudget?.remaining ?? 0, amount: withDefaultAmount }),
    [currencyBudget, withDefaultAmount]
  );

  return (
    <div className="flex w-full flex-col gap-3 rounded-2xl border border-greyscale-50/8 bg-whiteFakeOpacity-2 p-8 shadow-light">
      <CurrencyConverter budgets={budgets} onChange={onSelectedBudgetChange} />

      <ProjectBudget selectedBudget={currencyBudget} rewardAmount={currencyAmount} />

      <div className="flex w-full flex-col gap-2">
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
