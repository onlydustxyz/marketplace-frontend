import { Select, SelectItem } from "@nextui-org/react";
import { ChangeEvent } from "react";
import { Money } from "utils/Money/Money";

import { Chip } from "src/components/Chip/Chip";
import { CurrencyIcons } from "src/components/Currency/CurrencyIcon";
import { useCurrenciesOrder } from "src/hooks/useCurrenciesOrder";
import { useIntl } from "src/hooks/useIntl";

import { Input } from "components/ds/form/input/input";
import { TAmountSelect } from "components/features/currency/amount-select/amount-select.types";

// TODO handle blue style
export function AmountSelect({
  inputProps,
  budgets,
  amountValue,
  selectionValue,
  onAmountChange,
  onSelectionChange,
}: TAmountSelect.Props) {
  const { T } = useIntl();
  const orderedCurrencies = useCurrenciesOrder({ currencies: budgets });

  const handleSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const relatedBudgetCurrency = budgets?.find(budget => budget.currency.code === e.target.value)?.currency;
    if (e.target.value && relatedBudgetCurrency) {
      onSelectionChange?.(relatedBudgetCurrency);
    }
  };

  const handleAmountChange = (amount: string) => {
    onAmountChange?.(amount);
  };

  return (
    <Input
      type="text"
      placeholder="0.00"
      size="lg"
      radius="full"
      className="h-11"
      disabled={inputProps?.disabled || !orderedCurrencies?.length}
      value={amountValue}
      onChange={e => handleAmountChange(e.target.value.replace(/[^0-9.,]+/g, "").replace(/,/g, "."))}
      endContent={
        <div className="flex w-fit items-center">
          <Select
            aria-label={T("v2.commons.currency")}
            defaultSelectedKeys={[selectionValue?.code]}
            selectedKeys={[selectionValue?.code]}
            classNames={{
              trigger: "p-0 h-auto !bg-transparent shadow-none flex flex-row items-center space-x-4",
              innerWrapper: "!pt-0",
              popoverContent: "bg-greyscale-900 border border-card-border-light shadow-medium w-fit",
              selectorIcon: "relative right-0 left-0 !ml-2",
            }}
            onChange={handleSelectionChange}
            renderValue={items => {
              return items.map(item => (
                <div key={item.key} className="flex flex-row items-center gap-2">
                  <Chip solid className="h-5 w-5 flex-shrink-0">
                    <CurrencyIcons
                      currency={Money.fromSchema({ code: item.key as Money.Static.Currency })}
                      className="h-5 w-5"
                    />
                  </Chip>
                  <span>{item.key}</span>
                </div>
              ));
            }}
            popoverProps={{ placement: "right-start" }}
            isDisabled={inputProps?.disabled || !orderedCurrencies?.length}
          >
            {orderedCurrencies?.map(({ currency: { code, name } }) => (
              <SelectItem
                key={code}
                value={code}
                className={
                  "rounded-md p-2 data-[hover=true]:bg-card-background-medium data-[selectable=true]:focus:bg-card-background-medium"
                }
                startContent={
                  <Chip solid className="h-5 w-5">
                    <CurrencyIcons currency={Money.fromSchema({ code })} className="h-5 w-5" />
                  </Chip>
                }
              >
                {`${name} (${code})`}
              </SelectItem>
            ))}
          </Select>
        </div>
      }
      {...inputProps}
    />
  );
}
