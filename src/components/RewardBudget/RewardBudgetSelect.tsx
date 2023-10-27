import { FC } from "react";
import { RewardBudgetProps } from "./RewardBudget";
import { Listbox } from "@headlessui/react";
import { CurrencyIcons } from "src/components/Currency/CurrencyIcon";
import { useIntl } from "src/hooks/useIntl";
import ArrowDownSLine from "src/icons/ArrowDownSLine";
import { formatMoneyAmount } from "src/utils/money";
import { Currency } from "src/types";

export const RewardBudgetSelect: FC<RewardBudgetProps> = ({
  budgets,
  initialDollarsEquivalent,
  remainingDollarsEquivalent,
}) => {
  const { T } = useIntl();
  const disabled = false;

  return (
    <div className="flex w-full">
      <div className="z-50 flex flex-1 flex-row items-center justify-between gap-4">
        <Listbox value={budgets[0]} onChange={project => console.log("project", project)} disabled={disabled}>
          {({ value }) => (
            <div className="relative flex-1">
              <Listbox.Button className="flex w-full flex-row items-center justify-between gap-2 rounded-2xl border border-greyscale-50/8 bg-white/5 px-4 py-[12px] shadow-light">
                <div className="flex flex-row items-center justify-start gap-2">
                  <CurrencyIcons currency={value.currency} className=" h-4 w-4" />
                  <label className="font-walsheim text-base font-bold">
                    {T(`currencies.currency.${value.currency}`)}
                  </label>
                </div>
                <ArrowDownSLine className="text-2xl text-spaceBlue-200" />
              </Listbox.Button>
              <Listbox.Options className="absolute left-0 top-full w-full translate-y-[4px] rounded-2xl border border-greyscale-50/12 bg-greyscale-900 px-4 py-[14px] shadow-heavy">
                {budgets.map(budget => (
                  <Listbox.Option key={budget.currency} value={budget.currency}>
                    <div className="flex flex-row items-center justify-start gap-3">
                      <CurrencyIcons currency={value.currency} className="h-4 w-4" />
                      <p>
                        <span className="font-walsheim text-sm font-normal">
                          {T(`currencies.currency.${value.currency}`)}
                        </span>
                        &nbsp;
                        <span className="font-walsheim text-[10px] font-normal text-spaceBlue-200">
                          {`(${formatMoneyAmount({ amount: value.remaining, currency: value.currency })})`}
                        </span>
                      </p>
                    </div>
                    {value.remainingDollarsEquivalent && value.currency !== Currency.USD ? (
                      <p className="font-walsheim text-sm font-normal">
                        {`(${formatMoneyAmount({ amount: value.remainingDollarsEquivalent, currency: Currency.USD })})`}
                      </p>
                    ) : null}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          )}
        </Listbox>
        <p>2</p>
      </div>
    </div>
  );
};
