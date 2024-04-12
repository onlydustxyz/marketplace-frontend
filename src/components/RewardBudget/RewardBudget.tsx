import { ChangeEvent, FC, useEffect, useMemo, useState } from "react";
import { Money } from "utils/Money/Money";

import Button, { ButtonOnBackground } from "src/components/Button";
import { Width } from "src/components/Button";
import { FieldInfoMessage } from "src/components/New/Field/InfoMessage";
import { useIntl } from "src/hooks/useIntl";
import CheckLine from "src/icons/CheckLine";
import InformationLine from "src/icons/InformationLine";
import { cn } from "src/utils/cn";

import { CurrencyConverter } from "components/features/currency-converter/currency-converter";

import RewardBudgetBar from "./BudgetBar/RewardBudgetBar";
import RewardBudgetDetails from "./Details/RewardBudgetDetails";
import { RewardBudgetProps, WorkEstimationBudgetDetails } from "./RewardBudget.type";
import { RewardBudgetUtils } from "./RewardBudget.utils";

export const RewardBudget: FC<RewardBudgetProps> = props => {
  const { T } = useIntl();
  const [selectedBudget, setSelectedBudget] = useState<WorkEstimationBudgetDetails>(props.budgets[0]);
  const [amount, setAmount] = useState<number | null>(null);
  const withDefaultAmount = useMemo(() => amount || 0, [amount]);

  useEffect(() => {
    if (props.preferedCurrency) {
      const find = props.budgets.find(b => b.currency === props.preferedCurrency);
      if (find) {
        setSelectedBudget(find);
      }
    }
  }, [props.preferedCurrency]);

  useEffect(() => {
    const _amount = amount || 0;
    if (props.onChange && selectedBudget.remaining > 0 && selectedBudget.remaining - _amount >= 0) {
      props.onChange({
        amount: _amount,
        currency: selectedBudget.currency,
      });
    }
  }, [amount, selectedBudget]);

  const selectedBudgetDollarEquivalent = useMemo(
    () =>
      RewardBudgetUtils.getDollarEquivalent({ rate: selectedBudget.dollarsConversionRate, amount: withDefaultAmount }),
    [selectedBudget, withDefaultAmount]
  );

  const canRewards = useMemo(
    () => RewardBudgetUtils.canRewards({ remaining: selectedBudget.remaining, amount: withDefaultAmount }),
    [selectedBudget, withDefaultAmount]
  );

  const onSelectedBudgetChange = (newBudget: WorkEstimationBudgetDetails) => {
    setSelectedBudget(newBudget);
    setAmount(null);
  };

  const onChangeAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const fieldValue = e.target.value;

    if (fieldValue === "") {
      setAmount(null);
    }
    const value = parseFloat(fieldValue);
    if (value < 0) {
      setAmount(0);
    } else if (!isNaN(value)) {
      setAmount(value);
    }
  };

  return (
    <div className="flex w-full flex-col rounded-2xl border border-greyscale-50/8 bg-whiteFakeOpacity-2 shadow-light">
      <div className="flex w-full flex-col p-6 pb-2">
        <div className="flex w-full flex-col gap-2">
          <div className="flex flex-col">
            <CurrencyConverter {...props} value={selectedBudget} onChange={onSelectedBudgetChange} />
          </div>
          {/*<div className="z-10 flex flex-1 flex-row items-stretch justify-between gap-4">*/}
          {/*  <RewardBudgetSelect {...props} value={selectedBudget} onChange={onSelectedBudgetChange} />*/}
          {/*  <FieldInput*/}
          {/*    min="0"*/}
          {/*    step="0.000001"*/}
          {/*    placeholder={T(`currencies.amount_placeholder.${selectedBudget.currency.code}`)}*/}
          {/*    name="budget-amount-input"*/}
          {/*    type="number"*/}
          {/*    value={amount === null ? "" : amount}*/}
          {/*    fieldClassName="flex-1 max-w-[96px] min-w-[96px]"*/}
          {/*    className="h-full flex-1 rounded-2xl"*/}
          {/*    onChange={onChangeAmount}*/}
          {/*    inputClassName="font-medium text-right [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"*/}
          {/*  />*/}
          {/*</div>*/}
          <FieldInfoMessage
            icon={({ className }) => <InformationLine className={className} />}
            className={cn({
              "items-start": Money.isFiat(selectedBudget.currency),
            })}
          >
            {Money.isFiat(selectedBudget.currency)
              ? T("currencies.network.label_dollar")
              : T("currencies.network.label", { currency: T(`currencies.network.${selectedBudget.currency.code}`) })}
          </FieldInfoMessage>
        </div>
      </div>

      <div className="flex w-full flex-col px-8 pb-3 pt-3">
        <RewardBudgetBar
          total={selectedBudget.initialAmount || 0}
          spending={withDefaultAmount}
          remaining={selectedBudget.remaining || 0}
        />
      </div>
      <div className="flex w-full flex-col border-b border-greyscale-50/8 px-8 pb-6 pt-3">
        <RewardBudgetDetails
          amount={withDefaultAmount}
          budget={selectedBudget}
          selectedBudgetDollarEquivalent={selectedBudgetDollarEquivalent}
        />
      </div>
      <div className="flex w-full flex-col p-6">
        <Button
          width={Width.Full}
          disabled={!canRewards || props.loading}
          htmlType="submit"
          onBackground={ButtonOnBackground.Blue}
        >
          <CheckLine />
          {T("rewardBudget.submit")}
        </Button>
      </div>
    </div>
  );
};
