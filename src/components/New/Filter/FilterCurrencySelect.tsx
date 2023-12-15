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
  return currency === Currency.USD ? (
    <InfoIcon />
  ) : (
    <Chip className="h-full w-full">
      <CurrencyIcons className="h-full w-full" currency={currency} />
    </Chip>
  );
}

const currenciesLabel: Record<Currency, { label: string; icon: JSX.Element }> = {
  [Currency.USD]: { label: "filter.currency.all", icon: <LabelIcon currency={Currency.USD} /> },
  [Currency.ETH]: { label: "currencies.currency.ETH", icon: <LabelIcon currency={Currency.ETH} /> },
  [Currency.APT]: { label: "currencies.currency.APT", icon: <LabelIcon currency={Currency.APT} /> },
  [Currency.OP]: { label: "currencies.currency.OP", icon: <LabelIcon currency={Currency.OP} /> },
  [Currency.STARK]: { label: "currencies.currency.STARK", icon: <LabelIcon currency={Currency.STARK} /> },
  [Currency.LORDS]: { label: "currencies.currency.LORDS", icon: <LabelIcon currency={Currency.LORDS} /> },
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
        {currency !== Currency.USD ? <div className="mr-2 h-6 w-6">{currenciesLabel[currency].icon}</div> : null}
        {T(currenciesLabel[currency].label)}
      </Flex>
    ),
    []
  );

  const items = currencies.map(currency => ({ ...currency, label: getLabel(currency.value as Currency) }));

  return (
    <FilterField label={T("filter.currency.title")}>
      <FilterSelect
        icon={({ selected }) => (
          <div className="h-4 w-4">
            {currenciesLabel[(selected as Item).value as keyof typeof currenciesLabel].icon}
          </div>
        )}
        tokens={{ zero: "filter.currency.all", other: "filter.currency" }}
        items={items}
        selected={{
          ...selected,
          label: <>{T(currenciesLabel[selected.value as keyof typeof currenciesLabel].label)}</>,
        }}
        onChange={onChange}
        disabled={currencies.length <= 1}
      />
    </FilterField>
  );
}
