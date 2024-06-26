import { FC, useMemo } from "react";
import { Money } from "utils/Money/Money";

import { FieldInfoMessage } from "src/components/New/Field/InfoMessage";
import CheckLine from "src/icons/CheckLine";
import InformationLine from "src/icons/InformationLine";
import { cn } from "src/utils/cn";

import { Button } from "components/ds/button/button";
import { Card } from "components/ds/card/card";
import { Tooltip } from "components/ds/tooltip/tooltip";
import { CurrencyBudget } from "components/features/currency/currency-budget/currency-budget";
import { CurrencyConverter } from "components/features/currency/currency-converter/currency-converter";
import { TCurrencyConverter } from "components/features/currency/currency-converter/currency-converter.types";
import { useCurrencyConverter } from "components/features/currency/currency-converter/hooks/use-currency-converter";
import { Translate } from "components/layout/translate/translate";

import { useIntl } from "hooks/translate/use-translate";

import { RewardBudgetProps } from "./RewardBudget.type";
import { RewardBudgetUtils } from "./RewardBudget.utils";

export const RewardBudget: FC<RewardBudgetProps> = props => {
  const { T } = useIntl();

  const { budgets, loading } = props;
  const {
    currencyAmount,
    handleSetCurrencyAmount,
    handleSetUsdValue,
    handleSetCurrencySelection,
    currencySelection,
    currencyBudget,
  } = useCurrencyConverter({
    budgets,
  });

  const onSelectedBudgetChange = ({ amount, amountInDollars, currency }: TCurrencyConverter.CurrencyAmount) => {
    if (!props.onChange) return;
    if (amount || amount === "") {
      handleSetCurrencyAmount(amount);
      props.onChange({
        amount: parseFloat(amount) || 0,
      });
    }
    if (amountInDollars || amountInDollars === "") {
      handleSetUsdValue(amountInDollars);
      props.onChange({
        amountInDollars: parseFloat(amountInDollars) || 0,
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
    <Card background="base" hasPadding={false}>
      <div className="flex flex-col p-8 pb-4">
        <CurrencyConverter
          budgets={budgets}
          onChange={onSelectedBudgetChange}
          className="border-b border-b-greyscale-50/8 pb-4"
        />
        <CurrencyBudget selectedBudget={currencyBudget} rewardAmount={currencyAmount} className="pt-4" />
      </div>

      <div className="flex w-full flex-col gap-2 border-t border-t-greyscale-50/8 p-8 pt-4">
        <Tooltip
          content={<Translate token="v2.features.currency.budget.budgetExceededOrEmpty" />}
          isDisabled={canRewards}
        >
          <Button
            variant="primary"
            disabled={!canRewards || loading}
            size="l"
            backgroundColor="blue"
            className="w-full"
            type={"submit"}
          >
            <CheckLine />
            {T("rewardBudget.submit")}
          </Button>
        </Tooltip>
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
    </Card>
  );
};
