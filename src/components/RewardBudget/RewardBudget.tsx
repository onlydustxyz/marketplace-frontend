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
  // const [selectedBudget, setSelectedBudget] = useState<WorkEstimationBudgetDetails>(props.budgets[0]);
  // const [amount, setAmount] = useState<number | null>(null);
  //
  // useEffect(() => {
  //   if (props.preferedCurrency) {
  //     const find = props.budgets.find(b => b.currency === props.preferedCurrency);
  //     if (find) {
  //       setSelectedBudget(find);
  //     }
  //   }
  // }, [props.preferedCurrency]);
  //
  // useEffect(() => {
  //   const _amount = amount || 0;
  //   if (props.onChange && selectedBudget.remaining > 0 && selectedBudget.remaining - _amount >= 0) {
  //     props.onChange({
  //       amount: _amount,
  //       currency: selectedBudget.currency,
  //     });
  //   }
  // }, [amount, selectedBudget]);
  //
  // const selectedBudgetDollarEquivalent = useMemo(
  //   () =>
  //     RewardBudgetUtils.getDollarEquivalent({ rate: selectedBudget.dollarsConversionRate, amount: withDefaultAmount }),
  //   [selectedBudget, withDefaultAmount]
  // );
  //

  const { budgets } = props;

  const { currencyValue, setCurrencyValue, selectedCurrencyBudget } = UseCurrencyConverter({
    budgets,
  });

  const onSelectedBudgetChange = (value: TCurrencyConverter.CurrencyAmount) => {
    setCurrencyValue(value);
    const amount = parseFloat(value.amount) || 0;
    if (
      props.onChange &&
      selectedCurrencyBudget?.remaining &&
      selectedCurrencyBudget?.remaining > 0 &&
      selectedCurrencyBudget?.remaining - amount >= 0
    ) {
      props.onChange({
        amount: parseFloat(value.amount),
        currency: value.currency,
      });
    }
  };

  const withDefaultAmount = useMemo(() => parseFloat(currencyValue.amount) || 0, [currencyValue.amount]);

  const canRewards = useMemo(
    () =>
      RewardBudgetUtils.canRewards({ remaining: selectedCurrencyBudget?.remaining ?? 0, amount: withDefaultAmount }),
    [selectedCurrencyBudget, withDefaultAmount]
  );

  // const onChangeAmount = (e: ChangeEvent<HTMLInputElement>) => {
  //   const fieldValue = e.target.value;
  //
  //   if (fieldValue === "") {
  //     setAmount(null);
  //   }
  //   const value = parseFloat(fieldValue);
  //   if (value < 0) {
  //     setAmount(0);
  //   } else if (!isNaN(value)) {
  //     setAmount(value);
  //   }
  // };

  return (
    <div className="flex w-full flex-col gap-3 rounded-2xl border border-greyscale-50/8 bg-whiteFakeOpacity-2 p-8 shadow-light">
      <CurrencyConverter budgets={budgets} onChange={onSelectedBudgetChange} />

      <ProjectBudget selectedBudget={selectedCurrencyBudget} rewardAmount={currencyValue.amount} />

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
            "items-start": Money.isFiat(currencyValue.currency),
          })}
        >
          {Money.isFiat(currencyValue.currency)
            ? T("currencies.network.label_dollar")
            : T("currencies.network.label", { currency: T(`currencies.network.${currencyValue.currency.code}`) })}
        </FieldInfoMessage>
      </div>
    </div>
  );
};
