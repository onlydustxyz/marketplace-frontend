import { ReactElement, useCallback } from "react";
import InfoIcon from "src/assets/icons/InfoIcon";
import { Chip } from "src/components/Chip/Chip";
import { CurrencyIcons } from "src/components/Currency/CurrencyIcon";
import { FilterField } from "src/components/New/Filter/FilterField";
import { FilterSelect, Item } from "src/components/New/Filter/FilterSelect";
import { useIntl } from "src/hooks/useIntl";
import { Currency } from "src/types";
import { Flex } from "../Layout/Flex";

function LabelIcon({ currency }: { currency: Currency }): ReactElement {
  return (
    <Chip className="h-full w-full">
      <CurrencyIcons className="h-full w-full" currency={currency} />
    </Chip>
  );
}

function currencyOrDefault(selected: Item) {
  if (selected.value === "") {
    return {
      label: "filter.currency.all",
      icon: <InfoIcon />,
    };
  }

  return currenciesLabel[selected.value as Currency];
}

const currenciesLabel: Record<Currency, { label: string; icon: JSX.Element }> = {
  [Currency.USD]: { label: "currencies.currency.USD", icon: <LabelIcon currency={Currency.USD} /> },
  [Currency.ETH]: { label: "currencies.currency.ETH", icon: <LabelIcon currency={Currency.ETH} /> },
  [Currency.APT]: { label: "currencies.currency.APT", icon: <LabelIcon currency={Currency.APT} /> },
  [Currency.OP]: { label: "currencies.currency.OP", icon: <LabelIcon currency={Currency.OP} /> },
  [Currency.STRK]: { label: "currencies.currency.STRK", icon: <LabelIcon currency={Currency.STRK} /> },
  [Currency.LORDS]: { label: "currencies.currency.LORDS", icon: <LabelIcon currency={Currency.LORDS} /> },
  [Currency.USDC]: { label: "currencies.currency.USDC", icon: <LabelIcon currency={Currency.USDC} /> },
};

export function FilterCurrencySelect({
  currencies,
  selected,
  onChange,
}: {
  currencies: Item[];
  selected: Item;
  onChange: (items: Item) => void;
}) {
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

  const defaultCurrency = {
    value: "",
    label: <Flex className="items-center">{T("filter.currency.all")}</Flex>,
    id: 9999,
  };

  const items = currencies.map(currency => ({
    ...currency,
    label: getLabel((currency.value || Currency.USD) as Currency),
  }));

  return (
    <FilterField label={T("filter.currency.title")}>
      <FilterSelect
        icon={({ selected }) => <div className="h-4 w-4">{currencyOrDefault(selected as Item).icon}</div>}
        tokens={{ zero: "filter.currency.all", other: "filter.currency" }}
        items={[defaultCurrency, ...items]}
        selected={{
          ...selected,
          label: <>{T(currencyOrDefault(selected as Item).label)}</>,
        }}
        onChange={onChange}
      />
    </FilterField>
  );
}
