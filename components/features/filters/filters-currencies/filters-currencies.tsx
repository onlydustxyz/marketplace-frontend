import { ReactElement, useCallback } from "react";

import { Chip } from "src/components/Chip/Chip";
import { CurrencyIcons } from "src/components/Currency/CurrencyIcon";
import { Flex } from "src/components/New/Layout/Flex";
import { useIntl } from "src/hooks/useIntl";
import MoneyBoxLine from "src/icons/MoneyBoxLine";
import { Currency } from "src/types";

import { FilterFieldContainer } from "components/ds/Filters/field-container/field-container";
import { SelectAutocomplete } from "components/ds/Filters/select-autocomplete/select-autocomplete";
import { TFiltersCurrencies } from "components/features/filters/filters-currencies/filters-currencies.types";

const currenciesLabel: Record<Currency, { label: string; icon: JSX.Element }> = {
  [Currency.USD]: { label: "currencies.currency.USD", icon: <LabelIcon currency={Currency.USD} /> },
  [Currency.ETH]: { label: "currencies.currency.ETH", icon: <LabelIcon currency={Currency.ETH} /> },
  [Currency.APT]: { label: "currencies.currency.APT", icon: <LabelIcon currency={Currency.APT} /> },
  [Currency.OP]: { label: "currencies.currency.OP", icon: <LabelIcon currency={Currency.OP} /> },
  [Currency.STRK]: { label: "currencies.currency.STRK", icon: <LabelIcon currency={Currency.STRK} /> },
  [Currency.LORDS]: { label: "currencies.currency.LORDS", icon: <LabelIcon currency={Currency.LORDS} /> },
  [Currency.USDC]: { label: "currencies.currency.USDC", icon: <LabelIcon currency={Currency.USDC} /> },
};

function LabelIcon({ currency }: { currency: Currency }): ReactElement {
  return (
    <Chip className="h-full w-full">
      <CurrencyIcons className="h-full w-full" currency={currency} />
    </Chip>
  );
}

export function FiltersCurrencies({ currencies, selected, onChange }: TFiltersCurrencies.Props) {
  const { T } = useIntl();

  const getLabel = useCallback(
    (currency: Currency) => (
      <Flex className="items-center">
        <div className="mr-2 h-6 w-6">{currenciesLabel[currency].icon}</div>
        {T(currenciesLabel[currency].label)}
      </Flex>
    ),
    []
  );

  const items = currencies.map(currency => ({
    ...currency,
    label: getLabel((currency.value || Currency.USD) as Currency),
  }));

  return (
    <FilterFieldContainer label={T("filter.currency.title")}>
      <SelectAutocomplete
        type="square"
        icon={({ className }) => <MoneyBoxLine className={className} />}
        tokens={{ zero: "filter.currency.all", other: "filter.currency", empty: "filter.currency.empty" }}
        items={items}
        selected={selected.map(values => ({
          ...values,
          label: getLabel((values.value || Currency.USD) as Currency),
        }))}
        onChange={onChange}
        multiple={true}
      />
    </FilterFieldContainer>
  );
}
